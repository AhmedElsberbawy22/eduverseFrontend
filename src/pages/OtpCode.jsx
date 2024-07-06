import React, { useState } from "react";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";

function OtpCode() {
  document.title = "Confirm Email";
  const [otpCode, setOtpCode] = useState(""); // State for OTP code input
  const resetEmail = localStorage.getItem("resetEmail") || ""; // Get reset email from local storage

  // Function to handle storing OTP code and navigating to /newpass
  const handleNextClick = () => {
    localStorage.setItem("otpCode", otpCode); // Store OTP code in local storage
    // Navigate to /newpass
    window.location.href = "/newpass"; // Assuming /newpass is handled by React Router
  };

  return (
    <>
      <Link to="/forgetpassword">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
          <img src={logo} alt="" style={{ width: "400px" }} />
        </a>
        <div className="parent">
          <div className="top">
            <h2>forgot password</h2>
            <p>We just sent a code to {resetEmail}.</p>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Enter Code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
            <button className="action_btn" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpCode;
