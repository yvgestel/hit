import React from "react";
import { useForm } from "react-hook-form";
import './form.css'

export const Form =({ id, defaultValues, children, onSubmit }) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      {
      React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name
              }
            })
          : child;
       })}
    </form>
  );
}