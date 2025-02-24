import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { databases } from "../../appwriteConfig";
import Loader from "../header/Loader";

const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true); // Track component mount state

  useEffect(() => {
    setIsMounted(true); // Ensure component is mounted before updating state
    const fetchJob = async () => {
      try {
        const response = await databases.getDocument(
          "67b6d0580007f3db3feb",
          "67b6d0b30023f2b445b2",
          id
        );
        if (isMounted) {
          setJob(response);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJob();

    return () => {
      setIsMounted(false); // Prevent state updates if the component unmounts
    };
  }, [id]);

  if (loading) return <Loader />;
  if (!job) return <p className="text-center text-red-500">Job not found</p>;

  return (
    <div className="bg-bgDark min-h-screen text-white flex flex-col items-center py-6">
      <div className="max-w-6xl w-full bg-bgDark2 p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          {/* Job Title */}
          <h2 className="text-2xl font-semibold text-primary">{job.jobTitle}</h2>

          {/* Buttons Container */}
          <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="px-4 py-2 bg-borderLight text-white rounded-md w-full md:w-auto"
            >
              Back to Jobs
            </button>

            <button
              onClick={() => navigate(`/edit-job/${job.$id}`)}
              className="px-4 py-2 bg-secondary text-white rounded-md w-full md:w-auto"
            >
              Edit Job
            </button>

            <button
              onClick={() => navigate(`/job/${id}/applications`)}
              className="px-4 py-2 bg-primary text-white rounded-md w-full md:w-auto"
            >
              View Applications
            </button>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="bg-bgDark p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">Job Details:</h3>
            <p><strong>Organization:</strong> {job.organizationName}</p>
            <p><strong>Employment Type:</strong> {job.employmentType}</p>
            <p><strong>Industry:</strong> {job.industry}</p>
            <p><strong>Location:</strong> {job.Location}</p>
            <p><strong>Job Location Type:</strong> {job.jobLocationType}</p>
            <p><strong>Qualifications:</strong> {job.qualifications}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <p><strong>Working Hours:</strong> {job.workingHours}</p>
            <p><strong>Salary Range:</strong> {job.salaryRange}</p>
            <p><strong>Vacancy:</strong> {job.Vacancy}</p>
          </div>

          {/* Right Side */}
          <div className="bg-bgDark p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Description:</h3>
            <ul className="list-disc pl-4">
              {job.description?.split("\n").map((line, index) => (
                <li key={index}>{line.trim()}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-bgDark p-4 rounded-md mt-6">
          <h3 className="text-lg font-semibold mb-2">Additional Information:</h3>
          <p><strong>Posted By:</strong> {job.postedBy}</p>
          <p><strong>Date Posted:</strong> {new Date(job.datePosted).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(job.End_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
