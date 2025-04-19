import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const hasOffer = product.offerValue && product.offerValue > 0;
  const discountedPrice = hasOffer
    ? product.price - (product.price * product.offerValue) / 100
    : product.price;

  return (
    <Card
      sx={{
        height: 450,
        width: 350,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: "1px solid #e0e0e0",
        background: "linear-gradient(to top, #e3f2fd, #bbdefb)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        transition: "0.3s ease",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          transform: "translateY(-4px)",
        },
        position: "relative",
      }}
    >
      {hasOffer && (
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "#ff5252",
            color: "white",
            fontWeight: "bold",
            px: 1.5,
            py: 0.5,
            borderRadius: "12px",
            fontSize: "0.75rem",
            zIndex: 2,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          -{product.offerValue}% OFF
        </Box>
      )}

<CardMedia
  component="img"
  height="220"
  image={product.images[0]}
  sx={{
    width: "100%",
    objectFit: "contain", // Makes sure the image fits entirely inside
    backgroundColor: "#f5f5f5", // Optional: adds a background for better presentation
    p: 1, // Optional: padding to prevent image from touching card edges
  }}
/>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5, fontSize: "0.85rem" }}
        >
          {product.description.length > 60
            ? product.description.slice(0, 60) + "..."
            : product.description}
        </Typography>

        <Box>
          {hasOffer ? (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="h6" color="primary">
                ${discountedPrice.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="primary">
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          disableElevation
          component={Link}
          to={`/product/${product._id}`}
          sx={{ fontWeight: 600, textTransform: "none", bgcolor: "#42a5f5" }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
