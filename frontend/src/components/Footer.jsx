import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    sx={{
      mt: 6,
      py: 4,
      textAlign: "center",
      bgcolor: "#f8f9fa",
      borderTop: "1px solid #e0e0e0"
    }}
  >
    <Typography variant="body2" color="text.secondary">
      &copy; 2025 ShopEase. Made with ❤️ by YourCompany.
    </Typography>
  </Box>
);

export default Footer;
