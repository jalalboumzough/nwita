import React, { useState } from "react";
import "./Dashboard.css";
import logo from "../src/img/nwita.png";
import home from "../src/img/home.png";
import note from "../src/img/note.png";
import notification from "../src/img/notification.png";
import profile from "../src/img/profile.png";
import logout from "../src/img/Logout.png";
import AddNote from "../components/add_notes";
import Notes from "../components/notes";
import { useNavigate } from "react-router-dom";
import add from "../src/img/add_post_btn.svg";
import search from "../src/img/search_btn.svg";
import Popup from "reactjs-popup";
import Notification from "./Notification";
import NoteCard from "./NoteCard";
import Profile from "./profile.jsx";
import { useRef, useEffect } from "react";

function Dashboard() {
  const notificationRef = useRef(null);
  const navLinksRef = useRef(null);
  const navigate = useNavigate();
  const [currCopm, setcurrcomp] = useState("home");

  useEffect(() => {
    const notification = notificationRef.current;
    const navLinks = navLinksRef.current;

    if (notification && navLinks) {
      notification.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");
      });

      // Cleanup event listener when component unmounts
      return () => {
        notification.removeEventListener("click", () => {
          navLinks.classList.toggle("nav-active");
        });
      };
    }
  }, []);
  const handleLogoutClick = () => {
    navigate("/");
  };

  const handleHome = (text) => {
    console.log(text);
    if (text === "home") {
      setcurrcomp("home");
    } else if (text === "notif") {
      setcurrcomp("notif");
    } else if (text === "profile") {
      setcurrcomp("profile");
    }
  };

  return (
    <div className="HomePage">
      <div className="Navbar">
        <span className="nv_logo">
          <img src={logo} alt="Logo" />
        </span>
        <div className="nv_Menu">
          <ul>
            <li onClick={(e) => handleHome("home")}>
              <span className="nv_Menu_content">
                <img src={home} alt="Home" />
              </span>
              <span>Home</span>
            </li>
            <li ref={notificationRef}>
              <span className="nv_Menu_content Notif">
                <img src={notification} alt="Notification" />
              </span>
              <span>Notification</span>
            </li>
            <li onClick={(e) => handleHome("notif")}>
              <span className="nv_Menu_content">
                <img src={note} alt="My Note" />
              </span>
              <span>My Note</span>
            </li>
            <li onClick={(e) => handleHome("profile")}>
              <span className="nv_Menu_content">
                <img src={profile} alt="Profile" />
              </span>
              <span>Profile</span>
            </li>
          </ul>
        </div>
        <div className="nv_Logout" onClick={handleLogoutClick}>
          <img src={logout} alt="Logout" />
          <span>Logout</span>
        </div>
      </div>
      <div ref={navLinksRef} className="Notification_bar">
        <div className="Notification_content">
          <span>Nouveau note du sara</span>
        </div>
      </div>
      <div className="display_content">
        {currCopm === "home" ? (
          <Notification />
        ) : currCopm === "notif" ? (
          <NoteCard />
        ) : (
          <Profile />
        )}
      </div>
      <div className="add_search_bt">
        <span className="add">
          <Popup
            trigger={<img src={add} alt="Add Note" />}
            modal
            closeOnDocumentClick
          >
            <AddNote />
          </Popup>
        </span>
        <span className="search">
          <span>
            <input type="text" placeholder="Search" id="search_input" />
          </span>
          <img src={search} alt="Search" />
        </span>
      </div>
    </div>
  );
}

export default Dashboard;
