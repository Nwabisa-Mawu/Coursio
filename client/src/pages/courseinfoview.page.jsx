import React, { useState } from "react";
import { useNavigate } from "react-router";
import { userStore } from "../utils/mockAPI-user";
import { observer } from "mobx-react-lite";
import { Box, Typography, IconButton, Stack, Card } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CourseInfoView = observer(({ course }) => {
  const navigate = useNavigate();
  const isFavourite = userStore.favourites.includes(course.id);

  const handleBack = () => {
    navigate("/dashboard/courses");
  };

  const handleToggleFavourite = () => {
    userStore.toggleFavourite(course.id, userStore.favourites);
  };

  return (

    <Card 
  sx={{ 
    maxWidth: 1000, 
    mx: "auto",
    p: 0,          
    borderRadius: 2,
    overflow: "hidden",
    position: "relative",
    mt: 8,
  }}
>
<Box sx={{  maxWidth: 800, mx: "auto", p: 4, textAlign: "center", position: "relative", flexDirection: "column", display: "flex", alignItems: "center" }}>
<IconButton
  onClick={handleBack}
  sx={{ position: "absolute", top: 16, left: 16 }}
>
  <ArrowBackIcon />
</IconButton>
      <Box
        component="img"
        src={
          course.imageUrl ||
          "https://via.placeholder.com/345x140.png?text=Course+Image"
        }
        alt={course.altText || "Course Image"}
        sx={{
          width: "70%",
          height: "40%",
          display: "block",
        }}
      />
      <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        {course.title || "Course Title"}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Instructor: {course.instructor || "Instructor Name"}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Difficulty: {course.difficulty || "Level"}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ mb: 4 }}
      >
       <IconButton onClick={handleToggleFavourite}>
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body1">Save to Favourites</Typography>
      </Stack>

      <Typography variant="body1" sx={{ textAlign: "left" }}>
        {course.description ||
          "This is a detailed description of the course. It provides an overview of the topics covered, the learning outcomes, and any prerequisites required for students to get the most out of the course."}
      </Typography>
      </Box>
    </Box>
</Card>
   
  );
});

export default CourseInfoView;
