import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";

const AdminProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 10 }}>
        <Typography variant="h6" color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        🔍 Product Details
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: "wrap" }}>
        {(product.images || []).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`img-${i}`}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 8,
              border: "1px solid #ccc",
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Name:</Typography>
      <Typography>{product.name}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Category:
      </Typography>
      <Typography>{product.category}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Price:
      </Typography>
      <Typography>${product.price}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Offer:
      </Typography>
      <Typography>{product.offerValue || "—"}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Description:
      </Typography>
      <Typography>{product.description}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Quantity:
      </Typography>
      <Typography>{product.quantity}</Typography>
    </Container>
  );
};

export default AdminProductDetails;
