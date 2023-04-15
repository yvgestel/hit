import React, { useState } from 'react';
import './profile.css';

import { updatePassword } from 'firebase/auth'

import { Navbar } from '../../components/organisms/navbar/navbar';
import { Button } from '../../components/atoms/button/button';
import { ChangeName } from '../../components/molecules/changeName/changeName';
import { ChangePassword } from '../../components/molecules/changePassword/changePassword';

export const Profile = () => {
    const [profilePage, setProfilePage] = useState('')

    const resetRenderSwitch = () => {
        setProfilePage('')
    }

    function renderSwitch() {
        switch(profilePage) {
          case 'name':
            return ( 
                <ChangeName 
                    resetFunction={resetRenderSwitch}
                />
            );
            case 'password':
            return ( 
                <ChangePassword 
                    resetFunction={resetRenderSwitch}
                />
            );
          default:
            return (
                <>
                    <Button 
                        type='submit'
                        className='btn-pri'
                        onClick={() => setProfilePage('name')}
                    > 
                        Naam wijzigen
                    </Button>   
                    <Button 
                        type='submit'
                        className='btn-pri'
                        onClick={() => setProfilePage('password')}
                    > 
                        Wachtwoord wijzigen
                    </Button>
                </>
            );
        }
      }

    return (
        <>
            <Navbar/>
            <div className='profile-container'>\
                {renderSwitch()}
            </div>
        </>
    )

}