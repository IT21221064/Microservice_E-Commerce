import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:6001/api/products/${id}`).then((res) => {
      if (res.data.success) {
        setProduct(res.data.data);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Box>
    );
  }

  const hasOffer = product.offerValue && product.offerValue > 0;
  const discountedPrice = hasOffer
    ? product.price - (product.price * product.offerValue) / 100
    : product.price;

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ mt: 12, mb: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 4,
            background: "linear-gradient(to right, #e3f2fd, #ffffff)",
          }}
        >
          <Grid container spacing={6} alignItems="center">
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  height: 420,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(to bottom, #bbdefb, #e3f2fd)",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "inset 0 0 12px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Grid>

            {/* Info Section */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {product.name}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}
              >
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mt: 2 }}>
                {hasOffer ? (
                  <Box>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        textDecoration: "line-through",
                        fontSize: "1rem",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#2e7d32",
                        fontWeight: 700,
                        mt: 1,
                      }}
                    >
                      ${discountedPrice.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ff5252",
                        fontWeight: 600,
                        mt: 0.5,
                      }}
                    >
                      Save {product.offerValue}%!
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                )}
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  mt: 5,
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: "30px",
                  textTransform: "none",
                  background: "linear-gradient(to right, #42a5f5, #1e88e5)",
                }}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetails;
