import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import AdminProductList from "./pages/AdminProductList";
import UpdateProductPage from "./pages/UpdateProductPage";
import AddProducts from "./pages/AddProducts";
import AdminProductDetails from "./pages/AdminProductDetails";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductList />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/admin-products" element={<AdminProductList />} />
        <Route
          path="/admin/products/edit/:id"
          element={<UpdateProductPage />}
        />
        <Route path="/add-products" element={<AddProducts />} />
        <Route
          path="/admin/products/view/:id"
          element={<AdminProductDetails />}
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
