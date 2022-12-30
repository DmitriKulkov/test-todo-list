import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import "./index.less";
import App from "./App";

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

//Firebase initialization
const firebase = initializeApp(firebaseConfig);
//Firestore initialization
const firestore = getFirestore(firebase);
//Cloude storage initialization
const storage = getStorage(firebase);

/**
 * @typedef {Object} TGeneralContext
 * @property {*} firebase
 * @property {*} firestore
 * @property {*} storage
 */

/**
 * @type {React.Context<TGeneralContext>}
 */
export const Context = createContext(null);
/**
 * Root component
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        firebase,
        firestore,
        storage,
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
