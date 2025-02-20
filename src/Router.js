import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/Jobs/AddJob";
import JobDetails from "./pages/Jobs/JobDetails";
import EditJob from "./pages/Jobs/EditJob";

const Router = () => {
  return (
    
    <div className="bg-bgDark ">
    {/* Header only appears for logged-in pages */}
    <Header />

    {/* Page Routes */}
    <Routes>
      <Route path="/jobs" element={<Jobs></Jobs>}  />
      <Route path="/add-job" element={<AddJob></AddJob>} />
      <Route path="/job-details/:id" element={<JobDetails></JobDetails>} />
      <Route path="/edit-job/:id" element={<EditJob></EditJob>} />
    </Routes>
  </div>
    
  );
};

export default Router;
