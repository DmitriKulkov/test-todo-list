import React from "react";
import classes from "./index.module.less";
/**
 * @typedef {Object} FormButtonProps
 * @property {'basic'|'submit'|'reject'} color - button color theme
 * @property {string} className - styles
 * @property {React.ReactNode} children - children components
 */
/**
 * Button UI component
 * @param {FormButtonProps} props
 * @returns {JSX.Element}
 */
export const FormButton = ({
  color = "basic",
  className,
  children,
  ...rest
}) => {
  return (
    <button
      className={classes.form_button + " " + classes[color] + " " + className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default FormButton;
