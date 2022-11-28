import React from "react";
import EditDialog from "../EditDialog";
import FormButton from "../FormButton";
import classes from "./index.module.less";

/**
 * @typedef {Object} ConfirmBoxProps
 * @property {Boolean} open - is message visible
 * @property {Function} setOpen - set message visible
 * @property {String} message - message text
 * @property {Function} onReject - function to perform on reject
 * @property {String} className - styles
 * @property {Function} onConfirm - function to perform on confirm
 * @property {String} confirm - confirm button message
 * @property {String} reject - reject button message
 */
/**
 * Confirm box UI component
 * @param {ConfirmBoxProps} props
 * @returns {React.FC}
 */
const ConfirmBox = ({
  open,
  setOpen,
  message,
  onReject,
  className,
  onConfirm,
  confirm,
  reject,
  ...rest
}) => {
  return (
    <EditDialog
      open={open}
      setOpen={setOpen}
      className={classes.container + " " + className}
      {...rest}
    >
      <h3>{message}</h3>
      <div className={classes.buttons}>
        <FormButton className={classes.confirm} onClick={onConfirm}>
          {confirm}
        </FormButton>
        <FormButton color="reject" onClick={onReject}>
          {reject}
        </FormButton>
      </div>
    </EditDialog>
  );
};

export default ConfirmBox;
