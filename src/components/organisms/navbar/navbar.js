import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext';
import './navbar.css'

import Logo from '../../../assets/hit-logo.svg'

export const Navbar = () => {

    const { user, dispatch } = useContext(UserContext)

    const getElements = () => {
        const container = document.getElementById('hamburger-menu-container')
        const header = document.getElementById('nav-header')
        const ul = document.getElementById('nav-bar')
        const classList = container.className.split(' ')
        return (
            [container, header, ul, classList]
        )
    } 

    const openOrCloseNav = () => {
        const [container, header, ul, classList] = getElements()
        classList.includes('active-menu')
        ? container.classList.remove('active-menu') || header.classList.remove('active-menu') || ul.classList.remove('active-menu')
        : container.classList.add('active-menu') || header.classList.add('active-menu') || ul.classList.add('active-menu')       
    }

    const closeNav = () => {
        const [container, header, ul, classList] = getElements()
        if (classList.includes('active-menu')) {
            container.classList.remove('active-menu') || header.classList.remove('active-menu') || ul.classList.remove('active-menu')
        }
    }

    const logOutUser = () => {
        dispatch({
            type: 'SET_USER',
            user: {}
        })
        openOrCloseNav()
    }

    return  (
        <>
            <header id='nav-header'>
                <Link to='/'>
                    <img 
                        className='hit-logo' 
                        src={Logo} 
                        alt='Hockey interactive training logo'
                        onClick={closeNav}
                    />
                </Link>
                <div id='hamburger-menu-container' className='hamburger-menu-container' onClick={openOrCloseNav}>
                    <div className='hamburger-menu'></div>
                </div>
            </header>        
            <nav id='nav-bar'>
                <ul>
                    <li onClick={openOrCloseNav}>
                        <Link
                            className='link'
                            to='/'
                        >
                            Home
                        </Link>
                    </li>
                    <li onClick={openOrCloseNav}>
                        <Link
                            className='link'
                            to='/'
                        >
                            Single player
                        </Link>
                    </li>
                    <li onClick={openOrCloseNav}>
                        <Link
                            className='link'
                            to='/'
                        >
                            Multiplayer
                        </Link>
                    </li>
                    {
                        !user.uid && 
                        <li onClick={openOrCloseNav}>
                            <Link
                                className='link'
                                to='/login'
                            >
                                Login
                            </Link>
                        </li>
                    }
                    {
                        user.uid && 
                        <>
                            <li onClick={logOutUser}>
                                <Link
                                    className='link'
                                    to='/'
                                >
                                    My profile
                                </Link>
                            </li>
                            <li onClick={logOutUser}>
                                <Link
                                    className='link'
                                    to='/'
                                >
                                    Logout
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </nav>
        </>
    )
}