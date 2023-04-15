import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorContext } from "../../../context/ErrorContext";
import './form.css'

export const Form =({ id, defaultValues, children, onSubmit }) => {
  const {setError} = useContext(ErrorContext)
  const methods = useForm({ defaultValues});
  const { handleSubmit, clearErrors, formState: { errors }} = methods;

  useEffect(() => {
    //console.log(errors)
    for (const [key, value] of Object.entries(errors)) {
      //console.log(key)
      setError(value.message)
      //weghalen van fouten zit wss hier
    }
  },[errors])

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      {
      React.Children.map(children.filter(child => child !== false), child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                errors: {errors},
                key: child.props.name
              }
            })
          : child;
       })}
    </form>
  );
}