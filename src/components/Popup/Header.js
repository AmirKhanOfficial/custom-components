import React from 'react';
import './Header.scss';
import CloseButton from './close-button';

const Header= ({ heading,customStyle, onClose,isCancel }) => {
  return (
    
    <div className="Header" style={customStyle}>
      <div>{heading}</div>
      {isCancel ? null :
      <CloseButton onClose={onClose} /> }
    </div>
  );
};

export default Header;
