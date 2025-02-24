import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./pages/header/Header";
import Jobs from "./pages/Jobs/Jobs";
import AddJob from "./pages/Jobs/AddJob";
import JobDetails from "./pages/Jobs/JobDetails";
import EditJob from "./pages/Jobs/EditJob";
import { useUser } from "./contexts/UserContext";
import Logout from "./pages/header/Logout";
import Loader from "./pages/header/Loader";
import AllApplications from "./pages/Applications/Allapllications";
import JobApplications from "./pages/Applications/JobApplications";
import ApplicationDetails from "./pages/Applications/ApplicationDetails";
import Profile from "./pages/header/Profile";

const Router = () => {
  const { user, loading, refreshUser } = useUser(); 
  const navigate = useNavigate();

  // Refresh user session automatically on mount
  useEffect(() => {
    refreshUser();
  }, []);

  if (loading) {
    return (
      <Loader />
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
        <Route path="/applications" element={<AllApplications />} />
        <Route path="/job/:jobId/applications" element={<JobApplications />} />
        <Route path="/application-details/:applicationId" element={<ApplicationDetails />} /> 
        <Route path="/profile" element={<Profile></Profile>}/>
        <Route path="/*" element={() => navigate("/")} />

      </Routes>
    </div>
  );
};

export default Router;
