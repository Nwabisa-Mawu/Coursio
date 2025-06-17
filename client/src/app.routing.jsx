import { Routes, Route } from "react-router";
import AuthPage from "./pages/auth.page";
import CourseViewPage from "./pages/courseview.page";
import UserProfileEditForm from "./components/editform.component";
import DashboardViewPage from "./pages/dashboardview.page";

const AppRoutes = ({ darkMode, setDarkMode }) => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth/signup" element={<AuthPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            
            <Route path="/dashboard/courses" element={<DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/dashboard/user" element={<DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/dashboard/course" element={<DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/dashboard/settings" element={<DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
    );
}

export default AppRoutes;