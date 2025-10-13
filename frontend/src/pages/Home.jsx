import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Home = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate("/create"); // ✅ Go to Create Page if logged in
    } else {
      setShowLogin(true); // ✅ Open Login form if not logged in
    }
  };

  return (
    <div className="container py-5 text-center">
      {/* Hero Section */}
      <div className="bg-light p-5 rounded-4 shadow-sm">
        <h1 className="display-5 fw-bold text-primary mb-3">
          Shorten URLs & Generate QR Codes Instantly
        </h1>
        <p className="lead text-secondary mb-4">
          Secure, fast, and trackable links for all your needs.
        </p>

        {/* Call-to-Action */}
        <div className="d-flex justify-content-center">
          <button
            onClick={handleGetStarted}
            className="btn btn-primary btn-lg px-4"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mt-5">
        {/* Feature 1 */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">🔗 Shorten URLs</h5>
              <p className="card-text text-secondary">
                Convert long URLs into short, shareable links in just one click.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 - Download QR Codes */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">📥 Download QR Codes</h5>
              <p className="card-text text-secondary">
                Instantly generate QR codes for your short links and download them easily.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-primary">📱 Mobile Friendly</h5>
              <p className="card-text text-secondary">
                Access and share your shortened URLs anytime, anywhere, on any device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
