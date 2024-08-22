import './Multiselect.scss';
import { useEffect, useState, useRef } from 'react';
import CrossIcon from './CrossIcon';
import DownArrow from '../../assets/images/filledArrowDown.svg';
import upArrow from '../../assets/images/filledArrowUp.svg';
import CrosssIcon from '../../assets/images/filledCross.svg';
import PropTypes from 'prop-types';
export default function Multiselect({
  onValueChange,
  data,
  setData,
  options,
  placeHolder,
  errorField,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(
    options.filter(
      (option) => !selectedOptions.includes(option) && !data.includes(option),
    ),
  );
  const [inputValue, setInputValue] = useState('');
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const clearAll = () => {
    setSelectedOptions([]);
    setFilteredOptions([]);
    setData([]);
    setDivHeight(0);
    setInputValue('');
    onValueChange('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '') {
      setSelectedOptions(selectedOptions.slice(0, -1));
    }
  };

  useEffect(() => {
    setFilteredOptions(
      options.filter(
        (option) => !selectedOptions.includes(option) && !data.includes(option),
      ),
    );
  }, [selectedOptions, data, options]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      inputRef.current.focus();
    }, 1000);
    setDivHeight(divRef.current.offsetHeight);
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the dropdown if clicked outside the container
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      clearInterval(intervalId);
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [selectedOptions, clearAll]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current.focus();
    }
  };

  const toggleOption = (option) => {
    // Update selectedOptions with the new option
    setSelectedOptions([...selectedOptions, option]);
    setData([...data, option]);
    // Close the dropdown
    // setIsOpen(false);
  };

  const deselectOption = (option) => {
    
    setSelectedOptions(selectedOptions.filter((obj) => obj !== option));

    setData(data.filter((obj) => obj !== option));
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    const filtered = options.filter(
      (option) =>
        option.toLowerCase().includes(value.toLowerCase()) &&
        !selectedOptions.includes(option) &&
        !data.includes(option),
    );
    setFilteredOptions(filtered);
    setIsOpen(true);
    onValueChange(event);
  };

  const dotStyles = {
    base: {
      height: '25px',
      width: '25px',
      borderRadius: '50%',
      marginLeft: '10px',
      color: 'grey',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'background-color 0.3s ease, border 0.3s ease', // Adding transition for smooth effect
    },
    hover: {
      backgroundColor: 'blue',
      border: '1px solid grey',
    },
  };

  const clearAllStyle = {
    position: 'absolute',
    left: '90%',
    marginTop: '14px',
    marginRight: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40px',
  };

  return (
    <>
      <div
        ref={containerRef}
        style={{ display: 'inline-block' }}
        className="multiselect-dropdown"
      >
        {selectedOptions.length > 0 || data.length > 0 ? (
          <span className="placeHolder">{placeHolder}</span>
        ) : null}
        <div
          className="select-option"
          onClick={toggleDropdown}
          style={{
            height: `${divHeight}px`,
            border:
              selectedOptions.length == 0 && data.length === 0
                ? '1px solid #d32f2f'
                : '1px solid rgba(0, 0, 0, 0.28)',
          }}
        >
          <div className="OptionSelectedStyle" ref={divRef}>
            <>
              {data.map((option, index) => (
                <div className="dropdown-choosen" key={index}>
                  {option}
                  <span
                    style={{
                      ...dotStyles.base,
                      ...(isHovered && dotStyles.hover),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deselectOption(option);
                    }}
                  >
                    <CrossIcon />
                  </span>
                </div>
              ))}
            </>
            <input
              className={
                selectedOptions.length === 0 && data.length === 0
                  ? 'input-text added'
                  : 'input-text'
              }
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedOptions.length > 0 || data.length > 0 ? '' : placeHolder
              }
              style={{
                width:
                  selectedOptions.length > 0 || data.length > 0
                    ? '100px'
                    : '600px',
              }}
              ref={inputRef}
            />
          </div>
          <div style={clearAllStyle}>
            {selectedOptions.length == 0 ? null : (
              <img
                onClick={clearAll}
                className="cross-img"
                src={CrosssIcon}
                alt="cross"
              />
            )}
            <img
              className="img-drop-down"
              src={isOpen ? upArrow : DownArrow}
              alt="downImg"
            />
          </div>
        </div>

        {isOpen && (
          <div className="dropdown-content">
            {data.length === 0 && filteredOptions.length === 0 ? (
              <div className="no-data-div">No Data found</div>
            ) : (
              filteredOptions.map((option, index) => {
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredOption(option)}
                    onMouseLeave={() => setHoveredOption(null)}
                    onClick={() => {
                      toggleOption(option);
                      setInputValue('');
                    }}
                    style={{
                      color: 'grey',
                      display: 'flex',
                      padding: '4px 2px',
                      cursor: 'pointer',
                      backgroundColor:
                        hoveredOption === option
                          ? 'lightgray'
                          : selectedOptions.includes(option) ||
                            data.includes(option)
                          ? 'lightblue'
                          : 'white',
                      transition: 'background-color 0.1s', // Add transition for smoother effect
                    }}
                  >
                    {option}
                  </div>
                );
              })
            )}
          </div>
        )}

        {selectedOptions.length === 0 && data.length === 0 && (
          <p className="errorField">{errorField}</p>
        )}
      </div>
    </>
  );
}

Multiselect.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  setData: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeHolder: PropTypes.string.isRequired,
  errorField: PropTypes.string.isRequired,
};
