import React from "react";
import { useNavigate } from "react-router-dom";

const JobDetails = () => {
  const navigate = useNavigate();

  // Sample job data
  const job = {
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
    description: `
      We are looking for a Backend Developer with expertise in NodeJs.
      - Strong knowledge of ExpressJs, MongoDB, AWS, and Microservices.
      - Experience with Docker and Kubernetes.
      - Ability to optimize APIs and database queries for performance.
      - Good problem-solving skills and a team player.
    `,
  };

  return (
    <div className="bg-bgDark min-h-screen text-white flex flex-col items-center py-6">
      <div className="max-w-6xl w-full bg-bgDark2 p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-primary">{job.title}</h2>
          <div className="flex justify-between gap-5 " >
          <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="px-4 py-2 bg-borderLight text-white rounded-md"
          >
            Back to Jobs
          </button>
          <button
            onClick={() => navigate(`/edit-job/${job.id}`)}
            className="px-4 py-2 bg-secondary text-white rounded-md"
          >
            Edit Job
          </button>
          </div>
          
          
        </div>

        {/* Job Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="bg-bgDark p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <p><strong>Organization:</strong> {job.organizationName}</p>
            <p><strong>Website:</strong> <a href={job.organizationUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">{job.organizationUrl}</a></p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Industry:</strong> {job.industry}</p>
            <p><strong>Locality:</strong> {job.locality}</p>
            <p><strong>Job Location Type:</strong> {job.jobLocationType}</p>
          </div>

          {/* Right Side */}
          <div className="bg-bgDark p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Job Details</h3>
            <p><strong>Qualifications:</strong> {job.qualifications}</p>
            <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <p><strong>Working Hours:</strong> {job.workingHours}</p>
            <p><strong>Salary Range:</strong> {job.salaryRange}</p>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-bgDark p-4 rounded-md mt-6">
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <ul className="list-disc pl-4">
            {job.description.split("\n").map((line, index) => (
              <li key={index}>{line.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
