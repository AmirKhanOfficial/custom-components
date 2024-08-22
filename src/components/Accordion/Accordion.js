import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Accordion.scss';
import ArrowUp from '../../assets/images/ArrowUp.svg';
import ArrowDown from '../../assets/images/ArrowDown.svg';
import InfoIcon from '../../assets/images/info-circle.svg';

const RenderData = ({
  items,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
  selectedIcon,
  openDrawdown = true,
  customValueClass,
  custumHeaderStyle,
  customAccordionCell,
  customAccordionItemStyle,
  customRightContainer = {},
  customRightComponentContainer = {},
}) => {
  return items.map(
    (
      {
        head,
        body,
        iconHoverData,
        data,
        title,
        subtitle,
        rightComponent,
        bottomComponent,
        type = 'column',
        subType,
      },
      index,
    ) => {
      if (data) {
        if (subType == 'accordion') {
          return (
            <React.Fragment key={index}>
              <div
                style={{
                  width: '97%',
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '0 16px',
                  marginBottom: '20px',
                }}
              >
                <RenderSubAccord
                  title={title}
                  subtitle={subtitle}
                  data={data}
                  rightComponent={rightComponent}
                  bottomComponent={bottomComponent}
                  index={index}
                  openDrawdown={openDrawdown}
                  customAccordionItemStyle={customAccordionItemStyle}
                  customRightContainer={customRightContainer}
                  customRightComponentContainer={customRightComponentContainer}
                  custumHeaderStyle={custumHeaderStyle}
                />
              </div>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <div style={{ marginBottom: '10px', flexBasis: '100%' }}>
              <div className="title-name-head">{title}</div>
            </div>
            <div className="accordion-content">
              <RenderData
                items={data}
                isHovered={isHovered}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                subType={subType}
                customValueClass={customValueClass}
                custumHeaderStyle={custumHeaderStyle}
                customAccordionCell={customAccordionCell}
                customAccordionItemStyle={customAccordionItemStyle}
                customRightContainer={customRightContainer}
                customRightComponentContainer={customRightComponentContainer}
              />
            </div>
          </React.Fragment>
        );
      }

      return (
        <React.Fragment key={index}>
          <div
            key={index}
            style={{
              display: type == 'row' ? 'flex' : 'initial',
              justifyContent: 'space-between',
              ...customAccordionCell,
            }}
            className="single-container"
          >
            <div className="head-accordion">
              <div
                style={{
                  marginRight: '10px',
                  marginTop: type == 'row' ? '4px' : '0px',
                }}
              >
                {head}
              </div>
              {iconHoverData && (
                <img
                  onMouseEnter={() => handleMouseEnter(head)}
                  onMouseLeave={() => handleMouseLeave()}
                  src={InfoIcon}
                  alt="svg info"
                  size={'18px'}
                />
              )}
              {isHovered && selectedIcon === head ? (
                <div
                  style={{
                    position: 'absolute',
                    boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
                    padding: '10px',
                    width: 'fit-content',
                    backgroundColor: 'green',
                    zIndex: '999',
                    marginLeft: '100px',
                    marginTop: '20px',
                    borderRadius: '4px',
                    background: 'var(--neutrals-f-9, #F9F9F9)',
                  }}
                >
                  {iconHoverData}
                </div>
              ) : null}
            </div>
            <div style={customValueClass} className="body-accordion">
              {body}
            </div>
          </div>
        </React.Fragment>
      );
    },
  );
};

const RenderSubAccord = ({
  title,
  subtitle,
  data,
  rightComponent,
  bottomComponent,
  index,
  subOpenDrawdown = false,
  customValueClass,
  custumHeaderStyle,
  customAccordionCell,
  customAccordionItemStyle,
  customRightContainer = {},
  customRightComponentContainer = {},
}) => {
  const [isSubActive, setIsSubActive] = useState(0);
  const [subOpen, setSubOpen] = useState(subOpenDrawdown);
  const [subSelectedIcon, setSubSelectedIcon] = useState('');
  const [isSubHovered, setIsSubHovered] = useState(false);

  const handleSubMouseEnter = (_id) => {
    setSubSelectedIcon(_id);
    setIsSubHovered(true);
  };

  const handleSubMouseLeave = () => {
    setIsSubHovered(false);
  };

  return (
    <RenderAccord
      title={title}
      subtitle={subtitle}
      data={data}
      rightComponent={rightComponent}
      bottomComponent={bottomComponent}
      index={index}
      isActive={isSubActive}
      setIsActive={setIsSubActive}
      open={subOpen}
      setOpen={setSubOpen}
      isHovered={isSubHovered}
      selectedIcon={subSelectedIcon}
      handleMouseEnter={handleSubMouseEnter}
      handleMouseLeave={handleSubMouseLeave}
      openDrawdown={subOpenDrawdown}
      customValueClass={customValueClass}
      custumHeaderStyle={custumHeaderStyle}
      customAccordionCell={customAccordionCell}
      customAccordionItemStyle={customAccordionItemStyle}
      customRightContainer={customRightContainer}
      customRightComponentContainer={customRightComponentContainer}
    />
  );
};

const RenderAccord = ({
  title,
  subtitle,
  data,
  rightComponent,
  bottomComponent,
  subType,
  index,
  isActive,
  setIsActive,
  open,
  setOpen,
  isHovered,
  selectedIcon,
  handleMouseLeave,
  handleMouseEnter,
  openDrawdown = true,
  customValueClass,
  custumHeaderStyle,
  customAccordionCell,
  customAccordionItemStyle,
  customRightContainer = {},
  customRightComponentContainer = {},
}) => {
  return (
    <div
      key={index}
      style={
        customAccordionItemStyle
          ? {
              ...customAccordionItemStyle,
              height:
                index !== isActive && customAccordionItemStyle.height
                  ? customAccordionItemStyle.height
                  : 'auto',
            }
          : {}
      }
      className="accordion-item"
    >
      <div
        style={custumHeaderStyle}
        className="accordion-title"
        onClick={() => {
          setIsActive(index);
          if (index === isActive) {
            setOpen(!open);
          }
        }}
      >
        <div className="title-name-head">{title}</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap:"24px",
            width: '15vw',
            ...customRightContainer,
          }}
        >
          {rightComponent ? (
            <div
              style={{
                marginTop: '15px',
                ...customRightComponentContainer,
              }}
            >
              {rightComponent}
            </div>
          ) : (
            <div />
          )}
          <div className="dropdown-icon-accordion">
            {isActive === index && open ? (
              <img src={ArrowUp} alt="svg" size={'18px'} />
            ) : (
              <img src={ArrowDown} alt="svg" size={'18px'} />
            )}
          </div>
        </div>
      </div>
      {subtitle && <div className="accordion-subtitle">{subtitle}</div>}
      {isActive === index && open && (
        <React.Fragment>
          <div className="accordion-content">
            <RenderData
              items={data}
              isHovered={isHovered}
              selectedIcon={selectedIcon}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              customValueClass={customValueClass}
              custumHeaderStyle={custumHeaderStyle}
              customAccordionCell={customAccordionCell}
              customAccordionItemStyle={customAccordionItemStyle}
              customRightContainer={customRightContainer}
              customRightComponentContainer={customRightComponentContainer}
            />
          </div>
          {bottomComponent ? bottomComponent : <div />}
        </React.Fragment>
      )}
    </div>
  );
};

