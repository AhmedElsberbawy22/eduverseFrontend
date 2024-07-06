import React, { useState } from "react";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios";

function ForgetPass() {
  document.title = "Forget Password";
  const [email, setEmail] = useState(""); // State for email input
  const [loading, setLoading] = useState(false); // State for loading state
  const [error, setError] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset previous error message
    setError("");

    // Validate email format
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Send the email for password reset
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { 
          email 
        },
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Store the email in local storage
        localStorage.setItem("resetEmail", email);
        console.log(response);
        // Display success message to the user
        Swal.fire({
          icon: "success",
          title: "Password Reset",
          text: "An email has been sent to reset your password.",
        });
        setTimeout(() => {
          window.location.href = "/otpcode";
        }, 3000);
      } else {
        // Handle error response
        setError("Failed to reset password. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to reset password. Please try again later.");
    } finally {
      // Reset loading state after request completion
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/signin">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
          <img src={logo} alt="" style={{ width: "400px" }} />
        </a>
        <div className="parent">
          <div className="top">
            <h2>Forgot Password</h2>
            <p>Don't worry, just tell us your email.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="action_btn" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgetPass;
