import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary " to="/">
          Shortify
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create URL
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li> */}
          </ul>

          {/* Right Side (Login/Profile) */}
          {/* <div className="d-flex align-items-center mr-4" ref={dropdownRef}> */}
         <div className="d-flex align-items-center me-2" ref={dropdownRef}>
  {!user ? (
    <button
      onClick={() => setShowLogin(true)}
      className="btn btn-outline-primary px-3"
    >
      Login / Sign Up
    </button>
  ) : (
    <div className="dropdown">
      {/* Use relative position container to control dropdown width */}
      <div className="d-inline-block" style={{ minWidth: '160px' }}>
        <button
          className="btn btn-primary dropdown-toggle w-100"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Hey, {user.User_name}
        </button>

        {dropdownOpen && (
          <ul className="dropdown-menu dropdown-menu-end show" style={{ width: '100%' }}>
            <li>
              <button
                className="dropdown-item btn w-100"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  )}
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
