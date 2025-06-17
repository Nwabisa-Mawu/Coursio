import { useMemo, useState, useEffect } from "react";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";
import AppRoutes from "./app.routing";

function App() {
  //first get theme from local storgae if present
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : false;
  });

  //update local storage whenever darkMode changes
   useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
