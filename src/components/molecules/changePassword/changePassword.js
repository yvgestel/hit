import React, { useContext } from 'react';
import './changePassword.css';

import { ErrorContext } from '../../../context/ErrorContext';
import { updateUserPassword } from '../../../helpers/firebase';

import { Form } from '../../atoms/form/form';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export const ChangePassword = ({ resetFunction }) => {
    const {error, setError} = useContext(ErrorContext)

    const clearError = () => {
        setError(null)
    }

    const goBack = () => {
        resetFunction()
    }

    const onSubmit = (data) => {
        try {
            updateUserPassword(data)
            //resetFunction()
        } catch (err) {
            console.log(err)
            setError(err)
        } 
    }

    return (
        <>
            <h1>Change password</h1>

            {error && <span>{error}</span>}

            <Form 
                    id='form' 
                    onSubmit={onSubmit} 
            >    
                <Input 
                    name='oldPassword' 
                    type='password'
                    onFocus={clearError}
                    placeholder='current password'
                    validationSchema={{ 
                    required: "Password is required",
                    }}
                />
                <Input 
                    name='newPassword' 
                    type='password'
                    onFocus={clearError}
                    placeholder='new password'
                    validationSchema={{ 
                    required: "Password is required",
                    pattern: {
                        value: PWD_REGEX,
                        message: "Invalid password. Please make sure to use lower- and uppercase, numbers en specail characters."
                        }
                    }}
                />
                <Button
                    type='submit'
                    className='btn-pri'
                >
                    Save
                </Button>
            </Form>
            <Button 
                onClick={goBack}
                className='btn-ter'
            >
                Back
            </Button>
        </>
    )
}