import React from 'react';
import PropTypes from 'prop-types';

const CustomCard = ({ icon, title, description, buttonText, onClick }) => {
  return (
    <div className="card text-center" style={{ width: '18rem', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px ' }}>  

      <div className="card-body">
        <div className="icon mb-3">
          {icon}
        </div>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button onClick={onClick} className="btn btn-primary" style={{ backgroundColor: '#3664AD', borderColor: '#3664AD' }}>{buttonText}</button>
      </div>
    </div>
  );
};

CustomCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomCard;
