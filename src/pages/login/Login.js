import React, { useState, useEffect } from "react";
import { account } from "../../appwriteConfig"; // ✅ Import Appwrite authentication
import { useNavigate } from "react-router-dom";
import logo from "../../Images/smi.png";
import { useUser } from "../../contexts/UserContext"; // ✅ Import user context
 
const Login = () => {
  const navigate = useNavigate();
 
  const { user } = useUser(); // ✅ Get user state
 
  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/jobs");
    }
  }, [user, navigate]);
 
  // State for email & password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // ✅ Message state
 
 
 
  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Clear previous messages
 
    try {
      await account.createEmailPasswordSession(email, password);
      setMessage({ text: "Login successful! Redirecting...", type: "success" });
 
      setTimeout(() => navigate("/jobs"), 1500); // ✅ Redirect after success
    } catch (error) {
      console.error("Login failed:", error);
      setMessage({ text: error.message, type: "error" });
    }
  };
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-bgDark">
     
      <div className="w-full max-w-md p-8 space-y-6 bg-bgDark2 shadow-lg rounded-lg border border-borderLight">
         {/* ✅ Styled Success/Error Message */}
         {message.text && (
          <div
            className={`p-3 mt-4 text-center text-sm font-semibold rounded-md ${
              message.type === "success"
                ? "bg-green-600 text-white border border-green-700"
                : "bg-red-300 text-white border border-red-700"
            }`}
          >
            {message.text}
          </div>
        )}
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="SMi Admin Logo" className="w-48 h-18" />
        </div>
 
        <h2 className="text-xl font-semibold text-center text-white">
          Sign in to your account
        </h2>
 
        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md text-gray placeholder-gray-400 focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md text-gray placeholder-gray-400 focus:ring focus:ring-primary"
            />
          </div>
 
          <button
            type="submit"
            className="w-full py-2 text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:from-yellow-500 hover:to-red-700 focus:ring focus:ring-primary"
          >
            Sign Me In
          </button>
        </form>
 
       
      </div>
    </div>
  );
};
 
export default Login;