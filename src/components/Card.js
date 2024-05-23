import React from 'react';
import { Card as BootstrapCard, Button } from 'react-bootstrap';

const CustomCard = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <BootstrapCard className="mb-4" style={{ width: '22rem', margin: '1.5rem', backgroundColor: 'white', borderRadius: '15px' }}>
      <BootstrapCard.Body>
        <div className="icon-container" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {icon}
        </div>
        <BootstrapCard.Title>{title}</BootstrapCard.Title>
        <BootstrapCard.Text>{description}</BootstrapCard.Text>
        <Button 
          onClick={onClick} 
          style={{ backgroundColor: '#3664AD', borderColor: '#3664AD' }}
        >
          {buttonText}
        </Button>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default CustomCard;
