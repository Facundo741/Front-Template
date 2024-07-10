import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
        <Typography variant="h1" align="center" gutterBottom>
          Hola a todos
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
