import { Routes, Route, Navigate } from "react-router";
import { userStore } from "./utils/mockAPI-user";
import { observer } from "mobx-react-lite";
import AuthPage from "./pages/auth.page";
import CourseViewPage from "./pages/courseview.page";
import UserProfileEditForm from "./components/editform.component";
import DashboardViewPage from "./pages/dashboardview.page";

const AppRoutes = observer(({ darkMode, setDarkMode }) => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth/signup" element={<AuthPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            
            <Route path="/dashboard/courses" element={userStore.token ? <DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} /> 
            : <Navigate to="/auth/login" />} />
            <Route path="/dashboard/user" element={userStore.token ? <DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} /> 
            : <Navigate to="/auth/login" />} />
            <Route path="/dashboard/course/:courseId" element={userStore.token ? <DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} /> 
            : <Navigate to="/auth/login" />} />
            <Route path="/dashboard/settings" element={userStore.token ? <DashboardViewPage darkMode={darkMode} setDarkMode={setDarkMode} /> 
            : <Navigate to="/auth/login" />} />
        </Routes>
    );
});

export default AppRoutes;