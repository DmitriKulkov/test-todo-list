import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskListPage from "./TaskListPage";
import TaskPage from "./TaskPage";
/**
 * App routes component
 * @returns {React.FC}
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/task/:id" element={<TaskPage />} />
      <Route path="/" element={<TaskListPage />} />
    </Routes>
  );
};

export default AppRoutes;
