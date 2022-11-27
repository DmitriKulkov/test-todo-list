import React, { useContext, useState, useEffect } from "react";
import classes from "./index.module.less";
import TaskList from "../../components/TaskList";
import { Context } from "../..";
import useFetching from "../../hooks/useFetching";
import { collection, getDocs, addDoc, doc } from "firebase/firestore/lite";
import EditDialog from "../../components/UI/EditDialog";
import TaskForm from "../../components/TaskForm";
import { async } from "@firebase/util";
import { ref, uploadBytes } from "firebase/storage";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [addOpen, setAddOpen] = useState(false);

  const { firestore, storage } = useContext(Context);

  const { fetching, loading, error } = useFetching(async () => {
    const docSnap = await getDocs(collection(firestore, "tasks"));
    setTasks(
      docSnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      })
    );
  });

  useEffect(() => {
    fetching();
  }, []);

  const handleAdd = async (task, newFiles) => {
    const promises = [];
    const docId = (await addDoc(collection(firestore, "tasks"), task))._key.path
      .segments[1];
    Object.entries(newFiles).forEach(([filename, file]) => {
      promises.push(uploadBytes(ref(storage, docId + "/" + filename), file));
    });
    return Promise.all(promises);
  };

  return (
    <div className={classes.task_list}>
      <h1>TASKS</h1>
      <button onClick={() => setAddOpen(true)}>Add</button>
      <EditDialog open={addOpen} setOpen={setAddOpen}>
        <TaskForm
          onSubmit={async (task, newFiles) => {
            await handleAdd(task, newFiles);
            fetching();
            setAddOpen(false);
          }}
        />
      </EditDialog>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
