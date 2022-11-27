import React from "react";
import FormButton from "../UI/FormButton";
import classes from "./index.module.less";

const FilesList = ({ files, onDelete }) => {
  return (
    <div>
      {files &&
        Object.entries(files).map(([filename, todelete]) => {
          return (
            <div key={filename} className={classes.files__element}>
              <p
                className={
                  files[filename] === true
                    ? classes.filename + " " + classes.todelete
                    : classes.filename
                }
              >
                {filename}
              </p>
              <FormButton
                type="button"
                color={files[filename] === true ? "submit" : "reject"}
                onClick={() => onDelete(filename)}
              >
                {files[filename] === true ? "Restore" : "Delete"}
              </FormButton>
            </div>
          );
        })}
    </div>
  );
};

export default FilesList;
