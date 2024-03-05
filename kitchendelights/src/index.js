import React from "react";
import ReactDOM from "react-dom/client";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
    <AppRoute />
    <ToastContainer/>
    </div>
  </React.StrictMode>
);
