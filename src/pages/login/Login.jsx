import React from "react";
import logo from "../../Images/smi.png";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bgDark">
      <div className="w-full max-w-md p-8 space-y-6 bg-bgDark2 shadow-lg rounded-lg border border-borderLight">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="SMi Admin Logo" className="w-48 h-18" />
        </div>
        <h2 className="text-xl font-semibold text-center text-white">
          Sign in to your account
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md text-gray placeholder-gray-400 focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 bg-body border border-borderLight rounded-md text-gray placeholder-gray-400 focus:ring focus:ring-primary"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 text-primary border-borderLight rounded focus:ring-secondary"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-white">
              Remember my preference
            </label>
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
