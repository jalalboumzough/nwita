import React from "react";
import "./notes.css";
import Epingleicon from "../src/img/epingle.png";

export default function notes() {
  return (
    <>
      <div className="notes_div">
        <span className="Epingle_Btn">
          <img src={Epingleicon} alt="epingle" />
        </span>
        <span>Note Title</span>
        <div className="notes_content"></div>
      </div>
    </>
  );
}
