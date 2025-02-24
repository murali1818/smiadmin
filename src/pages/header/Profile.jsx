import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { account } from "../../appwriteConfig";

const Profile = () => {
  const { user, refreshUser } = useUser();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  // Function to show notification
  const showNotification = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    showNotification("", "");

    try {
      let updateSuccess = false;

      if (name.trim() !== user.name) {
        await account.updateName(name);
        updateSuccess = true;
      }

      if (email.trim() !== user.email) {
        if (!password) {
          showNotification("Current password is required to update email.", "error");
          return;
        }
        await account.updateEmail(email, password);
        updateSuccess = true;
      }

      if (updateSuccess) {
        showNotification("Profile updated successfully!", "success");
        setTimeout(() => refreshUser(), 2000);
      } else {
        showNotification("No changes detected.", "error");
      }
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    showNotification("", "");

    if (!oldPassword) {
      showNotification("Old password is required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification("Passwords do not match.", "error");
      return;
    }

    try {
      await account.updatePassword(newPassword, oldPassword);
      showNotification("Password updated successfully!", "success");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-300">No user logged in</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkGray text-white p-4">
      {/* Notification */}
      {message.text && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      <div className="w-full max-w-3xl p-6 bg-bgDark2 shadow-lg rounded-lg border border-borderLight shadow-lg rounded-2xl grid gap-6 sm:grid-cols-2">
        {/* Profile Settings */}
        <div>
          <h2 className="text-2xl font-semibold text-primary">Profile Settings</h2>
          <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4">
            <div>
              <label className="text-white">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="text-white">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md  text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="text-white">Current Password (For Update)</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md  text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary-dark transition">Update Profile</button>
          </form>
        </div>

        {/* Change Password */}
        <div>
          <h2 className="text-2xl font-semibold text-primary">Change Password</h2>
          <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
            <div>
              <label className="text-white">Old Password</label>
              <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md  text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="text-white">New Password</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md  text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="text-white">Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md  text-gray-800 placeholder-gray-400 focus:ring focus:ring-primary" required />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-primary rounded-md hover:bg-primary-dark transition">Change Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
