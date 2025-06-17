import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
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
  Badge,
  Avatar,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { AccountCircle } from "@mui/icons-material";
import SearchInput from "./search.component";

const Header = ({ loggedIn = true }) => {
  let showLogin = false;
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true); // Local toggle for now
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
    navigate("/");
  };

  if (location.pathname.includes("/auth/signup")) {
    showLogin = false;
  } else if (location.pathname.includes("/auth/login")) {
    showLogin = true;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
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
            {/* LOGO + Company Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalLibraryIcon />

              {(!isTabletOrBelow || !loggedIn) && (
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    ml: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  LOGO
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
                  left: { xs: "30%", md: "50%" },
                  transform: "translateX(-50%)",
                  width: { xs: "50%", md: "40%" },
                }}
              >
                <SearchInput />
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {!loggedIn && !showLogin && (
                <Button color="inherit" onClick={() => navigate("/auth/login")}>
                  Login
                </Button>
              )}
              {!loggedIn && showLogin && (
                <Button
                  color="inherit"
                  onClick={() => navigate("/auth/signup")}
                >
                  Sign Up
                </Button>
              )}

              {loggedIn && (
                <>
                  <Tooltip title="Notifications">
                    <IconButton size="large" color="inherit">
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        <Avatar alt="User" src="/static/images/avatar/2.jpg" />
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
                      <MenuItem onClick={handleCloseUserMenu}>
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
};

export default Header;
