import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, LinearProgress } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ResultCard = ({ result }) => {
  // Get grade color based on score
  const getGradeColor = () => {
    const percentage = (result.score / result.totalPoints) * 100;
    if (percentage >= 90) return 'success';
    if (percentage >= 70) return 'primary';
    if (percentage >= 50) return 'warning';
    return 'error';
  };

  // Get grade letter
  const getGradeLetter = () => {
    const percentage = (result.score / result.totalPoints) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    if (percentage >= 50) return 'E';
    return 'F';
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
        borderLeft: '4px solid',
        borderColor: getGradeColor() + '.main',
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
            <AssessmentIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">{result.title}</Typography>
          </Box>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: getGradeColor() + '.main',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {getGradeLetter()}
          </Box>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <SubjectIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{result.subject}</Typography>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(result.date).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Score</Typography>
            <Typography variant="body2" fontWeight="bold">
              {result.score}/{result.totalPoints} ({Math.round(result.score/result.totalPoints*100)}%)
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(result.score/result.totalPoints)*100} 
            sx={{ mt: 0.5, height: 8, borderRadius: 4 }}
            color={getGradeColor()}
          />
        </Box>
        
        {result.feedback && (
          <Box mt={2}>
            <Typography variant="body2" fontWeight="medium">Teacher's Feedback:</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {result.feedback}
            </Typography>
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
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
          >
            Download Report
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
