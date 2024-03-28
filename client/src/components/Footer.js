// Footer.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
        marginTop: 'auto', // Make the footer stick to the bottom of the page
      }}
    >
      <Typography variant="body2">
        Your Footer Content Goes Here
      </Typography>
    </Box>
  );
};

export default Footer;
