import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { userStore } from "../utils/mockAPI-user";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const AuthForm = observer(({ mode = "signup", onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes("/auth/login");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginPage) {
      try {
        await userStore.login(formData.email, formData.password);
        navigate("/dashboard/courses", { replace: true });
      } catch (err) {
        console.error("Login failed:", err);
        alert("Login failed. Please check your credentials.");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      try {
        await userStore.signUp(formData.username, formData.email, formData.password);
        navigate("/dashboard/courses");
      } catch (err) {
        console.error("Signup failed:", err);
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      {!isLoginPage && (
        <TextField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}

      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <TextField
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {!isLoginPage && (
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <Button
        type="submit"
        variant="contained"
      >
        {isLoginPage ? "Login" : "Sign Up"}
      </Button>
    </Box>
  );
});

export default AuthForm;
