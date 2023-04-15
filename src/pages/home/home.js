import React from 'react';
import './home.css';

import { Navbar } from '../../components/organisms/navbar/navbar';
import { DropBoxContainer } from '../../components/organisms/dropboxcontainer/dropboxcontainer';

export const Home = () => {

    const user = 'yvgestel@outlook.com'

    return (
        <>
            <Navbar />

            <p className='welcome-text'> Welkom {user}!</p>

            <DropBoxContainer />
        </>
    )

}