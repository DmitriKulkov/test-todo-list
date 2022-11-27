import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
import { getStorage } from 'firebase/storage'
import './index.less';
import App from './App';

const firebaseConfig = {
apiKey: "AIzaSyDD446TCTQ25OoTv8xrBChyKo_Y3Y3weac",
authDomain: "test-todo-list-3c9bd.firebaseapp.com",
projectId: "test-todo-list-3c9bd",
storageBucket: "test-todo-list-3c9bd.appspot.com",
messagingSenderId: "1052818577340",
appId: "1:1052818577340:web:d35354d4d506c61b5efdb9",
measurementId: "G-6LM1PL3RRY",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value = {{
    firebase,
    firestore,
    storage
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);