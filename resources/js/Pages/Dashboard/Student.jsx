import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, Typography, Grid, Box, Button, List, ListItem, ListItemText, Divider, Avatar, Chip, LinearProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function StudentDashboard({ auth }) {
    const [stats, setStats] = useState({
        attendanceRate: 96,
        averageGrade: 82,
        completedAssignments: 18,
        pendingAssignments: 3
    });

    const [subjects, setSubjects] = useState([
        { id: 1, name: 'Mathematics', teacher: 'Mr. Gumbo', grade: 85, progress: 78 },
        { id: 2, name: 'English Language', teacher: 'Mrs. Chikerema', grade: 88, progress: 82 },
        { id: 3, name: 'Biology', teacher: 'Mr. Moyo', grade: 76, progress: 70 },
        { id: 4, name: 'Physics', teacher: 'Mrs. Ndlovu', grade: 82, progress: 75 },
        { id: 5, name: 'Chemistry', teacher: 'Mr. Sibanda', grade: 79, progress: 72 }
    ]);

    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Quadratic Equations', subject: 'Mathematics', dueDate: '2025-03-20', status: 'pending' },
        { id: 2, title: 'Essay on Zimbabwean Literature', subject: 'English Language', dueDate: '2025-03-18', status: 'pending' },
        { id: 3, title: 'Lab Report: Cell Structure', subject: 'Biology', dueDate: '2025-03-25', status: 'pending' }
    ]);

    const [upcomingExams, setUpcomingExams] = useState([
        { id: 1, title: 'Mid-Term Mathematics', date: '2025-04-10', time: '09:00-11:00', venue: 'Main Hall' },
        { id: 2, title: 'English Language Test', date: '2025-04-12', time: '14:00-16:00', venue: 'Room B2' }
    ]);

    const [timetable, setTimetable] = useState([
        { id: 1, day: 'Monday', periods: [
            { time: '08:00-09:00', subject: 'Mathematics', teacher: 'Mr. Gumbo', room: 'A1' },
            { time: '09:00-10:00', subject: 'English', teacher: 'Mrs. Chikerema', room: 'B3' },
            { time: '10:30-11:30', subject: 'Physics', teacher: 'Mrs. Ndlovu', room: 'Lab 2' }
        ]},
        { id: 2, day: 'Tuesday', periods: [
            { time: '08:00-09:00', subject: 'Chemistry', teacher: 'Mr. Sibanda', room: 'Lab 1' },
            { time: '09:00-10:00', subject: 'Biology', teacher: 'Mr. Moyo', room: 'Lab 3' },
            { time: '10:30-11:30', subject: 'Mathematics', teacher: 'Mr. Gumbo', room: 'A1' }
        ]}
    ]);

    const gradeData = [
        { subject: 'Math', grade: 85 },
        { subject: 'English', grade: 88 },
        { subject: 'Biology', grade: 76 },
        { subject: 'Physics', grade: 82 },
        { subject: 'Chemistry', grade: 79 }
    ];

    const attendanceData = [
        { month: 'Jan', attendance: 98 },
        { month: 'Feb', attendance: 95 },
        { month: 'Mar', attendance: 96 },
        { month: 'Apr', attendance: 94 },
        { month: 'May', attendance: 97 },
        { month: 'Jun', attendance: 96 }
    ];

    const assignmentStatusData = [
        { name: 'Completed', value: stats.completedAssignments },
        { name: 'Pending', value: stats.pendingAssignments }
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student Dashboard</h2>}
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Grid container spacing={3}>
                        {/* Summary Cards */}
                        <Grid item xs={12} md={3}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Attendance
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.attendanceRate}%
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e8f5e9' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Avg. Grade
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.averageGrade}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#fff8e1' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Completed
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.completedAssignments}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Assignments
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Pending
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.pendingAssignments}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Assignments
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Charts */}
                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Subject Performance
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={gradeData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="subject" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="grade" fill="#8884d8" name="Grade" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Assignment Status
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={assignmentStatusData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {assignmentStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Subjects */}
                        <Grid item xs={12}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            My Subjects
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View All
                                        </Button>
                                    </Box>
                                    <Grid container spacing={2}>
                                        {subjects.map((subject) => (
                                            <Grid item xs={12} md={6} key={subject.id}>
                                                <Card variant="outlined">
                                                    <CardContent>
                                                        <Typography variant="h6">{subject.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                                            Teacher: {subject.teacher}
                                                        </Typography>
                                                        <Box display="flex" alignItems="center" mt={1}>
                                                            <Typography variant="body2" width="100px">
                                                                Grade: {subject.grade}
                                                            </Typography>
                                                            <Box flex={1} ml={2}>
                                                                <LinearProgress 
                                                                    variant="determinate" 
                                                                    value={subject.grade} 
                                                                    color={subject.grade >= 80 ? "success" : subject.grade >= 70 ? "primary" : "warning"}
                                                                />
                                                            </Box>
                                                        </Box>
                                                        <Box display="flex" alignItems="center" mt={1}>
                                                            <Typography variant="body2" width="100px">
                                                                Progress: {subject.progress}%
                                                            </Typography>
                                                            <Box flex={1} ml={2}>
                                                                <LinearProgress variant="determinate" value={subject.progress} />
                                                            </Box>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Assignments */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            Pending Assignments
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View All
                                        </Button>
                                    </Box>
                                    <List>
                                        {assignments.map((assignment) => (
                                            <React.Fragment key={assignment.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={assignment.title}
                                                        secondary={`${assignment.subject} | Due: ${assignment.dueDate}`}
                                                    />
                                                    <Chip 
                                                        label={assignment.status === 'pending' ? 'Pending' : 'Completed'} 
                                                        color={assignment.status === 'pending' ? 'warning' : 'success'} 
                                                        size="small" 
                                                    />
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Upcoming Exams */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            Upcoming Exams
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View Calendar
                                        </Button>
                                    </Box>
                                    <List>
                                        {upcomingExams.map((exam) => (
                                            <React.Fragment key={exam.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={exam.title}
                                                        secondary={`Date: ${exam.date} | Time: ${exam.time} | Venue: ${exam.venue}`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
