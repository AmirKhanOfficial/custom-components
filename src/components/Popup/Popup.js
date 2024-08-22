import React, { useState, useEffect } from 'react';
import UploadPopup from './UploadPopup';
import TextPopup from './TextPopup';
import FormPopup from './FormPopup';

const Popup = ({
  showPopup = 3,
  drawdownData,
  heading,
  customJsx,
  customStyles = {},
  customStylesForOutsideModal = {},
  isModalOpen=null,
  hideButton = false,
  buttonText,
  callback,
  onClickOutsideModal
}) => {
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    if (isModalOpen==true) {
      handleButtonClick(showPopup);
    }else if(isModalOpen == false){
      handleCloseModal()
    }
  }, [isModalOpen]);

  const handleButtonClick = (modalNumber) => {
    setShowModal(modalNumber);
    if (callback && typeof callback == 'function') {
      callback(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(null);
    if (callback && typeof callback == 'function') {
      callback(false);
    }
  };

  return (
    <div className="App">
      {showModal === null ? (
        <div className="buttons-container">
          {showPopup === 1 ? (
            <button
              onClick={() => handleButtonClick(1)}
              style={{ display: hideButton ? 'none' : 'initial' }}
            >
              {buttonText?buttonText:'Upload Popup'}
            </button>
          ) : showPopup === 2 ? (
            <button
              onClick={() => handleButtonClick(2)}
              style={{ display: hideButton ? 'none' : 'initial' }}
            >
               {buttonText?buttonText:'Accordion Popup'}
            </button>
          ) : (
            <button
              onClick={() => handleButtonClick(3)}
              style={{ display: hideButton ? 'none' : 'initial' }}
            >
              {buttonText?buttonText:'Form Popup'}
            </button>
          )}
        </div>
      ) : (
        <>
          {showModal === 1 && (
            <UploadPopup
              heading="Upload PAN card"
              onClose={handleCloseModal}
            ></UploadPopup>
          )}
          {showModal === 2 && (
            <TextPopup
              isOpen={showModal && showModal === 2 ? true : false}
              heading={heading ? heading : 'Logs'}
              onClose={handleCloseModal}
              drawdownData={drawdownData}
              customJsx={customJsx}
              customStyles={customStyles}
              customStylesForOutsideModal={customStylesForOutsideModal}
              onClickOutsideModal={onClickOutsideModal}
            ></TextPopup>
          )}
          {showModal === 3 && (
            <FormPopup
              heading="Main Title"
              onClose={handleCloseModal}
            ></FormPopup>
          )}
        </>
      )}
    </div>
  );
};

export default Popup;
