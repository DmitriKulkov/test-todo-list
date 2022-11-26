import React, { useEffect, useState } from "react";
import classes from "./index.module.less";

const FilesList = ({ files }) => {
  const [filesDelete, setFilesDelete] = useState([]);

  useEffect(() => {
    const dict = [];
    files.forEach((file) => {
      dict[file] = false;
    });
    console.log(dict);
    setFilesDelete(dict);
  }, []);

  return (
    <div>
      {filesDelete &&
        files.map((filename) => {
          return (
            <div key={filename} className={classes.files__element}>
              <p
                className={
                  filesDelete[filename]
                    ? classes.filename + " " + classes.todelete
                    : classes.filename
                }
              >
                {filename}
              </p>
              <button
                type="button"
                className={
                  filesDelete[filename] ? classes.restore : classes.delete
                }
                onClick={() =>
                  setFilesDelete((prev) => {
                    const nw = [...prev];
                    nw[filename] = !prev[filename];
                    return nw;
                  })
                }
              >
                {filesDelete[filename] ? "Restore" : "Delete"}
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default FilesList;
