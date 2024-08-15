import React from 'react';
import logo from "../assets/nwita.png";
import '../style/Sidebar.css';
import { RiHome8Fill, RiNotification4Fill, RiStickyNoteAddFill, RiFileUserFill } from "react-icons/ri";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="Sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="Sidebar-link">
        <a href="#"><RiHome8Fill className='icons' />Home</a>
        <a href="/Notification"><RiNotification4Fill className='icons' />Notification</a>
        <a href="#"><RiStickyNoteAddFill className='icons' />Add note</a>
        <a href="#"><RiFileUserFill className='icons' />Profile</a>
      </div>
      <div className='Sidebar-logout'>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
