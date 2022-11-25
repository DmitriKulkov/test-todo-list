import React from "react";
import classes from "./TaskListPage.module.css";

const TaskList = () => {
  return (
    <div className={classes.task_list}>
      <h1>TASKS</h1>
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
    </div>
  );
};

export default TaskList;
