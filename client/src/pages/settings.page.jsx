import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from "@mui/material";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [theme, setTheme] = useState("light");
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);

  const handleSave = () => {
    console.log({
      emailNotifications,
      theme,
      autoPlayVideos,
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Settings
      </Typography>

      <Stack spacing={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          }
          label="Notifications on new courses via email"
        />

        <FormControl fullWidth>
          <InputLabel>Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={(e) => setTheme(e.target.value)}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="system">System Default</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={autoPlayVideos}
              onChange={(e) => setAutoPlayVideos(e.target.checked)}
            />
          }
          label="Auto-play videos on course pages"
        />

        <Button variant="contained" onClick={handleSave}>
          Save Settings
        </Button>
      </Stack>
    </Box>
  );
};

export default SettingsPage;