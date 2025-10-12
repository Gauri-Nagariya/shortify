// import React from "react";
// import { Link } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import { useContext } from "react";

// const Navbar = () => {

//       const { setShowLogin } = useContext(AppContext);
    
//   return (
//     <nav className="bg-blue-600 w-full text-white px-6 py-4 flex justify-between items-center">
//       {/* Logo / Brand */}
//       <div className="text-xl font-bold">
//         <Link to="/">MyApp</Link>
//       </div>

//       {/* Navigation Links */}
//       <div className="space-x-6">
//         <Link to="/" className="hover:text-gray-200">
//           Home
//         </Link>
//         <Link to="/create" className="hover:text-gray-200">
//           Create Company
//         </Link>
//         <Link to="/about" className="hover:text-gray-200">
//           About
//         </Link>
//     <button
//       onClick={() => setShowLogin(true)}
//       className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//       Login
//     </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center w-full">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">MyApp</Link>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/create" className="hover:text-gray-200">Create Url</Link>

        {/* Login / Profile button */}
        {!user ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-4xl"
          >
            Login / Sign Up
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-blue-600 px-4 py-2 rounded-4xl"
            >
              Hey, {user.User_name}
            </button>
            {dropdownOpen && (
              <div className="">
                <button
                  onClick={logout}
                  className="absolute right-0 mt-2 bg-white text-black shadow block px-4 py-2 w-26 text-center hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
