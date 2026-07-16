import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Door from '@mui/icons-material/LogoutOutlined';
import Stats from '@mui/icons-material/BarChart';
import Incoming from '@mui/icons-material/CallReceived';
import Tank from '@mui/icons-material/OilBarrel';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import Report from '@mui/icons-material/Assignment';
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;


function ResponsiveDrawer(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const drawer = (
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            <Toolbar
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: [1],
                    ...theme.mixins.toolbar, // Копирует высоту AppBar для всех экранов
                })}
            >
                {/* Здесь может быть ваш логотип или название приложения */}
                <Chip icon={<AccountCircle />} label="Грибов Данил" color="primary" />
            </Toolbar>
            <Divider />

                <List>

                        
                        <ListItem key={'Статистика'} disablePadding>
                            
                    <ListItemButton onClick={() => navigate("/stats")}>

                            <ListItemIcon>
                            <Stats color="primary"/>
                            </ListItemIcon>
                        <ListItemText primary={'Статистика'} />
                                </ListItemButton>
                        
                        </ListItem>

                <ListItem key={'Приход вагонов'} disablePadding>
                    <ListItemButton onClick={() => navigate("/incoming")}>
                        <ListItemIcon>
                            <Incoming color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={'Приход вагонов'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Резервуары'} disablePadding>
                    <ListItemButton onClick={() => navigate("/tanks")}>
                        <ListItemIcon>
                            <Tank color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={'Резервуары'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Отпуск в автоцистерны'} disablePadding>
                    <ListItemButton onClick={() => navigate("/shipment")}>
                        <ListItemIcon>
                            <ScheduleSendIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={'Отпуск в автоцистерны'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Отчеты'} disablePadding>
                    <ListItemButton onClick={() => navigate("/reports")}>
                        <ListItemIcon>
                            <Report color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={'Отчеты'} />
                    </ListItemButton>
                            </ListItem>
                        
                
            </List>
            <Divider />
            <List>
                {['Админ панель'].map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => navigate("/admin")}>
                            <ListItemIcon>
                                <AdminIcon color="primary"/> 
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                </List>
        </Box>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GSM app
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Door />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, flexGrow: 1, overflowY: 'auto' }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column', // Направление сверху вниз
                            height: '100%',
                        },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true, // Better open performance on mobile.
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                    <Divider /> {/* Разделитель перед подвалом */}
                    <Box
                        component="footer"
                        sx={{
                            p: 2,
                            backgroundColor: 'background.default',
                            textAlign: 'center'
                        }}
                    >

                        {/* Вариант Б: Текст копирайта или версии */}
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                            <Chip label="Администратор" color="secondary" variant="outlined" />
                        </Typography>
                    </Box>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet/>
               
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;