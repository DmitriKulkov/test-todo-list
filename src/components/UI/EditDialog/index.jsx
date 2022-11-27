import React from "react";
import classes from "./index.module.less";

const EditDialog = ({ open, setOpen, className, children, ...rest }) => {
  return (
    <dialog
      className={
        (open ? classes.edit + " " + classes.edit_open : classes.edit) +
        " " +
        className
      }
      {...rest}
      onClick={() => setOpen(false)}
    >
      <div
        className={classes.edit__container}
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