export default function Accordian({
  accordionData,
  customClass,
  openDrawdown = true,
  customValueClass,
  custumHeaderStyle,
  customAccordionCell,
  customAccordionItemStyle,
  customRightContainer = {},
  customRightComponentContainer = {},
}) {
  const [isActive, setIsActive] = useState(0);
  const [open, setOpen] = useState(openDrawdown);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (_id) => {
    setSelectedIcon(_id);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={customClass}>
      {accordionData.map(
        (
          { title, data, subtitle, rightComponent, bottomComponent, subType },
          index,
        ) => (
          <React.Fragment key={index}>
            <RenderAccord
              title={title}
              subtitle={subtitle}
              data={data}
              rightComponent={rightComponent}
              bottomComponent={bottomComponent}
              subType={subType}
              index={index}
              isActive={isActive}
              setIsActive={setIsActive}
              open={open}
              setOpen={setOpen}
              isHovered={isHovered}
              selectedIcon={selectedIcon}
              handleMouseLeave={handleMouseLeave}
              handleMouseEnter={handleMouseEnter}
              openDrawdown={openDrawdown}
              customValueClass={customValueClass}
              custumHeaderStyle={custumHeaderStyle}
              customAccordionCell={customAccordionCell}
              customAccordionItemStyle={customAccordionItemStyle}
              customRightContainer={customRightContainer}
              customRightComponentContainer={customRightComponentContainer}
            />
          </React.Fragment>
        ),
      )}
    </div>
  );
}

Accordian.propTypes = {
  accordionData: PropTypes.array,
  customClass: PropTypes.object,
  openDrawdown: PropTypes.bool,
  customValueClass: PropTypes.object,
  custumHeaderStyle: PropTypes.object,
  customAccordionCell: PropTypes.object,
  customAccordionItemStyle: PropTypes.object,
};
