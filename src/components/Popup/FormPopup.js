import React from 'react';
import PropTypes from 'prop-types';
import './FormPopup.scss';
import Header from './Header';

const FormPopup = ({ 
    heading,
     onClose,
     children,
     isOpen,
     customHeaderStyle,
    customStyles,
    customStyles1,
    isCancel
    
    }) => {
     
    
  return (
    <>
    
    {isOpen && (
      <div className={`modal-container_3 ${isOpen ? 'open' : ''}`}  onClick={onClose} />
    )}
    <div className="modal_3" style={customStyles} >
      <div>
      <Header heading={heading} isCancel={isCancel} onClose={onClose} customStyle={customHeaderStyle}/>
        </div>
      <div className="icon_box_3" style={customStyles1} > 
        {children}
      
       </div>
     </div>
    

    
     </>
 );
};

FormPopup.propTypes = {
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  customStyles:PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  customHeaderStyle:PropTypes.object,
  customStyles1:PropTypes.object,
};

export default FormPopup;