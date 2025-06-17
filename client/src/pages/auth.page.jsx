import React from "react";
import { Paper, Box } from "@mui/material";
import AuthForm from "../components/authform.component";
import Header from "../components/header.component";

const AuthPage = () => {
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
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        {/* todo: Add dynamic form name */}
        <h2>Authentication</h2>
        <AuthForm />
      </Paper>
    </Box>
    </>
  );
};

export default AuthPage;
