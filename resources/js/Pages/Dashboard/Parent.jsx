import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, Typography, Grid, Box, Button, List, ListItem, ListItemText, Divider, Avatar, Chip, Tabs, Tab, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function ParentDashboard({ auth }) {
    const [currentTab, setCurrentTab] = useState(0);
    const [children, setChildren] = useState([
        { 
            id: 1, 
            name: 'Tendai Mutasa', 
            grade: 'Form 5', 
            school: 'Harare High School',
            attendance: 96,
            averageGrade: 82,
            subjects: [
                { name: 'Mathematics', grade: 85 },
                { name: 'English Language', grade: 88 },
                { name: 'Biology', grade: 76 },
                { name: 'Physics', grade: 82 },
                { name: 'Chemistry', grade: 79 }
            ],
            assignments: [
                { id: 1, title: 'Quadratic Equations', subject: 'Mathematics', dueDate: '2025-03-20', status: 'pending' },
                { id: 2, title: 'Essay on Zimbabwean Literature', subject: 'English Language', dueDate: '2025-03-18', status: 'pending' }
            ],
            upcomingExams: [
                { id: 1, title: 'Mid-Term Mathematics', date: '2025-04-10', time: '09:00-11:00' },
                { id: 2, title: 'English Language Test', date: '2025-04-12', time: '14:00-16:00' }
            ],
            fees: {
                total: 1500,
                paid: 1200,
                balance: 300,
                dueDate: '2025-03-31'
            }
        },
        { 
            id: 2, 
            name: 'Chipo Dziva', 
            grade: 'Form 3',
            school: 'Harare High School',
            attendance: 94,
            averageGrade: 78,
            subjects: [
                { name: 'Mathematics', grade: 75 },
                { name: 'English Language', grade: 82 },
                { name: 'Biology', grade: 79 },
                { name: 'Geography', grade: 76 },
                { name: 'History', grade: 80 }
            ],
            assignments: [
                { id: 1, title: 'Algebraic Expressions', subject: 'Mathematics', dueDate: '2025-03-22', status: 'pending' },
                { id: 2, title: 'Book Review', subject: 'English Language', dueDate: '2025-03-19', status: 'completed' }
            ],
            upcomingExams: [
                { id: 1, title: 'Mid-Term Geography', date: '2025-04-11', time: '09:00-11:00' },
                { id: 2, title: 'History Test', date: '2025-04-13', time: '14:00-16:00' }
            ],
            fees: {
                total: 1200,
                paid: 1200,
                balance: 0,
                dueDate: '2025-03-31'
            }
        }
    ]);

    const [schoolNotices, setSchoolNotices] = useState([
        { id: 1, title: 'Parent-Teacher Conference', date: '2025-04-05', content: 'All parents are invited to attend the quarterly parent-teacher conference to discuss student progress.' },
        { id: 2, title: 'School Holiday Notice', date: '2025-04-18', content: 'The school will be closed from April 18-25 for the Easter holidays.' }
    ]);

    const [payments, setPayments] = useState([
        { id: 1, child: 'Tendai Mutasa', amount: 500, date: '2025-02-15', type: 'Tuition Fee', status: 'completed' },
        { id: 2, child: 'Tendai Mutasa', amount: 700, date: '2025-01-10', type: 'Tuition Fee', status: 'completed' },
        { id: 3, child: 'Chipo Dziva', amount: 600, date: '2025-02-15', type: 'Tuition Fee', status: 'completed' },
        { id: 4, child: 'Chipo Dziva', amount: 600, date: '2025-01-10', type: 'Tuition Fee', status: 'completed' }
    ]);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const currentChild = children[currentTab];

    const gradeData = currentChild.subjects.map(subject => ({
        subject: subject.name,
        grade: subject.grade
    }));

    const attendanceData = [
        { month: 'Jan', attendance: 98 },
        { month: 'Feb', attendance: 95 },
        { month: 'Mar', attendance: currentChild.attendance },
        { month: 'Apr', attendance: 94 },
        { month: 'May', attendance: 97 },
        { month: 'Jun', attendance: 96 }
    ];

    const feesData = [
        { name: 'Paid', value: currentChild.fees.paid },
        { name: 'Balance', value: currentChild.fees.balance }
    ];

    const COLORS = ['#00C49F', '#FF8042'];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parent Dashboard</h2>}
        >
            <Head title="Parent Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Child Selection Tabs */}
                    <Paper sx={{ mb: 3 }}>
                        <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            {children.map((child) => (
                                <Tab label={child.name} key={child.id} />
                            ))}
                        </Tabs>
                    </Paper>

                    <Grid container spacing={3}>
                        {/* Child Info Card */}
                        <Grid item xs={12}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Avatar sx={{ width: 80, height: 80, bgcolor: '#1976d2' }}>
                                                {currentChild.name.charAt(0)}
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs>
                                            <Typography variant="h5">{currentChild.name}</Typography>
                                            <Typography variant="body1" color="textSecondary">
                                                {currentChild.grade} | {currentChild.school}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary">
                                                Contact School
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Summary Cards */}
                        <Grid item xs={12} md={4}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Attendance
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {currentChild.attendance}%
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e8f5e9' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Avg. Grade
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {currentChild.averageGrade}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#fff8e1' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Fees Balance
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        ${currentChild.fees.balance}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Due: {currentChild.fees.dueDate}
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
                                        Fees Payment Status
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={feesData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {feesData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Assignments */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            Assignments
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View All
                                        </Button>
                                    </Box>
                                    <List>
                                        {currentChild.assignments.map((assignment) => (
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
                                        {currentChild.upcomingExams.map((exam) => (
                                            <React.Fragment key={exam.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={exam.title}
                                                        secondary={`Date: ${exam.date} | Time: ${exam.time}`}
                                                    />
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* School Notices */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            School Notices
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View All
                                        </Button>
                                    </Box>
                                    <List>
                                        {schoolNotices.map((notice) => (
                                            <React.Fragment key={notice.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={notice.title}
                                                        secondary={`Date: ${notice.date}`}
                                                    />
                                                    <Button size="small" color="primary">
                                                        Read More
                                                    </Button>
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Payment History */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            Payment History
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            Make Payment
                                        </Button>
                                    </Box>
                                    <List>
                                        {payments
                                            .filter(payment => payment.child === currentChild.name)
                                            .map((payment) => (
                                                <React.Fragment key={payment.id}>
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={`$${payment.amount} - ${payment.type}`}
                                                            secondary={`Date: ${payment.date}`}
                                                        />
                                                        <Chip 
                                                            label={payment.status === 'pending' ? 'Pending' : 'Completed'} 
                                                            color={payment.status === 'pending' ? 'warning' : 'success'} 
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
                    </Grid>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
