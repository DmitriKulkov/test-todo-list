import React from "react";
import classes from "./index.module.less";
/**
 * @typedef {Object} EditDialogProps
 * @property {Boolean} open - is dialog visible
 * @property {Function} setOpen - set dialog visible
 * @property {String} className - styles
 * @property {React.ReactNode} children - children components
 */

/**
 * Dialog UI component
 * @param {EditDialogProps} props
 * @returns {JSX.Element}
 */
const EditDialog = ({ open, setOpen, className, children, ...rest }) => {
  return (
    <dialog
      className={open ? classes.edit + " " + classes.edit_open : classes.edit}
      {...rest}
      onClick={() => setOpen(false)}
    >
      <div
        className={classes.edit__container + " " + className}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </dialog>
  );
};

export default EditDialog;
