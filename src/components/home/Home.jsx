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
        <Typography 
          variant="h3" 
          align="justify" 
          sx={{ 
            textAlign: 'justify',
            hyphens: 'auto',
            textJustify: 'inter-word',
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora quidem doloribus quis id sed, tempore hic optio. Accusantium aperiam repellat rem error animi? Pariatur accusamus placeat officia consequatur nesciunt. Eos!
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
