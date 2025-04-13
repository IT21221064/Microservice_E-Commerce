import React from "react";
import { AppBar, Toolbar, Typography, Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ search, setSearch }) => {
    return (
        <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: "#1976d2",
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
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "#f1f1f1",
              borderRadius: 2,
              width: { xs: "100%", sm: "300px" },
            }}
          />
        </Toolbar>
      </AppBar>
    );
  };
  
export default Header;
