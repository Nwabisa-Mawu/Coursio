import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { getCourses } from "../utils/courses-api";
import { userStore } from "../utils/mockAPI-user";

import {
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import CourseCard from "../components/coursecard.component";

const CourseViewPage = observer(({ searchQuery }) => {
  const { data: courses = [], isLoading, error } = getCourses();
  const [visibleCount, setVisibleCount] = useState(6);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [view, setView] = useState("all");

  useEffect(() => {
    if (userStore.user) {
      userStore.fetchFavourites();
    }
  }, [userStore.user]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Filtered courses
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery?.toLowerCase() || "";
    const match =
      course.title.toLowerCase().includes(query) ||
      course.instructor?.toLowerCase().includes(query);

    return (
      (query === "" || match) &&
      (category === "" || course.category === category) &&
      (difficulty === "" || course.difficulty === difficulty) &&
      (view === "all" || (userStore.favourites.indexOf(course.id) > -1 && view === "favourites"))
    );
  });

  return (
    <Box sx={{ p: 4, mt: 5 }}>
      {/* FILTERS */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          alignItems: "center",
        }}
      >
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(e, newView) => {
            if (newView !== null) setView(newView);
          }}
          sx={{ ml: "auto" }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="favourites">Favourites</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* COURSE LIST */}
      <Grid container spacing={3}>
        {filteredCourses.slice(0, visibleCount).map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>

      {visibleCount < filteredCourses.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
});

export default CourseViewPage;
