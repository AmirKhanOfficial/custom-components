import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './List.scss';

export default function List({
  open,
  children,
  noScroll,
  customStyle,
  handleCallback,
}) {
  const newRef = useRef(null);
  const [isVisible, setIsVisible] = useState(open);
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setIsVisible(false);
      handleCallback();
    } else {
      // setIsVisible(false);
    }
  };
  return (
    <>
      {isVisible ? (
        <div
          className={noScroll ? 'ListNoScroll' : 'List'}
          style={customStyle}
          ref={newRef}
        >
          {children}
        </div>
      ) : null}
    </>
  );
}

List.propTypes = {
  open: PropTypes.bool,
  noScroll: PropTypes.bool,
  customStyle: PropTypes.object,
};
