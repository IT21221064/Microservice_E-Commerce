import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/products/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    axios
      .put(`http://localhost:5001/api/products/${id}`, product)
      .then((res) => {
        if (res.data.success) {
          alert("Product updated successfully");
          navigate("/admin-products"); // or wherever you list products
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating product");
      })
      .finally(() => setSaving(false));
  };

  if (loading || !product) {
    return (
      <Box textAlign="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={3}>
          ✏️ Update Product
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            value={product.description}
            onChange={(e) => handleChange("description", e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Category"
            value={product.category}
            onChange={(e) => handleChange("category", e.target.value)}
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={product.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value))}
            fullWidth
          />
          <TextField
            label="Offer Value"
            type="number"
            value={product.offerValue || ""}
            onChange={(e) =>
              handleChange("offerValue", parseFloat(e.target.value))
            }
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={product.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
            fullWidth
          />

          <Typography variant="h6">Product Images</Typography>

          {product.images?.map((img, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index}>
              <img
                src={img}
                alt={`img-${index}`}
                style={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
              <TextField
                value={img}
                onChange={(e) => {
                  const newImages = [...product.images];
                  newImages[index] = e.target.value;
                  setProduct((prev) => ({ ...prev, images: newImages }));
                }}
                fullWidth
              />
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  const newImages = product.images.filter(
                    (_, i) => i !== index
                  );
                  setProduct((prev) => ({ ...prev, images: newImages }));
                }}
              >
                Remove
              </Button>
            </Stack>
          ))}

          <Button
            variant="outlined"
            onClick={() =>
              setProduct((prev) => ({
                ...prev,
                images: [...(prev.images || []), ""],
              }))
            }
          >
            ➕ Add New Image URL
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{ mt: 3 }}
          >
            {saving ? "Saving..." : "Update Product"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default UpdateProductPage;
