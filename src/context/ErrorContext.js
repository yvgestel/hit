import React, {createContext, useState} from "react";


export const ErrorContext = createContext()

export const ErrorContextProvider = (props) => {
    const [ error, setError] = useState(null)

    return (
        <ErrorContext.Provider value={{error, setError}}>
            { props.children }
        </ErrorContext.Provider>
    )
}