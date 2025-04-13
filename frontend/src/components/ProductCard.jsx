import React from "react";
import {
  Card, CardMedia, CardContent, Typography, CardActions, Button, Box
} from "@mui/material";

const ProductCard = ({ product }) => {
  const hasOffer = product.offerValue && product.offerValue > 0;
  const discountedPrice = hasOffer
    ? product.price - (product.price * product.offerValue) / 100
    : product.price;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
        },
        position: "relative",
      }}
    >
      {hasOffer && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "error.main",
            color: "white",
            fontWeight: "bold",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            fontSize: "0.8rem",
            zIndex: 2,
          }}
        >
          -{product.offerValue}% OFF
        </Box>
      )}

      <CardMedia
        component="img"
        height="220"
        image={product.images[0]}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {product.description.length > 60
            ? product.description.slice(0, 60) + "..."
            : product.description}
        </Typography>   

        <Box sx={{ mt: 1 }}>
          {hasOffer ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
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
        <Button variant="contained" fullWidth disableElevation>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
