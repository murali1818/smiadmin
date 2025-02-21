import React from "react";
import logo from "../../Images/smi.png";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="relative flex justify-center items-center">
        {/* Spinning Circle */}
        <div className="w-48 h-48 border-8 border-transparent border-t-gradient border-l-gradient rounded-full animate-spin"></div>
        
        {/* SMI Text */}
        <h1 className="absolute text-white text-3xl font-bold loader-text"><img src={logo} alt="SMi Logo" className="w-36 h-auto" /></h1>
      </div>
    </div>
  );
};

export default Loader;
