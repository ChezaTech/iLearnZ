import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, LinearProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';

const AssignmentCard = ({ assignment }) => {
  // Calculate days remaining
  const dueDate = new Date(assignment.dueDate);
  const today = new Date();
  const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  
  // Determine urgency color
  const getUrgencyColor = () => {
    if (daysRemaining <= 1) return 'error';
    if (daysRemaining <= 3) return 'warning';
    return 'success';
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
        borderLeft: '4px solid',
        borderColor: assignment.status === 'completed' ? 'success.main' : getUrgencyColor() + '.main',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box display="flex" alignItems="center">
            <AssignmentIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">{assignment.title}</Typography>
          </Box>
          <Chip 
            label={assignment.status === 'completed' ? 'Completed' : 'Pending'} 
            color={assignment.status === 'completed' ? 'success' : getUrgencyColor()}
            size="small" 
          />
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <SubjectIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{assignment.subject}</Typography>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Due: {new Date(assignment.dueDate).toLocaleDateString()} 
            {assignment.status !== 'completed' && ` (${daysRemaining} days left)`}
          </Typography>
        </Box>
        
        {assignment.progress !== undefined && (
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2">{assignment.progress}%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={assignment.progress} 
              sx={{ mt: 0.5, height: 8, borderRadius: 4 }}
              color={assignment.status === 'completed' ? 'success' : 'primary'}
            />
          </Box>
        )}
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button 
            size="small" 
            variant="outlined" 
            color="primary"
            sx={{ mr: 1 }}
          >
            View Details
          </Button>
          {assignment.status !== 'completed' && (
            <Button 
              size="small" 
              variant="contained" 
              color="primary"
            >
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
