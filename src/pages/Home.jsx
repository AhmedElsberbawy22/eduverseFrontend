import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "../images/logo-removebg-preview.png";
import watch from "../images/watch.png";
import openAreaImage from "../images/openArea.jpg";
import classRoomImage from "../images/classroom.jpg";
import { Link } from "react-router-dom";
import Facebook from "../component/iconsSvg/facebook";
import Twitter from "../component/iconsSvg/twitter";
import Google from "../component/iconsSvg/google";
import LinkedInIcon from "../component/iconsSvg/linkedin";
import YouTubeIcon from "../component/iconsSvg/youtube";

function Home() {
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

  document.title = "Home";

  const handleLogout = () => {
    // أضف منطق تسجيل الخروج هنا (مثل تنظيف بيانات المستخدم من الحالة، localStorage، إلخ)
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    // localStorage.removeItem("username"); // حذف اسم المستخدم من localStorage عند تسجيل الخروج
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/settings"); // الانتقال إلى صفحة الإعدادات
  };

  return (
    <>
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
      <div className="main">
        <img src={watch} alt="vr" />
        <div>
          <h1>edu verse</h1>
          <p>
            Connect with your colleagues with avatars and immersive 3D spaces.
          </p>
          <a href="/download" className="download_btn">
            download
          </a>
        </div>
      </div>
      <div className="nav">
        <ul>
          <li>
            <a href="#key">key benefits</a>
          </li>
          <li>
            <a href="#features">features</a>
          </li>
          <li>
            <a href="#started">getting started</a>
          </li>
          <li>
            <a href="#faqs">faqs</a>
          </li>
        </ul>
      </div>
      <div className="block" id="key">
        <div className="head">
          <h2>KEY BENEFITS</h2>
          <p>Foster copresence in a world of flexible work</p>
        </div>
        <div className="body">
          <div className="left">
            <div className="text_block">
              <h3>Deepen connection</h3>
              <p>
                
Enable multiple discussions in the same place and foster serendipitous conversations and shared experiences.
              </p>
            </div>
            <div className="text_block">
              <h3>Express yourself</h3>
              <p>
                Use your own avatar to enjoy an immersive 3D world
              </p>
            </div>
            <div className="text_block">
              <h3>Bring people together</h3>
              <p>
                Seamlessly unite distributed teams in a 3D environment that
                creates a powerful sense of togetherness.
              </p>
            </div>
          </div>
          <div className="right">
            <img src={openAreaImage} alt="vr" />
          </div>
        </div>
      </div>
      <div className="block" id="features">
        <div className="head">
          <h2>FEATURES</h2>
          <p>Elevate team engagement</p>
        </div>
        <div className="body">
          <div className="right">
            <img src={classRoomImage} alt="vr" />
          </div>
          <div className="left">
            <div className="text_block">
              <h3>Collaborative Spaces</h3>
              <p>
              There is an open area space designed for all users to collaborate freely, and specific classrooms equipped for teaching sessions.
              </p>
            </div>
            <div className="text_block">
              <h3>Real-Time Voice Chat</h3>
              <p>
              EduVerse's real-time voice chat feature ensures that students and educators can interact effortlessly.{" "}
              </p>
            </div>
            <div className="text_block">
              <h3>Whiteboard Functionality</h3>
              <p>
              Educators can illustrate concepts visually, while students can collaborate on ideas, just as they would on a physical whiteboard.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="started" id="started">
        <h3>getting started</h3>
        <p>Try Edu verse for free </p>

        <p>
          Download now and unlock a world of immersive experiences, entirely
          free of charge.
        </p>
        <a href="/download" className="download_btn">
          download
        </a>
      </div>
      <div className="block" id="faqs">
        <div className="head">
        <h3>faqs</h3>
        <p>Frequently asked questions</p>
        </div>
      <div className="body">
        <h4>
          <a href="/">
            <span className="num">1/ </span> How do i join immersive space in
            edu?
          </a>{" "}
        </h4>
      </div>
      </div>
      <div className="footer">
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

export default Home;
