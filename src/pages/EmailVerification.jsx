import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import axios from "axios";

function EmailVerification() {
  const navigate = useNavigate();
  document.title = "Confirm Email";
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("Email");
    if (email) {
      setResetEmail(email);
    }
  }, []);

  const handleVerification = async () => {
    setLoading(true);
    try {
      // Make API call to verify email
      const response = await axios.get(`http://localhost:5000/api/auth/verify-email/${verificationCode}`);
      
      // Handle response
      if (response.status === 200) {
        setMessage(response.data.message);
        setVerified(true); // Update verification status
        localStorage.removeItem("Email"); // Clear email from localStorage
        setTimeout(() => {
          navigate("/signin"); // Redirect to sign-in page after 2 seconds
        }, 2000);
      } else {
        setMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Link to="/signup">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
        <img src={logo} alt="" style={{width :  "400px"}}/>
        </a>
        <div className="parent">
          <div className="top">
            <h2>Verify Email</h2>
            <p>We just sent a code to {resetEmail}.</p>
          </div>
          <div className="form">
            <input type="text"
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter Code" />
            <button className="action_btn" onClick={handleVerification} disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerification;
