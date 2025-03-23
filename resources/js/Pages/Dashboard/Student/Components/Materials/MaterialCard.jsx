import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SubjectIcon from '@mui/icons-material/Subject';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const MaterialCard = ({ material }) => {
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📕';
      case 'doc':
      case 'docx':
        return '📘';
      case 'ppt':
      case 'pptx':
        return '📙';
      case 'xls':
      case 'xlsx':
        return '📗';
      case 'video':
        return '🎬';
      case 'audio':
        return '🎵';
      default:
        return '📄';
    }
  };

  return (
    <Card 
      elevation={3} 
      sx={{ 
        mb: 2, 
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
            <Typography variant="h2" sx={{ mr: 1, fontSize: '2rem' }}>
              {getFileIcon(material.fileType)}
            </Typography>
            <Box>
              <Typography variant="h6">{material.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {material.fileType.toUpperCase()} • {material.fileSize}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={material.isNew ? 'New' : ''}
            color="primary"
            size="small"
            sx={{ visibility: material.isNew ? 'visible' : 'hidden' }}
          />
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <SubjectIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">{material.subject}</Typography>
        </Box>
        
        <Box mt={1} display="flex" alignItems="center">
          <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Uploaded: {new Date(material.uploadDate).toLocaleDateString()}
          </Typography>
        </Box>
        
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button 
            size="small" 
            variant="outlined" 
            color="primary"
            startIcon={<VisibilityIcon />}
            sx={{ mr: 1 }}
          >
            Preview
          </Button>
          <Button 
            size="small" 
            variant="contained" 
            color="primary"
            startIcon={<GetAppIcon />}
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
