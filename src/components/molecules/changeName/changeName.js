import React, { useContext } from 'react';
import './changeName.css';

import { ErrorContext } from '../../../context/ErrorContext';

import { updateUserName } from '../../../helpers/firebase';

import { Form } from '../../atoms/form/form';
import { Button } from '../../atoms/button/button';
import { Input } from '../../atoms/input/input';

export const ChangeName = ({ resetFunction }) => {
    const {error, setError} = useContext(ErrorContext)

    const clearError = () => {
        setError(null)
    }

    const goBack = () => {
        resetFunction()
    }

    const onSubmit = (data) => {
        updateUserName(data.name)
        resetFunction()
    }

    return (
        <>
            <h1>Change your username</h1>

            {error && <span>{error}</span>}

            <Form 
                    id='form' 
                    onSubmit={onSubmit} 
            >    
                <Input 
                    name='name' 
                    type='name'
                    onFocus={clearError}
                    placeholder='name'
                    validationSchema={{ 
                    required: "Username is required",
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