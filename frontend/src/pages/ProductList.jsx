import React, { useEffect, useState, useRef } from "react";
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
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FadeProduct = ({ product }) => {
  const nodeRef = useRef(null);

  return (
    <Fade in timeout={600} nodeRef={nodeRef}>
      <Box ref={nodeRef} sx={{ flex: 1, display: "flex" }}>
        <ProductCard product={product} />
      </Box>
    </Fade>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showOffersOnly, setShowOffersOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios.get("http://localhost:6001/api/products").then((res) => {
      if (res.data.success) {
        const data = res.data.data;
        setProducts(data);
        setFilteredProducts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
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

    if (sortOrder === "priceAsc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceDesc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [search, selectedCategory, products, showOffersOnly, sortOrder]);

  return (
    <Box sx={{ bgcolor: "linear-gradient(to top, #e3f2fd, #bbdefb)", minHeight: "100vh" }}>
      <Header search={search} setSearch={setSearch} />

     <br></br>

      <Container maxWidth={false} sx={{ px: { xs: 2, md: 10 }, mt: 6, mb: 12 }}>
        <Paper
          elevation={0}
          sx={{
            textAlign: "center",
            py: 5,
            px: 2,
            background: "linear-gradient(to right, rgb(31, 57, 83), #42a5f5)",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 1, color: "white" }}
          >
            ✨ Discover Your Next Favorite Item
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "white" }}>
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

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              label="Sort by"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="priceAsc">Price: Low to High</MenuItem>
              <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {filteredProducts.length > 0 ? (
          <Grid container spacing={4} sx={{ rowGap: 6 }}>
            {filteredProducts.map((product) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={product._id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <FadeProduct product={product} />
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
