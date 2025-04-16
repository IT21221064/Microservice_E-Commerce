import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    offerValue: "",
    images: [""], // Starts with one empty image URL
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...product.images];
    updatedImages[index] = value;
    setProduct({ ...product, images: updatedImages });
  };

  const addImageField = () => {
    setProduct({ ...product, images: [...product.images, ""] });
  };

  const removeImageField = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:6001/api/products",
        product
      );
      if (res.data.success) {
        alert("Product added successfully!");
        // Reset form
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          offerValue: "",
          images: [""],
        });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        ➕ Add New Product
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
            type="number"
            required
          />
          <TextField
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            type="number"
          />
          <TextField
            label="Offer Value"
            name="offerValue"
            value={product.offerValue}
            onChange={handleChange}
            type="number"
          />

          <Typography variant="subtitle1">Image URLs</Typography>
          {product.images.map((img, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index}>
              <TextField
                fullWidth
                label={`Image ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              <IconButton
                onClick={() => removeImageField(index)}
                disabled={product.images.length === 1}
              >
                <RemoveIcon />
              </IconButton>
            </Stack>
          ))}

          <Button
            onClick={addImageField}
            startIcon={<AddIcon />}
            sx={{ width: "fit-content" }}
          >
            Add Another Image
          </Button>

          <Button variant="contained" type="submit">
            Submit Product
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddProducts;
