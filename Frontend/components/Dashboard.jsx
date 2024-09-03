import React, { useState, useRef, useEffect } from "react";
import "./Dashboard.css";
import logo from "../src/img/nwita.png";
import home from "../src/img/home.png";
import note from "../src/img/note.png";
import notification from "../src/img/notification.png";
import profile from "../src/img/profile.png";
import logout from "../src/img/Logout.png";
import AddNote from "../components/add_notes";
import { useNavigate } from "react-router-dom";
import add from "../src/img/add_post_btn.svg";
import search from "../src/img/search_btn.svg";
import Popup from "reactjs-popup";
import Notification from "./Notification";
import NoteCard from "./NoteCard";
import Profile from "./profile.jsx";

function Dashboard() {
  const notificationRef = useRef(null);
  const navLinksRef = useRef(null);
  const [currComp, setCurrComp] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]); // Assuming you have a list of all notes
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const handleNotificationClick = () => {
      if (navLinksRef.current) {
        // navLinksRef.current.classList.toggle("nav-active");
      }
    };

    const notification = notificationRef.current;
    if (notification) {
      notification.addEventListener("click", handleNotificationClick);
    }

    return () => {
      if (notification) {
        notification.removeEventListener("click", handleNotificationClick);
      }
    };
  }, []);

  useEffect(() => {
    // Mock function to fetch all notes
    const fetchNotes = async () => {
      // Replace this with your actual data fetching logic
      const notes = [
        { id: 1, title: "Note 1", content: "Content 1" },
        { id: 2, title: "Note 2", content: "Content 2" },
        // More notes...
      ];
      setAllNotes(notes);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredNotes(
        allNotes.filter((note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredNotes(allNotes);
    }
  }, [searchTerm, allNotes]);

  const handleLogoutClick = () => {
    navigate("/");
  };

  const handleMenuClick = (comp) => {
    setCurrComp(comp);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="HomePage">
      <div className="Navbar">
        <span className="nv_logo">
          <img src={logo} alt="Logo" />
        </span>
        <div className="nv_Menu">
          <ul>
            <li onClick={() => handleMenuClick("home")}>
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
            <li onClick={() => handleMenuClick("notif")}>
              <span className="nv_Menu_content">
                <img src={note} alt="My Note" />
              </span>
              <span>My Note</span>
            </li>
            <li onClick={() => handleMenuClick("profile")}>
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
          <span>Nouveau note du Reda Argane</span>
          <span>Nouveau note du said</span>
        </div>
      </div>
      <div className="display_content">
        {currComp === "home" ? (
          <Notification />
        ) : currComp === "notif" ? (
          <NoteCard notes={filteredNotes} /> // Pass filtered notes to NoteCard
        ) : (
          <Profile />
        )}
      </div>
      <div className="add_search_bt">
        <span className="add">
          <Popup trigger={<img src={add} alt="Add Note" />} modal>
            <AddNote />
          </Popup>
        </span>
        <span className={`search ${isSearchVisible ? "show" : ""}`}>
          <input
            type="text"
            placeholder="Search"
            className="search_input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src={search} alt="Search" onClick={toggleSearchVisibility} />
        </span>
      </div>
    </div>
  );
}

export default Dashboard;
