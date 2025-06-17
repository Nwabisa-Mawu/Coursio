import { Routes, Route } from "react-router";
import AuthPage from "./pages/auth.page";
import CourseViewPage from "./pages/courseview.page";
import UserProfileEditForm from "./components/editform.component";
import DashboardViewPage from "./pages/dashboardview.page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth/signup" element={<AuthPage />} />
            <Route path="/auth/login" element={<AuthPage />} />
            
            <Route path="/dashboard/courses" element={<DashboardViewPage />} />
            <Route path="/dashboard/user" element={<UserProfileEditForm />} />
        </Routes>
    );
}

export default AppRoutes;