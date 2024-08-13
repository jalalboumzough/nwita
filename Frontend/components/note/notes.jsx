import React, { useState } from "react";
import "./notes.css";
import Epingleicon from "../../src/img/epingle.png";
import SVGComponent from "./svgPingComponent";
export default function notes(props) {
  
  return (
    <>
      <div className="notes_div">
        <div className="title">
        
        <span>Note Title</span>
        <span className="Epingle_Btn">
        <SVGComponent ispang={props.ispang}/>
        </span>
        </div>
        
        <div className="notes_content"></div>
      </div>
    </>
  );
}
