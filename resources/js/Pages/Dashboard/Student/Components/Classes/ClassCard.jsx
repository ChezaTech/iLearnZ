import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, LinearProgress, Avatar } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ClassCard = ({ classInfo }) => {
  // Generate random color based on subject name
  const getSubjectColor = (subject) => {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
                    '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
    
    const charSum = subject.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const subjectColor = getSubjectColor(classInfo.name);

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <Box sx={{ height: 100, bgcolor: subjectColor, position: 'relative' }}>
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: -30, 
            left: 20, 
            width: 60, 
            height: 60, 
            borderRadius: '50%', 
            bgcolor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 2
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: subjectColor, 
              fontWeight: 'bold' 
            }}
          >
            {classInfo.name.charAt(0)}
          </Typography>
        </Box>
      </Box>
      
      <CardContent sx={{ pt: 4 }}>
        <Typography variant="h6">{classInfo.name}</Typography>
        
        <Box mt={1} display="flex" alignItems="center">
          <PersonIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {classInfo.teacher}
          </Typography>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {classInfo.schedule}
          </Typography>
        </Box>
        
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Progress</Typography>
            <Typography variant="body2">{classInfo.progress}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={classInfo.progress} 
            sx={{ mt: 0.5, height: 8, borderRadius: 4 }}
          />
        </Box>
        
        <Box mt={2} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary">Assignments</Typography>
            <Typography variant="h6">{classInfo.assignments}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Materials</Typography>
            <Typography variant="h6">{classInfo.materials}</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">Quizzes</Typography>
            <Typography variant="h6">{classInfo.quizzes}</Typography>
          </Box>
        </Box>
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
          >
            View Class
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClassCard;
