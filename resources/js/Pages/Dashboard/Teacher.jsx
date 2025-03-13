import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Grid, Card, CardContent, Typography, Box, Button, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';

export default function TeacherDashboard({ auth }) {
    const [stats, setStats] = useState({
        totalStudents: 45,
        totalClasses: 3,
        attendanceRate: 94,
        averageGrade: 76
    });

    const [classes, setClasses] = useState([
        { id: 1, name: 'Form 4 Mathematics', students: 15, time: 'Mon, Wed, Fri 08:00-09:00' },
        { id: 2, name: 'Form 5 Mathematics', students: 12, time: 'Mon, Wed, Fri 10:00-11:00' },
        { id: 3, name: 'Form 3 Mathematics', students: 18, time: 'Tue, Thu 08:00-10:00' }
    ]);

    const [assignments, setAssignments] = useState([
        { id: 1, title: 'Quadratic Equations', class: 'Form 4 Mathematics', dueDate: '2025-03-20', submitted: 10, total: 15 },
        { id: 2, title: 'Calculus Basics', class: 'Form 5 Mathematics', dueDate: '2025-03-25', submitted: 8, total: 12 }
    ]);

    const [upcomingLessons, setUpcomingLessons] = useState([
        { id: 1, title: 'Algebraic Expressions', class: 'Form 3 Mathematics', date: '2025-03-15', time: '08:00-10:00' },
        { id: 2, title: 'Quadratic Functions', class: 'Form 4 Mathematics', date: '2025-03-16', time: '08:00-09:00' }
    ]);

    const classPerformanceData = [
        { name: 'Form 3', average: 72, highest: 92, lowest: 55 },
        { name: 'Form 4', average: 76, highest: 95, lowest: 58 },
        { name: 'Form 5', average: 81, highest: 98, lowest: 65 }
    ];

    const attendanceData = [
        { class: 'Form 3', attendance: 92 },
        { class: 'Form 4', attendance: 94 },
        { class: 'Form 5', attendance: 96 }
    ];

    const gradeDistribution = [
        { name: 'A', value: 20 },
        { name: 'B', value: 30 },
        { name: 'C', value: 35 },
        { name: 'D', value: 10 },
        { name: 'F', value: 5 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Teacher Dashboard</h2>}
        >
            <Head title="Teacher Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Students</h3>
                                <p className="text-3xl font-bold">{stats.totalStudents}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Classes</h3>
                                <p className="text-3xl font-bold">{stats.totalClasses}</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Attendance</h3>
                                <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Avg. Grade</h3>
                                <p className="text-3xl font-bold">{stats.averageGrade}</p>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Card elevation={3} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Class Performance
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart
                                                data={classPerformanceData}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis domain={[0, 100]} />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="average" fill="#8884d8" name="Average" />
                                                <Bar dataKey="highest" fill="#82ca9d" name="Highest" />
                                                <Bar dataKey="lowest" fill="#ffc658" name="Lowest" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card elevation={3} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" gutterBottom>
                                            Grade Distribution
                                        </Typography>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={gradeDistribution}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {gradeDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Classes and Assignments Section */}
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card elevation={3} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6" component="div">
                                                My Classes
                                            </Typography>
                                            <Button variant="contained" size="small" color="primary">
                                                View All
                                            </Button>
                                        </Box>
                                        <List>
                                            {classes.map((cls) => (
                                                <React.Fragment key={cls.id}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={cls.name}
                                                            secondary={`Students: ${cls.students} | Schedule: ${cls.time}`}
                                                        />
                                                    </ListItem>
                                                    <Divider />
                                                </React.Fragment>
                                            ))}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Card elevation={3} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6" component="div">
                                                Current Assignments
                                            </Typography>
                                            <Button variant="contained" size="small" color="primary">
                                                Create New
                                            </Button>
                                        </Box>
                                        <List>
                                            {assignments.map((assignment) => (
                                                <React.Fragment key={assignment.id}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={assignment.title}
                                                            secondary={`${assignment.class} | Due: ${assignment.dueDate} | Submitted: ${assignment.submitted}/${assignment.total}`}
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

                        {/* Upcoming Lessons */}
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card elevation={3}>
                                    <CardContent>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                            <Typography variant="h6" component="div">
                                                Upcoming Lessons
                                            </Typography>
                                            <Button variant="contained" size="small" color="primary">
                                                Lesson Planner
                                            </Button>
                                        </Box>
                                        <List>
                                            {upcomingLessons.map((lesson) => (
                                                <React.Fragment key={lesson.id}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={lesson.title}
                                                            secondary={`${lesson.class} | Date: ${lesson.date} | Time: ${lesson.time}`}
                                                        />
                                                        <Chip label="View Plan" color="primary" size="small" onClick={() => {}} />
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
            </div>
        </AuthenticatedLayout>
    );
}
