import React from "react";
import classes from "./index.module.less";

const Status = ({ status, className }) => {
  const statDict = {
    Done: classes.done,
    "In progress": classes.progress,
    Expired: classes.expired,
  };
  return (
    <div className={classes.status + " " + statDict[status] + " " + className}>
      {status}
    </div>
  );
};

export default Status;
