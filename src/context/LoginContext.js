import React, {createContext, useState} from "react";


export const LoginContext = createContext()

export const LoginContextProvider = (props) => {
    const [index, setIndex] = useState(false)

    const toggleIndex = () => {
        setIndex(!index)
    }

    return (
        <LoginContext.Provider value={{index, toggleIndex}}>
            { props.children }
        </LoginContext.Provider>
    )
}