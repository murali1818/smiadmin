import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const navigate = useNavigate();

  // State to manage form inputs
  const [job, setJob] = useState({
    jobTitle: "",
    hiringUrl: "",
    employmentType: "",
    organizationName: "",
    description: "",
    industry: "",
    qualifications: "",
    responsibilities: "",
    skills: "",
    workingHours: "",
    jobLocationType: "",
    remoteLocation: "",
    applicantLocation: "",
    datePosted: "",
    validThrough: "",
    locality: "",
    salaryRange: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", job);
    setJob({
      jobTitle: "",
      hiringUrl: "",
      employmentType: "",
      organizationName: "",
      description: "",
      industry: "",
      qualifications: "",
      responsibilities: "",
      skills: "",
      workingHours: "",
      jobLocationType: "",
      remoteLocation: "",
      applicantLocation: "",
      datePosted: "",
      validThrough: "",
      locality: "",
      salaryRange: "",
    });
  };

  return (
    <div className="bg-bgDark  text-white flex flex-col items-center py-4">
     
     <h2 className="text-2xl font-semibold text-primary mb-2">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="bg-bgDark2 p-4 rounded-lg shadow-md w-full max-w-6xl">
        
        {/* Job Information - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm mb-2">Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={job.jobTitle}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Organization Name *</label>
            <input
              type="text"
              name="organizationName"
              value={job.organizationName}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2"> Organization URL *</label>
            <input
              type="url"
              name="hiringUrl"
              value={job.hiringUrl}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm mb-2">Description *</label>
            <textarea
              name="description"
              value={job.description}
              onChange={handleChange}
              rows="2"
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm mb-2">Employment Type *</label>
            <select
              name="employmentType"
              value={job.employmentType}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            >
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Project-based">Project-based</option>
            </select>
          </div>

          

          

          <div>
            <label className="block text-sm mb-2">Industry</label>
            <input
              type="text"
              name="industry"
              value={job.industry}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={job.qualifications}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Responsibilities</label>
            <input
              type="text"
              name="responsibilities"
              value={job.responsibilities}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Skills</label>
            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Working Hours</label>
            <input
              type="text"
              name="workingHours"
              value={job.workingHours}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Job Location Type</label>
            <select
              name="jobLocationType"
              value={job.jobLocationType}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            >
              <option value="">Select</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="TELECOMMUTE">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Locality *</label>
            <input
              type="text"
              name="locality"
              value={job.locality}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Salary Range</label>
            <input
              type="text"
              name="salaryRange"
              value={job.salaryRange}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
            Post Job
          </button>
          <button
            type="button"
            onClick={() => setJob({})}
            className="px-4 py-2 bg-secondary text-white rounded-md"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="px-4 py-2 bg-borderLight text-white rounded-md"
          >
            Back to Jobs
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
