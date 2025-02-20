import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Router from "./Router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Router />} />
    </Routes>
  );
}

export default App;
