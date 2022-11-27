import React from "react";
import classes from "./index.module.less";

const Loader = ({ size = "large", className }) => {
  const sizes = {
    small: classes.small,
    large: classes.large,
  };

  return (
    <div className={classes.loader + " " + sizes[size] + " " + className} />
  );
};

export default Loader;
