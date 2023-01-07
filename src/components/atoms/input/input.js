import React from "react";
import './input.css'

export const Input = ({ register, name, type, onFocus, ...rest }) => {
  return (
    <input
        type={type} 
        onFocus={onFocus}
        {...register(name)} 
        {...rest} 
    />
  )
}


