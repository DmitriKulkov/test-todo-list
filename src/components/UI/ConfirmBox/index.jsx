import React from "react";
import EditDialog from "../EditDialog";
import FormButton from "../FormButton";
import classes from "./index.module.less";

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
