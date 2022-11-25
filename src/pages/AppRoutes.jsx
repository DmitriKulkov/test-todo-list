import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskListPage from "./task-list-page/TaskListPage";
import TaskPage from "./task-page/TaskPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/task/:id" element={<TaskPage />} />
      <Route path="/" element={<TaskListPage />} />
    </Routes>
  );
};

export default AppRoutes;
