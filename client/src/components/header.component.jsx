import React from "react";
import { AppBar, Container, Typography, Toolbar } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { AccountCircle  } from "@mui/icons-material";

const Header = () => {
    return (
        <AppBar>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <AccountCircle  />
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;