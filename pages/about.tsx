import React from 'react';
import { Typography, Container } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        This is the about page of our Next.js application.
      </Typography>
    </Container>
  );
};

export default About;
