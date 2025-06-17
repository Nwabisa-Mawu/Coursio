import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const CourseCard = ({ course }) => {
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
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
