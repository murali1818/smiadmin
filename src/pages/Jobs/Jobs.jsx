import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();

  // Sample job data (20 jobs)
  const initialJobs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    position: `Job Position ${i + 1}`,
    type: i % 2 === 0 ? "Full-Time" : "Part-Time",
    postedDate: `12-01-2023`,
    lastDate: `24-01-2023`,
    closeDate: `25-01-2023`,
    status: i % 3 === 0 ? "InActive" : "Active",
  }));

  const [jobs, setJobs] = useState(initialJobs);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(""); // "single" or "multiple"
  const [jobToDelete, setJobToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
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
  const confirmDelete = () => {
    if (deleteMode === "single") {
      setJobs(jobs.filter((job) => job.id !== jobToDelete));
    } else if (deleteMode === "multiple") {
      setJobs(jobs.filter((job) => !selectedJobs.includes(job.id)));
      setSelectedJobs([]);
    }
    setShowDeleteConfirm(false);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter jobs based on dropdowns
  const filteredJobs = jobs.filter((job) => {
    return (
      (filters.type ? job.type === filters.type : true) &&
      (filters.status ? job.status === filters.status : true)
    );
  });

  // Get current page jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="p-8 bg-bgDark min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-primary">Job List</h1>

        {/* Filters & Actions */}
        <div className="flex flex-wrap space-x-2">
          <select
            name="type"
            onChange={handleFilterChange}
            className="p-2 border border-borderLight bg-bgDark2 text-white rounded"
          >
            <option value="">All Types</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>

          <select
            name="status"
            onChange={handleFilterChange}
            className="p-2 border border-borderLight bg-bgDark2 text-white rounded"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>

          <button
            onClick={() => navigate("/add-job")}
            className="bg-green-500 border border-borderLight text-white px-3 py-1 rounded text-sm hover:bg-opacity-80 transition"
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow bg-bgDark2 text-white border border-borderLight ">
          <thead>
            <tr className="bg-primary text-white rounded-lg">
              <th className="p-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedJobs(currentJobs.map((job) => job.id));
                    } else {
                      setSelectedJobs([]);
                    }
                  }}
                  checked={selectedJobs.length === currentJobs.length}
                />
              </th>
              <th className="p-2">No</th>
              <th className="p-2">Position</th>
              <th className="p-2">Type</th>
              <th className="p-2 hidden sm:table-cell">Posted Date</th>
              <th className="p-2 hidden sm:table-cell">Last Date</th>
              <th className="p-2 hidden sm:table-cell">Close Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job, index) => (
              <tr key={job.id} className="border-t border-borderLight">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleCheckboxChange(job.id)}
                  />
                </td>
                <td className="p-2 text-center">{indexOfFirstJob + index + 1}</td>
                <td className="p-2 text-center">{job.position}</td>
                <td className="p-2 text-center">{job.type}</td>
                <td className="p-2 text-center hidden sm:table-cell">{job.postedDate}</td>
                <td className="p-2 text-center hidden sm:table-cell">{job.lastDate}</td>
                <td className="p-2 text-center hidden sm:table-cell">{job.closeDate}</td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-1 rounded ${job.status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-2 flex justify-center space-x-2">
                  <button className="text-green-400 hover:text-green-300" onClick={() => navigate(`/job-details/${job.id}`)}>
                    <FaEye />
                  </button>
                  <button className="text-red-500 hover:text-red-400" onClick={() => handleDeleteClick(job.id)}>
                    <FaTrash />
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
          className={`px-4 py-2 text-sm rounded ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
        >
          Prev
        </button>
        <span className="text-md font-semibold text-white">{currentPage} / {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 text-sm rounded ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed text-white" : "bg-primary hover:bg-opacity-80 text-white"}`}
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
