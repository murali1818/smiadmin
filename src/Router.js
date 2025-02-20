import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/Jobs/AddJob";
import JobDetails from "./pages/Jobs/JobDetails";
import EditJob from "./pages/Jobs/EditJob";
import { useUser } from "./contexts/UserContext";
import Logout from "./pages/header/Logout";

const Router = () => {
  const { user, loading, refreshUser } = useUser(); 
  const navigate = useNavigate();

  // Refresh user session automatically on mount
  useEffect(() => {
    refreshUser();
  }, []);

  if (loading) {
    return (
      <div className="no-user">
        <p style={{ color: "white" }}>Loading...</p>   
      </div>
    );
  }

  if (!user) {
    return (
      <div className="no-user">
        <p style={{ color: "white" }}>User Not found!!! Please log in to continue.</p>
        <button 
          onClick={() => navigate("/")} 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bgDark">
      {/* Header only appears for logged-in users */}
      <Header />

      {/* Page Routes */}
      <Routes>
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default Router;
