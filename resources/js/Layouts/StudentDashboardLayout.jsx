import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Box, Drawer, AppBar, Toolbar, List, Typography, Divider,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    CssBaseline, IconButton, Avatar, Badge, Menu, MenuItem,
    useTheme, useMediaQuery, Button
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e0e0e0',
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
    color: '#333333',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const LogoContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    '& img': {
        height: '40px',
    },
    '& .logo-text': {
        marginLeft: '10px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#333333',
    }
});

const NavItem = styled(ListItem)({
    display: 'block',
    padding: '4px 0',
    '& .MuiListItemButton-root': {
        borderRadius: '8px',
        margin: '0 8px',
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: '16px',
        color: '#666666',
    },
    '&.active .MuiListItemButton-root': {
        backgroundColor: '#f0f0f0',
    },
    '&.active .MuiListItemIcon-root, &.active .MuiListItemText-primary': {
        color: '#6a11cb',
    }
});

const SearchBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: '#f5f5f5',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999999',
}));

const StyledInputBase = styled('input')(({ theme }) => ({
    color: '#333333',
    width: '100%',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    [theme.breakpoints.up('md')]: {
        width: '20ch',
    },
}));

export default function StudentDashboardLayout({ children, title }) {
    const { auth } = usePage().props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const [open, setOpen] = useState(!isMobile);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsOpen = (event) => {
        setNotificationsAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setNotificationsAnchorEl(null);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, href: route('dashboard'), active: true },
        { text: 'Overview', icon: <AssessmentIcon />, href: route('overview') },
        { text: 'Courses', icon: <MenuBookIcon />, href: route('courses') },
        { text: 'Students', icon: <PeopleIcon />, href: route('students') },
        { text: 'Teachers', icon: <SchoolIcon />, href: route('teachers') },
        { text: 'Exam', icon: <QuizIcon />, href: route('exam') },
        { text: 'Result', icon: <AssessmentIcon />, href: route('result') },
        { text: 'Videos', icon: <VideoLibraryIcon />, href: route('videos') },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarStyled position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}>
                        {title || 'Dashboard'}
                    </Typography>
                    
                    <SearchBox>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </SearchBox>
                    
                    <Box sx={{ flexGrow: 1 }} />
                    
                    <IconButton
                        size="large"
                        aria-label="show new notifications"
                        color="inherit"
                        onClick={handleNotificationsOpen}
                        sx={{ mr: 1 }}
                    >
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {auth.user?.name || 'Jara Khan'}
                            </Typography>
                        </Box>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar 
                                alt={auth.user?.name || 'Jara Khan'} 
                                src="/path/to/avatar.jpg" 
                                sx={{ 
                                    width: 32, 
                                    height: 32,
                                    bgcolor: '#f57c00'
                                }} 
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBarStyled>
            <DrawerStyled variant="permanent" open={open}>
                <DrawerHeader>
                    <LogoContainer sx={{ flexGrow: 1, display: open ? 'flex' : 'none' }}>
                        <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: '#6a11cb',
                            color: 'white',
                            fontWeight: 'bold'
                        }}>
                            E
                        </Box>
                        <Typography className="logo-text">
                            EDUCATION
                        </Typography>
                    </LogoContainer>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => (
                        <NavItem key={item.text} disablePadding className={item.active ? 'active' : ''}>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{ 
                                        opacity: open ? 1 : 0,
                                        '& .MuiTypography-root': {
                                            fontWeight: item.active ? 'bold' : 'normal'
                                        }
                                    }} 
                                />
                            </ListItemButton>
                        </NavItem>
                    ))}
                </List>
                <Box sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    p: 2, 
                    display: open ? 'block' : 'none',
                    textAlign: 'center'
                }}>
                    <Box sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Box component="img" 
                            src="https://cdn-icons-png.flaticon.com/512/2534/2534504.png" 
                            alt="Invite Friend" 
                            sx={{ 
                                width: 80, 
                                height: 80,
                                mb: 1
                            }} 
                        />
                        <Typography variant="body2" fontWeight="bold" gutterBottom>
                            Invite Friend
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="small"
                            sx={{ 
                                borderRadius: 5,
                                backgroundColor: '#6a11cb',
                                '&:hover': {
                                    backgroundColor: '#5a0cb2'
                                },
                                textTransform: 'none',
                                px: 2
                            }}
                        >
                            Get the link
                        </Button>
                    </Box>
                </Box>
            </DrawerStyled>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} href={route('profile.edit')}>
                    <AccountCircleIcon sx={{ mr: 2 }} /> Profile
                </MenuItem>
                <MenuItem component={Link} href={route('logout')} method="post" as="button">
                    <ExitToAppIcon sx={{ mr: 2 }} /> Logout
                </MenuItem>
            </Menu>
            <Menu
                anchorEl={notificationsAnchorEl}
                open={Boolean(notificationsAnchorEl)}
                onClose={handleNotificationsClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        width: 320,
                        maxHeight: 400,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>New Assignment</Typography>
                        <Typography variant="body2" color="text.secondary">Math Assignment due tomorrow</Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Quiz Result</Typography>
                        <Typography variant="body2" color="text.secondary">You scored 85% in Science Quiz</Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>New Material</Typography>
                        <Typography variant="body2" color="text.secondary">New study material for English has been uploaded</Typography>
                    </Box>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
                        View All Notifications
                    </Typography>
                </MenuItem>
            </Menu>
            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
