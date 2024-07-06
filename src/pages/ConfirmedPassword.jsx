import React, { useState } from "react";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";

function ConfirmedPass() {
  document.title = "confirm Password";
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
      setError(
        "Password must contain at least one special character and one special character"
      );
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

    try {
      // Send the new password for confirmation
      const response = await fetch("http://localhost:3000/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Display success message to the user
        Swal.fire({
          icon: "success",
          title: "Password Changed",
          text: "Your password has been successfully changed.",
        });
        setTimeout(() => {
          window.location.href("./signin"); // Redirect to login page using React Router
        }, 3000);
      } else {
        // Handle error response
        const data = await response.json();
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Failed to change password. Please try again later.");
        }
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
      <Link to="/">
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
            {error && <p className="error">{error}</p>}
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
