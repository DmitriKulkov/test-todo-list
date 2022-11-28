import dayjs from "dayjs";
import React, { useState } from "react";
import FilesList from "../FileList";
import FormButton from "../UI/FormButton";
import Loader from "../UI/Loader";
import classes from "./index.module.less";

/**
 * @typedef {Object} Task
 * @property {string} title
 * @property {string} description
 * @property {string} endsAt
 * @property {string} status
 */
/**
 * @typedef {Object} TaskFormProps
 * @property {Function} onSubmit - function to perform on submit
 * @property {Task} task - task to edit, leave undefined to create new
 * @property {Object} files - files of the task
 * @property {Function} setFiles - function to change task files list
 * @property {Function} setOpen - function to change dialog visibility
 */
/**
 * Form for task creation/edit
 * @param {TaskFormProps} props
 * @returns {React.FC}
 */
const TaskForm = ({ onSubmit, task = {}, files, setFiles, setOpen }) => {
  const [newFiles, setNewFiles] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <form
      className={classes.edit_form}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        const values = [e.target[0], e.target[1], e.target[2]].map(
          (inp) => inp.value
        );
        const editedTask = {
          title: values[0],
          endsAt: values[1],
          description: values[2],
          status: task.status ? task.status : "In progress",
        };
        onSubmit(editedTask, newFiles).then(() => setLoading(false));
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
        rows="10"
        defaultValue={task.description}
        className={classes.textarea}
      />

      {files ? (
        <div>
          <h3>Uploaded Files</h3>
          <div className={classes.files_container}>
            <FilesList
              files={files}
              onDelete={(filename) =>
                setFiles((prev) => {
                  return { ...prev, [filename]: !prev[filename] };
                })
              }
            />
          </div>
        </div>
      ) : null}
      <h3>New Files</h3>
      <div className={classes.files_container}>
        <FilesList
          files={newFiles}
          onDelete={(filename) =>
            setNewFiles((prev) => {
              const nw = { ...prev };
              delete nw[filename];
              return nw;
            })
          }
        />
      </div>

      <input
        type="file"
        id="file_input"
        className={classes.file_input}
        onChange={(e) => {
          const newFiles = {};
          for (const file of e.target.files) {
            newFiles[file.name] = file;
          }
          setNewFiles((prev) => {
            return { ...prev, ...newFiles };
          });
          console.log(newFiles);
        }}
        multiple
      />
      <FormButton
        type="button"
        onClick={() => document.querySelector("#file_input").click()}
      >
        Add files
      </FormButton>
      <div className={classes.submit__container}>
        <FormButton
          type="button"
          className={classes.submit__button}
          color="reject"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </FormButton>
        <FormButton type="submit" className={classes.submit__button}>
          Submit
        </FormButton>
      </div>
      <div
        className={
          loading
            ? classes.files_loader + " " + classes.loading
            : classes.files_loader
        }
      >
        <div className={classes.files_loader__container}>
          <Loader size="small" />
          <p>Loading files...</p>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
