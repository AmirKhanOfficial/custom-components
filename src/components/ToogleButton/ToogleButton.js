import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../ToogleButton/ToogleButton.scss';


export default function ToogleButton({
    onClick,
    isDisabled,
    text,
    initialState
}) {


    const classSpan = isDisabled ? "enable-toogle" : "disable-toogle";
    const classText = isDisabled ? "textEnable-toogle" : "textDisable-toogle";
    if (!initialState) {
        initialState = false;
    }
    const [toggle, setToggle] = useState(initialState);
    const handleClick = () => {
        setToggle(!toggle);
        onClick();
    }
    return (
        <div className='container-toogle'>
            <label className='label-toogle'>
                <input className='input-toogle' type="checkbox" defaultChecked={initialState} />
                <span className={classSpan} onClick={handleClick}></span>
            </label>
            <div className={classText}>
                {text}
            </div>
        </div>
    );
}


ToogleButton.propTypes = {
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    text: PropTypes.string,
    initialState: PropTypes.bool
};
