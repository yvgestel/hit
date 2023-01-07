import React from 'react';
import './button.css';

const STYLES = [
    'btn-pri',
    'btn-sec',
    'btn-ter',    
]

export const Button = ({children, onClick, type, className}) => {

    const checkClassName = STYLES.includes(className) ? className : STYLES[0]

    return (
        <button
            onClick={onClick}
            type={type}
            className={checkClassName}
        >
            {children}
        </button>
    )
}