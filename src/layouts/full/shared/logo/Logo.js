import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from 'src/assets/images/logos/logo.png'; // Assurez-vous que le chemin est correct
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const ImgStyled = styled('img')(() => ({
  height: '100%',
  width: '100%',
  objectFit: 'contain',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <ImgStyled src={LogoImage} alt="Logo" />
    </LinkStyled>
  );
};

export default Logo;
