import React from "react";
import "./add_notes.css";

export default function add_notes() {
  return (
    <div className="Add_note_div">
      <from className="Add_note_from">
        <input type="text" placeholder="Note title"></input>
        <input type="text" placeholder="Object"></input>
        <textarea name="" placeholder="Content"></textarea>
      </from>
    </div>
  );
}
