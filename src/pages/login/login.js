import React, { useContext, useState } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification
} from 'firebase/auth'
import { UserContext } from '../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './login.css'; 

import Logo from '../../assets/hit-logo.svg'
import { Form } from '../../components/atoms/form/form'
import { Button } from '../../components/atoms/button/button';
import { Input } from '../../components/atoms/input/input';

export const Login = () => {
    const { dispatch } = useContext(UserContext)
    const [signUpPage, setSignUpPage] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const auth = getAuth();
    const { state } = useLocation()

    const clearError = () => {
        setError(null)
    }

    const setSignUp = () => {
        document.getElementById('form').reset()
        setSignUpPage(!signUpPage)
    }

    const firebaseLogin = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            const user = userCredential.user
            if (!user.emailVerified) {
                throw new Error('Please verify your email!')
            }
            dispatch({
                type: 'SET_USER',
                user: user
            })
            navigate(state.from.pathname)
        }
        catch (err) {
            setError(err.message)
        }
    }

    const firebaseSignUp = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const sendVerifyEmail = await sendEmailVerification(auth.currentUser)
            setSignUpPage(!signUpPage)
        }
        catch (err) {
            setError(err.message)
        }
    }

    const onSubmit = (data) => {
        signUpPage 
        ? firebaseSignUp(data)
        : firebaseLogin(data)
    }

    const goToFreeTrail = () => {
        navigate('/free')
    }

    return (
        <div className='login-form-container'>

            <img 
                className='hit-logo-small' 
                src={Logo} 
                alt='Hockey interactive training logo'
            />

            <div className='login-form'>
                <h1>{signUpPage ? 'Sign up' : 'Log in'}</h1>
                {error && <span>{error}</span>}

                <Form 
                    id='form' 
                    onSubmit={onSubmit} 
                >              

                    <Input 
                        name='email' 
                        type='text'
                        onFocus={clearError}
                    />

                    <Input 
                        name='password' 
                        type='password'
                        onFocus={clearError}
                    />

                    <Button 
                        type='submit'
                        className='btn-pri'
                    > 
                    {signUpPage ? 'Sign up' : 'Log in'}
                    </Button>

                </Form>

                { !signUpPage &&
                    <>
                            <Button 
                            onClick={setSignUp}
                            className='btn-sec'
                        >
                            Sign up
                        </Button>
                        <Button 
                                onClick={goToFreeTrail}
                                className='btn-ter'
                        >
                            Try free version
                        </Button>
                    </>
                }

                {   signUpPage &&
                        <Button 
                            onClick={setSignUp}
                            className='btn-sec'
                        >
                            Back
                        </Button>                

                }
            </div>
            

        </div>
    )

}