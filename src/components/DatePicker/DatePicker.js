 import React, { useState, useEffect, useRef } from 'react';
 import './datepicker.css';
 import LeftIcon from '../../assets/images/arrow-left-s-line.svg'
 import RightIcon from '../../assets/images/arrow-right-s-line.svg'
 import CalendarIcon from "../../assets/images/CalendarIcon.svg"
 import moment from 'moment';
 
 const DatePicker = ({
   label,
   onDateChange,
   error,
   helperText,
   format,
   isBoxType,
   customInputClass,
   isDisabled = false , 
   startingDate = null,
   endingDate = null,
   age = null , 
   initialValue , 
   disableFuture = false,
   disablePast = false,
   customStartDate= null, //DD-MM-YYYY
   customEndDate=null //DD-MM-YYYY
 }) => {
   let currentDate = new Date();
   const [selectedDate, setSelectedDate] = useState(currentDate);
   const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  //  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
   const [isCalendarVisible, setIsCalendarVisible] = useState(false);
   const [inputDate, setInputDate] = useState('');
   const calendarRef = useRef(null);
   const calendarInputRef = useRef(null);
   const [isMonthMenuOpen, setIsMonthMenuOpen] = useState(false);
   const [dateOfMonth, setDateOfMonth] = useState('');
   const [isYearMenuOpen, setIsYearMenuOpen] = useState(age ? true : false);
   let currentYear = currentDate.getFullYear();
   const [currentDateBackground, setCurrentDateBackground] = useState('');
 
   const toggleMonthMenu = () => {
     setIsMonthMenuOpen(!isMonthMenuOpen);
   };
   const toggleYearMenu = () => {
     setIsYearMenuOpen(!isYearMenuOpen);
   };
 
   const months = [
     'Jan',
     'Feb',
     'Mar',
     'Apr',
     'May',
     'Jun',
     'Jul',
     'Aug',
     'Sep',
     'Oct',
     'Nov',
     'Dec',
   ];
 

  let endYear =currentYear - age ;

  const getYearOptions = () => {
    let startYear = startingDate ?  startingDate : 1950;

    if(age > 0){
      endYear = currentYear - age;
      
    } else{
      endYear = endingDate ? endingDate : 2030
    }
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  const [selectedYear, setSelectedYear] = useState(!age ? currentDate.getFullYear() : endYear);
  
 
   const handleYearChange = (e) => {
     setSelectedYear(parseInt(e.target.value));
     setIsMonthMenuOpen(true);
     calendarRef.current = null;
   };
 
   const handleMonthChange = (e) => {
     setSelectedMonth(months.indexOf(e.target.value));
     calendarRef.current = null;
   };
 
   const getDaysInMonth = (year, month) => {
     return new Date(year, month + 1, 0).getDate();
   };
 
   const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
   const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
 
   const getFirstDayOfWeek = (year, month) => {
     return new Date(year, month, 1).getDay();
   };
 
   const firstDayOfWeek = getFirstDayOfWeek(selectedYear, selectedMonth);
   const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
 
   const toggleCalendar = () => {
     setIsCalendarVisible(!isCalendarVisible);
   };
 
   const handleOutsideClick = (event) => {
     if (calendarRef.current && !calendarRef.current.contains(event.target) && !calendarInputRef.current.contains(event.target)) {
       setIsCalendarVisible(false);
     }
   };
 
   const handleDateClick = (day, event) => {
     setDateOfMonth(day);
     const newSelectedDate = new Date(selectedYear, selectedMonth, day);
     setSelectedDate(newSelectedDate);
 
     const dayOfMonth = newSelectedDate.getDate();
     const monthOfYear = newSelectedDate.getMonth() + 1;
     const year = newSelectedDate.getFullYear();
     let formattedDate = `${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}-${
       monthOfYear < 10 ? '0' : ''
     }${monthOfYear}-${year}`;
 
     formattedDate = moment(newSelectedDate).format(format);
 
     setInputDate(formattedDate);
     onDateChange(formattedDate);
     setIsCalendarVisible(false);
   };

  const handleDateClickAge = (day, event) => {
    const newSelectedDate = new Date(selectedYear, selectedMonth, day);
    const allowedDate = new Date();
    allowedDate.setFullYear(allowedDate.getFullYear() - age);

  
    if (newSelectedDate <= allowedDate) {
      setDateOfMonth(day);
  
      const dayOfMonth = newSelectedDate.getDate();
      const monthOfYear = newSelectedDate.getMonth() + 1;
      const year = newSelectedDate.getFullYear();
      let formattedDate = `${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}-${
        monthOfYear < 10 ? '0' : ''
      }${monthOfYear}-${year}`;
  
      formattedDate = moment(newSelectedDate).format(format);
  
      setInputDate(formattedDate);
      onDateChange(formattedDate);
      setIsCalendarVisible(false);
    } else {
      // console.error('Selected date is beyond the allowed range.');
      console.warn('Selected date is beyond the allowed range.');
    }
  };
  
 
   const handleSubmit = () => {
     if (inputDate != '') {
       inputDate;
       setIsCalendarVisible(false);
     }
   };
 
   useEffect(() => {
     if (isCalendarVisible) {
       document.addEventListener('click', handleOutsideClick);
     } else {
       document.removeEventListener('click', handleOutsideClick);
     }
 
     return () => {
       document.removeEventListener('click', handleOutsideClick);
     };
   }, [isCalendarVisible]);



   useEffect(() => {
    const currentDateString = moment(currentDate).format(format);
    setCurrentDateBackground(currentDateString);
  }, [format]);

  const isFutureDate = (year, month, day) => {
    const selectedDate = new Date(year, month, day);
    currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate())
    if(customEndDate){
     const date = customEndDate.split('-');
     currentDate = new Date(date[2],date[1]-1,date[0]);
    }
    return (disableFuture || customEndDate) !== (null && false) ? (selectedDate > currentDate) : false;
  };
  const isPastDate = (year, month, day) => {
    const selectedDate = new Date(year, month, day);
    currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(),currentDate.getDate())
    if(customStartDate){
     const date = customStartDate.split('-');
     currentDate = new Date(date[2],date[1]-1,date[0]);
    }
   return (disablePast || customStartDate) !== (null && false) ? selectedDate < currentDate : false;
 };
  
    let allowedDate = new Date();
    allowedDate.setFullYear(allowedDate.getFullYear() - age);

  
    const isFutureDateAge = (selectedYear, selectedMonth, day) => {
      let newSelectedDate = new Date(selectedYear, selectedMonth, day);
      return age ? allowedDate < newSelectedDate : false;
    };
     

 
   return (
     <div className="datepicker-container">
       <div>
       <span ref= {calendarInputRef}  style={{position:"relative"}}>
         {/* <input
            readOnly
           type="text"
           value={inputDate || initialValue}
           onClick={toggleCalendar}
           placeholder={label}
           disabled={isDisabled}
           style={{
            ...customInputClass,
             borderRadius: '8px',
             border: `1px solid ${error ? 'red' : '#BBBFCC'}`,
             minHeight: "50px",
             flexDirection: 'column',
             position: 'relative',
             color: 'black',
             backgroundColor: isDisabled ? "rgb(244, 244, 244)":""
           }}
         /> */}
         <input
        readOnly
        type="text"
        value={inputDate || initialValue}
        onClick={toggleCalendar}
        onChange={(e) => setInputDate(e.target.value)}
        placeholder={null}
        disabled={isDisabled}
        style={{
          ...customInputClass,
          borderRadius: '8px',
          border: `1px solid ${error ? 'red' : '#BBBFCC'}`,
          padding: inputDate ? "20px 20px 0px 17px" :  initialValue && isDisabled ? "20px 20px 0px 17px" :  initialValue ? "20px 20px 0px 17px" : "20px",
          minHeight: "50px",
          flexDirection: 'column',
          top : inputDate  ? '-50%' : initialValue && isDisabled ? "-50%" : initialValue ? "-50%"  : '10%',
          position: 'relative',
          color: isDisabled ? "#333" : 'black',
          backgroundColor: isDisabled ? "rgb(244, 244, 244)" : "",
        }}
      />
      <label
        style={{
          position: 'absolute',
          top: inputDate  ? '-75%' : initialValue && isDisabled ? "-75%" : initialValue ? "-75%" : '0%',
          left: '20px',
          pointerEvents: 'none',
          transition: '0.2s ease-out',
          color: isDisabled ? "rgb(122 117 117)" : 'black',
          fontSize: inputDate  ? '12px' : initialValue && isDisabled  ? "12px" :  initialValue ? "12px": '16px',
        }}
      >
        {label}
      </label>
          {isBoxType=="icon"  && (
             <span className="caleendericon" >
             <img src={CalendarIcon} alt='Calender Icon' onClick={!isDisabled && toggleCalendar}  />
             </span>
           )}
          </span>
 
         {error && <div style={{ color: 'red' }}>{error}</div>}
         {error ? (
           <div style={{ color: '#EA2A33', fontSize: '10px' }}>{helperText}</div>
         ) : null}
       </div>
 
       {isCalendarVisible && (
         <div style={{ position: 'absolute', top: '60px' }} className="overlay">
           <div
             style={{
               borderRadius: '10px',
               border: '1px solid #e4e4e4',
               position: 'relative',
             }}
             className="custom-date-picker"
             ref={calendarRef}
           >
             <div className="custom-header">
               <button
               disabled ={getYearOptions()[0] && selectedYear === getYearOptions()[0] && selectedMonth === 0}
                 className="nav-button"
                 onClick={() => {
                   const prevMonth = new Date(
                     selectedYear,
                     selectedMonth - 1,
                     1,
                   );
                   setSelectedYear(prevMonth.getFullYear());
                   setSelectedMonth(prevMonth.getMonth());
                 }}
               >
                 <img  height={"20px"} width={"20px"} src={LeftIcon} alt="hello" />
               </button>
               <div className="month-year-container">
                 <div
                   className={`month-select ${isMonthMenuOpen ? 'open' : ''}`}
                   onClick={toggleMonthMenu}
                 >
                   {months[selectedMonth]}
                   {isMonthMenuOpen && (
                     <div className="month-menu">
                       {months.map((month, index) => (
                         <div
                           key={month}
                           className={`month-option ${
                             index === selectedMonth ? 'selected' : ''
                           }`}
                           onClick={() => {
                             handleMonthChange({ target: { value: month } });
                           }}
                         >
                           {month}
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
                 <div
                   className={`year-select ${isYearMenuOpen ? 'open' : ''}`}
                   onClick={toggleYearMenu}
                 >
                   {selectedYear}
                   {/* {age ? endYear : selectedYear} */}
                   {isYearMenuOpen && (
                     <div className="year-menu">
                       {getYearOptions().map((year) => (
                         <div
                           key={year}
                           className={`year-option ${
                             year === selectedYear ? 'selected' : ''
                           }`}
                           onClick={() => {
                             handleYearChange({
                               target: { value: year.toString() },
                             });
                           }}
                         >
                           {year}
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
               <button
                 className="nav-button"
                 onClick={() => {
                   const nextMonth = new Date(
                     selectedYear,
                     selectedMonth + 1,
                     1,
                   );
                   setSelectedYear(nextMonth.getFullYear());
                   setSelectedMonth(nextMonth.getMonth());
                 }}
               >
                 <img height={"20px"} width={"20px"} src={RightIcon} alt="hello" />
               </button>
             </div>
 
             <div className="calendar-grid">
               <div className="weekdays">
                 <div>Su</div>
                 <div>Mo</div>
                 <div>Tu</div>
                 <div>We</div>
                 <div>Th</div>
                 <div>Fr</div>
                 <div>Sa</div>
               </div>
               <div className="days">
                 {Array.from({ length: firstDayOfWeek }, (_, i) => (
                   <div key={`empty-${i}`} className="empty-day"></div>
                 ))}
                 {daysArray.map((day, index) => (
                   <div
                     key={day}
                    className={`day ${day === dateOfMonth ? 'selected' : ''} ${isFutureDate(selectedYear, selectedMonth, day) ? 'future-date' : ''} ${isFutureDateAge(selectedYear, selectedMonth, day)? 'future-dateage' : ''} ${isPastDate(selectedYear, selectedMonth, day) ? 'future-date' : ''}`}
                    // className={`day ${day === dateOfMonth ? 'selected' : ''} ${isFutureDate(selectedYear, selectedMonth, day) ? 'future-date' : ''}`}
                     onClick={(event) => {
                      age ? handleDateClickAge(day, event) : handleDateClick(day, event)
                     }}
                   >
                     {day}
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };
 
 export default DatePicker;