import React, { useContext, useState, useEffect } from "react";
import classes from "./TaskListPage.module.less";
import TaskList from "../../components/task-list/TaskList";
import { Context } from "../..";
import useFetching from "../../hooks/useFetching";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  const { firestore } = useContext(Context);

  const { fetching, loading, error } = useFetching(async () => {
    const docSnap = await getDocs(collection(firestore, "tasks"));
    setTasks(
      docSnap.docs.map((d) => {
        return { id: d.id, ...d.data() };
      })
    );
  });
  console.log(tasks);

  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className={classes.task_list}>
      <h1>TASKS</h1>
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TaskListPage;
