import { BrowserRouter, Routes, Route } from "react-router-dom";
import { deepPurple } from '@mui/material/colors'
import ResponsiveDrawer from "../src/components/menu";
import StatsPage from "./pages/Stats";
import TanksPage from "./pages/Tanks";
import ReportsPage from "./pages/Reports";
import IncomingPage from "./pages/Incoming";
import ShipmentPage from "./pages/Shipment";
import AdminPage from "./pages/Admin";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: deepPurple,
        secondary: deepPurple,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ResponsiveDrawer />}>
                    <Route index element={<StatsPage />} />
                        <Route path="stats" element={<StatsPage />} />
                        <Route path="incoming" element={<IncomingPage />} />
                        <Route path="tanks" element={<TanksPage />} />
                        <Route path="reports" element={<ReportsPage />} />
                        <Route path="shipment" element={<ShipmentPage />} />
                        <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;