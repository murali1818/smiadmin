import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import logo from "../../Images/smi.png";
import {
  FaUserCircle,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useUser();
  return (
    <header className="bg-bgDark2 text-white shadow-md py-3 px-6 flex items-center justify-between">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img src={logo} alt="SMi Logo" className="w-32 h-auto" />
      </div>

      {/* Center: Navigation (Desktop) */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary"
            }`
          }
        >
          <FaUsers /> Employee
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary"
            }`
          }
        >
          <FaBriefcase /> Jobs
        </NavLink>
        <NavLink
          to="/applications"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive ? "text-primary border-b-2 border-primary" : "hover:text-primary"
            }`
          }
        >
          <FaFileAlt /> Applications
        </NavLink>
      </nav>

      {/* Right Side: Profile & Mobile Menu */}
      <div className="flex items-center space-x-4">
        {/* Profile Dropdown */}
        <div className="relative  md:block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-3xl" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-bgDark border border-borderLight rounded-md shadow-lg z-50">
              <ul className="py-2 text-sm text-white">
              <NavLink to="/profile" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <li className="px-4 py-2 flex items-center gap-2 hover:bg-borderLight cursor-pointer">
                <FaUserCircle /> Profile
                </li>
                </NavLink > 
                <NavLink to="/settings" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <li className="px-4 py-2 flex items-center gap-2 hover:bg-borderLight cursor-pointer">
                 <FaCog /> Settings
                </li>
                </NavLink>
                <NavLink to="/logout" >
                <li className="px-4 py-2 flex items-center gap-2 hover:bg-secondary cursor-pointer text-primary">
                  <FaSignOutAlt /> Logout
                </li>
                </NavLink>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-14 right-0 w-full  bg-bgDark2  border-t-2 text-white flex flex-col items-right space-y-4 py-6 shadow-md md:hidden">
          <NavLink
            to="/employee"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-lg  px-4 py-2 hover:text-primary transition bgDark"
          >
            <FaUsers /> Employee
          </NavLink>
          <NavLink
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-lg px-4 py-2 hover:text-primary transition"
          >
            <FaBriefcase /> Jobs
          </NavLink>
          <NavLink
            to="/applications"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-lg px-4 py-2 hover:text-primary transition"
          >
            <FaFileAlt /> Applications
          </NavLink>

          
        </div>
      )}
    </header>
  );
};

export default Header;
