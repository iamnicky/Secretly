import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  padding: theme.spacing(1),
  marginTop: '10px',
  position: 'relative',
  bottom: 0,
  backgroundColor: 'transparent',
}));

const HeartIcon = styled('span')({
  color: '#ff6b6b', // Same color as the lock icon
  display: 'inline-block',
  fontSize: '1.1em',
  verticalAlign: 'middle',
  animation: 'heartbeat 1.3s infinite',
  '@keyframes heartbeat': {
    '0%': { transform: 'scale(1)' },
    '14%': { transform: 'scale(1.2)' },
    '28%': { transform: 'scale(1)' },
    '42%': { transform: 'scale(1.2)' },
    '70%': { transform: 'scale(1)' },
  }
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body2" color="text.secondary">
        Made with <HeartIcon>❤️</HeartIcon> by Nicky
      </Typography>
    </FooterContainer>
  );
};

export default Footer; 