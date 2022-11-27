import React, { useContext, useState, useEffect } from "react";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import useFetching from "../../hooks/useFetching";
import { Context } from "../..";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Edit, ArrowBackIos } from "@mui/icons-material";
import classes from "./index.module.less";
import EditDialog from "../../components/UI/EditDialog";
import TaskForm from "../../components/TaskForm";
import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage";

const TaskPage = () => {
  const [task, setTask] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const { id } = useParams();

  const { firestore, storage } = useContext(Context);

  const { fetching, loading, error } = useFetching(async () => {
    return Promise.all([
      getDoc(doc(firestore, "tasks", id)).then((res) => {
        if (res.exists()) {
          setTask({ ...res.data(), id: id });
        }
      }),
      getFilesList(),
    ]);
  });

  useEffect(() => {
    fetching();
  }, []);

  const handleEdit = async (editedTask) => {
    await setDoc(doc(firestore, "tasks", id), editedTask);
  };

  const handleUploadFile = (filename, file) => {
    return uploadBytes(ref(storage, task.id + "/" + filename), file);
  };

  const deleteFile = (filename) => {
    return deleteObject(ref(storage, id + "/" + filename));
  };

  const handleFiles = (newFiles) => {
    const promises = [];
    Object.entries(files).forEach(([filename, todelete]) => {
      if (todelete) {
        promises.push(deleteFile(filename));
      }
    });
    Object.entries(newFiles).forEach(([filename, file]) => {
      promises.push(handleUploadFile(filename, file));
    });
    return Promise.all(promises);
  };

  const handleDelete = () => {
    return Promise.all(
      [deleteDoc(doc(firestore, "tasks", id))],
      Object.entries(files).forEach((file) => deleteFile(file[0]))
    );
  };

  const getFilesList = async () => {
    const files = await listAll(ref(storage, id));
    const filenames = files.items.map((doc) =>
      doc._location.path_.split("/").at(-1)
    );
    const dict = {};
    filenames.forEach((file) => {
      dict[file] = false;
    });
    setFiles(dict);
  };

  const viewFiles = (files) => {
    const res = [];
    for (const file of Object.entries(files)) {
      res.push(<p key={file[0]}>{file[0]}</p>);
    }
    return res;
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {task ? (
            <div>
              <Link to="/">
                <button className={classes.back_button}>
                  <ArrowBackIos fontSize="large" />
                </button>
              </Link>
              <button
                className={classes.edit_button}
                onClick={() => setEditOpen(true)}
              >
                <Edit fontSize="large" />
              </button>
              <EditDialog open={editOpen} setOpen={setEditOpen}>
                <TaskForm
                  onSubmit={async (task, newFiles) => {
                    await Promise.all([
                      handleEdit(task),
                      handleFiles(newFiles),
                    ]);
                    fetching();
                    setEditOpen(false);
                  }}
                  task={task}
                  files={files}
                  setFiles={setFiles}
                />
              </EditDialog>
              <div>
                <h1>{task.title}</h1>
                <div>
                  {task.status === "Done"
                    ? "Done"
                    : dayjs(task.endsAt).isBefore(dayjs(), "day")
                    ? "Expired"
                    : "In progress"}
                </div>
              </div>
              <p>{dayjs(task.endsAt).format("D MMM YYYY")}</p>
              <p>{task.description}</p>
              {files && (
                <div>
                  <h3>Files</h3>
                  {viewFiles(files)}
                </div>
              )}

              <Link to="/">
                <button onClick={() => handleDelete()}>Delete</button>
              </Link>
              <button
                onClick={() => {
                  setTask((prev) => {
                    return { ...prev, status: "Done" };
                  });
                  updateDoc(doc(firestore, "tasks", id), { status: "Done" });
                }}
              >
                Mark as Done
              </button>
              <button
                onClick={() => {
                  setTask((prev) => {
                    return { ...prev, status: "In progress" };
                  });
                  updateDoc(doc(firestore, "tasks", id), {
                    status: "In progress",
                  });
                }}
              >
                Mark as In progress
              </button>
            </div>
          ) : (
            <div>Error</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
