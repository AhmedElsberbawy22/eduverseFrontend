import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo-removebg-preview.png";
import download_image from "../images/download.png";
import "./DownloadPage.css";
import Facebook from "../component/iconsSvg/facebook";
import Twitter from "../component/iconsSvg/twitter";
import Google from "../component/iconsSvg/google";
import LinkedInIcon from "../component/iconsSvg/linkedin";
import YouTubeIcon from "../component/iconsSvg/youtube";

function DownloadPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User Name"); // الاسم الافتراضي إذا لم يتم تسجيل الدخول
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (example of using localStorage for authentication)
    const user = localStorage.getItem("username");
    if (user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    // أضف منطق تسجيل الخروج هنا (مثل تنظيف بيانات المستخدم من الحالة، localStorage، إلخ)
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings"); // الانتقال إلى صفحة الإعدادات
  };

  const handleDownload = () => {
    window.location.href = "http://13.53.83.119/api/download";
  };

  return (
    <>
      <div className="download-page-container">
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
        <div className="download-page-content">
          <div className="text-section">
            <h1>The Edu verse is now available</h1>
            <p>
              Connect with your colleagues with avatars and immersive 3D spaces.
            </p>
            <button className="download-app-button" onClick={handleDownload}>
              DOWNLOAD THE EDUVERSE APP FOR DESKTOP
            </button>
          </div>
          <div className="image-section">
            <img
              src={download_image}
              alt="Edu Verse illustration"
              className="illustration-image"
            />
          </div>
        </div>
      </div>
      <div className="footer" style={{ marginTop: "50px" }}>
        <div className="media_links">
          <div className="icons">
            <Facebook />
            <Twitter />
            <Google />
            <LinkedInIcon />
            <YouTubeIcon />
          </div>

          <div className="nav">
            <ul>
              <li>
                <a href="#key">Key Benifits</a>
              </li>
              <li>
                <a href="#features">features</a>
              </li>
              <li>
                <a href="#started">started</a>
              </li>
              <li>
                <a href="#faqs">Faqs</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy_right">
          Copyright &copy; 2024; Designed By "EDUVERSE Team"
        </div>
      </div>
    </>
  );
}

export default DownloadPage;
