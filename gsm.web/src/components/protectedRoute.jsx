import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function ProtectedRoute() {
    const context = useContext(AuthContext);


    const { loading, isAuthenticated } = context;

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return isAuthenticated
        ? <Outlet />
        : <Navigate to="/login" replace />;
}