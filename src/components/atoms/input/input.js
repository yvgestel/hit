import React from "react";
import './input.css'

export const Input = ({ register, validationSchema, name, type, onFocus, placeholder, ...rest }) => {
  return (
    <>
      <input
        type={type} 
        onFocus={onFocus}
        placeholder={placeholder}
        {...register(name, validationSchema)} 
        {...rest} 
      />
    </>
  )
}


