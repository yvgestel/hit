import React from 'react';
import { useNavigate } from 'react-router-dom';
import './game.css';

import Logo from '../../assets/hit-logo.svg'
import { Button } from '../../components/atoms/button/button';

export const Game = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate('/')
    }

    const startGame = () => {
        navigate('/startgame')
    }

    return (
        <div className='game-starter-container'>            
            <h1>Virtual dribble</h1>

            <img 
                className='hit-logo' 
                src={Logo} 
                alt='Hockey interactive training logo'
            />

            <p>Lorem ipsum</p>

            <Button 
                type='submit'
                className='btn-pri'
                onClick={startGame}
            > 
                Let's play!
            </Button>
            <Button 
                type='submit'
                className='btn-ter'
                onClick={goBack}
            > 
                Go back
            </Button>
        </div>
    )

}