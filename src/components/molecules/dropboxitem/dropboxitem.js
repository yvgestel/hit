import React from 'react';
import './dropboxitem.css';

export const DropBoxItem = ({id, title}) => {

    const dropdownIcon = 'dropdown-icon'+id
    const dropboxListContainerID = 'dropbox-list-container'+id

    const toggleDropDown = () => {
        const dropDownIcon = document.getElementById(dropdownIcon)
        const dropBoxListContainer = document.getElementById(dropboxListContainerID)
        const classList = dropDownIcon.className.split(' ')
        classList.includes('active-dropdown')
        ? dropDownIcon.classList.remove('active-dropdown') || dropBoxListContainer.classList.remove('active-dropdown')
        : dropDownIcon.classList.add('active-dropdown') || dropBoxListContainer.classList.add('active-dropdown')
    }

    return (
        <div className='dropbox-item'>
            <div className='dropbox-header-container'>
                <h1 className='dropbox-title'>{title}</h1>
                <div className='dropdown-item-box'>
                    <span id={dropdownIcon} className='dropdown-icon' onClick={toggleDropDown}/>
                </div>
            </div>
            
            <div id={dropboxListContainerID} className='dropbox-list-container'>
                <h2>AAA</h2>
                <h2>BBB</h2>
                <h2>CCC</h2>
            </div>
        </div>
    )

}