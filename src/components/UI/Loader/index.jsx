import React from "react";
import classes from "./index.module.less";
/**
 * @typedef {Object} LoaderProps
 * @property {'large'|'small'} size - loader size
 * @property {string} className - styles
 */

/**
 * Loader UI component
 * @param {LoaderProps} props
 * @returns {JSX.Element}
 */
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
