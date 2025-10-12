// // AppContext.jsx
// import { createContext, useState } from "react";

// export const AppContext = createContext();

// const AppContextProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );
//   const [showLogin, setShowLogin] = useState(false);

//   const value = { user, setUser, showLogin, setShowLogin };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export default AppContextProvider;

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Load saved user & token from localStorage (for persistence)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showLogin, setShowLogin] = useState(false);

  // ✅ LOGIN
  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/login`, {
        Email: email,
        Password: password,
      });

      if (data._id) {
        setUser(data);
        setToken(data._id);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data._id);
        setShowLogin(false);
        toast.success("Logged in successfully!");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Login failed! Backend unreachable or incorrect credentials."
      );
    }
  };

  // ✅ REGISTER
  const registerUser = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/register`, {
        User_name: name,
        Email: email,
        Password: password,
      });

      if (data._id) {
        setUser(data);
        setToken(data._id);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data._id);
        setShowLogin(false);
        toast.success("Account created successfully!");
      } else {
        toast.error("Signup failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Signup failed! Backend not reachable or invalid data.");
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("Logged out!");
  };

  // ✅ Optional: auto-fetch user data from backend if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/login/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (data) {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        showLogin,
        setShowLogin,
        token,
        loginUser,
        registerUser,
        logout,
        backendUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
