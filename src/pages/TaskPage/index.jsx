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
import { Edit, ArrowBackIos, UploadFile } from "@mui/icons-material";
import classes from "./index.module.less";
import EditDialog from "../../components/UI/EditDialog";
import TaskForm from "../../components/TaskForm";
import { listAll, ref, uploadBytes } from "firebase/storage";
import { async } from "@firebase/util";

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
          setTask(res.data());
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

  const handleDelete = async () => {
    await deleteDoc(doc(firestore, "tasks", id));
  };

  const handleUploadFile = (file) => {
    return uploadBytes(ref(storage, id + "/" + file.name), file);
  };

  const getFilesList = async () => {
    const files = await listAll(ref(storage, id));
    setFiles(files.items.map((doc) => doc._location.path_.split("/").at(-1)));
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
                  onSubmit={(task) => {
                    setTask(task);
                    setEditOpen(false);
                    handleEdit(task);
                  }}
                  task={task}
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
                  {files.map((file) => {
                    return <p key={file}>{file}</p>;
                  })}
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

              {/* <input type="file" id="file_input" />
              <button
                onClick={() => {
                  const fi = document.querySelector("#file_input");
                  console.log(fi.files);
                  for (const file of fi.files) {
                    handleUploadFile(file)
                      .then(() => console.log("ok"))
                      .catch((e) => console.log(e));
                  }
                  // getFilesList();
                }}
              >
                Upload
              </button> */}
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
