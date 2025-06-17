import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router";
import AppRoutes from "./app.routing";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
