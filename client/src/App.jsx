import { useMemo, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router";
import AppRoutes from "./app.routing";

const queryClient = new QueryClient();

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
          ...(darkMode
            ? {
                // dark mode
                background: {
                  default: "#1F1E2C", 
                  paper: "#262837",  
                },
                primary: {
                  main: "#0177FB",   
                },
                text: {
                  primary: "#FFFFFF", 
                  secondary: "#585A65", 
                },
              }
            : {
                // light
                background: {
                  default: "#FFFFFF", 
                  paper: "#FFFFFF",   
                },
                primary: {
                  main: "#0177FB",    
                },
                text: {
                  primary: "#1F1E2C",
                  secondary: "#585A65",
                },
              }),
        },
      }),
    [darkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes darkMode={darkMode} setDarkMode={setDarkMode} />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
