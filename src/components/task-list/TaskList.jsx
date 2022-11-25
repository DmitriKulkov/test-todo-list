import React from "react";
import { Link } from "react-router-dom";
import classes from "./TaskList.module.css";

const TaskList = ({ tasks }) => {
  return (
    <div className={classes.task_list__container}>
      <header className={classes.task_list__header}>
        <h3>Title</h3>
        <h3>EndsAt</h3>
        <h3>Status</h3>
      </header>
      {tasks.map((task) => (
        <div key={task.id} className={classes.task}>
          <Link to={"/task/" + task.id}>
            <h2>{task.title}</h2>
          </Link>
          {/* <h2>{task.endsAt}</h2> */}
          <div>{task.status}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
