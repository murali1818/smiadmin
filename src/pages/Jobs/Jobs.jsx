import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases, ID } from "../../appwriteConfig";
import { Eye, Trash2 } from "lucide-react";

const Jobs = () => {
  const navigate = useNavigate();

  // Sample job data (20 jobs)

  const [jobs, setJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");
  const [jobToDelete, setJobToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  // console.log(jobs);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {

    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Handle delete confirmation
  const handleDeleteClick = (id) => {
    setDeleteMode("single");
    setJobToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteSelected = () => {
    setDeleteMode("multiple");
    setShowDeleteConfirm(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    try {
      if (deleteMode === "single") {
        await databases.deleteDocument("67b6d0580007f3db3feb", "67b6d0b30023f2b445b2", jobToDelete);
        setJobs(jobs.filter((job) => job.$id !== jobToDelete));
      } else if (deleteMode === "multiple") {
        for (const jobId of selectedJobs) {
          await databases.deleteDocument("67b6d0580007f3db3feb", "67b6d0b30023f2b445b2", jobId);
        }
        setJobs(jobs.filter((job) => !selectedJobs.includes(job.$id)));
        setSelectedJobs([]);
      }
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting jobs:", error);
    }
  };


  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter jobs based on dropdowns
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.type ? job.employmentType=== filters.type : true) &&
      (filters.status ? job.status === filters.status : true)
    );
  });

  // Get current page jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await databases.listDocuments("67b6d0580007f3db3feb", "67b6d0b30023f2b445b2");
        setJobs(response.documents);
        console.log(response.documents);

      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 bg-bgDark min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-primary">Job List</h1>

        {/* Filters & Actions */}
        <div className="flex flex-wrap space-x-2">
          <select
            name="type"
            onChange={handleFilterChange}
            className="p-2 border border-borderLight bg-bgDark2 text-white rounded-md"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-Time</option>
            <option value="Part-time">Part-Time</option>
            <option value="intern">InternShip</option>
          </select>

          <select
            name="status"
            onChange={handleFilterChange}
            className="p-2 border border-borderLight bg-bgDark2 text-white rounded-md"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>

          <button
            onClick={() => navigate("/add-job")}
            className="bg-green-500 border border-borderLight text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-80 transition"
          >
            Add New Job
          </button>

          {selectedJobs.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
            >
              Delete Selected ({selectedJobs.length})
            </button>
          )}
        </div>
      </div>

      {/* Job Table */}
      <div className="w-full overflow-x-auto border border-borderLight rounded-lg shadow bg-bgDark2">
        <table className="w-full border-collapse rounded-md shadow bg-bgDark2 text-white border border-borderLight overflow-hidden">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2">
                <input
                  type="checkbox"
                 className="custom-checkbox w-5 h-5 border-2 border-gray-800 rounded-md appearance-none cursor-pointer"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedJobs(currentJobs.map((job) => job.$id));
                    } else {
                      setSelectedJobs([]);
                    }
                  }}
                  checked={selectedJobs.length === currentJobs.length}
                />
              </th>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">Position</th>
              <th className="p-3 text-center">Type</th>
              <th className="p-3 text-center hidden sm:table-cell">Posted Date</th>
              <th className="p-3 text-center hidden sm:table-cell">Last Date</th>
              <th className="p-3 text-center hidden sm:table-cell">Vacancy</th>
              <th className="p-3 text-center">Created By</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
    
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr key={job.$id} className="border-t border-borderLight bg-bgDark2 hover:bg-bgDark rounded-2xl">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.$id)}
                    onChange={() => handleCheckboxChange(job.$id)}
                    className="custom-checkbox w-5 h-5 border-2 border-gray-400 rounded-md appearance-none cursor-pointer"
                  />
                </td>


                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{job.jobTitle}</td>
                <td className="p-3 text-center">{job.employmentType}</td>
                <td className="p-3 text-center hidden sm:table-cell">{new Date(job.$createdAt).toLocaleDateString()}</td>
                <td className="p-3 text-center hidden sm:table-cell">{new Date(job.End_date).toLocaleDateString()}</td>
                <td className="p-3 text-center hidden sm:table-cell">{job.Vacancy}</td>
                <td className="p-3 text-center">{job.postedBy}</td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-md text-white ${job.status==="Active" ? "bg-green-500" : "bg-red-500"}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  <button className="text-green-400 hover:text-green-300" onClick={() => navigate(`/job-details/${job.$id}`)}>
                    <Eye size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-400" onClick={() => handleDeleteClick(job.$id)}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-center mt-8 space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 text-sm rounded-md ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
        >
          Prev
        </button>
        <span className="text-md font-semibold text-white">{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 text-sm rounded-md ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
        >
          Next
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-bgDark2 p-6 rounded-lg shadow-lg text-white">
            <p className="text-lg font-semibold">
              {deleteMode === "single"
                ? "Are you sure you want to delete this job?"
                : `Are you sure you want to delete ${selectedJobs.length} jobs?`}
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

export default Jobs;
