import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
  document.title = "Sign In";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // State for loading state
  const [generalError, setGeneralError] = useState(""); // State for general error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setGeneralError(""); // Clear the general error message when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    let formValid = true;
    let newErrors = { ...errors };

    if (!formData.email) {
      formValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formValid = false;
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      formValid = false;
      newErrors.password = "Password is required";
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      const response = await axios.post(
        "http://13.53.83.119/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const {token, fullName} = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("username", fullName);

      setFormData({
        email: "",
        password: "",
      });
      setGeneralError("");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);

      setLoading(false);

      if (error.response && error.response.status === 401) {
        setGeneralError("Invalid email or password");
      } else {
        setGeneralError("Server error. Please try again later.");
      }
    }
  };

  return (
    <>
      <Link to="/">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
          <img src={logo} alt="" style={{width : "400px"}}/>
        </a>
        <div className="parent">
          <div className="top">
            <h2>Sign in</h2>
            <p>Welcome back to edu vrse.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {generalError && <p className="error">{generalError}</p>}
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className={errors.password ? "error" : ""}
            />
            <button type="submit" className="action_btn" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
            <Link to="/forgetpassword">Forgot Password?</Link>
            <Link to="/signup">Don't have an account? Sign Up Now</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
