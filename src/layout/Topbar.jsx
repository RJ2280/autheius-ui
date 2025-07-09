import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, IconButton, useTheme, InputBase, Typography } from '@mui/material';
import { ColorModeContext } from '../theme.js';
import { useUserStore } from '../state/userStore';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const user = useUserStore((state) => state.user);

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={theme.palette.background.paper} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton><NotificationsOutlinedIcon /></IconButton>
        <IconButton component={Link} to="/settings"><SettingsOutlinedIcon /></IconButton>
        <IconButton component={Link} to="/profile">
          <PersonOutlinedIcon />
        </IconButton>
        {user && <Typography sx={{ alignSelf: 'center', mr: 2 }}>{user.name}</Typography>}
      </Box>
    </Box>
  );
};

export default Topbar;