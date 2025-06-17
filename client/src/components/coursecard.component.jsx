import React, { useState } from "react";
import { useNavigate } from "react-router";
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

const CourseCard = ({ course }) => {
   const [liked, setLiked] = useState(false);
   const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/course/course`);
  }

   const handleLikeToggle = () => {
    setLiked((prev) => !prev);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
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
          {course.description ||
            "This is a brief description of the course. It provides an overview of what the course covers and its objectives."}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikeToggle}>
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Button size="small" onClick={() => navigate("/dashboard/course")}>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;