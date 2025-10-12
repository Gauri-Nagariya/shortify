import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Loginform from "./components/Loginform";
import { AppContext } from "./context/AppContext";
// import CreateUrlpage from "./pages/CreateUrl";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./route/ProtectedRoute";
import CreateUrl from "./pages/CreateUrl";
const App = () => {
  const { showLogin, user } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <ToastContainer position="bottom-right" /> {showLogin && <Loginform />}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Protected route */}
        {/* <Route
          path="/create"
          element={user ? <CreateCompanyPage /> : <Navigate to="/" />}
        />{" "} */}
      <Route
    path='/create'
    element={
      <ProtectedRoute>
        <CreateUrl />
      </ProtectedRoute>
    }
    />
    </Routes> 
    </div>
  );
};
export default App;
