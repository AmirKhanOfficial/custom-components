import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EditableAccordian.scss';
import ArrowUp from "../../assets/images/ArrowUp.svg"
import ArrowDown from "../../assets/images/ArrowDown.svg"
import InputBox from "../InputBox/InputBox"
import DatePicker from '../DatePicker/DatePicker';

export default function EditableAccordian({
  accordionData,
  customClass,
  onChange,
  onDateChange,
  stateData,
  validationData,
  dropDownChange,
  isEditable = true,
  states,
  city,
  keyName = "",
  enumData = null,
  dropdownInputList = null,
  sideButton = false,
  ButtonName = "Refresh",
  buttonOnclick,
  buttonCss,
  buttonDivCss
}) {
  const [isActive, setIsActive] = useState(accordionData.length > 0 ? accordionData[0].title : "");
  const [open, setOpen] = useState(false);
  function findObjectByTitle(inputString) {
    for (const item of accordionData) {
      if (item.data) {
        const foundObject = item.data.find(obj => obj.title.toLowerCase() === inputString);
        if (foundObject) {
          return foundObject;
        }
      }
    }
    return null;
  }

  function formatEnum(enumData, repayment_type) {
    let res;

    let a = enumData.loan[repayment_type] || enumData.lead[repayment_type];
    if (a) {
      res = a.map(item => ({
        "label": item,
        "value": item
      }));
    }
    return res;
  }


  const checkForField = field => {
    let found = false;
    dropdownInputList.map(inputObject => {
      Object.keys(inputObject).forEach(key => {
        key === field ? found = true : found;
      });
    });
    return found;
  };
  const updateOrgState = obj => {
    if (obj.name == "state name") {
      const selectedState = states.find(item => item.name === obj.value);
      dropDownChange(selectedState, "state");
      return;
    }
    if (obj.name == "city name") {
      const selectedCity = city.find(item => item.name === obj.value);
      dropDownChange(selectedCity, "city");
      return;
    }
    let isDropdown = false;
    dropdownInputList ? dropdownInputList.map(key => {
      Object.keys(key).forEach(item => {
        if (obj.name === item.replace(/_/g, ' ')) {
          dropDownChange(obj, key[item]);
          isDropdown = true;
        }
      });
    }) : null;
    if (isDropdown) {
      return;
    }
    const nestCurrentObj = findObjectByTitle(obj.name);
    onChange({
      target: {
        name: `${nestCurrentObj.type}_vl_${nestCurrentObj.field}`,
        value: obj.value
      }
    });
  };

  
  return (
    <div style={customClass} key={`EditableAccordian"${keyName}`}>
      {accordionData.map(({ title, data }, index) => (
        <div key={index} className="accordion-item-edit">
          <div className="accordion-title-edit" onClick={() => {
            setIsActive(title);
            if (title === isActive) {
              setOpen(!open);
            }

          }}>
            <div className='title-name-head-edit'>{title}</div>
            {
              (sideButton && title === "A-Score Details") ?
                <div style={buttonDivCss}>
                  <button style = {buttonCss} onClick={buttonOnclick}>{ButtonName}</button>
                </div>
                :
                null
            }
            <div className='dropdown-icon-edit' onClick={() => {
              setIsActive(title);
              if (title === isActive) {
                setOpen(!open);
              }

            }}>{isActive === title && open ? <img src={ArrowUp} alt='svg' size={"18px"} /> : <img src={ArrowDown} alt="svg" size={"18px"} />}</div>
          </div>
          {(isActive === title && open) &&
            <div className="accordion-content-edit">
              {data.map((item, index) => (
                <div key={index}>
                {(item.type.toLowerCase() === "date" || item.type === "dob") ?
                <div style={{marginLeft:"15px"}}>
                <DatePicker format={"YYYY-MM-DD"}
                    style={{marginLeft:"15px"}}
                    label={item.title}
                    initialValue={stateData[`${item.type}_vl_${item.field}`] || null}
                    isBoxType="icon"
                    isDisabled={item.readOnly ? item.readOnly : isEditable === true ? false : true}
                    onDateChange={date =>
                      onDateChange(date, `${item.type}_vl_${item.field}`)
                      }
                    customInputClass={{
                      height: "56px",
                      minWidth:"230px", 
                      padding:"15px 30px 0px 20px",
                      width: "450px",
                      maxWidth: "100%"
                    }}
                    error={
                      validationData[
                      `${item.type}_vl_${item.field}State`
                      ] === "has-danger"
                    }
                    helperText={validationData[
                      `${item.type}_vl_${item.field}State`
                    ] === "has-danger"
                      ? item.validationmsg
                      : ""}
                        />
                        </div>
                        :
                  <InputBox
                    placeholder={item.type === "date" ? item.title + " (YYYY-MM-DD)" : (item.isRequired && item.isRequired == true) ? item.title + "*" : null}
                    label={item.title}
                    key={item.title}
                    initialValue={stateData[`${item.type}_vl_${item.field}`]}
                    onClick={updateOrgState}
                    accordianResp={true}
                    isRequired={item.isRequired ? item.isRequired : false}
                    isDrawdown={(item.field === "state" || item.field === "city" || (dropdownInputList && enumData ? checkForField(item.field) : false)) ? true : false}
                    options={dropdownInputList && enumData ?
                      checkForField(item.field) ?
                        formatEnum(enumData, item.field) :
                        item.field === "state" ?
                          states :
                          item.field === "city" ?
                            city :
                            [] :
                      item.field === "state" ?
                        states :
                        item.field === "city" ? city : []}
                    error={
                      validationData[
                      `${item.type}_vl_${item.field}State`
                      ] === "has-danger"
                    }
                    helperText={validationData[
                      `${item.type}_vl_${item.field}State`
                    ] === "has-danger"
                      ? item.validationmsg
                      : ""}
                    customClass={{
                      height: "56px",
                      padding: "5px",
                      maxWidth: "450px",
                      marginLeft: "15px",
                      marginBottom: "25px"
                    }}
                    customInputClass={{ width: "100%", backgroundColor: "#fff" }}
                    customDropdownClass={{
                      marginTop:
                        validationData[
                          `${item.type}_vl_${item.field}State`
                        ] === "has-danger"
                          ? "-38px" : "8px"
                      , zIndex: "1", maxWidth: "450px", marginLeft: "-4px"
                    }}
                    isDisabled={item.readOnly ? item.readOnly : isEditable === true ? false : true}
                  /> }
                </div>
              ))
              }
            </div>
          }
        </div>
      ))}
    </div>
  );
}

EditableAccordian.propTypes = {
  accordionData: PropTypes.array,
  customClass: PropTypes.object,
  onChange: PropTypes.func,
  stateData: PropTypes.string,
  keyName: PropTypes.string,
  validationData: PropTypes.object,
  dropDownChange: PropTypes.func,
  isEditable: PropTypes.bool,
  sideButton: PropTypes.bool,
  ButtonName: PropTypes.string,
  buttonOnclick: PropTypes.func,
  buttonCss: PropTypes.object,
  buttonDivCss: PropTypes.object
};
