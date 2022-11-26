import dayjs from "dayjs";
import React from "react";
import FilesList from "../FilesList";
import classes from "./index.module.less";

const TaskForm = ({ onSubmit, task = {}, files = [] }) => {
  return (
    <form
      className={classes.edit_form}
      onSubmit={(e) => {
        e.preventDefault();
        const values = [e.target[0], e.target[1], e.target[2]].map(
          (inp) => inp.value
        );
        const editedTask = {
          title: values[0],
          endsAt: values[1],
          description: values[2],
        };
        onSubmit(editedTask);
      }}
    >
      <h3>Title</h3>
      <input name="title" type="text" defaultValue={task.title} />
      <h3>Ends At</h3>
      <input
        name="endsAt"
        type="date"
        defaultValue={dayjs(task.endsAt).format("YYYY-MM-DD")}
      />
      <h3>Description</h3>
      <textarea
        name="discription"
        cols="120"
        rows="10"
        defaultValue={task.description}
      />
      <h3>Files</h3>
      <FilesList files={files} />
      <div className={classes.submit__container}>
        <button type="submit" className={classes.submit__button}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
