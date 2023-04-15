import React, {useContext} from 'react';
import { 
    createUserWithEmailAndPassword, 
    sendEmailVerification
} from 'firebase/auth'
import { auth, createUserDocument } from '../../../helpers/firebase';

import { ErrorContext } from '../../../context/ErrorContext';
import { LoginContext } from '../../../context/LoginContext';
import authExceptionHelper from '../../../helpers/authExceptionHelper';
import './signup.css'; 

import { Form } from '../../../components/atoms/form/form'
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';

const MAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export const Signup = () => {
    const {error, setError} = useContext(ErrorContext)
    const { toggleIndex } = useContext(LoginContext)

    const clearError = () => {
        setError(null)
    }

    const firebaseSignUp = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const sendVerifyEmail = await sendEmailVerification(auth.currentUser)
            await createUserDocument(userCredential.user, data.email)
            setError('A verification is send to your mail.')
            toggleIndex()
        }
        catch (err) {
            setError(authExceptionHelper(err.code))
        }
    }

    const onSubmit = (data) => {
        firebaseSignUp(data)
    }

    return (
            <div className='login-form'>
                {error && <span>{error}</span>}

                <Form 
                    id='form' 
                    onSubmit={onSubmit} 
                >              

                    <Input 
                        name='email' 
                        type='text'
                        onFocus={clearError}
                        placeholder='email'
                        validationSchema={{ 
                            required: "Email is required",
                            pattern: {
                                value: MAIL_REGEX,
                                message: "Invalid email address"
                            }
                       }}
                    />

                    <Input 
                        name='password' 
                        type='password'
                        onFocus={clearError}
                        placeholder='password'
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
                        Sign up
                    </Button>

                </Form>
            </div>
    )
}