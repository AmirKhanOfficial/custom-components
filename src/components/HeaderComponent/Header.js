import PropTypes from 'prop-types';

import './Header.scss';

import { useEffect } from 'react';

import React from 'react';

const Header = ({
  username,
  colour_change,
  title,
  title1,
  children,
  handleOpen,
}) => {
  // const [currentDate, setCurrentDate] = useState(getCurrentDate());

  const getInitialLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const [open, setOpen] = React.useState(false);

  // function getCurrentDate() {

  // const date = new Date();

  // const options = { year: "numeric", month: "long", day: "numeric" };

  // return date.toLocaleDateString(undefined, options);

  // }

  useEffect(() => {
    handleOpen();
  }, [open]);

  const handleIconOpen = () => {
    setOpen(!open);
  };

  return (
    <div id="header" className="header-container">
      <div id="title-container" className="title-container">
        <span id="heading" className="page-title">{title}</span>
        <div id="breadcrumb" className="router">
          {title1}
          <span className="colour_change">{colour_change}</span>
        </div>
      </div>

      {/* <InputBox

label="Type Something"

isDrawdown={true}

onClick={handleInputChange}

/> */}

      <div id="user-info" className="user-info">
        <div className="user-icon" onClick={handleIconOpen}>
          <span className="icon-text">{getInitialLetter(username)} </span>
          {/* <div className="notification">2</div> */}
        </div>
        <div id="username" className="username-text">
          <span>{username}</span>
        </div>
      </div>

      {open?children:null}
    </div>
  );
};

Header.propTypes = {
  username: PropTypes.string.isRequired,

  children: PropTypes.children,

  handleOpen: PropTypes.func,
};

export default Header;
