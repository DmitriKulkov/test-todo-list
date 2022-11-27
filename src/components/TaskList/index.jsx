import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.less";
import dayjs from "dayjs";
import Status from "../Status";

const TaskList = ({ tasks }) => {
  return (
    <div className={classes.task_list__container}>
      <header className={classes.task_list__header}>
        <h3>Title</h3>
        <h3>EndsAt</h3>
        <h3>Status</h3>
      </header>
      {tasks.map((task) => {
        const date = dayjs(task.endsAt);
        return (
          <div key={task.id} className={classes.task}>
            <Link to={"/task/" + task.id} className={classes.grid_first}>
              <h2>{task.title}</h2>
            </Link>
            <h2>{date.format("D MMM YYYY")}</h2>
            {task.status === "Done" ? (
              <Status status="Done" />
            ) : date.isBefore(dayjs(), "day") ? (
              <Status status="Expired" />
            ) : (
              <Status status="In progress" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
