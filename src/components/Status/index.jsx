import React from "react";
import classes from "./index.module.less";

/**
 * @typedef {Object} StatusProps
 * @property {'In progress'|'Done'|'Expired'} status - Task status
 * @property {String} className - styles
 */
/**
 * Task status component
 * @param {StatusProps} props
 * @returns {JSX.Element}
 */
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
