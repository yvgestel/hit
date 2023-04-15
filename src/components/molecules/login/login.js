import React, { useContext, useState } from 'react';
import { 
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from 'firebase/auth'
import { auth } from '../../../helpers/firebase';

import authExceptionHelper from '../../../helpers/authExceptionHelper';
import { UserContext } from '../../../context/UserContext';
import { ErrorContext } from '../../../context/ErrorContext';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

import { Form } from '../../../components/atoms/form/form'
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';

export const Login = () => {
    const { dispatch } = useContext(UserContext)
    const {error, setError} = useContext(ErrorContext)
    const [login, setLogin] = useState(true)

    const navigate = useNavigate()

    const clearError = () => {
        setError(null)
    }

    const firebaseLogin = async (data) => {

        if (!data.email || !data.password){
            setError('Fill in your email and password first')
            return
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
            if (!user.emailVerified) {
                console.log('not verified')
                const sendVerifyEmail = await sendEmailVerification(auth.currentUser)
                setError('Please verify your email!')
            }
            dispatch({
                type: 'SET_USER',
                user: user
            })
            if (window.history.state && window.history.state.idx > 0) {
                navigate(-1);
            } else {
                navigate('/', { replace: true }); 
                // the current entry in the history stack will be replaced with the new one with { replace: true }
            }
        }
        catch (err) {
            console.log(err)
            setError(authExceptionHelper(err.code))     
        }
    }

    const toggleLogin = () => {
        setLogin(!login)
    }

    const firebaseResetPassword = async (data) => {
        const resetPassword = await sendPasswordResetEmail(auth, data.email)
        setError('A new password is send to your email!')
        setLogin(true)
    }

    const onSubmit = (data) => {
        login ? firebaseLogin(data) : firebaseResetPassword(data)
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
                    />

                    {
                        login &&
                        <Input 
                            name='password' 
                            type='password'
                            onFocus={clearError}
                            placeholder='password'
                        />
                    }

                    <Button 
                        type='submit'
                        className='btn-pri'
                    > 
                        {login ? 'Login' : 'Reset password'}
                    </Button>

                </Form> 
                    
                <Button 
                    onClick={toggleLogin}
                    className='btn-ter'
                >
                    {login ? 'Forgot my password' : 'Back'}
                </Button>

            </div>
    )
}