import React from "react";
import "./Navbar.css";
import logo from "../src/img/nwita.png";
import home from "../src/img/home.png";
import note from "../src/img/note.png";
import notification from "../src/img/notification.png";
import profile from "../src/img/profile.png";
import logout from "../src/img/Logout.png";
import AddNote from "../components/add_notes";

function Navbar() {
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
        <div className="nv_Logout">
          <img src={logout} alt="" srcset="" />
          <span>Logout</span>
        </div>
      </div>
      <div className="space"></div>
      <div className="display_content">
        <AddNote />
      </div>
    </div>
  );
}
export default Navbar;
