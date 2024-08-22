import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TextPopup.scss';
import Header from './Header';
import up from '../../assets/images/up.svg';
import down from '../../assets/images/Down.svg';

const TextPopup = ({
  isOpen,
  heading,
  onClose,
  drawdownData,
  customHeaderStyle,
  customStyles = {},
  customStylesForModalBody,
  customJsx,
  customStylesForOutsideModal = {},
  onClickOutsideModal
}) => {
  const [dropdownOpen, setDropdownOpen] = useState({
    symbol1: true,
  });
  const [selectedDropdown, setSelectedDropdown] = useState('symbol1');

  const toggleDropdown = (dropdownName) => {
    if (dropdownOpen[dropdownName]) {
      setDropdownOpen((prevState) => ({
        ...prevState,
        [dropdownName]: false,
      }));
      setSelectedDropdown(null);
    } else {
      setDropdownOpen((prevState) => ({
        ...prevState,
        [dropdownName]: true,
      }));
      Object.keys(dropdownOpen).forEach((key) => {
        if (key !== dropdownName && dropdownOpen[key]) {
          setDropdownOpen((prevState) => ({
            ...prevState,
            [key]: false,
          }));
        }
      });
      setSelectedDropdown(dropdownName);
    }
  };

  const toggleSymbol = (dropdownName) => {
    if (selectedDropdown === dropdownName) {
      setSelectedDropdown(null);
      setDropdownOpen((prevState) => ({
        ...prevState,
        [dropdownName]: false,
      }));
    } else {
      setSelectedDropdown(dropdownName);
      setDropdownOpen((prevState) => ({
        ...prevState,
        [dropdownName]: true,
      }));
    }
  };

  return (
    <div>
      {isOpen && (
        <div
          className={`modal-container_2 ${isOpen ? 'open' : ''}`}
          style={{ ...customStylesForOutsideModal }}
          onClick={onClickOutsideModal?onClickOutsideModal:onClose}
        />
      )}

      <div className="modal_2" style={{ ...customStyles }}>
        <div>
          <Header
            heading={heading}
            onClose={onClose}
            customStyle={customHeaderStyle}
          />
        </div>
        {typeof customJsx === 'function' ? (
          customJsx()
        ) : (
          <React.Fragment>
            <div className="icon_box_2" style={customStylesForModalBody}>
              {drawdownData.map((drawdown, index) => (
                <div
                  key={`drawdown-${index}`}
                  className={`dropdown ${
                    dropdownOpen[`symbol${index + 1}`] ? 'open' : ''
                  }`}
                  onClick={() => toggleDropdown(`symbol${index + 1}`)}
                >
                  <label
                    htmlFor={`drawdown-${index}`}
                    className="label-content"
                  >
                    <span>{drawdown.title}</span>
                    <img
                      src={
                        selectedDropdown === `symbol${index + 1}` ? up : down
                      }
                      alt=""
                      width="24"
                      height="25"
                      onClick={() => toggleSymbol(`symbol${index + 1}`)}
                    />
                  </label>

                  {dropdownOpen[`symbol${index + 1}`] && (
                    <div className="dropdown-body">
                      {typeof drawdown.content === 'function'
                        ? drawdown.content()
                        : drawdown.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

TextPopup.propTypes = {
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  drawdownData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.func.isRequired,
    }),
  ).isRequired,
  customHeaderStyle: PropTypes.object,
  customStylesForModalBody: PropTypes.object,
  customStyles: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  customJsx: PropTypes.func,
};

export default TextPopup;
