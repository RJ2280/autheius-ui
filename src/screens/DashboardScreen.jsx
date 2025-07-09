import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardActionArea, CardContent, Avatar } from '@mui/material';

// MUI Icons for features, consistent with Sidebar
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const features = [
  { name: 'Capstone', path: '/capstone', icon: <EmojiEventsOutlinedIcon />, description: 'Submit your final project for evaluation.' },
  { name: 'Tutorials', path: '/tutorials', icon: <OndemandVideoOutlinedIcon />, description: 'Watch video tutorials and guides.' },
  { name: 'Video Builder', path: '/video-builder', icon: <SmartDisplayOutlinedIcon />, description: 'Create videos from text with AI.' },
  { name: 'History', path: '/video-history', icon: <HistoryOutlinedIcon />, description: 'Review your generated videos and projects.' },
  { name: 'Settings', path: '/settings', icon: <SettingsOutlinedIcon />, description: 'Configure your Autheius experience.' },
];

const DashboardScreen = () => {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Autheius Control Center
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your central hub for mastering AI and agentic systems.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {features.map((feature) => (
          <Card key={feature.name} sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper' }}>
            <CardActionArea component={Link} to={feature.path} sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', color: 'background.default', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                {feature.icon}
              </Avatar>
              <Typography gutterBottom variant="h5" component="h2">
                {feature.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardScreen;
