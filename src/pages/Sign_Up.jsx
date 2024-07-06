import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Angle from "../component/Svg";
import logo from "../images/logo-removebg-preview.png";
import "./App.css";
import Swal from "sweetalert2";

function SignUp() {
  document.title = "Sign Up";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false); // State for loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    let formValid = true;
    let newErrors = { ...errors };

    if (!formData.username) {
      formValid = false;
      newErrors.username = "Username is required";
    }

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
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        formData.password
      )
    ) {
      formValid = false;
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one letter, one number, and one special character";
    }

    if (!formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = "Confirm Password is required";
    }

    if (formData.password !== formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.day) {
      formValid = false;
      newErrors.day = "Day is required";
    } else if (
      !/^\d{1,2}$/.test(formData.day) ||
      formData.day < 1 ||
      formData.day > 31
    ) {
      formValid = false;
      newErrors.day = "Day is invalid";
    }

    if (!formData.month) {
      formValid = false;
      newErrors.month = "Month is required";
    } else if (
      !/^\d{1,2}$/.test(formData.month) ||
      formData.month < 1 ||
      formData.month > 12
    ) {
      formValid = false;
      newErrors.month = "Month is invalid";
    }

    if (!formData.year) {
      formValid = false;
      newErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(formData.year)) {
      formValid = false;
      newErrors.year = "Year is invalid";
    }

    if (!formData.gender) {
      formValid = false;
      newErrors.gender = "Gender is required";
    }

    if (!formValid) {
      setErrors(newErrors);
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Send data to the server
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          fullName: formData.username,
          email: formData.email,
          password: formData.password,
          dob: `${formData.year}-${formData.month.padStart(
            2,
            "0"
          )}-${formData.day.padStart(2, "0")}`,
          gender: formData.gender,
        }
      );

      console.log("Response:", response.data); // Example of using the response data

      // Optionally, clear the form after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        day: "",
        month: "",
        year: "",
        gender: "",
      });

      // Show success message
      Swal.fire("Success", "User registered successfully!", "success");

      localStorage.setItem("Email", formData.email);

      setTimeout(() => {
        window.location.href = "/verifyEmail";
      }, 2000);
    } catch (error) {
      // Set loading state
      setLoading(false);
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.includes("duplicate key error")
      ) {
        if (error.response.data.error.includes("username")) {
          setErrors({ ...errors, username: "Username is already taken" });
        } else if (error.response.data.error.includes("email")) {
          setErrors({ ...errors, email: "Email is already taken" });
        }
      } else {
        Swal.fire("Error", "Server error. Please try again.", "error");
      }
    }
  };

  return (
    <>
      <Link to="/signin">
        <Angle />
      </Link>
      <div className="container">
        <a href="/">
        
        <img src={logo} alt="" style={{width : "400px"}}/>
        </a>
        <div className="parent">
          <div className="top">
            <h2>Sign up</h2>
            <p>Welcome to edu vrse.</p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {errors.username && <p className="error">{errors.username}</p>}
            <input
              onChange={handleChange}
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              className={errors.username ? "error" : ""}
            />
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
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              className={errors.confirmPassword ? "error" : ""}
            />

            <h3>Birthday</h3>
            <div className="birthdate">
              <div>
                {errors.day && <p className="error">{errors.day}</p>}
                <label htmlFor="day">Day</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="day"
                  value={formData.day}
                  min="1"
                  max="31"
                  placeholder=""
                  className={errors.day ? "error" : ""}
                />
              </div>
              <div>
                {errors.month && <p className="error">{errors.month}</p>}
                <label htmlFor="month">Month</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="month"
                  value={formData.month}
                  min="1"
                  max="12"
                  placeholder=""
                  className={errors.month ? "error" : ""}
                />
              </div>
              <div>
                {errors.year && <p className="error">{errors.year}</p>}
                <label htmlFor="year">Year</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="year"
                  value={formData.year}
                  min="1900"
                  max="2100"
                  placeholder=""
                  className={errors.year ? "error" : ""}
                />
              </div>
            </div>

            <h3>Gender</h3>
            <br />
            <div className="gender">
              {errors.gender && <p className="error">{errors.gender}</p>}
              <div>
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="action_btn" disabled={loading}>
              {loading ? "Loading..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
