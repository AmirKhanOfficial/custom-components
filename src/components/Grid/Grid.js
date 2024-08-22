import React, { useState, useEffect } from 'react'
import IconMenu from "../../assets/images/ActionIcon.svg"
import CheckBoxDashIcon from "../../assets/images/CheckboxDashIcon.svg"
import "./Grid.scss"
import PropTypes from "prop-types";
import ListItem from '../ListItem/ListItem.js'
import List from '../List/List'

export default function Grid  ({
    data,
    needCheckBox,
    needAction,
    heading,
    loanData,
    customClass
})  {

  const [hoveredDiv, setHoveredDiv] = useState(null);
  const [clickedDiv, setClickedDiv] = useState(null);
  const [listItem , setListItem] = useState(null);

  const [tableData, setTableData] = useState(data);
  let updatedData = data.map((item, index) => ({
    ...item,
    id: index,
    checked: false,
  }));
  data = updatedData;



  const handleMouseEnter = (index) => {
    setHoveredDiv(index);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };

  const handleClick = (index) => {
    setClickedDiv(index);
  }
  const [headCheckbox, setHeadCheckbox] = useState(false);
  const handleHeadCheckbox = () => {
    setHeadCheckbox(!headCheckbox);
    const checkedData = data.map((item) => {
      return !headCheckbox ? { ...item, checked: true } : { ...item, checked: false };

    });
    setTableData(checkedData);
  }


  const [checkedSubChecks, setCheckedSubChecks] = useState(0);

  useEffect(() => {
    setCheckedSubChecks(tableData.filter(item => item.checked === true).length);
  }, [tableData]);


  const handleRowCheckbox = (index) => {
    const singleUnchekedData = tableData.map((item) => {
      if (item.id === index) {
        return { ...item, checked: item.checked ? false : true };
      }
      return item;
    });
    setTableData(singleUnchekedData);
  }


  const removeAllPartialSelection = () => {
    const singleUnchekedData = tableData.map((item) => {
      return { ...item, checked: false };
    });
    setTableData(singleUnchekedData);
  }

  const [isDivVisible, setDivVisible] = useState(true);
 

const listData = [
   {
    name : "Edit Lead",
    link : "/admin/lead/edit"
   },
   {
    name : "Lead Details",
    link : "/admin/lead/details"
   },
   {
    name : "Documents",
    link : "/admin/template/loandoclist"
   },
   {
    name : "Xml Documents",
    link : "/admin/template/loandoclist"
   },
   {
    name : "Loan Details",
    link : "/admin/lending/additionalinfo"
   },
   {
    name : "Cams Details",
    link : "/admin/lending/leads/cams"
   },
   {
    name : "Logs",
    link : "/admin/"
   },
   {
    name : "Selector Data",
    link : "/admin/lending/leads/selector"
   },
]

// const loanData = [
//   {
//    name : "Loan Profile Details",
//    link : "/admin/loan/details/origin_lms"
//   },
//   {
//    name : "Lead Details",
//    link : "/admin/lead/details"
//   },
//   {
//    name : "Documents",
//    link : "/admin/template/loandoclist"
//   },
//   {
//    name : "Xml Documents",
//    link : "/admin/template/loandoclist"
//   },
//   {
//    name : "Loan Details",
//    link : "/admin/lending/additionalinfo"
//   },
//   {
//    name : "Cams Details",
//    link : "/admin/lending/leads/cams"
//   },
//   {
//    name : "Logs",
//    link : "/admin/"
//   },
//   {
//    name : "Selector Data",
//    link : "/admin/lending/leads/selector"
//   },
// ]
const handleOpenSingleAction = (e , index) => {

    if(e.name === "Edit Lead"){
      window.open(e.link + "/" + loanData[index].loan_app_id +"/" + loanData[index].company_id + "/" +loanData[index].product_id +"/" + loanData[index].loan_schema_id, "_blank" );
    }
    if(e.name === "Lead Details"){
      window.open(e.link + "/" + loanData[index].loan_app_id +"/" + loanData[index].company_id + "/" +loanData[index].product_id +"/" + loanData[index].loan_schema_id,"_blank" );
    }
    if(e.name === "Documents"){
        window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      }
      if(e.name === "Xml Documents"){
        window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      }
      if(e.name === "Loan Details"){
        window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      }
      if(e.name === "Cams Details"){
        window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      }
      if(e.name === "Selector Data"){
        window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      }
      // if(e.name === "Loan Profile Details"){
      //   window.open(e.link + "/" + loanData[index].loan_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Validation Doc"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Upload Repayment Schedules"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Repayment"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Transaction History"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Repayment Schedule"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Refund"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Settlement Offer"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Statement of account"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Loan Recon"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Record Charge"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Status Change Logs"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Fees And Charges"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Waiver Request"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
      // if(e.name === "Foreclosure Details"){
      //   window.open(e.link + "/" + loanData[index].company_id +"/" + loanData[index].product_id + "/" + loanData[index].loan_app_id,"_blank");
      // }
}
const handleIconClick = (e) => {
    setListItem(e);
    isDivVisible ? setDivVisible(false) :setDivVisible(true);
}
  return (
    <div style ={{customClass}}>
      <div className='header'>
        {needCheckBox && <div className='checkbox-header'>
          {checkedSubChecks < tableData.length && checkedSubChecks > 0
            ? <img src={CheckBoxDashIcon} onClick={removeAllPartialSelection} className="checkbox-dash-icon" />
            : <input value="test" type="checkbox" checked={checkedSubChecks > data.length - 1 ? true : checkedSubChecks === 0 ? false : headCheckbox} onClick={handleHeadCheckbox} className='checkbox' />
          }
        </div>}
        {heading.map((element, index) => (
          <div className={index === 0 && !needCheckBox ? "first-row-title" : 'title'} >
            {element}
          </div>
        ))}
        {needAction &&
          <div className='action-head'>
            ACTION
          </div>}
      </div>

      {tableData.map((content, index) => (
        <div
        key= {index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
          className={clickedDiv === index ? "clicked-row" : hoveredDiv === index ? "content-row-hovered" : index === data.length - 1 ? "content-row-last" : 'content-row'}>
          {needCheckBox && <div key={index} className='checkbox-header'>
            <input onClick={() => handleRowCheckbox(content.id)} value="test" type="checkbox" className='checkbox' checked={content.checked} />
          </div>}
          {content.rowData.map((element, index) => (
            <div className={index === 0 && !needCheckBox ? 'first-element-content-style' : 'content-style'} >
              {element}
            </div>
          ))}
          {needAction &&
            <div className={listItem === content.id  && isDivVisible ? "action-icon-selected" :'action-icon'}>
              <img  src={IconMenu} onClick={() => handleIconClick(content.id)} className="icon" /> 
           {
            listItem === content.id  && isDivVisible ? 
      <List customStyle={{width: "190px", marginLeft: "10px"}} open={true}  noScroll={false} >
          {listData.map((item , index) => (
        <ListItem key={index}  customStyle={{width: "190px", fontWeight : "400"}} disabled={false}   onClick={() => handleOpenSingleAction(item , index)}> {item.name} </ListItem>
             ))}  
        </List>
            : null}
            </div>}
        </div>
      ))
      }
    </div>
  )
}
Grid.PropTypes = {
    data : PropTypes.array,
    needCheckBox : PropTypes.bool,
    needAction :PropTypes.bool,
    heading : PropTypes.array,
    loanData : PropTypes.array,
    customClass : PropTypes.object
};
  