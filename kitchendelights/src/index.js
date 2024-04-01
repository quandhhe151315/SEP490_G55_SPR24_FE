import React from "react";
import ReactDOM from "react-dom/client";
import AppRoute from "./routes/AppRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SnackbarProvider } from "./components/Snackbar/Snackbar";
import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <SnackbarProvider>
      <AppRoute />
      <Footer/>
      </SnackbarProvider>
      <ToastContainer/>
    </div>
  </React.StrictMode>
);
