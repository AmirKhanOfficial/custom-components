import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmationPopup.scss';
import Header from './Header';

const ConfirmationPopup = ({
    heading,
    confirmationMessage,
    onClose,
    children,
    isOpen,
    customHeaderStyle,
    customStyles,
    customStyles1,
    customYesButtonStyle, 
    customNoButtonStyle, 
    handleConfirmed, 
    yes,             
    no,              
    showOkay,        
}) => {
    return (
        <>
            {isOpen && (
                <div className={`modal-container_4 ${isOpen ? 'open' : ''}`} onClick={onClose} />
            )}
            <div className="modal_4" style={customStyles} >
                <div>
                    <Header heading={heading} onClose={onClose} customStyle={customHeaderStyle} />
                </div>
                <div className="icon_box_4" style={customStyles1} >
                    {confirmationMessage && (
                        <p className="confirmation-message">{confirmationMessage}</p>
                    )}
                    {children}
                    {!showOkay && (
                        <>
                            <button
                                className="custom-button"
                                style={customYesButtonStyle} 
                                onClick={handleConfirmed} 
                            >
                                {yes} 
                            </button>
                            <button
                                className="custom-button"
                                style={customNoButtonStyle} 
                                onClick={() => onClose()} 
                            >
                                {no} 
                            </button>
                        </>
                    )}
                    {showOkay && (
                        <button
                            className="custom-button"
                            style={customButtonStyle}
                            onClick={handleConfirmed} 
                        >
                            {"Okay"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

ConfirmationPopup.propTypes = {
    heading: PropTypes.string.isRequired,
    confirmationMessage: PropTypes.string,
    onClose: PropTypes.func,
    customStyles: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    customHeaderStyle: PropTypes.object,
    customStyles1: PropTypes.object,
    customYesButtonStyle: PropTypes.object, 
    customNoButtonStyle: PropTypes.object,  
    handleConfirmed: PropTypes.func, 
    yes: PropTypes.string,            
    no: PropTypes.string,             
    showOkay: PropTypes.bool,         
};

ConfirmationPopup.defaultProps = {
    confirmationMessage: "",
    handleConfirmed: null,
    yes: null,
    no: null,
    showOkay: false,
    customButtonStyle: null,
    customYesButtonStyle: null, 
    customNoButtonStyle: null, 
};

export default ConfirmationPopup;
