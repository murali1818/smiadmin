import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases } from "../../appwriteConfig";
import Loader from "../header/Loader";
import { CheckCircle, Download, Share2, PhoneCall, ArrowLeft, FileText, Eye } from "lucide-react";

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Pending");
  const [jobTitle, setJobTitle] = useState();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await databases.getDocument(
          "67b6d0580007f3db3feb",
          "67b856de0030782d732d",
          applicationId
        );
        setApplication(response);
        setStatus(response.status);
        setJobTitle(response.jobtitle);
      } catch (error) {
        console.error("Error fetching application details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this profile",
        text: "Here is the candidate's profile:",
        url: `https://cloud.appwrite.io/v1/storage/buckets/67b6de8800292a803597/files/${application.resume}/view?project=67b6ce100032bb22257f`,
      })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  const markAsViewed = async () => {
    try {
      await databases.updateDocument(
        "67b6d0580007f3db3feb",
        "67b856de0030782d732d",
        applicationId,
        { status: "Viewed" }
      );
      setStatus("Viewed");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <Loader />;
  if (!application) return <p className="text-white text-center mt-4">Application not found.</p>;

  return (
    <div className="p-4 md:p-8 bg-bgDark text-gray-800">
      <div className="max-w-6xl mx-auto bg-bgDark2 shadow-md rounded-lg p-4 md:p-6">

        <h1 className="text-xl md:text-2xl font-semibold text-primary flex items-center gap-2">
          <FileText size={24} className="text-primary" />
          Job Applications for {jobTitle}
        </h1>

        <div className="border-b p-4 bg-bgDark2 mt-4">
          <h2 className="text-lg font-bold text-gray-300"><strong>Applicant Name: </strong>{application.applicantName}</h2>
          <p className="text-gray-100"><strong>Email: </strong>{application.email}</p>
          <p className="text-gray-200"><strong>Current Designation: </strong>{application.currentDesignation}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold border-b pb-2 text-gray-100">Description</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-gray-100">
            <p><strong>Experience:</strong> {application.experience} years</p>
            <p><strong>Qualification:</strong> {application.qualification}</p>
            <p><strong>Current CTC:</strong> {application.currentCTC || "N/A"}</p>
            <p><strong>Expected CTC:</strong> {application.expectedCTC || "N/A"}</p>
            <p><strong>Key Skills:</strong> {application.keySkills.join(", ")}</p>
            <p><strong>Languages:</strong> {application.languages}</p>
            <p><strong>Phone:</strong> {application.phone}</p>
            <p><strong>Gender:</strong> {application.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(application.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Current Address:</strong> {application.currentAddress}</p>
            <p><strong>Permanent Address:</strong> <span className="break-words">{application.permanentAddress}</span></p>
            <p><strong>Reason for Interest:</strong> <span className="break-words">{application.whyInterested}</span></p>
            <p><strong>Applied At:</strong> {new Date(application.appliedAt).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className={status === "Viewed" ? "text-green-500" : "text-yellow-500"}>{status}</span></p>
          </div>
        </div>

        <div className="mt-6 flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto">
          <button
            onClick={() => navigate("/applications")}
            className="bg-gray-700 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-gray-600 transition"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:flex">Back to Applications</span>
          </button>

          {application.resume && (
            <>
              <a
                href={`https://cloud.appwrite.io/v1/storage/buckets/67b6de8800292a803597/files/${application.resume}/view?project=67b6ce100032bb22257f`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
              >
                <Eye size={18} />
                <span className="hidden sm:flex">View Resume</span>
              </a>

              <a
                href={`https://cloud.appwrite.io/v1/storage/buckets/67b6de8800292a803597/files/${application.resume}/download?project=67b6ce100032bb22257f`}
                download
                className="bg-red-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-red-600 transition"
              >
                <Download size={18} />
                <span className="hidden sm:flex">Download</span>
              </a>
            </>
          )}

          <button
            onClick={handleShare}
            className="bg-orange-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-orange-600 transition"
          >
            <Share2 size={18} />
            <span className="hidden sm:flex">Share</span>
          </button>

          <a
            href={`tel:${application.phone}`}
            className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-purple-600 transition"
          >
            <PhoneCall size={18} />
            <span className="hidden sm:flex">Call</span>
          </a>

          {status !== "Viewed" && (
            <button
              onClick={markAsViewed}
              className="bg-green-500 text-white px-3 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
            >
              <CheckCircle size={18} />
              <span className="hidden sm:flex">Viewed</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetails;
