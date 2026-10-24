
import { createElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import { useIsAuth } from "./store/useAuthStore";


export const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
        path: "/profile",
        element: createElement(() => {
            const isAuth = useIsAuth();
            return isAuth
                ? <ProfilePage />
                : <Navigate to="/login" replace />;
        }),
    },
]);
