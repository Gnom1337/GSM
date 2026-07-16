import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/menu.jsx'
import { deepPurple } from '@mui/material/colors'
import './App.css'
const theme = createTheme({
    palette: {
        primary: deepPurple,
        secondary: deepPurple,
    },
});
function App() {

    return (
        <ThemeProvider theme = {theme}>
            <Menu />
        </ThemeProvider>
    )
}

export default App