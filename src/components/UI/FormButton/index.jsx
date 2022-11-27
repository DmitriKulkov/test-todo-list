import React from "react";
import classes from "./index.module.less";

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
