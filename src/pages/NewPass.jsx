import React, { useState } from "react";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";
import axios from "axios"; // Import Axios for HTTP requests

function ConfirmedPass() {
  document.title = "New Password";
  const [loading, setLoading] = useState(false); // State for loading state
  const [newPassword, setNewPassword] = useState(""); // State for new password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirmed password input
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password inputs
    if (!newPassword || !confirmPassword) {
      setError("Please enter both new and confirmed passwords");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!/[a-zA-Z]/.test(newPassword)) {
      setError("Password must contain at least one letter");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setError("Password must contain at least one special character");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmed password do not match");
      return;
    }

    // Reset previous errors
    setError("");

    // Set loading state
    setLoading(true);

    // Get OTP code from local storage
    const otpCode = localStorage.getItem("otpCode");

    // Get email from local storage
    const email = localStorage.getItem("resetEmail");

    try {
      // Send the new password and OTP code for confirmation
      const response = await axios.post(
        "http://localhost:5000/api/auth/set-new-password",
        {
          token: otpCode,
          newPassword: newPassword,
        }
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Display success message to the user
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been successfully changed.",
        });

        setTimeout(() => {
          window.location.href = "/signin";
        }, 3000);
      } else {
        // Handle error response
        const errorMessage = response.data.error || "Failed to change password";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to change password. Please try again later.");
    } finally {
      // Reset loading state after request completion
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/otpcode">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
          <img src={logo} alt="" style={{ width: "400px" }} />
        </a>
        <div className="parent">
          <div className="top">
            <h2>Forgot Password</h2>
            <p>Reset your Password</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ConfirmedPass;
