import React from 'react';
import PropTypes from 'prop-types';
import './UploadPopup.scss';
import Header from './Header';
import img from '../../assets/images/img_cloud.svg';

const UploadPopup = ({
                       heading,
                       isOpen,
                       children,
                       onClose,
                       customStyles,
                       customHeaderStyle,
                       onUpload,
                       accept,
                       onFileSelect,
                       filename
}) => {
  return (
    <>
     {isOpen && (
      <div className={`modal-container_1 ${isOpen ? 'open' : ''}`}  onClick={onClose} />
     )}
      <div className="modal_1" style={customStyles}>
       <div >
      <Header heading={heading} onClose={onClose} style={customHeaderStyle}/>
        </div>
        <div className="modal-content_1">
          {children}
          <div className="fixed_content_1">
            <div className="icon_box_1">
              <label form="input-file" id ="drop-area">
                <input type="file" accept={accept} id ="input-file" onChange={onFileSelect} hidden/>
                <div id="img-view">
                  <img src={img} alt="" />
                  {filename && <p className='file-name'>{filename}</p>}
                  <p className="upload-text">
                    {!filename ? ( <p><span className ="span_text">Click to upload</span> or drag and drop</p>) : (<p><span className ="span_text">Change</span> or drag and drop</p>) }</p>
                  <p>{!accept ? `Upload file` : `Upload in ${accept} format`} </p>
                </div>
              </label>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button className="upload-button" onClick={onUpload}>
                Upload
              </button>
            </div>
          </div>
      </div>
      </div>
    </>
  );
};

UploadPopup.propTypes = {
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  customStyles:PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  customHeaderStyle : PropTypes.object,
  onUpload: PropTypes.func,
  accept : PropTypes.string,
  onFileSelect : PropTypes.func
};

export default UploadPopup;
