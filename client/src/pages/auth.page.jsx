import React from "react";
import { Card, Box, Typography } from "@mui/material";
import { useLocation } from "react-router";
import AuthForm from "../components/authform.component";
import Header from "../components/header.component";

const AuthPage = () => {
  const location = useLocation();
  const isSignup = location.pathname.includes("/auth/signup");
  return (
    <>
    <Header />
    <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 4,
    mt: 3
  }}
>
  <Card
    elevation={4}
    sx={{
      maxWidth: { xs: "100%", md: 600 },
      width: "100%",
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography variant="h5" sx={{ mb: 2 }}>
      {isSignup ? "Create an account" : "Login to your account"}
    </Typography>

    <AuthForm />
  </Card>
</Box>
    </>
  );
};

export default AuthPage;
