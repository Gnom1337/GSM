import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveDrawer from "../src/components/menu";
import StatsPage from "./pages/Stats";
import TanksPage from "./pages/Tanks";
import ReportsPage from "./pages/Reports";
import IncomingPage from "./pages/Incoming";
import ShipmentPage from "./pages/Shipment";
import AdminPage from "./pages/Admin";
import LoginPage from "./pages/login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthProvider from "./components/authProvider";
import ProtectedRoute from "./components/protectedRoute";
import RoleRoute from "./components/RoleRoute";
const theme = createTheme({
    palette: {
        primary: {
            main: '#1b5e20',
        },
        secondary: {
            main: '#43a047',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>

                        <Route path="/login" element={<LoginPage />} />

                        <Route element={<ProtectedRoute />}>

                            <Route path="/" element={<ResponsiveDrawer />}>
                                <Route index element={<StatsPage />} />
                                <Route path="stats" element={<StatsPage />} />
                                <Route path="incoming" element={<IncomingPage />} />
                                <Route path="tanks" element={<TanksPage />} />
                                <Route path="reports" element={<ReportsPage />} />
                                <Route path="shipment" element={<ShipmentPage />} />
                                <Route element={<RoleRoute roles={["Admin"]} />}>
                                    <Route path="admin" element={<AdminPage />} />
                                </Route>
                            </Route>

                        </Route>

                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;