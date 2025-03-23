import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Button, Divider, Grid } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';

const ParentInfo = ({ parent }) => {
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
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Avatar 
              src={parent.avatar} 
              alt={parent.name}
              sx={{ 
                width: 80, 
                height: 80,
                border: '2px solid',
                borderColor: 'primary.main'
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={10}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="h6">{parent.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {parent.relationship}
                </Typography>
              </Box>
              <Chip 
                label={parent.primaryContact ? "Primary Contact" : "Secondary Contact"} 
                color={parent.primaryContact ? "primary" : "default"}
                size="small" 
              />
            </Box>
            
            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center">
                <PhoneIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {parent.phone}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center">
                <EmailIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {parent.email}
                </Typography>
              </Box>
            </Box>
            
            <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
              <Box display="flex" alignItems="center">
                <HomeIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {parent.address}
                </Typography>
              </Box>
              
              {parent.occupation && (
                <Box display="flex" alignItems="center">
                  <WorkIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {parent.occupation}
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button 
                size="small" 
                variant="outlined" 
                color="primary"
                sx={{ mr: 1 }}
              >
                Message
              </Button>
              <Button 
                size="small" 
                variant="contained" 
                color="primary"
              >
                Call
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ParentInfo;
