import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [isAuth, setIsAuth] = useState(() => {
        return localStorage.getItem('auth_fallback') === 'true';
    });

    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('https://localhost:7165/api/auth/Status', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                setIsAuth(true);
                localStorage.setItem('auth_fallback', 'true');
            } else {
                setIsAuth(false);
                localStorage.removeItem('auth_fallback');
            }
        } catch (error) {
            console.error("Ошибка проверки авторизации:", error);
            setIsAuth(false);
            localStorage.removeItem('auth_fallback');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        checkAuthStatus();
    }, []);

    const login = (userData) => {
        localStorage.setItem('auth_fallback', 'true');
        setIsAuth(true);
    };

    const register = () => {
        localStorage.setItem('auth_fallback', 'true');
        setIsAuth(true);
    };


    const logout = async () => {
        try {
            await fetch('https://localhost:7165/api/auth/Logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (e) {
            console.error("Ошибка при выходе:", e);
        } finally {
            localStorage.removeItem('auth_fallback');
            setIsAuth(false);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
}