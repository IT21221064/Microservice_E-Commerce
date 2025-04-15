import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ search, setSearch }) => {
  const theme = useTheme();

  return (
    <AppBar
      position="absolute"
      elevation={4}
      sx={{
        background: "linear-gradient(to right, rgb(31, 57, 83), rgb(45, 97, 152)) !important", 
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 2,
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "white",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: 1,
          }}
        >
          ShopEase
        </Typography>

        <TextField
          placeholder="Search for amazing deals..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "#ffffff",
              borderRadius: 3,
              px: 1,
              height: 42,
              fontSize: "0.9rem",
            },
          }}
          sx={{
            width: { xs: "100%", sm: "300px", md: "350px" },
            "& input": {
              fontSize: "0.95rem",
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
