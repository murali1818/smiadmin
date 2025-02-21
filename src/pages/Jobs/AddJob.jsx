import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { databases, ID, account } from "../../appwriteConfig";
import { CheckCircle } from "lucide-react";

const AddJob = () => {
  const navigate = useNavigate();
  const [currentUsername, setCurrentUsername] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setCurrentUsername(user.name);
        console.log("Current User:", user.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);



  const [job, setJob] = useState({
    jobTitle: "",
    Vacancy: "",
    employmentType: "",
    organizationName: "",
    description: "",
    industry: "",
    qualifications: "",
    End_date: "",
    skills: "",
    workingHours: "",
    jobLocationType: "",
    datePosted: new Date().toISOString(),
    Location: "",
    salaryRange: "",
    status: "Active",
    postedBy: currentUsername,
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument(
        "67b6d0580007f3db3feb",
        "67b6d0b30023f2b445b2",
        ID.unique(),
        { ...job, postedBy: currentUsername }
      );
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        navigate("/jobs");
      }, 3000);
    } catch (error) {
      console.error("Error Posting Job:", error);
      alert("Failed to Post Job. Check console for details.");
    }
  };

  return (
    <div className="bg-bgDark text-white flex flex-col items-center py-4">
      {showConfirmation && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
          <CheckCircle size={24} />
          Job Posted Successfully!
        </div>
      )}
     
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
            <label className="block text-sm mb-2"> Vacancy *</label>
            <input
              type="text"
              name="Vacancy"
              value={job.Vacancy}
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
            <label className="block text-sm mb-2">Industry*</label>
            <input
              type="text"
              name="industry"
              value={job.industry}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Qualifications*</label>
            <input
              type="text"
              name="qualifications"
              value={job.qualifications}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">End Date*</label>
            <input
              type="date"
              name="End_date"
              value={job.End_date}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Skills*</label>
            <input
              type="text"
              name="skills"
              value={job.skills}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Working Hours*</label>
            <input
              type="text"
              name="workingHours"
              value={job.workingHours}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

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
              <option value="TELECOMMUTE">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Location *</label>
            <input
              type="text"
              name="Location"
              value={job.Location}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Salary Range*</label>
            <input
              type="text"
              name="salaryRange"
              value={job.salaryRange}
              onChange={handleChange}
              className="w-full p-2 border border-borderLight rounded-md bg-bgDark text-white"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
        <button
            type="button"
            onClick={() => navigate("/jobs")}
            className="px-4 py-2 bg-borderLight text-white rounded-md"
          >
            Back to Jobs
          </button>
          
          <button
            type="button"
            onClick={() => setJob({})}
            className="px-4 py-2 bg-secondary text-white rounded-md"
          >
            Clear
          </button>
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
            Post Job
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddJob;
