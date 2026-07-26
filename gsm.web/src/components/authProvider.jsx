import { useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import { me } from "../services/authService";

export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        me()
            .then((res) => {
                setUser(res.data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setUser(null);
                setIsAuthenticated(false);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                loading,
                isAuthenticated,
                user,
                setUser,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}