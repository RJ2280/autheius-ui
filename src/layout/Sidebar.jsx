import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// Icons from snippet and inferred from routes
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// The Item component is a helper for rendering sidebar links.
// It maintains the selected state and applies active styles.
const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={to}
        selected={selected === title}
        onClick={() => setSelected(title)}
        sx={{
          color: '#e0e0e0',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
          },
          '&.Mui-selected': {
            color: '#00ffff',
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderLeft: '4px solid #00ffff',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 255, 0.3)',
            },
          },
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

const Sidebar = () => {
  const location = useLocation();

  // This function determines the initially selected item based on the current URL path.
  const getInitialSelected = (pathname) => {
    if (pathname.startsWith('/studio')) return 'Generative Studio';
    if (pathname.startsWith('/capstone')) return 'Capstone Project';
    if (pathname.startsWith('/lesson')) return 'Lessons';
    if (pathname.startsWith('/profile')) return 'Profile';
    if (pathname.startsWith('/tutorials')) return 'Tutorials';
    if (pathname.startsWith('/video-builder')) return 'Video Builder';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const [selected, setSelected] = useState(getInitialSelected(location.pathname));

  // Update selected state if the URL changes (e.g., browser back/forward)
  useEffect(() => {
    setSelected(getInitialSelected(location.pathname));
  }, [location.pathname]);

  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        // Styles to match a neon/glassmorphism theme
        backgroundColor: 'rgba(10, 25, 47, 0.85)',
        WebkitBackdropFilter: 'blur(10px)', // Vendor prefix for Safari
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(0, 255, 255, 0.2)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#00ffff', fontWeight: 'bold' }}>
          Autheius AI
        </Typography>
      </Box>
      <List>
        <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Lessons" to="/lesson-center" icon={<SchoolOutlinedIcon />} selected={selected} setSelected={setSelected} />
        
        {/* Items from your code snippet */}
        <Item title="Generative Studio" to="/studio" icon={<AutoAwesomeIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Capstone Project" to="/capstone" icon={<EmojiEventsOutlinedIcon />} selected={selected} setSelected={setSelected} />
        
        <Item title="Profile" to="/profile" icon={<AccountCircleOutlinedIcon />} selected={selected} setSelected={setSelected} />

        <Typography variant="caption" sx={{ p: 2, color: 'grey.500', display: 'block' }}>
          Tools
        </Typography>
        <Item title="Tutorials" to="/tutorials" icon={<OndemandVideoOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Video Builder" to="/video-builder" icon={<SmartDisplayOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Settings" to="/settings" icon={<SettingsOutlinedIcon />} selected={selected} setSelected={setSelected} />
      </List>
    </Box>
  );
};

export default Sidebar;