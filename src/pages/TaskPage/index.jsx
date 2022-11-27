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
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import dayjs from "dayjs";
import classes from "./index.module.less";
import EditDialog from "../../components/UI/EditDialog";
import TaskForm from "../../components/TaskForm";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import FormButton from "../../components/UI/FormButton";
import Status from "../../components/Status";
import ConfirmBox from "../../components/UI/ConfirmBox";

const TaskPage = () => {
  const [task, setTask] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [files, setFiles] = useState({});
  const [urls, setUrls] = useState({});
  const [deleteBoxOpen, setDeleteBoxOpen] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

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
    console.log("hi");
    navigate("/");
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
    await getUrls(dict);
  };

  const getUrls = async (files) => {
    const promises = [];
    const urls = {};
    for (const file of Object.entries(files)) {
      promises.push(
        getDownloadURL(ref(storage, id + "/" + file[0])).then((url) => {
          urls[file[0]] = url;
        })
      );
    }
    await Promise.all(promises);
    setUrls(urls);
  };

  const viewUrls = () => {
    const res = [];
    Object.entries(urls).forEach(([filename, url]) => {
      res.push(
        <a href={url} key={filename}>
          <p>{filename}</p>
        </a>
      );
    });
    return res;
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {task ? (
            <div className={classes.taskpage}>
              <Link to="/">
                <FormButton className={classes.back_button}>
                  {"< Back"}
                </FormButton>
              </Link>
              <FormButton
                className={classes.edit_button}
                onClick={() => setEditOpen(true)}
              >
                Edit
              </FormButton>
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
              <h1 className={classes.text_wrap}>{task.title}</h1>
              <div>
                {task.status === "Done" ? (
                  <Status status={"Done"} />
                ) : dayjs(task.endsAt).isBefore(dayjs(), "day") ? (
                  <Status status={"Expired"} />
                ) : (
                  <Status status={"In progress"} />
                )}
              </div>
              <p>{dayjs(task.endsAt).format("D MMM YYYY")}</p>
              <h3>Description</h3>
              <p className={classes.text_wrap}>{task.description}</p>
              {files && (
                <div>
                  <h3>Files</h3>
                  {viewUrls()}
                </div>
              )}
              <div>
                <FormButton
                  color="reject"
                  onClick={() => setDeleteBoxOpen(true)}
                >
                  Delete
                </FormButton>
                <ConfirmBox
                  open={deleteBoxOpen}
                  setOpen={setDeleteBoxOpen}
                  message="Are you shure you want to delete this task?"
                  reject="Cancel"
                  onReject={() => setDeleteBoxOpen(false)}
                  confirm="Delete"
                  onConfirm={handleDelete}
                />
                {task.status === "In progress" ? (
                  <FormButton
                    onClick={() => {
                      setTask((prev) => {
                        return { ...prev, status: "Done" };
                      });
                      updateDoc(doc(firestore, "tasks", id), {
                        status: "Done",
                      });
                    }}
                  >
                    Mark as Done
                  </FormButton>
                ) : (
                  <FormButton
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
                  </FormButton>
                )}
              </div>
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
