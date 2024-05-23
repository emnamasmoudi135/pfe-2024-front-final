import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from 'src/assets/images/logos/logo.png'; // Assurez-vous que le chemin est correct
import { styled, Box } from '@mui/material';

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
  width: '100%',
  overflow: 'hidden',
  margin: theme.spacing(2, 0),
}));

const ImgStyled = styled('img')(() => ({
  height: '100%',
  width: 'auto',
  objectFit: 'contain',
}));

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LinkStyled to="/">
        <ImgStyled src={LogoImage} alt="Logo" />
      </LinkStyled>
    </Box>
  );
};

export default Logo;
