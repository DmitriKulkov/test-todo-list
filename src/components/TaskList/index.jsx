import React from "react";
import { Link } from "react-router-dom";
import classes from "./index.module.less";
import dayjs from "dayjs";
import Status from "../Status";

/**
 * @typedef {Object} Task
 * @property {string} title
 * @property {string} description
 * @property {string} endsAt
 * @property {string} status
 */
/**
 * @typedef {Object} TaskListProps
 * @property {Task[]} tasks - tasks list
 */
/**
 * List of tasks component
 * @param {TaskListProps} props
 * @returns {React.FC}
 */
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
            <h2 className={classes.ends_at}>{date.format("D MMM YYYY")}</h2>
            {task.status === "Done" ? (
              <Status status="Done" className={classes.status} />
            ) : date.isBefore(dayjs(), "day") ? (
              <Status status="Expired" className={classes.status} />
            ) : (
              <Status status="In progress" className={classes.status} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
