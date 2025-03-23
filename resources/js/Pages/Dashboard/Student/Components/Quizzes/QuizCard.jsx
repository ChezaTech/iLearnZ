import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, LinearProgress } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SubjectIcon from '@mui/icons-material/Subject';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const QuizCard = ({ quiz }) => {
  // Calculate days remaining if not completed
  const getTimeRemaining = () => {
    if (quiz.status === 'completed') return null;
    
    const dueDate = new Date(quiz.dueDate);
    const today = new Date();
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 0) return 'Due today!';
    if (daysRemaining === 1) return 'Due tomorrow!';
    return `${daysRemaining} days remaining`;
  };
  
  // Determine status color
  const getStatusColor = () => {
    if (quiz.status === 'completed') return 'success';
    
    const dueDate = new Date(quiz.dueDate);
    const today = new Date();
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining <= 1) return 'error';
    if (daysRemaining <= 3) return 'warning';
    return 'info';
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
        borderLeft: '4px solid',
        borderColor: quiz.status === 'completed' ? 'success.main' : getStatusColor() + '.main',
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
            <QuizIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">{quiz.title}</Typography>
          </Box>
          <Chip 
            label={quiz.status === 'completed' ? 'Completed' : 'Pending'} 
            color={getStatusColor()}
            size="small" 
          />
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <SubjectIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{quiz.subject}</Typography>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {quiz.status === 'completed' 
              ? `Completed on: ${new Date(quiz.completedDate).toLocaleDateString()}`
              : `Due: ${new Date(quiz.dueDate).toLocaleDateString()} (${getTimeRemaining()})`
            }
          </Typography>
        </Box>
        
        {quiz.status === 'completed' && (
          <Box mt={1} display="flex" alignItems="center">
            <EmojiEventsIcon fontSize="small" sx={{ mr: 0.5, color: 'gold' }} />
            <Typography variant="body2" fontWeight="bold">
              Score: {quiz.score}/{quiz.totalPoints} ({Math.round(quiz.score/quiz.totalPoints*100)}%)
            </Typography>
          </Box>
        )}
        
        {quiz.status !== 'completed' && quiz.timeLimit && (
          <Box mt={1} display="flex" alignItems="center">
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Time limit: {quiz.timeLimit} minutes
            </Typography>
          </Box>
        )}
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          {quiz.status === 'completed' ? (
            <>
              <Button 
                size="small" 
                variant="outlined" 
                color="primary"
                sx={{ mr: 1 }}
              >
                Review
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                color="primary"
              >
                See Answers
              </Button>
            </>
          ) : (
            <Button 
              size="small" 
              variant="contained" 
              color="primary"
            >
              Start Quiz
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
