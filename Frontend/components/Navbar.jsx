import React, { useEffect } from "react";
import "./Navbar.css";
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

function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const AddNote = () => {};
  return (
    <div className="HomePage">
      <div className="Navbar">
        <span className="nv_logo">
          <img src={logo} alt="" srcset="" />
        </span>
        <div className="nv_Menu">
          <ul>
            <li>
              <span className="nv_Menu_content">
                <img src={home} alt="" />
              </span>
              <span>Home</span>
            </li>
            <li>
              {" "}
              <span className="nv_Menu_content">
                <img src={notification} alt="" srcset="" />
              </span>
              <span> Notification</span>
            </li>
            <li>
              <span className="nv_Menu_content">
                <img src={note} alt="" srcset="" />
              </span>
              <span>My Note</span>
            </li>
            <li>
              <span className="nv_Menu_content">
                <img src={profile} alt="" />
              </span>
              <span>Profile</span>
            </li>
          </ul>
        </div>
        <div className="nv_Logout" onClick={handleClick}>
          <img src={logout} alt="" srcset="" />
          <span>Logout</span>
        </div>
      </div>
      <div className="display_content">
        <div className="searchBar"></div>
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
        <Notes />
      </div>
      <div className="add_search_bt">
        <span className="add">
          <img src={add} alt="add note" />
        </span>
        <span className="search">
          <span>
            <input type="text" value="Search" />
          </span>
          <img src={search} alt="add note" />
        </span>
      </div>
    </div>
  );
}
export default Navbar;
