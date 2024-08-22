import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TabButton.scss';

export default function TabButton({
  label,
  onClick,
  isDisabled,
  selected,
  setSelectedOption
}) {
  const [hovered, setHovered] = useState(false);
  const handleButtonClick = (e) => {
    if (isDisabled) return;
    setSelectedOption(e.target.value.toLowerCase())
    onClick(e);
  };

  const handleHover = () => {
    if (!selected && !isDisabled) {
      setHovered(true);
    }
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`tabbutton-item ${selected ? 'selected' : ''} ${hovered ? 'hovered' : ''}`}
      onClick={handleButtonClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      disabled={isDisabled}
      value = {label}
    >
      {label}
    </button>
  );
}

TabButton.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  setSelectedOption: PropTypes.func
};
