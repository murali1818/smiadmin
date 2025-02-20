import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Ensure this import is correct
import App from "./App";
import { UserProvider } from "./contexts/UserContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <React.StrictMode>
     <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);