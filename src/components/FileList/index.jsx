import React from "react";
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
              <button
                type="button"
                className={
                  files[filename] === true ? classes.restore : classes.delete
                }
                onClick={() => onDelete(filename)}
              >
                {files[filename] === true ? "Restore" : "Delete"}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default FilesList;
