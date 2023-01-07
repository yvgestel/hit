import React, {useContext} from 'react';
import { UserContext } from '../../../context/UserContext';
import { 
    Navigate,
    useLocation
} from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext)
    const location = useLocation()

    return (
        user.uid 
        ? children 
        : <Navigate 
            to="/login" 
            replace={true} 
            state={{from: location}}
            />
    )
}