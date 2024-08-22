import React from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

export default function ListItem ({
  onClick,
  disabled,
  children,
  customStyle
 }) {
  return (
    <li
      className={ disabled ? 'disabled':'text'}
      onClick={ disabled ? null :onClick}
      style={customStyle}
    >
      {children}
    </li>
  );
};

ListItem.propTypes = {
  onClick: PropTypes.func,
  disabled : PropTypes.bool,
  customStyle : PropTypes.object
}