import React from 'react';
import './login.css'; 

import { LoginContextProvider } from '../../context/LoginContext';
import { Auth } from '../../components/organisms/auth/auth';

export const Login = () => {
    return (
        <LoginContextProvider>
            <Auth />
        </LoginContextProvider>
    )
}