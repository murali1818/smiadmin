import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditJob = () => {
  const navigate = useNavigate();

  // Sample job data
  const [job, setJob] = useState({
    id: "1",
    title: "Backend Developer",
    organizationName: "Tech Corp",
    organizationUrl: "https://www.techcorp.com",
    employmentType: "Full-time",
    industry: "Software Development",
    qualifications: "Bachelor’s degree in Computer Science or related field",
    responsibilities: "Develop and maintain backend services, work with APIs",
    skills: "NodeJs, ExpressJs, MongoDB, AWS, Microservices, Docker, Kubernetes",
    workingHours: "9 AM - 6 PM (Mon-Fri)",
    jobLocationType: "On-site",
    locality: "New York, NY",
    salaryRange: "$70,000 - $90,000",
    description: `We are looking for a Backend Developer with expertise in NodeJs.`,
  });

  // Handle input change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Job:", job);
    navigate(`/job-details/${job.id}`);
  };

  return (
    <div className="bg-bgDark min-h-screen text-white flex flex-col items-center py-6">
      <div className="max-w-6xl w-full bg-bgDark2 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Edit Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Job Title *</label>
              <input type="text" name="title" value={job.title} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" />
            </div>

            <div>
              <label className="block text-sm mb-2">Organization Name *</label>
              <input type="text" name="organizationName" value={job.organizationName} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" />
            </div>

            <div>
              <label className="block text-sm mb-2">Organization URL *</label>
              <input type="text" name="organizationUrl" value={job.organizationUrl} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" />
            </div>

            <div>
              <label className="block text-sm mb-2">Employment Type *</label>
              <input type="text" name="employmentType" value={job.employmentType} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Description *</label>
              <textarea name="description" value={job.description} onChange={handleChange} rows="4" className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"></textarea>
            </div>

            <div>
              <label className="block text-sm mb-2">Salary Range</label>
              <input type="text" name="salaryRange" value={job.salaryRange} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">Save Changes</button>
            <button type="button" onClick={() => navigate(`/job-details/${job.id}`)} className="px-4 py-2 bg-secondary text-white rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
