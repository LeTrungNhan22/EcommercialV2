import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContextProvider } from "./context/authContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
const myTheme = createTheme({
  // Set up your custom MUI theme here
});
root.render(
  <React.StrictMode>
    <ToastContainer position="top-right" />
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
