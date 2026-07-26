import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/authContext";

export default function RoleRoute({ roles }) {
    const { loading, isAuthenticated, user } = useContext(AuthContext);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const role = user?.role ?? user?.roleName;

    if (!roles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}