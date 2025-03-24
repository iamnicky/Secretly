import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";

// Styled components
const NavbarContainer = styled('nav')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  overflow: 'hidden', // Prevent content from spilling out
  position: 'relative' // Create a positioning context
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  padding: theme.spacing(1), // Add padding to accommodate the scale effect
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.03)' // Reduce scale effect slightly
  }
}));

const AppName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  backgroundImage: 'linear-gradient(45deg, #ff6b6b, #556270)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  marginLeft: theme.spacing(1)
}));

const Navbar = () => {
  const location = useLocation();
  
  const handleLogoClick = (e) => {
    // If we're already on the home page, refresh the page
    if (location.pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
    // Otherwise the Link component will handle navigation to home
  };

  return (
    <NavbarContainer>
      {location.pathname === '/' ? (
        // If on home page, use a div with onClick handler
        <LogoContainer onClick={handleLogoClick} component="div">
          <LockIcon sx={{ color: '#ff6b6b' }} />
          <AppName variant="h5">Secretly</AppName>
        </LogoContainer>
      ) : (
        // If not on home page, use Link to navigate home
        <Link to="/" style={{ textDecoration: 'none' }}>
          <LogoContainer component="div">
            <LockIcon sx={{ color: '#ff6b6b' }} />
            <AppName variant="h5">Secretly</AppName>
          </LogoContainer>
        </Link>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
