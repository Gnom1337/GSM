import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// 1. Импортируем компоненты из Material UI
import { CircularProgress, Box } from '@mui/material';

export function PublicRoute({ children }) {
    const { isAuth, isLoading } = useAuth();

    // 2. Отображаем красивую загрузку MUI на весь экран
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh', // Высота на весь экран браузера
                    width: '100%',
                    backgroundColor: 'background.default' // Адаптивный цвет фона MUI (светлый/темный)
                }}
            >
                {/* Спиннер. Можно поменять цвет (например, color="secondary" или "success") */}
                <CircularProgress size={50} thickness={4} color="primary" />
            </Box>
        );
    }

    // Если проверка прошла и юзер авторизован — отправляем в личный кабинет
    if (isAuth) {
        return <Navigate to="/app" replace />;
    }

    // Если всё ок — рендерим дочерние публичные компоненты (Login / Register)
    return children ? children : <Outlet />;
}