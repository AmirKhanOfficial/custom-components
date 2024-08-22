import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AutoComplete.scss';

const AutoComplete = ({ options, onInputChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsOpen(true);
    onInputChange(value);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="autocomplete-input"
        placeholder="Type here..."
      />
      {isOpen && (
        <div className="autocomplete-options">
          {options
            .filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map((option, index) => (
              <div
                key={index}
                className="autocomplete-option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default AutoComplete;
