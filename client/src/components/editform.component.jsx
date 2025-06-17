import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Grid,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const UserProfileEditForm = ({ onCancel, onSave }) => {
  const [username, setUsername] = useState('JohnDoe');
  const [about, setAbout] = useState('This is my bio...');
  const [email, setEmail] = useState('john@example.com');
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/100x100.png?text=Avatar'
  );

  const handleToggleShowPasswordInputs = () => {
    setShowPasswordInputs(!showPasswordInputs);
    setPassword('');
    setConfirmPassword('');
  };

  const handleTogglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        username,
        about,
        email,
        password: showPasswordInputs ? password : undefined,
        profileImage,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={profileImage} sx={{ width: 64, height: 64 }} />
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="About"
            multiline
            rows={4}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Password"
            value="********"
            disabled
            sx={{ flex: 1 }}
          />
          <IconButton onClick={handleToggleShowPasswordInputs} sx={{ ml: 1 }}>
            <EditIcon />
          </IconButton>
        </Grid>

        {showPasswordInputs && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisible}>
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={passwordVisible ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileEditForm;