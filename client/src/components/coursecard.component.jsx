import React, { useState } from "react";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { userStore } from "../utils/mockAPI-user"; 

const CourseCard = observer(({ course, onFavourite }) => {
   const navigate = useNavigate();
   const isFavourite = userStore.favourites.includes(course.id);

  const handleToggleFavourite = () => {
    const isNowFavourite = !isFavourite;
    userStore.toggleFavourite(course.id, userStore.favourites);
    if (onFavourite) onFavourite(isNowFavourite);
  };

  const openCourseDetails = () => {
    navigate(`/dashboard/course/${course.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, height: 350 }}>
      <CardMedia
        component="img"
        alt={course.altText || "Course Image"}
        height="140"
        image={
          course.imageUrl ||
          "https://via.placeholder.com/345x140.png?text=Course+Image"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title || "Course Title"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {course.difficulty ||
            ""}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleToggleFavourite}>
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button size="small" onClick={openCourseDetails} >Learn More</Button>
      </CardActions>
    </Card>
  );
});

export default CourseCard;