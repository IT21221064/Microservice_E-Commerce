import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Stack,
  Fade,
  Divider,
  Paper
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOffersOnly, setShowOffersOnly] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:6001/api/products").then((res) => {
      if (res.data.success) {
        const data = res.data.data;
        setProducts(data);
        setFilteredProducts(data);
        const cats = [...new Set(data.map((p) => p.category))];
        setCategories(cats);
      }
    });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (showOffersOnly) {
      filtered = filtered.filter((p) => p.offerValue && p.offerValue > 0);
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products, showOffersOnly]);

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Header search={search} setSearch={setSearch} />

      <Container maxWidth="xl" sx={{ mt: 10, mb: 12 }}>
        <Paper elevation={0} sx={{ textAlign: "center", py: 5, px: 2, background: "linear-gradient(to right, #e3f2fd, #fce4ec)", borderRadius: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
          >
            ✨ Discover Your Next Favorite Item
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary" }}
          >
            Browse by category, or take advantage of hot offers below
          </Typography>
        </Paper>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 5, mb: 6, flexWrap: "wrap" }}
        >
          <Chip
            label="All"
            onClick={() => {
              setSelectedCategory("");
              setShowOffersOnly(false);
            }}
            color={!selectedCategory && !showOffersOnly ? "primary" : "default"}
            clickable
            variant={!selectedCategory && !showOffersOnly ? "filled" : "outlined"}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={`📦 ${cat}`}
              onClick={() => {
                setSelectedCategory(cat);
                setShowOffersOnly(false);
              }}
              color={selectedCategory === cat ? "primary" : "default"}
              clickable
              variant={selectedCategory === cat ? "filled" : "outlined"}
            />
          ))}
          <Chip
            label="🔥 Offers Only"
            onClick={() => {
              setSelectedCategory("");
              setShowOffersOnly(true);
            }}
            color={showOffersOnly ? "secondary" : "default"}
            clickable
            variant={showOffersOnly ? "filled" : "outlined"}
          />
        </Stack>

        <Divider sx={{ mb: 4 }} />

{filteredProducts.length > 0 ? (
  <Grid container spacing={4} alignItems="stretch">
    {filteredProducts.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} sx={{ display: "flex" }}>
      <Fade in timeout={600} style={{ flex: 1, display: "flex" }}>
        <ProductCard product={product} />
      </Fade>
    </Grid>
    
    ))}
  </Grid>
) : (
  <Box sx={{ mt: 8, textAlign: "center" }}>
    <Typography variant="h6" color="text.secondary">
      No products found.
    </Typography>
  </Box>
)}
</Container>

      <Footer />
    </Box>
  );
};

export default ProductList;