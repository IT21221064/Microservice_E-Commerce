import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      mt: "auto", // Makes sure the footer stays at the bottom
      py: 4,
      textAlign: "center",
      background: "linear-gradient(to right, rgb(31, 57, 83), rgb(45, 97, 152)) !important",
      borderTop: "1px solid #e0e0e0",
      width: "100%", // Ensure full width of the screen
      position: "relative", // Ensures footer positioning is correct
      bottom: 0, // Makes sure it's at the bottom of the page
      margin: 0, // Removes any margin around the footer
    }}
  >
    <Typography variant="body2" color="white">
      &copy; 2025 ShopEase. Made with ❤️ by YourCompany.
    </Typography>
  </Box>
);

export default Footer;
