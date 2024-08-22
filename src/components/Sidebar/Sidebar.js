import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import ArrowDown from '../../assets/images/Group.svg';
import ArrowUp from '../../assets/images/arrow-up-s-line.svg';
import Logo from '../../assets/images/AM-logo.svg';
import { useHistory } from 'react-router-dom';

export default function SIdebar({ sidebarData, customClass }) {
  const history = useHistory();
  const [isActive, setIsActive] = useState(1);
  const [open, setOpen] = useState(false);
  const [isActiveSubmenu, setIsActiveSubmenu] = useState(null);
  const [isActiveInnerSubmenu, setIsActiveInnerSubmenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const handleChange = (e) => {
    setIsActive(e.name);
    if (e.views.length === 1) {
      history.push(e.views[0].layout + e.views[0].path);
    }
  };
  const handleSubmenuClick = (e) => {
    setIsActiveSubmenu(e.name);
    history.push(e.layout + e.path);
  };

  const handleInnerSubmenuClick = (e) => {
    setIsActiveInnerSubmenu(e.name);
    history.push(e.layout + e.path);
  }

  return (
    <div style={customClass}>
      <div className="wrapper-container">
        <div className="logo-header">
          <img src={Logo} alt="Arthmate" className="logo-top" />
          <div className="header-subheader">
            <div className="logo-head">Arthmate</div>
            <div className="subheader">LMS / LOS</div>
          </div>
        </div>
        {sidebarData.map((singleMenu, index) =>
          singleMenu.invisible === false ? (
            <div key={singleMenu.name} className="sidebar-item">
              <div className="combined-menu-colored-container">
                <div
                  className={
                    singleMenu.name === isActive
                      ? 'sidebar-title-highlited'
                      : 'sidebar-title'
                  }
                  onClick={() => {
                    handleChange(singleMenu);
                    if (singleMenu.name === isActive) {
                      setOpen(!open);
                    } else {
                      setOpen(true);
                    }
                  }}
                >
                  {
                    <img
                      className="menuIcon"
                      src={`data:image/svg+xml;utf8,${encodeURIComponent(
                        singleMenu['icon'],
                      )}`}
                    />
                  }
                  <div className="menu-and-icon">
                    <div
                      className={
                        singleMenu.name.length > 19
                          ? singleMenu.name === isActive
                            ? 'big-selected-title-name'
                            : 'big-title-name'
                          : isActive === singleMenu.name
                          ? 'selected-title-name'
                          : 'title-name'
                      }
                    >
                      {singleMenu.name}
                    </div>
                    {singleMenu.views.length === 1 ? null : (
                      <div className="dropdown-icon">
                        {isActive === singleMenu.name && open ? (
                          <img alt="icon" src={ArrowUp} />
                        ) : (
                          <img alt="icon" src={ArrowDown} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={
                    isActive === singleMenu.name
                      ? 'selected-rightside-container'
                      : 'unselected-rightside-container'
                  }
                ></div>
              </div>
              {isActive === singleMenu.name &&
                open &&
                singleMenu.views.length > 1 && (
                  <div>
                    {singleMenu.views.map((submenuItems) =>
                      submenuItems.invisible === true ? null : (
                        <div
                          onClick={() => {
                            handleSubmenuClick(submenuItems);
                            if (submenuItems.name === isActiveSubmenu && submenuItems.views && submenuItems.views.length >=1) {
                              setOpenSubMenu(!openSubMenu);
                            } else {
                              setOpenSubMenu(true);
                            }
                            if(!openSubMenu){
                              setIsActiveInnerSubmenu(null);
                            }
                          }
                          }
                          key={submenuItems.id}
                          className="single-container-sidebar"
                        >
                          <div
                            className={
                              isActiveSubmenu === submenuItems.name
                                ? submenuItems.views && submenuItems.views.length >= 1 ? 'head-selected submenubar submenubar-title-highlited':'head-selected'
                                : submenuItems.views && submenuItems.views.length >= 1 ?'head submenubar':'head'
                            }
                          >
                            {submenuItems.name}
                            {submenuItems.views && submenuItems.views.length >= 1 ? (
                      <div className="dropdown-icon">
                        {isActiveSubmenu === submenuItems.name && openSubMenu ? (
                          <img alt="icon" src={ArrowUp} />
                        ) : (
                          <img alt="icon" src={ArrowDown} />
                        )}
                      </div>
                    ): null}
                          </div>
                          {isActiveSubmenu === submenuItems.name &&
                openSubMenu &&
                submenuItems.views && submenuItems.views.length >= 1 && (
                  <div>
                    {submenuItems.views.map((innerSubmenuItems) =>
                      innerSubmenuItems.invisible === true ? null : (
                        <div
                          onClick={(event) => {
                            handleInnerSubmenuClick(innerSubmenuItems);
                            event.stopPropagation();
                          }
                          }
                          key={innerSubmenuItems.id}
                          className="single-container-sidebar"
                        >
                          <div
                            className={
                              isActiveInnerSubmenu === innerSubmenuItems.name
                                ? 'head-selected'
                                : 'head'
                            }
                          >
                            {innerSubmenuItems.name}
                          </div>
                          
                        </div>
                        
                      ),
                    )} 
                    </div>
                )}
          
                        </div>
                        
                      ),
                    )}
                  </div>
                )}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}

SIdebar.propTypes = {
  sidebarData: PropTypes.array,
  customClass: PropTypes.object,
};
