import React, { useState } from 'react';
import './ToggleSwitch.css';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ checked, onChange }) => {
  const handleOnChange = () => {
    onChange(checked);
  };

  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onClick={handleOnChange}
      />
      <div onClick={(e) => handleOnChange(e)} className="toggle"></div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch;
