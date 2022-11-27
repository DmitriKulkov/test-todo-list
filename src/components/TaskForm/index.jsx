import dayjs from "dayjs";
import React, { useState } from "react";
import FilesList from "../FileList";
import FormButton from "../UI/FormButton";
import Loader from "../UI/Loader";
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
          <h3>Loading files...</h3>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
