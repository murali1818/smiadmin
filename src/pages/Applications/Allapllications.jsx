import React, { useEffect, useState } from "react";
import { useNavigate,  } from "react-router-dom";
import { databases } from "../../appwriteConfig";
import { Eye, Trash2, FileText, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, } from "lucide-react";
import Loader from "../header/Loader";

const JobApplications = () => {


  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;
    const totalPages = Math.ceil(applications.length / jobsPerPage);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await databases.listDocuments("67b6d0580007f3db3feb", "67b856de0030782d732d");
        const filteredApplications = response.documents
        setApplications(filteredApplications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (id) => {
    setApplicationToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      if (applicationToDelete) {
        await databases.deleteDocument("67b6d0580007f3db3feb", "67b856de0030782d732d", applicationToDelete);
        setApplications(applications.filter((app) => app.$id !== applicationToDelete));
      } else {
        for (const appId of selectedApplications) {
          await databases.deleteDocument("67b6d0580007f3db3feb", "67b856de0030782d732d", appId);
        }
        setApplications(applications.filter((app) => !selectedApplications.includes(app.$id)));
        setSelectedApplications([]);
      }
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting applications:", error);
    }
  };
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = applications.slice(indexOfFirstJob, indexOfLastJob);

  if (loading) return <Loader />;

  return (
    <div className="p-8 bg-bgDark min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4">
        {currentJobs.length > 0 && (
                  <h1 className="text-2xl font-semibold text-primary flex items-center gap-2 md:mb-0 mb-4">
                    <FileText size={28} className="text-primary" />
                    All Applications 
                  </h1>
                )}
        <div className="flex flex-col md:flex-row lg:flex-nowrap flex-wrap gap-2 md:gap-4 lg:gap-2 w-full md:w-auto justify-end md:mt-0 ">
        {selectedApplications.length > 1 && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500 text-white px-3 py-2 rounded-md text-md hover:bg-red-600 transition flex items-center gap-2 w-full md:w-auto md:mt-0 mt-4"
          >
            <Trash2 size={20} /> Delete Selected ({selectedApplications.length})
          </button>
        )}
        </div>
      </div>
      {currentJobs && currentJobs.length > 0 ? (
      <div>
      <div className="overflow-x-auto border border-borderLight rounded-lg bg-bgDark2">
        <table className="w-full text-white border border-borderLight">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSelectedApplications(e.target.checked ? applications.map((app) => app.$id) : []);
                  }}
                  checked={selectedApplications.length === applications.length}
                  className="custom-checkbox w-5 h-5 border-2 border-gray-800 rounded-md appearance-none cursor-pointer"
                />
              </th>
              <th className="p-3">Applicant Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Email</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">Date Applied</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.length > 0 ? (
              currentJobs.map((app) => (
                <tr key={app.$id} className="border-t border-borderLight bg-bgDark2 hover:bg-bgDark">
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(app.$id)}
                      onChange={() => handleCheckboxChange(app.$id)}
                      className="custom-checkbox w-5 h-5 border-2 border-gray-400 rounded-md appearance-none cursor-pointer"
                    />
                  </td>
                  <td className="p-3 text-center">{app.applicantName}</td>
                  <td className="p-3 text-center">{app.gender}</td>
                  <td className="p-3 text-center">{app.email}</td>
                  <td className="p-3 text-center">{app.phone}</td>
                  <td className="p-3 text-center">{new Date(app.appliedAt).toLocaleDateString()}</td>

                  <td className="p-3 text-center">
                    <span className={`px-3 py-1 rounded-md text-white ${app.status === "Viewed" ? "bg-green-500" : "bg-red-500"}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    <button className="text-green-400 hover:text-green-300" onClick={() => navigate(`/application-details/${app.$id}`)}>
                      <Eye size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-400" onClick={() => handleDeleteClick(app.$id)}>
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-400">No applications found for this job.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center mt-4 gap-2 md:gap-2 w-full">
                  {/* First Page Button */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-4 py-2 text-sm rounded-md flex items-center min-w-[40px] justify-center 
            ${currentPage === 1 ? "border border-borderLight bg-bgDark2 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
                  >
                    <ChevronsLeft size={20} className="text-white" />
                  </button>
      
                  {/* Previous Page Button (Icon Only on Mobile) */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`px-4 py-2 text-md rounded-md flex items-center min-w-[40px] justify-center 
            ${currentPage === 1 ? "border border-borderLight bg-bgDark2 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
                  >
                    <ChevronLeft size={20} className="text-white" />
                    <span className="hidden md:inline">Prev</span>
                  </button>
      
                  {/* Current Page Display */}
                  <span className="text-md font-semibold text-white px-4 py-2 min-w-[60px] text-center">
                    {currentPage} / {totalPages}
                  </span>
      
                  {/* Next Page Button (Icon Only on Mobile) */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`px-4 py-2 text-md rounded-md flex items-center min-w-[40px] justify-center 
            ${currentPage === totalPages ? "border border-borderLight bg-bgDark2 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
                  >
                    <span className="hidden md:inline">Next</span>
                    <ChevronRight size={20} className="text-white" />
                  </button>
      
                  {/* Last Page Button */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-4 py-2 text-sm rounded-md flex items-center min-w-[40px] justify-center 
            ${currentPage === totalPages ? "border border-borderLight bg-bgDark2 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
                  >
                    <ChevronsRight size={20} className="text-white" />
                  </button>
      </div>
      </div>
      ) : (
        <p className="text-white text-center mt-4">Applications Not Found</p>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-bgDark2 p-6 rounded-lg shadow-lg text-white">
            <p className="text-lg font-semibold">
              Are you sure you want to delete {applicationToDelete ? "this application" : `${selectedApplications.length} applications`}?
            </p>
            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="bg-gray-500 px-3 py-1 rounded text-white">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 px-3 py-1 rounded text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
