import React from "react";
import { BrowserRouter } from "react-router-dom";
import classes from "./App.less";
import AppRoutes from "./pages/AppRoutes";
/**
 * Main App component with BrowserRouter
 * @returns {JSX.Element}
 */
function App() {
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
