import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import StudentDashboardLayout from '@/Layouts/StudentDashboardLayout';
import {
    Box, Grid, Paper, Typography, Avatar, Chip, Button, Card, CardContent, 
    CardHeader, CardActions, Divider, List, ListItem, ListItemText, 
    ListItemAvatar, ListItemSecondaryAction, IconButton, LinearProgress,
    Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, TextField, MenuItem, Menu, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions, ListItemIcon
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import TableChartIcon from '@mui/icons-material/TableChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import TimerIcon from '@mui/icons-material/Timer';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import SubjectIcon from '@mui/icons-material/Subject';
import CreateIcon from '@mui/icons-material/Create';
import BuildIcon from '@mui/icons-material/Build';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MessageIcon from '@mui/icons-material/Message';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ContactsIcon from '@mui/icons-material/Contacts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

// Styled Components
const StatsCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
}));

const StatsIconBox = styled(Box)(({ theme, bgcolor }) => ({
    width: 60,
    height: 60,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: bgcolor || theme.palette.primary.main,
    color: '#fff',
    marginBottom: theme.spacing(2),
}));

const CourseCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
}));

const CalendarCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
}));

const NoticeCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
}));

const DatabaseCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    },
}));

const CircularProgressWithLabel = (props) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} size={80} thickness={5} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

