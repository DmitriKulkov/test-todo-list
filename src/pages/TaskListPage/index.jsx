import React, { useContext, useState, useEffect } from "react";
import classes from "./index.module.less";
import TaskList from "../../components/TaskList";
import { Context } from "../..";
import useFetching from "../../hooks/useFetching";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";
import EditDialog from "../../components/UI/EditDialog";
import TaskForm from "../../components/TaskForm";
import { ref, uploadBytes } from "firebase/storage";
import FormButton from "../../components/UI/FormButton";
import Loader from "../../components/UI/Loader";

/**
 * Main page with tasks list
 * @returns {JSX.Element}
 */
const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const { firestore, storage } = useContext(Context);

  const { fetching, loading } = useFetching(async () => {
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

  /**
   * @typedef {Object} Task
   * @property {string} title
   * @property {string} description
   * @property {string} endsAt
   * @property {string} status
   */

  /**
   * Handles new task addition
   * @param {Task} task - new task
   * @param {File[]} newFiles - new files for task
   * @returns {Promise<any[]>}
   */
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
    <div>
      {!loading ? (
        <div className={classes.task_list}>
          <h1>TASKS</h1>
          <FormButton
            onClick={() => setAddOpen(true)}
            className={classes.add_button}
          >
            Add
          </FormButton>
          <EditDialog open={addOpen} setOpen={setAddOpen}>
            <TaskForm
              onSubmit={async (task, newFiles) => {
                await handleAdd(task, newFiles);
                fetching();
                setAddOpen(false);
              }}
              onReject={() => setAddOpen(false)}
            />
          </EditDialog>
          <TaskList tasks={tasks} />
        </div>
      ) : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TaskListPage;
