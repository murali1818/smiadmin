import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { databases } from "../../appwriteConfig";
import { CheckCircle } from "lucide-react";
import Loader from "../header/Loader";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

    const [showConfirmation, setShowConfirmation] = useState(false);

  //console.log(job);


  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await databases.getDocument(
          "67b6d0580007f3db3feb", // Database ID
          "67b6d0b30023f2b445b2", // Collection ID
          id // Job Document ID
        );
        const formattedDate = response.End_date ? response.End_date.split("T")[0] : "";
        setJob({ ...response, End_date: formattedDate }); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await databases.updateDocument(
        "67b6d0580007f3db3feb", // Database ID
        "67b6d0b30023f2b445b2", // Collection ID
        job.$id, // Document ID
        { 
          jobTitle: job.jobTitle,
          organizationName: job.organizationName,
          employmentType: job.employmentType,
          industry: job.industry,
          Location: job.Location,
          salaryRange: job.salaryRange,
          jobLocationType: job.jobLocationType,
          qualifications: job.qualifications,
          skills: job.skills,
          End_date: job.End_date,
          status: job.status,
          Vacancy: job.Vacancy, 
          workingHours: job.workingHours,
          description: job.description,
        }
      );
  
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        navigate(`/job-details/${id}`);
      }, 3000);
    } catch (error) {
      alert("Failed to update job. Check console for details.");
      console.error("Error updating job:", error);
    }
  };
  

  if (loading) return <Loader></Loader>
  if (!job) return <p className="text-white text-center mt-4">Job not found!</p>;

  return (
    <div className="bg-bgDark min-h-screen text-white flex flex-col items-center py-6">
      {showConfirmation && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                <CheckCircle size={24} />
                Job Updated Successfully!
              </div>
            )}
      <div className="max-w-6xl w-full bg-bgDark2 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-primary mb-4">Edit Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm mb-2">Job Title *</label>
              <input type="text" name="jobTitle" value={job.jobTitle} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required />
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-sm mb-2">Organization Name *</label>
              <input type="text" name="organizationName" value={job.organizationName} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required/>
            </div>

            {/* Employment Type */}
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
              <option value="Intern">Intern</option>
            </select>
          </div>


            {/* Industry */}
            <div>
              <label className="block text-sm mb-2">Industry *</label>
              <input type="text" name="industry" value={job.industry} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white " required />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm mb-2">Location *</label>
              <input type="text" name="Location" value={job.Location} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required />
            </div>

            {/* Salary Range */}
            <div>
              <label className="block text-sm mb-2">Salary Range *</label>
              <input type="text" name="salaryRange" value={job.salaryRange} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required/>
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-sm mb-2">Job Location Type*</label>
              <select
                name="jobLocationType"
                value={job.jobLocationType}
                onChange={handleChange}
                className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
                required
              >
                <option value="">Select</option>
                <option value="On-Site">On-Site</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm mb-2">Qualification *</label>
              <input type="text" name="qualifications" value={job.qualifications} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required/>
            </div>

            {/* Skills Required */}
            <div>
              <label className="block text-sm mb-2">Skills Required *</label>
              <input type="text" name="skills" value={job.skills} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required />
            </div>



            {/* Application Deadline */}
            <div>
              <label className="block text-sm mb-2">Application Deadline *</label>
              <input type="date" name="End_date" value={job.End_date} onChange={handleChange} className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required/>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-sm mb-2">Status *</label>
              <select
                name="status"
                value={job.status}
                onChange={handleChange}
                className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Vacancy (Number Input) */}
            <div>
              <label className="block text-sm mb-2">Vacancy *</label>
              <input
                type="number"
                name="Vacancy"
                value={job.Vacancy}
                onChange={handleChange}
                className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-2">Description *</label>
              <textarea name="description" value={job.description} onChange={handleChange} rows="4" className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white" required></textarea>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-sm mb-2">Working Hours *</label>
              <input
                type="text"
                name="workingHours"
                value={job.workingHours}
                onChange={handleChange}
                className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
                required
              />
            </div>



            {/* Job Description */}
            
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5 mt-6">
            
            <button type="button" onClick={() => navigate(`/job-details/${id}`)} className="px-4 py-2 bg-secondary text-white rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditJob;
