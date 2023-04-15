import React from 'react';
import './icon.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = ({ icon, onClick }) => {
    return (
        <div className='icon-container'>
            <FontAwesomeIcon 
                onClick={onClick}
                className='icon'
                icon={icon}
            />
        </div>
    )
}