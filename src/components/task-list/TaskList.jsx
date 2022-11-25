import React from "react";
import classes from "./TaskList.module.css";

const TaskList = () => {
  return (
    <div className={classes.task_list__container}>
      <div className={classes.task}>
        <h2>Task1</h2>
        <h2>9 Nov</h2>
        <div>In progress</div>
      </div>
      <div className={classes.task}>
        <h2>Task1</h2>
        <h2>9 Nov</h2>
        <div>In progress</div>
      </div>
      <div className={classes.task}>
        <h2>Task1</h2>
        <h2>9 Nov</h2>
        <div>In progress</div>
      </div>
    </div>
  );
};

export default TaskList;
