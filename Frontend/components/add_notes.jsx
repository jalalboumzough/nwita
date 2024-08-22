import React, { useState, useRef } from "react";
import "./add_notes.css";
import save from "../src/img/save.svg";
import close from "../src/img/close.svg";
import share from "../src/img/share.svg";

export default function add_notes() {
  const [colors, setColors] = useState({
    red: "#fb9c88",
    blue: "#88bbfb",
    green: "#bcfb88",
  });
  const [color, setColor] = useState("#fb9c88");
  const Add_note_div = useRef();
  const div1 = useRef();
  const div2 = useRef();
  const div3 = useRef();
  const UpdateColor = (a) => {
    console.log(div1.current);
    if (a == 1) {
      div1.current.style.border = "1px";
      div1.current.style.borderStyle = "solid";
      div1.current.style.borderColor = "#635959";
      div2.current.style.borderColor = "white";
      div3.current.style.borderColor = "white";
      Add_note_div.current.style.backgroundColor = "#fb9c88";
      setColor(colors.red);
    } else if (a == 2) {
      div1.current.style.borderColor = "white";
      div2.current.style.border = "1px";
      div2.current.style.borderStyle = "solid";
      div2.current.style.borderColor = "#635959";
      div3.current.style.borderColor = "white";
      Add_note_div.current.style.backgroundColor = "#88bbfb";
      setColor(colors.blue);
    } else if (a == 3) {
      div1.current.style.borderColor = "white";
      div2.current.style.borderColor = "white";
      div3.current.style.border = "1px";
      div3.current.style.borderStyle = "solid";
      div3.current.style.borderColor = "#635959";
      Add_note_div.current.style.backgroundColor = "#bcfb88";
      Add_note_from.current.style.borderStyle = none;
      setColor(colors.green);
    }
    console.log(color);
  };

  return (
    <div ref={Add_note_div} className="Add_note_div">
      <from className="Add_note_from">
        <input type="text" placeholder="Note title"></input>
        <input type="text" placeholder="Object"></input>
        <textarea name="" placeholder="Content"></textarea>
        <div className="colorspl">
          <div
            ref={div1}
            onClick={(e) => UpdateColor(1)}
            className="square"
            style={{ backgroundColor: colors.red }}
          ></div>
          <div
            ref={div2}
            onClick={(e) => UpdateColor(2)}
            className="square"
            style={{ backgroundColor: colors.blue }}
          ></div>
          <div
            ref={div3}
            onClick={(e) => UpdateColor(3)}
            className="square"
            style={{ backgroundColor: colors.green }}
          ></div>
        </div>
        <div className="reaction">
          <img src={save} alt="save" className="save" />
          <img src={close} alt="close" className="close" />
          <img src={share} alt="share" className="share" />
        </div>
      </from>
    </div>
  );
}
