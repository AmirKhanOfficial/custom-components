// CloseButton.js
import React from 'react';
import './closebutton.scss';
import crossImage from '../../assets/images/cross.svg';
const CloseButton = ({ onClose,customStyle }) => {
  return (
    <button className="close-button" onClick={onClose} style={customStyle}>
      <img src={crossImage} alt="" />
    </button>
  );
};

export default CloseButton;
