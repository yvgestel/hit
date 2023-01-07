import React from 'react';
import './dropboxcontainer.css';

import { DropBoxItem } from '../../molecules/dropboxitem/dropboxitem';


const dropBoxItems = [
    {
        'id': 1,
        'title': 'Games'
    },
    {
        'id': 2,
        'title': 'Highscores - Overall'
    },
    {
        'id': 3,
        'title': 'Highscores - Team'
    },
]

export const DropBoxContainer = () => {

    return (
        <div className='dropbox-container'>
            {dropBoxItems.map(
                dropBoxItem => (
                    <DropBoxItem 
                        key={dropBoxItem.id} 
                        id={dropBoxItem.id} 
                        title={dropBoxItem.title}
                    />
                )
            )}
        </div>
    )

}