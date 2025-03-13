import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, Typography, Grid, Box, Button, List, ListItem, ListItemText, Divider, Avatar, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function GovernmentOfficialDashboard({ auth }) {
  


    const schoolTypeData = [
        { name: 'Primary', value: 2 },
        { name: 'Secondary', value: 2 },
        { name: 'Combined', value: 1 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const subjectPerformanceData = [
        { subject: 'Mathematics', national: 72, urban: 76, rural: 68 },
        { subject: 'English', national: 78, urban: 82, rural: 74 },
        { subject: 'Science', national: 74, urban: 78, rural: 70 },
        { subject: 'Geography', national: 76, urban: 79, rural: 73 },
        { subject: 'History', national: 80, urban: 83, rural: 77 }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Government Official Dashboard</h2>}
        >
            <Head title="Government Official Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Grid container spacing={3}>
                        {/* Summary Cards */}
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e3f2fd' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Schools
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.totalSchools}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e8f5e9' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Teachers
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.totalTeachers}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#fff8e1' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Students
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.totalStudents}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#f3e5f5' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Districts
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.totalDistricts}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#ffebee' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Avg. Grade
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.nationalAvgGrade}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Card elevation={3} sx={{ height: '100%', bgcolor: '#e0f7fa' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Attendance
                                    </Typography>
                                    <Typography variant="h3" component="div">
                                        {stats.nationalAttendance}%
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Charts */}
                        <Grid item xs={12} md={8}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        Subject Performance by Location
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={subjectPerformanceData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="subject" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="national" fill="#8884d8" name="National Average" />
                                            <Bar dataKey="urban" fill="#82ca9d" name="Urban Schools" />
                                            <Bar dataKey="rural" fill="#ffc658" name="Rural Schools" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        School Types Distribution
                                    </Typography>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={schoolTypeData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {schoolTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* District Performance Table */}
                        <Grid item xs={12}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            District Performance
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            Generate Report
                                        </Button>
                                    </Box>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><strong>District</strong></TableCell>
                                                    <TableCell align="right"><strong>Schools</strong></TableCell>
                                                    <TableCell align="right"><strong>Students</strong></TableCell>
                                                    <TableCell align="right"><strong>Avg. Grade</strong></TableCell>
                                                    <TableCell align="right"><strong>Attendance</strong></TableCell>
                                                    <TableCell align="right"><strong>Actions</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {districtPerformance.map((district) => (
                                                    <TableRow key={district.id}>
                                                        <TableCell component="th" scope="row">
                                                            {district.name}
                                                        </TableCell>
                                                        <TableCell align="right">{district.schools}</TableCell>
                                                        <TableCell align="right">{district.students}</TableCell>
                                                        <TableCell align="right">
                                                            {district.avgGrade}
                                                            <Chip 
                                                                size="small" 
                                                                label={district.avgGrade > stats.nationalAvgGrade ? "Above Avg" : "Below Avg"} 
                                                                color={district.avgGrade > stats.nationalAvgGrade ? "success" : "warning"}
                                                                sx={{ ml: 1 }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {district.attendance}%
                                                            <Chip 
                                                                size="small" 
                                                                label={district.attendance > stats.nationalAttendance ? "Above Avg" : "Below Avg"} 
                                                                color={district.attendance > stats.nationalAttendance ? "success" : "warning"}
                                                                sx={{ ml: 1 }}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Button size="small" color="primary">
                                                                View Details
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Reports and Events */}
                        <Grid item xs={12} md={6}>
                            <Card elevation={3} sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                        <Typography variant="h6" component="div">
                                            National Reports
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View All
                                        </Button>
                                    </Box>
                                    <List>
                                        {nationalReports.map((report) => (
                                            <React.Fragment key={report.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={report.title}
                                                        secondary={`Date: ${report.date} | Type: ${report.type}`}
                                                    />
                                                    <Button size="small" color="primary">
                                                        Download
                                                    </Button>
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
                                            Upcoming Events
                                        </Typography>
                                        <Button variant="contained" size="small" color="primary">
                                            View Calendar
                                        </Button>
                                    </Box>
                                    <List>
                                        {upcomingEvents.map((event) => (
                                            <React.Fragment key={event.id}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={event.title}
                                                        secondary={`Date: ${event.date} | Location: ${event.location}`}
                                                    />
                                                    <Chip label="RSVP" color="primary" size="small" onClick={() => {}} />
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
