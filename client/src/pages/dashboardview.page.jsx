import * as React from "react";
import { useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Header from "../components/header.component";
import AuthPage from "../pages/auth.page";
import CourseViewPage from "../pages/courseview.page";
import DrawerMenu from "../components/drawermenu.component";
import UserProfileEditForm from "../components/editform.component";
import CourseInfoView from "../pages/courseinfoview.page";
import SettingsPage from "../pages/settings.page";

const drawerWidth = 240;

const DashboardViewPage = ({ darkMode, setDarkMode }) => {
  let content;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  if (location.pathname.includes("/dashboard/courses")) {
    content = <CourseViewPage />;
  } else if (location.pathname.includes("/dashboard/user")) {
    content = <UserProfileEditForm />;
  } else if (location.pathname.includes("/dashboard/course")) {
    content = <CourseInfoView course={{
    title: "React for Beginners",
    instructor: "Jane Doe",
    difficulty: "Beginner",
    description: "This course covers the fundamentals of React...",
    imageUrl: "https://via.placeholder.com/600x300.png?text=React+Course",
  }}/>
  } else if (location.pathname.includes("/dashboard/settings")) {
    content = <SettingsPage />;
  } else {
    content = <div>Page Not Found</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <DrawerMenu drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {content}
      </Box>
    </Box>
  );
};

export default DashboardViewPage;
