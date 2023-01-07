import React from 'react';
import './home.css';

import { Navbar } from '../../components/organisms/navbar/navbar';
import { DropBoxContainer } from '../../components/organisms/dropboxcontainer/dropboxcontainer';

export const Home = () => {

    return (
        <>
            <Navbar />
            <DropBoxContainer />
        </>
    )

}