import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { userStore } from "../utils/mockAPI-user"
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Box,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Switch,
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchInput from "./search.component";
import MenuIcon from "@mui/icons-material/Menu";

const Header = observer(({ darkMode, setDarkMode, searchQuery, setSearchQuery, handleDrawerToggle }) => {
  const loggedIn = userStore.token ? true : false;
  let showLogin = false;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(userStore.user?.imageUrl || 'https://via.placeholder.com/100x100.png?text=Avatar');
  const navigate = useNavigate();
  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    userStore.logout();
    navigate("/auth/login");
  }

  if (location.pathname.includes("/auth/signup")) {
    showLogin = false;
  } else if (location.pathname.includes("/auth/login")) {
    showLogin = true;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{
        backgroundColor: (theme) => theme.palette.background.paper || "#fff",
      }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* open side drawer */}
            {loggedIn && isTabletOrBelow && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            {/* LOGO + Company Name */}
            <Box sx={{ display: "flex", alignItems: "center", color: "#0177FB", display: "none" }}>
              <LocalLibraryIcon />

              {(!isTabletOrBelow || !loggedIn) && (
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    ml: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    textDecoration: "none",
                  }}
                >
                  Coursio
                </Typography>
              )}
            </Box>

            {/* SEARCH */}
            {loggedIn && (
              <Box
                sx={{
                  flexGrow: 1,
                  mx: 5,
                  position: "absolute",
                  left: { sm: "65%", lg: "50%", md: "65%", xs: "40%" },
                  transform: "translateX(-50%)",
                  width: { xs: "50%", md: "50%" },
                }}
              >
                <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#0177FB" }}>
              {!loggedIn && !showLogin && (
                <Button variant="contained" onClick={() => navigate("/auth/login")}>
                  Login
                </Button>
              )}
              {!loggedIn && showLogin && (
                <Button variant="contained"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign Up
                </Button>
              )}

              {loggedIn && (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        <Avatar alt="User" src={imageUrl} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleToggleDarkMode}>
                        <ListItemIcon>
                          {darkMode ? (
                            <LightModeIcon fontSize="small" />
                          ) : (
                            <DarkModeIcon fontSize="small" />
                          )}
                        </ListItemIcon>
                        <Typography sx={{ textAlign: "center", flexGrow: 1 }}>
                          {darkMode ? "Light Mode" : "Dark Mode"}
                        </Typography>
                        <Switch
                          checked={darkMode}
                          onChange={handleToggleDarkMode}
                          size="small"
                        />
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography sx={{ textAlign: "center" }}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
});

export default Header;
