import React from "react";
import FormButton from "../UI/FormButton";
import classes from "./index.module.less";

/**
 * @typedef {Object} FileListProps
 * @property {Object} files - files list
 * @property {Function} onDelete - delete handler
 */
/**
 * View file list with ability of file deletion handling
 * @param {FileListProps} props
 * @returns {JSX.Element}
 */
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
