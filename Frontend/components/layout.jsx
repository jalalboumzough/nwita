import React, { useEffect,useState } from "react";
import "./Navbar.css";
import logo from "../src/img/nwita.png";
import home from "../src/assets/home.svg";
import note from "../src/img/note.png";
import notification from "../src/img/notification.png";
import profile from "../src/img/profile.png";
import logout from "../src/img/Logout.png";
import AddNote from "../components/add_notes";
import Notes from "./note/notes";
import { useNavigate } from "react-router-dom";
import add from "../src/img/add_post_btn.svg";
import search from "../src/img/search_btn.svg";

function Layout() {
 
  return (
    <>
       <Navbar />
       <AllNote />
    </>
  );
}
export default Layout;
