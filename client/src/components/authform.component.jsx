import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AuthForm = ({ mode = 'signup', onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      {mode === 'signup' && (
        <TextField
          name="name"
          label="Name"
          value={formData.name}
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

      {mode === 'signup' && (
        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      )}

      <Button type="submit" variant="contained" onClick={() => navigate('/dashboard/courses')}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default AuthForm;