// Component definitions for cards
const AssignmentCard = ({ open, onClose }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#ff9800', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1 }} />
                    Science Project: Ecosystem Study
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                                <SubjectIcon sx={{ mr: 1 }} />
                                Assignment Details
                            </Typography>
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'rgba(255, 152, 0, 0.05)', 
                                borderRadius: 2,
                                border: '1px solid rgba(255, 152, 0, 0.1)'
                            }}>
                                <Typography variant="body1" paragraph>
                                    Create a detailed report on a specific ecosystem of your choice. The report should include:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Description of the ecosystem's physical characteristics" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Identification of at least 10 species (plants and animals)" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Analysis of food chains and energy flow" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Discussion of human impact on the ecosystem" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Visual aids (diagrams, charts, or photographs)" />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                                <MenuBookIcon sx={{ mr: 1 }} />
                                Resources & References
                            </Typography>
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'background.default',
                                borderRadius: 2,
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LibraryBooksIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Textbook: Environmental Science, Chapter 4-6" 
                                            secondary="Pages 78-112"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <LinkIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="National Geographic Ecosystems Guide" 
                                            secondary={
                                                <Link href="#" underline="hover" sx={{ color: '#ff9800' }}>
                                                    https://www.nationalgeographic.org/encyclopedia/ecosystem/
                                                </Link>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <VideoLibraryIcon sx={{ color: '#ff9800' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Class Lecture: Ecosystem Dynamics" 
                                            secondary="Available in the class materials section"
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Box>
                        
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                                <GradingIcon sx={{ mr: 1 }} />
                                Grading Criteria
                            </Typography>
                            <TableContainer sx={{ 
                                borderRadius: 2,
                                border: '1px solid rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                <Table size="small">
                                    <TableHead sx={{ backgroundColor: 'rgba(255, 152, 0, 0.05)' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Criteria</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Points</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Content</TableCell>
                                            <TableCell>40</TableCell>
                                            <TableCell>Accuracy and depth of ecosystem analysis</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Research</TableCell>
                                            <TableCell>25</TableCell>
                                            <TableCell>Quality and variety of sources</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Visual Aids</TableCell>
                                            <TableCell>15</TableCell>
                                            <TableCell>Relevance and clarity of diagrams/images</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Organization</TableCell>
                                            <TableCell>10</TableCell>
                                            <TableCell>Logical flow and structure</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Presentation</TableCell>
                                            <TableCell>10</TableCell>
                                            <TableCell>Grammar, spelling, and formatting</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Box sx={{ 
                            p: 2, 
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            border: '1px solid rgba(0,0,0,0.05)',
                            mb: 3
                        }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                                <InfoIcon sx={{ mr: 1 }} />
                                Assignment Info
                            </Typography>
                            
                            <List dense disablePadding>
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <SubjectIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Subject" 
                                        secondary="Environmental Science"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <PersonIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Teacher" 
                                        secondary="Dr. Emily Johnson"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CalendarTodayIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Assigned Date" 
                                        secondary="October 5, 2023"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <EventIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Due Date" 
                                        secondary="October 19, 2023"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <AccessTimeIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Time Remaining" 
                                        secondary="7 days"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <GradingIcon fontSize="small" sx={{ color: '#ff9800' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Points" 
                                        secondary="100 points"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                                <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                                Submission Status
                            </Typography>
                            
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'rgba(255, 152, 0, 0.05)',
                                borderRadius: 2,
                                border: '1px solid rgba(255, 152, 0, 0.1)'
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <CircularProgress 
                                        variant="determinate" 
                                        value={30} 
                                        size={60} 
                                        thickness={5}
                                        sx={{ 
                                            color: '#ff9800',
                                            mr: 2
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>30% Complete</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Draft saved on Oct 12, 2023
                                        </Typography>
                                    </Box>
                                </Box>
                                
                                <List dense disablePadding>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <CheckCircleIcon fontSize="small" sx={{ color: 'success.main' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Research completed" 
                                            primaryTypographyProps={{ variant: 'body2' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <CheckCircleIcon fontSize="small" sx={{ color: 'success.main' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Outline created" 
                                            primaryTypographyProps={{ variant: 'body2' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <RadioButtonUncheckedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Draft completion" 
                                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <RadioButtonUncheckedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Visual aids creation" 
                                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <RadioButtonUncheckedIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Final review" 
                                            primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Box>
                    <Button 
                        variant="outlined" 
                        startIcon={<SaveIcon />}
                        sx={{ 
                            borderRadius: 2,
                            mr: 1
                        }}
                    >
                        Save Draft
                    </Button>
                    <Button 
                        variant="contained" 
                        startIcon={<CloudUploadIcon />}
                        sx={{ 
                            borderRadius: 2,
                            backgroundColor: '#ff9800',
                            '&:hover': {
                                backgroundColor: '#f57c00'
                            }
                        }}
                    >
                        Submit Assignment
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

const MaterialCard = ({ open, onClose }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#4caf50', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuBookIcon sx={{ mr: 1 }} />
                    Biology: Cell Structure and Function
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                                <DescriptionIcon sx={{ mr: 1 }} />
                                Material Description
                            </Typography>
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'rgba(76, 175, 80, 0.05)', 
                                borderRadius: 2,
                                border: '1px solid rgba(76, 175, 80, 0.1)'
                            }}>
                                <Typography variant="body1" paragraph>
                                    This comprehensive study material covers the fundamental concepts of cell structure and function, including:
                                </Typography>
                                <List dense>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Cell theory and the history of cell discovery" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Prokaryotic vs. eukaryotic cell structures" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Cell organelles and their functions" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Cell membrane structure and transport mechanisms" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <CheckCircleIcon sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Cell division and reproduction processes" />
                                    </ListItem>
                                </List>
                                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                                    This material is essential for understanding the upcoming unit on cellular processes and will be covered in the midterm examination.
                                </Typography>
                            </Paper>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                                <AttachFileIcon sx={{ mr: 1 }} />
                                Included Files
                            </Typography>
                            <TableContainer sx={{ 
                                borderRadius: 2,
                                border: '1px solid rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                <Table size="small">
                                    <TableHead sx={{ backgroundColor: 'rgba(76, 175, 80, 0.05)' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Filename</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PictureAsPdfIcon sx={{ color: '#f44336', mr: 1, fontSize: 20 }} />
                                                    Cell_Structure_Lecture.pdf
                                                </Box>
                                            </TableCell>
                                            <TableCell>PDF Document</TableCell>
                                            <TableCell>4.2 MB</TableCell>
                                            <TableCell>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <DownloadIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <PictureAsPdfIcon sx={{ color: '#f44336', mr: 1, fontSize: 20 }} />
                                                    Cell_Organelles_Worksheet.pdf
                                                </Box>
                                            </TableCell>
                                            <TableCell>PDF Document</TableCell>
                                            <TableCell>1.8 MB</TableCell>
                                            <TableCell>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <DownloadIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <ImageIcon sx={{ color: '#2196f3', mr: 1, fontSize: 20 }} />
                                                    Cell_Diagram_High_Res.png
                                                </Box>
                                            </TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>3.5 MB</TableCell>
                                            <TableCell>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <DownloadIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <VisibilityIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <VideoLibraryIcon sx={{ color: '#9c27b0', mr: 1, fontSize: 20 }} />
                                                    Cell_Division_Animation.mp4
                                                </Box>
                                            </TableCell>
                                            <TableCell>Video</TableCell>
                                            <TableCell>28.7 MB</TableCell>
                                            <TableCell>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <DownloadIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" sx={{ color: '#4caf50' }}>
                                                    <PlayArrowIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Box sx={{ 
                            p: 2, 
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            border: '1px solid rgba(0,0,0,0.05)',
                            mb: 3
                        }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                                <InfoIcon sx={{ mr: 1 }} />
                                Material Information
                            </Typography>
                            
                            <List dense disablePadding>
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <SubjectIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Subject" 
                                        secondary="Biology"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <PersonIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Teacher" 
                                        secondary="Dr. Michael Chen"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CalendarTodayIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Upload Date" 
                                        secondary="September 15, 2023"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <FolderIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Category" 
                                        secondary="Lecture Materials"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                                <Divider component="li" />
                                <ListItem disableGutters sx={{ py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <AccessTimeIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Duration" 
                                        secondary="Approximately 2 hours"
                                        primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        secondaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                    />
                                </ListItem>
                            </List>
                        </Box>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                                <EventNoteIcon sx={{ mr: 1 }} />
                                Related Activities
                            </Typography>
                            
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'rgba(76, 175, 80, 0.05)',
                                borderRadius: 2,
                                border: '1px solid rgba(76, 175, 80, 0.1)'
                            }}>
                                <List dense disablePadding>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <AssignmentIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Cell Structure Worksheet" 
                                            secondary="Due: Sep 22, 2023"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                                            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <QuizIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Cell Organelles Quiz" 
                                            secondary="Due: Sep 25, 2023"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                                            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                    <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                            <ScienceIcon fontSize="small" sx={{ color: '#4caf50' }} />
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary="Cell Observation Lab" 
                                            secondary="Sep 27, 2023"
                                            primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
                                            secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                        />
                                    </ListItem>
                                </List>
                            </Paper>
                        </Box>
                        
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                                <HelpOutlineIcon sx={{ mr: 1 }} />
                                Study Tips
                            </Typography>
                            
                            <Paper elevation={0} sx={{ 
                                p: 2, 
                                bgcolor: 'background.default',
                                borderRadius: 2,
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}>
                                <Typography variant="body2" paragraph>
                                    <strong>From your teacher:</strong> Focus on understanding the relationship between structure and function for each organelle. Create flashcards to memorize the key components and their roles.
                                </Typography>
                                <Typography variant="body2">
                                    The video animation is particularly helpful for visualizing the cell division process. Watch it multiple times and take notes on each phase.
                                </Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Box>
                    <Button 
                        variant="outlined" 
                        startIcon={<BookmarkIcon />}
                        sx={{ 
                            borderRadius: 2,
                            mr: 1
                        }}
                    >
                        Save for Later
                    </Button>
                    <Button 
                        variant="contained" 
                        startIcon={<DownloadIcon />}
                        sx={{ 
                            borderRadius: 2,
                            backgroundColor: '#4caf50',
                            '&:hover': {
                                backgroundColor: '#43a047'
                            }
                        }}
                    >
                        Download All Files
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

const QuizCard = ({ open, quiz, onClose }) => {
    if (!quiz) return null;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#ff9800', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <QuizIcon sx={{ mr: 1 }} />
                    Quiz Details
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                    {quiz.title}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <SubjectIcon sx={{ mr: 1, color: '#ff9800', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Subject:</strong> {quiz.subject}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EventIcon sx={{ mr: 1, color: '#ff9800', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Due Date:</strong> {quiz.dueDate}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <TimerIcon sx={{ mr: 1, color: '#ff9800', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Duration:</strong> {quiz.duration || '30 minutes'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Chip 
                                label={quiz.status || 'Not Started'} 
                                color={
                                    (quiz.status === 'Completed' || quiz.status === 'completed') ? 'success' : 
                                    (quiz.status === 'In Progress' || quiz.status === 'in progress') ? 'warning' : 'error'
                                } 
                                size="small" 
                                sx={{ mr: 1 }}
                            />
                            <Typography variant="subtitle1">
                                <strong>Status</strong>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                
                {quiz.score && (
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexDirection: 'column',
                        mb: 3,
                        p: 2,
                        backgroundColor: 'rgba(255, 152, 0, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 152, 0, 0.1)'
                    }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                            Your Score
                        </Typography>
                        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                            <CircularProgress 
                                variant="determinate" 
                                value={quiz.score} 
                                size={100} 
                                thickness={5} 
                                sx={{ color: '#ff9800' }}
                            />
                            <Box
                                sx={{
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    position: 'absolute',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                                    {quiz.score}%
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="subtitle1">
                            {quiz.score >= 80 ? 'Excellent work!' : 
                             quiz.score >= 60 ? 'Good job!' : 
                             quiz.score >= 40 ? 'Keep practicing!' : 'More study needed!'}
                        </Typography>
                    </Box>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center' }}>
                    <HelpIcon sx={{ mr: 1 }} />
                    Instructions
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(0,0,0,0.02)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    {quiz.instructions || "This quiz will test your knowledge of the subject material. Read each question carefully and select the best answer. You will have a limited time to complete the quiz, so manage your time wisely."}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff9800', display: 'flex', alignItems: 'center', mt: 3 }}>
                    <SubjectIcon sx={{ mr: 1 }} />
                    Quiz Format
                </Typography>
                <List sx={{ 
                    backgroundColor: 'rgba(0,0,0,0.02)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <ListItem>
                        <ListItemIcon>
                            <Chip 
                                label={quiz.questionCount || '10'} 
                                size="small" 
                                sx={{ 
                                    bgcolor: '#ff9800', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    minWidth: 30
                                }} 
                            />
                        </ListItemIcon>
                        <ListItemText primary="Multiple Choice Questions" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Chip 
                                label={quiz.essayCount || '2'} 
                                size="small" 
                                sx={{ 
                                    bgcolor: '#ff9800', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    minWidth: 30
                                }} 
                            />
                        </ListItemIcon>
                        <ListItemText primary="Short Answer Questions" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Chip 
                                label={quiz.totalPoints || '100'} 
                                size="small" 
                                sx={{ 
                                    bgcolor: '#ff9800', 
                                    color: 'white',
                                    fontWeight: 'bold',
                                    minWidth: 30
                                }} 
                            />
                        </ListItemIcon>
                        <ListItemText primary="Total Points" />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={quiz.status === 'Completed' || quiz.status === 'completed' ? <VisibilityIcon /> : <PlayArrowIcon />}
                    sx={{ 
                        borderRadius: 2,
                        backgroundColor: '#ff9800',
                        '&:hover': {
                            backgroundColor: '#e68900'
                        }
                    }}
                >
                    {quiz.status === 'Completed' || quiz.status === 'completed' ? 'View Results' : 'Start Quiz'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ResultCard = ({ open, result, onClose }) => {
    if (!result) return null;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#4caf50', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssessmentIcon sx={{ mr: 1 }} />
                    Result Details
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                    {result.title}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <SubjectIcon sx={{ mr: 1, color: '#4caf50', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Subject:</strong> {result.subject}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EventIcon sx={{ mr: 1, color: '#4caf50', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Date:</strong> {result.date}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PersonIcon sx={{ mr: 1, color: '#4caf50', fontSize: 20 }} />
                            <Typography variant="subtitle1">
                                <strong>Graded By:</strong> {result.gradedBy || 'Prof. Linda Davis'}
                            </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Chip 
                                label={result.grade || 'A'} 
                                color={
                                    (result.grade === 'A' || result.grade === 'B') ? 'success' : 
                                    (result.grade === 'C') ? 'warning' : 'error'
                                } 
                                size="small" 
                                sx={{ 
                                    mr: 1,
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    height: 28,
                                    width: 28
                                }}
                            />
                            <Typography variant="subtitle1">
                                <strong>Grade</strong>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexDirection: 'column',
                    mb: 3,
                    p: 2,
                    backgroundColor: 'rgba(76, 175, 80, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(76, 175, 80, 0.1)'
                }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                        Your Score
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                        <CircularProgress 
                            variant="determinate" 
                            value={result.score} 
                            size={100} 
                            thickness={5} 
                            sx={{ color: '#4caf50' }}
                        />
                        <Box
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                                {result.score}%
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="subtitle1">
                        {result.score >= 90 ? 'Outstanding performance!' : 
                         result.score >= 80 ? 'Excellent work!' : 
                         result.score >= 70 ? 'Good job!' : 
                         result.score >= 60 ? 'Satisfactory result!' : 'Needs improvement'}
                    </Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                    <AssessmentIcon sx={{ mr: 1 }} />
                    Performance Breakdown
                </Typography>
                
                <TableContainer sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    overflow: 'hidden'
                }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: 'rgba(76, 175, 80, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Score</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Out of</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Percentage</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Multiple Choice</TableCell>
                                <TableCell>{result.multipleChoiceScore || 18}</TableCell>
                                <TableCell>{result.multipleChoiceTotal || 20}</TableCell>
                                <TableCell>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={(result.multipleChoiceScore || 18) / (result.multipleChoiceTotal || 20) * 100} 
                                        sx={{ 
                                            height: 8, 
                                            borderRadius: 4,
                                            width: 100,
                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#4caf50'
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Short Answer</TableCell>
                                <TableCell>{result.shortAnswerScore || 25}</TableCell>
                                <TableCell>{result.shortAnswerTotal || 30}</TableCell>
                                <TableCell>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={(result.shortAnswerScore || 25) / (result.shortAnswerTotal || 30) * 100} 
                                        sx={{ 
                                            height: 8, 
                                            borderRadius: 4,
                                            width: 100,
                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#4caf50'
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Essay</TableCell>
                                <TableCell>{result.essayScore || 42}</TableCell>
                                <TableCell>{result.essayTotal || 50}</TableCell>
                                <TableCell>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={(result.essayScore || 42) / (result.essayTotal || 50) * 100} 
                                        sx={{ 
                                            height: 8, 
                                            borderRadius: 4,
                                            width: 100,
                                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#4caf50'
                                            }
                                        }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                    <MessageIcon sx={{ mr: 1 }} />
                    Teacher's Feedback
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(0,0,0,0.02)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    fontStyle: 'italic'
                }}>
                    {result.feedback || "Good work overall. Your understanding of the core concepts is solid, but there's room for improvement in the application of these concepts to real-world scenarios. Keep practicing and reviewing the material."}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={<VisibilityIcon />}
                    sx={{ 
                        borderRadius: 2,
                        backgroundColor: '#4caf50',
                        '&:hover': {
                            backgroundColor: '#3d8b40'
                        }
                    }}
                >
                    View Full Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ScheduleCard = ({ open, schedule, onClose }) => {
    if (!schedule) return null;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#9c27b0', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventNoteIcon sx={{ mr: 1 }} />
                    Schedule Details
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                        bgcolor: '#9c27b0', 
                        mr: 2, 
                        width: 56, 
                        height: 56,
                        boxShadow: '0 4px 12px rgba(156, 39, 176, 0.2)'
                    }}>
                        <SubjectIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', m: 0 }}>
                            {schedule.subject}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {schedule.day} • {schedule.time} • Room {schedule.room || '101'}
                        </Typography>
                    </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                            Teacher
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'rgba(156, 39, 176, 0.1)' }}>
                                <PersonIcon sx={{ fontSize: 18, color: '#9c27b0' }} />
                            </Avatar>
                            <Typography variant="body1">
                                {schedule.teacher || 'Prof. Linda Davis'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                            Duration
                        </Typography>
                        <Typography variant="body1" sx={{ ml: 4 }}>
                            {schedule.duration || '60 minutes'}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', display: 'flex', alignItems: 'center' }}>
                        <MenuBookIcon sx={{ mr: 1, fontSize: 20 }} />
                        Today's Topic
                    </Typography>
                    <Paper elevation={0} sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(156, 39, 176, 0.05)', 
                        borderRadius: 2,
                        border: '1px solid rgba(156, 39, 176, 0.1)'
                    }}>
                        <Typography variant="body1">
                            {schedule.topic || "Introduction to Advanced Concepts"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {schedule.description || "We will cover the fundamental principles and explore practical applications through interactive exercises and discussions."}
                        </Typography>
                    </Paper>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', display: 'flex', alignItems: 'center' }}>
                        <AssignmentIcon sx={{ mr: 1, fontSize: 20 }} />
                        Required Materials
                    </Typography>
                    <List sx={{ 
                        backgroundColor: 'rgba(0,0,0,0.02)', 
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <MenuBookIcon sx={{ color: '#9c27b0' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Textbook" 
                                secondary="Chapter 5, pages 120-135"
                            />
                        </ListItem>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <DescriptionIcon sx={{ color: '#9c27b0' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Worksheet" 
                                secondary="Problem Set #3"
                            />
                        </ListItem>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(156, 39, 176, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <LaptopIcon sx={{ color: '#9c27b0' }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Laptop" 
                                secondary="For in-class exercises"
                            />
                        </ListItem>
                    </List>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#9c27b0', display: 'flex', alignItems: 'center' }}>
                        <NotesIcon sx={{ mr: 1, fontSize: 20 }} />
                        Additional Notes
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(0,0,0,0.02)', 
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)',
                        fontStyle: 'italic'
                    }}>
                        {schedule.notes || "Please review your notes from the previous class. We will be building on those concepts. Don't forget to bring your completed homework assignment."}
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={<EventIcon />}
                    sx={{ 
                        borderRadius: 2,
                        backgroundColor: '#9c27b0',
                        '&:hover': {
                            backgroundColor: '#7b1fa2'
                        }
                    }}
                >
                    Add to Calendar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ClassCard = ({ open, classData, onClose }) => {
    if (!classData) return null;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#3f51b5', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SchoolIcon sx={{ mr: 1 }} />
                    Class Details
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                        bgcolor: '#3f51b5', 
                        mr: 2, 
                        width: 56, 
                        height: 56,
                        boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)'
                    }}>
                        <SchoolIcon />
                    </Avatar>
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', m: 0 }}>
                            {classData.name || 'Mathematics 101'}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            {classData.code || 'MATH101'} • {classData.section || 'Section A'} • Grade {classData.grade || '10'}
                        </Typography>
                    </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                            Teacher
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 4 }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'rgba(63, 81, 181, 0.1)' }}>
                                <PersonIcon sx={{ fontSize: 18, color: '#3f51b5' }} />
                            </Avatar>
                            <Typography variant="body1">
                                {classData.teacher || 'Prof. Linda Davis'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                            Schedule
                        </Typography>
                        <Typography variant="body1" sx={{ ml: 4 }}>
                            {classData.schedule || 'Mon, Wed, Fri 10:00 AM'}
                        </Typography>
                    </Grid>
                </Grid>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon sx={{ mr: 1, fontSize: 20 }} />
                        Description
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ 
                        p: 2, 
                        backgroundColor: 'rgba(0,0,0,0.02)', 
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        {classData.description || "This course introduces students to the fundamental principles of mathematics, focusing on algebraic concepts, geometric principles, and basic calculus. Students will develop problem-solving skills and critical thinking abilities through practical exercises and collaborative projects."}
                    </Typography>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center' }}>
                        <MenuBookIcon sx={{ mr: 1, fontSize: 20 }} />
                        Current Topics
                    </Typography>
                    <List sx={{ 
                        backgroundColor: 'rgba(0,0,0,0.02)', 
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <Chip 
                                    label="1" 
                                    size="small" 
                                    sx={{ 
                                        bgcolor: '#3f51b5', 
                                        color: 'white',
                                        fontWeight: 'bold',
                                        minWidth: 24
                                    }} 
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Algebraic Expressions" 
                                secondary="Simplifying and evaluating expressions"
                            />
                        </ListItem>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <Chip 
                                    label="2" 
                                    size="small" 
                                    sx={{ 
                                        bgcolor: '#3f51b5', 
                                        color: 'white',
                                        fontWeight: 'bold',
                                        minWidth: 24
                                    }} 
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Linear Equations" 
                                secondary="Solving and graphing linear equations"
                            />
                        </ListItem>
                        <ListItem sx={{ 
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'rgba(63, 81, 181, 0.08)' }
                        }}>
                            <ListItemIcon>
                                <Chip 
                                    label="3" 
                                    size="small" 
                                    sx={{ 
                                        bgcolor: '#3f51b5', 
                                        color: 'white',
                                        fontWeight: 'bold',
                                        minWidth: 24
                                    }} 
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primary="Quadratic Functions" 
                                secondary="Understanding and analyzing quadratic functions"
                            />
                        </ListItem>
                    </List>
                </Box>
                
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', display: 'flex', alignItems: 'center' }}>
                        <AssessmentIcon sx={{ mr: 1, fontSize: 20 }} />
                        Upcoming Assessments
                    </Typography>
                    <TableContainer sx={{ 
                        borderRadius: 2,
                        border: '1px solid rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                    }}>
                        <Table size="small">
                            <TableHead sx={{ backgroundColor: 'rgba(63, 81, 181, 0.05)' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Topic</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Quiz</TableCell>
                                    <TableCell>Linear Equations</TableCell>
                                    <TableCell>May 15, 2023</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell>Problem Set #4</TableCell>
                                    <TableCell>May 20, 2023</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Midterm Exam</TableCell>
                                    <TableCell>All Topics</TableCell>
                                    <TableCell>June 1, 2023</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={<MenuBookIcon />}
                    sx={{ 
                        borderRadius: 2,
                        backgroundColor: '#3f51b5',
                        '&:hover': {
                            backgroundColor: '#303f9f'
                        }
                    }}
                >
                    View Course Materials
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const ParentInfo = ({ open, onClose }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ 
                backgroundColor: '#00bcd4', 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 2
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FamilyRestroomIcon sx={{ mr: 1 }} />
                    Parent Information
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                <Box sx={{ 
                    p: 2, 
                    mb: 3, 
                    backgroundColor: 'rgba(0, 188, 212, 0.05)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0, 188, 212, 0.1)'
                }}>
                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#00bcd4', display: 'flex', alignItems: 'center' }}>
                        <InfoIcon sx={{ mr: 1, fontSize: 20 }} />
                        Important Note
                    </Typography>
                    <Typography variant="body2">
                        This information is provided for emergency contact purposes. Please ensure all details are up to date.
                    </Typography>
                </Box>
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00bcd4', display: 'flex', alignItems: 'center' }}>
                    <ContactsIcon sx={{ mr: 1 }} />
                    Contact Information
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ 
                            p: 2, 
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#00bcd4' }}>Father</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ 
                                    mr: 2, 
                                    bgcolor: 'rgba(0, 188, 212, 0.1)',
                                    color: '#00bcd4'
                                }}>JD</Avatar>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>John Doe</Typography>
                            </Box>
                            
                            <List dense disablePadding>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <PhoneIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="+1 (555) 123-4567" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <EmailIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="john.doe@example.com" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <WorkIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Software Engineer" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={0} sx={{ 
                            p: 2, 
                            bgcolor: 'background.default',
                            borderRadius: 2,
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#00bcd4' }}>Mother</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ 
                                    mr: 2, 
                                    bgcolor: 'rgba(0, 188, 212, 0.1)',
                                    color: '#00bcd4'
                                }}>JD</Avatar>
                                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>Jane Doe</Typography>
                            </Box>
                            
                            <List dense disablePadding>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <PhoneIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="+1 (555) 987-6543" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <EmailIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="jane.doe@example.com" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem disableGutters sx={{ px: 0, py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <WorkIcon fontSize="small" sx={{ color: '#00bcd4' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Marketing Director" 
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
                
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#00bcd4', display: 'flex', alignItems: 'center' }}>
                    <VerifiedUserIcon sx={{ mr: 1 }} />
                    Permissions & Access
                </Typography>
                
                <TableContainer sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    overflow: 'hidden'
                }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: 'rgba(0, 188, 212, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Permission Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Father</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Mother</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>View Grades</TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Attendance Notifications</TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Emergency Contact</TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Primary" 
                                        size="small"
                                        color="primary"
                                        sx={{ fontSize: '0.75rem', bgcolor: '#00bcd4' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Secondary" 
                                        size="small"
                                        color="secondary"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Field Trip Permission</TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label="Allowed" 
                                        size="small"
                                        color="success"
                                        sx={{ fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Box sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(0,0,0,0.02)', 
                    borderRadius: 2,
                    border: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    alignItems: 'flex-start'
                }}>
                    <InfoIcon sx={{ color: '#00bcd4', mr: 1, mt: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                        To update parent information or modify permissions, please contact the school administration office. Changes to emergency contacts require verification.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
                <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
                    Close
                </Button>
                <Button 
                    variant="contained" 
                    startIcon={<EditIcon />}
                    sx={{ 
                        borderRadius: 2,
                        backgroundColor: '#00bcd4',
                        '&:hover': {
                            backgroundColor: '#00a5bb'
                        }
                    }}
                >
                    Request Information Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default function Student({ auth }) {
    const [stats, setStats] = useState({
        totalStudents: 1220,
        totalTeachers: 120,
        totalCourses: 15,
        facultyRooms: 100
    });

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', progress: 75, color: '#6a11cb', icon: <SchoolIcon /> },
        { id: 2, name: 'Science', progress: 60, color: '#2575fc', icon: <MenuBookIcon /> },
        { id: 3, name: 'English', progress: 85, color: '#ff9800', icon: <SubjectIcon /> },
        { id: 4, name: 'History', progress: 45, color: '#4caf50', icon: <EventNoteIcon /> }
    ]);

    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Math Assignment', subject: 'Mathematics', dueDate: '2023-06-15', status: 'Pending' },
        { id: 2, title: 'Science Project', subject: 'Science', dueDate: '2023-06-20', status: 'Completed' },
        { id: 3, title: 'English Essay', subject: 'English', dueDate: '2023-06-18', status: 'In Progress' }
    ]);

    const [upcomingExams, setUpcomingExams] = useState([
        { id: 1, title: 'Math Mid-term', subject: 'Mathematics', date: '2023-06-25', time: '10:00 AM' },
        { id: 2, title: 'Science Quiz', subject: 'Science', date: '2023-06-22', time: '02:00 PM' }
    ]);

    const [materials, setMaterials] = useState([
        { id: 1, title: 'Algebra Basics', subject: 'Mathematics', type: 'PDF', uploadDate: '2023-06-10' },
        { id: 2, title: 'Cell Structure', subject: 'Science', type: 'Video', uploadDate: '2023-06-12' }
    ]);

    const [activeTab, setActiveTab] = useState(0);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [parentInfoOpen, setParentInfoOpen] = useState(false);

    const chartData = [
        { name: 'Jan', Mathematics: 65, Science: 75, English: 85 },
        { name: 'Feb', Mathematics: 70, Science: 60, English: 80 },
        { name: 'Mar', Mathematics: 80, Science: 70, English: 75 },
        { name: 'Apr', Mathematics: 75, Science: 80, English: 90 },
        { name: 'May', Mathematics: 85, Science: 85, English: 95 },
        { name: 'Jun', Mathematics: 90, Science: 75, English: 85 }
    ];

    const birthdays = [
        { id: 1, name: 'John Smith', role: 'Student', date: 'June 15', avatar: 'https://mui.com/static/images/avatar/1.jpg' },
        { id: 2, name: 'Sarah Johnson', role: 'Teacher', date: 'June 18', avatar: 'https://mui.com/static/images/avatar/2.jpg' },
        { id: 3, name: 'Michael Brown', role: 'Student', date: 'June 22', avatar: 'https://mui.com/static/images/avatar/3.jpg' }
    ];

    const notices = [
        { id: 1, title: 'School Closed for Holiday', date: 'June 20, 2023', content: 'The school will be closed on June 20th for the summer solstice holiday.' },
        { id: 2, title: 'Parent-Teacher Meeting', date: 'June 25, 2023', content: 'Parent-teacher meetings will be held on June 25th from 2 PM to 5 PM.' },
        { id: 3, title: 'Annual Sports Day', date: 'July 5, 2023', content: 'The annual sports day will be held on July 5th. All students are required to participate.' }
    ];

    const students = [
        { id: 1, name: 'Emma Wilson', grade: '10th', section: 'A', attendance: '95%', avatar: 'https://mui.com/static/images/avatar/4.jpg' },
        { id: 2, name: 'James Harris', grade: '10th', section: 'B', attendance: '92%', avatar: 'https://mui.com/static/images/avatar/5.jpg' },
        { id: 3, name: 'Olivia Martinez', grade: '10th', section: 'A', attendance: '98%', avatar: 'https://mui.com/static/images/avatar/6.jpg' },
        { id: 4, name: 'William Johnson', grade: '10th', section: 'C', attendance: '90%', avatar: 'https://mui.com/static/images/avatar/7.jpg' }
    ];

    const teachers = [
        { id: 1, name: 'Dr. Robert Clark', subject: 'Mathematics', experience: '10 years', avatar: 'https://mui.com/static/images/avatar/8.jpg' },
        { id: 2, name: 'Prof. Linda Davis', subject: 'Science', experience: '15 years', avatar: 'https://mui.com/static/images/avatar/9.jpg' },
        { id: 3, name: 'Mrs. Patricia White', subject: 'English', experience: '8 years', avatar: 'https://mui.com/static/images/avatar/10.jpg' }
    ];

    const staff = [
        { id: 1, name: 'Mr. Thomas Brown', role: 'Principal', experience: '20 years', avatar: 'https://mui.com/static/images/avatar/11.jpg' },
        { id: 2, name: 'Mrs. Jennifer Lee', role: 'Administrator', experience: '12 years', avatar: 'https://mui.com/static/images/avatar/12.jpg' },
        { id: 3, name: 'Mr. David Wilson', role: 'Librarian', experience: '7 years', avatar: 'https://mui.com/static/images/avatar/13.jpg' }
    ];

    const [databaseTab, setDatabaseTab] = useState(0);
    const [month, setMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
    const [year, setYear] = useState(new Date().getFullYear());

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleDatabaseTabChange = (event, newValue) => {
        setDatabaseTab(newValue);
    };

    return (
        <StudentDashboardLayout title="Student Dashboard">
            <Head title="Student Dashboard" />
            
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Student Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Welcome back! Here's what's happening with your courses today.
                </Typography>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsIconBox bgcolor="#6a11cb">
                            <PeopleIcon sx={{ fontSize: 30 }} />
                        </StatsIconBox>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            {stats.totalStudents}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Students
                        </Typography>
                    </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsIconBox bgcolor="#2575fc">
                            <SchoolIcon sx={{ fontSize: 30 }} />
                        </StatsIconBox>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            {stats.totalTeachers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Teachers
                        </Typography>
                    </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsIconBox bgcolor="#ff9800">
                            <MenuBookIcon sx={{ fontSize: 30 }} />
                        </StatsIconBox>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            {stats.totalCourses}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Courses
                        </Typography>
                    </StatsCard>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatsCard>
                        <StatsIconBox bgcolor="#4caf50">
                            <HomeIcon sx={{ fontSize: 30 }} />
                        </StatsIconBox>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            {stats.facultyRooms}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Faculty Rooms
                        </Typography>
                    </StatsCard>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={8}>
                    {/* Statistics Chart */}
                    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Statistics
                            </Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip 
                                            contentStyle={{ 
                                                borderRadius: 8, 
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                                border: 'none'
                                            }} 
                                        />
                                        <Legend />
                                        <Bar dataKey="Mathematics" fill="#6a11cb" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Science" fill="#2575fc" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="English" fill="#ff9800" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Course Activities */}
                    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Course Activities
                            </Typography>
                            <Grid container spacing={3}>
                                {subjects.map((subject) => (
                                    <Grid item xs={12} sm={6} md={3} key={subject.id}>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            alignItems: 'center', 
                                            p: 2,
                                            borderRadius: 2,
                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.04)',
                                                transform: 'scale(1.05)'
                                            }
                                        }}>
                                            <Avatar sx={{ 
                                                bgcolor: subject.color, 
                                                mb: 1,
                                                width: 40,
                                                height: 40
                                            }}>
                                                {subject.icon}
                                            </Avatar>
                                            <CircularProgressWithLabel value={subject.progress} sx={{ color: subject.color }} />
                                            <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium' }}>
                                                {subject.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Database */}
                    <DatabaseCard>
                        <CardContent>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                                <Tabs 
                                    value={databaseTab} 
                                    onChange={handleDatabaseTabChange} 
                                    aria-label="database tabs"
                                    sx={{
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#6a11cb',
                                            height: 3,
                                            borderRadius: '3px 3px 0 0'
                                        },
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontWeight: 'medium',
                                            fontSize: '1rem',
                                            '&.Mui-selected': {
                                                color: '#6a11cb',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    }}
                                >
                                    <Tab label="Teachers" />
                                    <Tab label="Students" />
                                    <Tab label="Staff" />
                                </Tabs>
                            </Box>
                            <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                {databaseTab === 0 && (
                                    <Table>
                                        <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                            <TableRow>
                                                <TableCell>Teacher</TableCell>
                                                <TableCell>Subject</TableCell>
                                                <TableCell>Experience</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {teachers.map((teacher) => (
                                                <TableRow 
                                                    key={teacher.id}
                                                    sx={{ 
                                                        '&:hover': { 
                                                            backgroundColor: 'rgba(0,0,0,0.04)' 
                                                        },
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src={teacher.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                                                            {teacher.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{teacher.subject}</TableCell>
                                                    <TableCell>{teacher.experience}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                                {databaseTab === 1 && (
                                    <Table>
                                        <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                            <TableRow>
                                                <TableCell>Student</TableCell>
                                                <TableCell>Grade</TableCell>
                                                <TableCell>Section</TableCell>
                                                <TableCell>Attendance</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students.map((student) => (
                                                <TableRow 
                                                    key={student.id}
                                                    sx={{ 
                                                        '&:hover': { 
                                                            backgroundColor: 'rgba(0,0,0,0.04)' 
                                                        },
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src={student.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                                                            {student.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{student.grade}</TableCell>
                                                    <TableCell>{student.section}</TableCell>
                                                    <TableCell>{student.attendance}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                                {databaseTab === 2 && (
                                    <Table>
                                        <TableHead sx={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                                            <TableRow>
                                                <TableCell>Staff</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Experience</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {staff.map((staffMember) => (
                                                <TableRow 
                                                    key={staffMember.id}
                                                    sx={{ 
                                                        '&:hover': { 
                                                            backgroundColor: 'rgba(0,0,0,0.04)' 
                                                        },
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Avatar src={staffMember.avatar} sx={{ mr: 2, width: 32, height: 32 }} />
                                                            {staffMember.name}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{staffMember.role}</TableCell>
                                                    <TableCell>{staffMember.experience}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </TableContainer>
                        </CardContent>
                    </DatabaseCard>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={4}>
                    {/* Calendar */}
                    <CalendarCard sx={{ mb: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Calendar
                                </Typography>
                                <Box>
                                    <IconButton size="small" sx={{ color: '#6a11cb' }}>
                                        <ChevronLeftIcon />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: '#6a11cb' }}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold', color: '#6a11cb' }}>
                                {month} {year}
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <EventIcon sx={{ mr: 1, color: '#6a11cb' }} />
                                Upcoming Birthdays
                            </Typography>
                            <List>
                                {birthdays.map((birthday) => (
                                    <ListItem 
                                        key={birthday.id} 
                                        sx={{ 
                                            px: 0, 
                                            borderRadius: 2,
                                            mb: 1,
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.02)',
                                                transform: 'translateX(5px)'
                                            }
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={birthday.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={birthday.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography component="span" variant="body2" color="text.primary">
                                                        {birthday.role}
                                                    </Typography>
                                                    {` — ${birthday.date}`}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </CalendarCard>

                    {/* Notice Board */}
                    <NoticeCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                                <EventNoteIcon sx={{ mr: 1, color: '#6a11cb' }} />
                                Notice Board
                            </Typography>
                            {notices.map((notice) => (
                                <Box 
                                    key={notice.id} 
                                    sx={{ 
                                        mb: 2, 
                                        pb: 2, 
                                        borderBottom: '1px solid #eee',
                                        transition: 'all 0.2s ease',
                                        p: 1,
                                        borderRadius: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.02)',
                                            transform: 'scale(1.02)'
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                                        {notice.title}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        color="text.secondary" 
                                        sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            mb: 1 
                                        }}
                                    >
                                        <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5 }} />
                                        {notice.date}
                                    </Typography>
                                    <Typography variant="body2">
                                        {notice.content}
                                    </Typography>
                                </Box>
                            ))}
                            <Button 
                                variant="outlined" 
                                fullWidth 
                                sx={{ 
                                    mt: 1, 
                                    borderRadius: 2,
                                    borderColor: '#6a11cb',
                                    color: '#6a11cb',
                                    '&:hover': {
                                        borderColor: '#5a0cb2',
                                        backgroundColor: 'rgba(106, 17, 203, 0.04)'
                                    }
                                }}
                            >
                                View All Notices
                            </Button>
                        </CardContent>
                    </NoticeCard>
                </Grid>
            </Grid>

            {/* Assignment Dialog */}
            <AssignmentCard 
                open={Boolean(selectedAssignment)} 
                assignment={selectedAssignment} 
                onClose={() => setSelectedAssignment(null)} 
            />

            {/* Material Dialog */}
            <MaterialCard 
                open={Boolean(selectedMaterial)} 
                material={selectedMaterial} 
                onClose={() => setSelectedMaterial(null)} 
            />

            {/* Quiz Dialog */}
            <QuizCard 
                open={Boolean(selectedQuiz)} 
                quiz={selectedQuiz} 
                onClose={() => setSelectedQuiz(null)} 
            />

            {/* Result Dialog */}
            <ResultCard 
                open={Boolean(selectedResult)} 
                result={selectedResult} 
                onClose={() => setSelectedResult(null)} 
            />

            {/* Schedule Dialog */}
            <ScheduleCard 
                open={Boolean(selectedSchedule)} 
                schedule={selectedSchedule} 
                onClose={() => setSelectedSchedule(null)} 
            />

            {/* Class Dialog */}
            <ClassCard 
                open={Boolean(selectedClass)} 
                classData={selectedClass} 
                onClose={() => setSelectedClass(null)} 
            />

            {/* Parent Info Dialog */}
            <ParentInfo 
                open={parentInfoOpen} 
                onClose={() => setParentInfoOpen(false)} 
            />
        </StudentDashboardLayout>
    );
}
