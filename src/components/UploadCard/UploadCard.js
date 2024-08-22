import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UploadCard.scss';
import View from '../../assets/images/view_icon.svg';
import Upload from '../../assets/images/upload.svg';
import Upload_black from '../../assets/images/upload_black.svg';


export default function UploadCard({
  heading,
  isRequired,
  uploadOnClick,
  viewOnClick,
  cardDetailState,
  viewDisabled,
  uploadDisabled,
  hasDocument,
  id,
  uploadRevoke = false
}) {
  const [state, setState] = useState(cardDetailState);
  return (
    <div className="Box-Container" id={id}>
      <div className="Heading-Div">
        {`${heading}`}{isRequired && <div className="Important-Star">*</div>}
      </div>
      {
        <div className="Button-Div">
          {hasDocument ?
            uploadRevoke ?
              <>
                <img src={View} alt="view" style={{ cursor: !viewDisabled ? "pointer" : "" }} onClick={!viewDisabled ? viewOnClick : null}></img>
              </>
              :
              <>
                <img className="View-Button" src={Upload_black} alt="view" style={{ cursor: !uploadDisabled ? "pointer" : "" }} onClick={!uploadDisabled ? uploadOnClick : null}></img>
                <img src={View} alt="view" style={{ cursor: !viewDisabled ? "pointer" : "" }} onClick={!viewDisabled ? viewOnClick : null}></img>
              </>
            :
            <>
              <img src={Upload} alt="Upload" style={{ cursor: !uploadDisabled ? "pointer" : "" }} onClick={!uploadDisabled ? uploadOnClick : null}></img>
            </>
          }
        </div>
      }

    </div>
  );
}


UploadCard.propTypes = {
  uploadOnClick: PropTypes.func,
  viewOnClick: PropTypes.func,
  isRequired: PropTypes.bool,
  hasDocument: PropTypes.bool,
  viewDisabled: PropTypes.bool,
  uploadDisabled: PropTypes.bool,
  heading: PropTypes.string,
  cardDetailState: PropTypes.object,
  id: PropTypes.string,
  uploadRevoke: PropTypes.bool
};
