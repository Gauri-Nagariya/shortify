import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Loginform = () => {
  const { setShowLogin, loginUser, registerUser } = useContext(AppContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      await loginUser(email, password);
    } else {
      await registerUser(name, email, password);
    }
  };

  return (
    // <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
    <div
  className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
  style={{ zIndex: 1050 }}  // ✅ Added this line
>
      <div className="card shadow-lg border-0" style={{ width: "22rem" }}>
        <div className="card-body p-4 position-relative">
          {/* Close Button */}
          <button
            onClick={() => setShowLogin(false)}
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          ></button>

          {/* Title */}
          <h3 className="text-center text-primary fw-bold mb-4">
            {state === "Login" ? "Login" : "Create Account"}
          </h3>

          {/* Form */}
          <form onSubmit={onSubmitHandler}>
            {state !== "Login" && (
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold py-2"
            >
              {state === "Login" ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Switch Form Type */}
          <div className="text-center mt-3">
            {state === "Login" ? (
              <p className="text-muted">
                Don’t have an account?{" "}
                <span
                  className="text-primary fw-semibold"
                  role="button"
                  onClick={() => setState("SignUp")}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p className="text-muted">
                Already have an account?{" "}
                <span
                  className="text-primary fw-semibold"
                  role="button"
                  onClick={() => setState("Login")}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
