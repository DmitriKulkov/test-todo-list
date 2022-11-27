import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import FilesList from "../FileList";
import classes from "./index.module.less";

const TaskForm = ({ onSubmit, task = {}, files, setFiles }) => {
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
        cols="120"
        rows="10"
        defaultValue={task.description}
      />

      {files ? (
        <div>
          <h3>Uploaded Files</h3>
          <FilesList
            files={files}
            onDelete={(filename) =>
              setFiles((prev) => {
                return { ...prev, [filename]: !prev[filename] };
              })
            }
          />
        </div>
      ) : null}
      <h3>New Files</h3>
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

      <input type="file" id="file_input" multiple />
      <button
        type="button"
        onClick={() => {
          const fi = document.querySelector("#file_input");
          const newFiles = {};
          for (const file of fi.files) {
            newFiles[file.name] = file;
          }
          setNewFiles((prev) => {
            return { ...prev, ...newFiles };
          });
        }}
      >
        Add files
      </button>
      <div className={classes.submit__container}>
        <button type="submit" className={classes.submit__button}>
          Submit
        </button>
      </div>
      <div
        className={
          loading
            ? classes.files_loader + " " + classes.loading
            : classes.files_loader
        }
      >
        <div className={classes.files_loader__container}>
          <h3>Loading files...</h3>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
