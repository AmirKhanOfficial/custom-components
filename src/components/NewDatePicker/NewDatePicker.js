import React, { useState, useEffect, useRef } from 'react';
import './NewDatePicker.css';
import LeftIcon from '../../assets/images/arrow-left-s-line.svg'
import RightIcon from '../../assets/images/arrow-right-s-line.svg'
import CalendarIcon from "../../assets/images/CalendarIcon.svg"
import moment from 'moment';

const NewDatePicker = ({
    label,
    onDateChange,
    error,
    helperText,
    isBoxType,
    selectedDate,
}) => {
    const currentMonth = moment().format('MMM');
    const currentYear = parseInt(moment().format('YYYY'));

    const getDefaultSelectedYear = () => {
        return currentMonth === 'Jan' ? currentYear - 1 : currentYear;
    };

    const getDefaultSelectedMonth = () => {
        return currentMonth === 'Jan'
            ? 'Dec'
            : moment().subtract(1, 'month').format('MMM');
    };

    const [startYear, setStartYear] = useState(getDefaultSelectedYear());
    const [yearsMenu, setYearsMenu] = useState([]);

    const [yearOpen, setYearOpen] = useState(true);
    const [monthOpen, setMonthOpen] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const [selectedYear, setSelectedYear] = useState(getDefaultSelectedYear());
    const [selectedMonth, setSelectedMonth] = useState(getDefaultSelectedMonth());

    const calendarRef = useRef(null);

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

    const handleOutsideClick = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    useEffect(() => {
        if (showCalendar) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showCalendar]);

    useEffect(() => {
        getYearOptions();
    }, [startYear])

    const getYearOptions = () => {
        const endYear = startYear + 20;
        const years = [];
        const currentYear = new Date().getFullYear();
        for (let year = startYear; year <= endYear; year++) {

            years.push({
                value: year,
                disabled: year > currentYear,
            });
        }
        setYearsMenu(years);

    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
        setYearOpen(true);
        setMonthOpen(false);
    };



    return (
        <>
            <div className='new-datepicker-container'>
                <div>
                    <span style={{ position: "relative" }}>

                        <input
                            type="text"
                            value={selectedDate}
                            onClick={toggleCalendar}
                            placeholder={label}
                            style={{
                                width: '25vw',
                                maxWidth: '282px',
                                padding: '8px 8px',
                                borderRadius: '8px',
                                border: `1px solid ${error ? 'red' : '#BBBFCC'}`,
                                height: '58px',
                                flexDirection: 'column',
                                position: 'relative',
                                color: 'black',
                                fontFamily: 'Montserrat-Regular',
                            }}
                        />

                        {isBoxType == "icon" && (
                            <span className="new-calendericon" >
                                <img src={CalendarIcon} alt='Calender Icon' onClick={toggleCalendar} />
                            </span>
                        )}
                    </span>

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {error ? (
                        <div style={{ color: '#EA2A33', fontSize: '10px' }}>{helperText}</div>
                    ) : null}
                </div>
                {showCalendar && <div className='new-overlay' >


                    <div style={{ justifyContent: "space-between", display: "flex" }}>
                    </div>
                    <div ref={calendarRef}>
                        {yearOpen &&
                            <div className="new-year-menu">
                                <img style={{ height: "20px", width: "20px", marginLeft: "20px" }} src={LeftIcon} alt="hello" onClick={() => {
                                    setStartYear(startYear - 20);
                                }} />
                                <div style={{ fontSize: "16px", color: "#344054", marginLeft: "10px" }}>Years</div>
                                <img style={{ height: "20px", width: "20px", marginLeft: "25px" }} src={RightIcon} alt="hello" onClick={() => {
                                    setStartYear(startYear + 20);
                                }} />
                                {yearsMenu.map(({ value: year, disabled }) => (
                                    <div
                                        key={year}
                                        className={`new-year-option ${year === selectedYear ? 'selected' : ''
                                            } ${disabled ? 'disabled' : ''}`}
                                        onClick={() => {
                                            if (!disabled) {
                                                setSelectedYear(year);
                                                setYearOpen(false);
                                                setMonthOpen(true);
                                                calendarRef.current = null;
                                            }

                                        }}
                                    >
                                        {year}
                                    </div>
                                ))}
                            </div>}
                        {monthOpen &&
                            <div className="new-month-menu">
                                <img style={{ height: "20px", width: "20px", visibility: "hidden", cursor: "none" }} src={LeftIcon} alt="hello" />
                                <div style={{ fontSize: "16px", color: "#344054", }}>Month</div>
                                <img style={{ height: "20px", width: "20px", visibility: "hidden", cursor: "none" }} src={RightIcon} alt="hello" />
                                {months.map((month) => (
                                    <div
                                        key={month}
                                        className={`new-month-option ${month === selectedMonth ? 'selected' : ''
                                            }`}
                                        onClick={() => {
                                            setSelectedMonth(month);
                                            setMonthOpen(false);
                                            setShowCalendar(false);
                                            setYearOpen(true);
                                            onDateChange(month + " " + selectedYear)
                                        }}
                                    >
                                        {month}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>}
            </div>
        </>
    );
};

export default NewDatePicker;