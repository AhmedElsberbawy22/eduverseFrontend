import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfileSettings.css";
import logo from "../images/logo-removebg-preview.png";
import profile_image from "../images/profile_image.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfileSettings() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User Name");
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "************",
  });
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState({
    fullName: false,
    email: false,
    dob: false,
    password: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsLoggedIn(true);
      setUsername(user);
      fetchProfileData(token);
    }
  }, []);

  const fetchProfileData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
      setFormData({
        fullName: response.data.fullName,
        email: response.data.email,
        dob: response.data.dob.split("T")[0],
        password: "************",
      });
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put("http://localhost:5000/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfileData(response.data);
      setIsEditing({
        fullName: false,
        email: false,
        dob: false,
        password: false,
      });
      // Update username in localStorage if it has changed
      if (formData.fullName !== profileData.fullName) {
        localStorage.setItem("username", formData.fullName);
        setUsername(formData.fullName);
      }
      console.log("Data saved:", response.data);
    } catch (error) {
      console.error("Failed to save profile data", error);
    }
  };

  return (
    <div className="profile-settings-container">
      <div className="header">
        <div className="logo_parent">
          <a href="/">
            <img src={logo} alt="logo" className="logo" />
          </a>
        </div>
        <div className="nav">
          <a href="/download">download edu verse</a>
          {isLoggedIn ? (
            <div className="user-menu">
              <span>{username}</span>
              <div className="dropdown-menu">
                <button onClick={handleSettings}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </div>
      </div>

      <div className="profile-settings-content">
        <div className="profile-info-section">
          <h2>PROFILE INFO</h2>
          <div className="profile-info-item">
            <label>FULL NAME</label>
            {isEditing.fullName ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.fullName}</span>
            )}
            <button onClick={() => handleEdit("fullName")}>EDIT</button>
          </div>
          <div className="profile-info-item">
            <label>DATE OF BIRTH</label>
            {isEditing.dob ? (
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.dob.split("T")[0]}</span>
            )}
            <button onClick={() => handleEdit("dob")}>EDIT</button>
          </div>
          <div className="profile-info-item">
            <label>EMAIL</label>
            {isEditing.email ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            ) : (
              <span>{profileData.email}</span>
            )}
            <button onClick={() => handleEdit("email")}>EDIT</button>
          </div>
          <div className="profile-info-item">
            <label>PASSWORD</label>
            {isEditing.password ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            ) : (
              <span>{formData.password}</span>
            )}
            <button onClick={() => handleEdit("password")}>EDIT</button>
          </div>
          <button className="save-button" onClick={handleSave}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
