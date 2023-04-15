import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../context/LoginContext';
import './auth.css'; 

import Logo from '../../../assets/hit-logo.svg'
import { Button } from '../../../components/atoms/button/button';

import { Login } from '../../molecules/login/login'
import { Signup } from '../../molecules/signup/signup'

export const Auth = () => {
    const {index, toggleIndex} = useContext(LoginContext)

    const navigate = useNavigate()

    const goToFreeTrail = () => {
        navigate('/free')
    }

    return (
        <div className='auth-container'>

            <img 
                className='hit-logo-small' 
                src={Logo} 
                alt='Hockey interactive training logo'
            />

            <div className='auth-form'>
                <h1>
                    {index ? 'Sign up' : 'Log in'}
                </h1>

                {index ? <Signup/> : <Login/> }


                <Button 
                    onClick={toggleIndex}
                    className='btn-plain'
                >
                    {index ? 'I already have an account' : 'Create a new account'}
                </Button>

                <div className='bttm-border-box'>
                    <Button 
                        onClick={goToFreeTrail}
                        className='btn-ter'
                    >
                        Try our free version now
                    </Button>
                </div>
            </div>
        </div>     
    )
}