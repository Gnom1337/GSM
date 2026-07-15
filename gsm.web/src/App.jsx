import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu from './components/menu.jsx'
import './App.css'
const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51b5"
        },
        secondary: {
            main: "#7986cb"
        },
        light: '#ba68c8',
        dark: '#7b1fa2',
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