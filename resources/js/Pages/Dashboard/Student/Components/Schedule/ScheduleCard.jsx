import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid, Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';

const ScheduleCard = ({ lesson }) => {
  // Get random color for subject
  const getSubjectColor = (subject) => {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
                    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
    
    // Use subject name to generate consistent color
    const charSum = subject.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  // Check if class is current
  const isCurrentClass = () => {
    const now = new Date();
    const [startHour, startMinute] = lesson.startTime.split(':').map(Number);
    const [endHour, endMinute] = lesson.endTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);
    
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);
    
    return now >= startDate && now <= endDate;
  };

  // Check if class is upcoming (within next hour)
  const isUpcomingClass = () => {
    const now = new Date();
    const [startHour, startMinute] = lesson.startTime.split(':').map(Number);
    
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0);
    
    const diffMs = startDate - now;
    const diffMins = Math.floor(diffMs / 60000);
    
    return diffMins > 0 && diffMins <= 60;
  };

  // Get status
  const getStatus = () => {
    if (isCurrentClass()) return { label: 'Current', color: 'success' };
    if (isUpcomingClass()) return { label: 'Upcoming', color: 'warning' };
    return { label: 'Scheduled', color: 'default' };
  };

  const status = getStatus();
  const subjectColor = getSubjectColor(lesson.subject);

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
        borderLeft: '4px solid',
        borderColor: subjectColor,
        transition: 'transform 0.2s',
        bgcolor: isCurrentClass() ? 'rgba(76, 175, 80, 0.08)' : 'background.paper',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={2} sm={1}>
            <Box 
              sx={{ 
                bgcolor: subjectColor,
                color: 'white',
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              {lesson.subject.charAt(0)}
            </Box>
          </Grid>
          
          <Grid item xs={10} sm={11}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="h6">{lesson.subject}</Typography>
              <Chip 
                label={status.label} 
                color={status.color}
                size="small" 
              />
            </Box>
            
            <Box mt={1} display="flex" flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center">
                <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {lesson.startTime} - {lesson.endTime}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center">
                <RoomIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {lesson.room}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center">
                <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {lesson.teacher}
                </Typography>
              </Box>
            </Box>
            
            {lesson.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {lesson.notes}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
