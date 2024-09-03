import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./add_notes.css";
import save from "../src/img/save.svg";
import close from "../src/img/close.svg";
import share from "../src/img/share.svg";

export default function AddNotes() {
  /* Add Note State */
  const [NoteTitle, setNoteTitle] = useState("");
  const [NoteObject, setNoteObject] = useState("");
  const [NoteContent, setNoteContent] = useState("");
  const [NoteBgColor, setNoteBgColor] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control form visibility

  /*Reda Argan : UseState du changement du color et fonctionnalité */
  const [colors, setColors] = useState({
    red: "#fb9c88",
    blue: "#88bbfb",
    green: "#bcfb88",
    orange: "#FFA500",
  });

  const Add_note_div = useRef();
  const div1 = useRef();
  const div2 = useRef();
  const div3 = useRef();
  const div4 = useRef();

  const UpdateColor = (a) => {
    if (a === 1) {
      div1.current.style.border = "2px";
      div1.current.style.borderStyle = "solid";
      div1.current.style.borderColor = "#635959";
      div2.current.style.borderColor = "white";
      div3.current.style.borderColor = "white";
      div4.current.style.borderColor = "white";
      setNoteBgColor(colors.red);
    } else if (a === 2) {
      div1.current.style.borderColor = "white";
      div2.current.style.border = "2px";
      div2.current.style.borderStyle = "solid";
      div2.current.style.borderColor = "#635959";
      div3.current.style.borderColor = "white";
      div4.current.style.borderColor = "white";
      setNoteBgColor(colors.blue);
    } else if (a === 3) {
      div1.current.style.borderColor = "white";
      div2.current.style.borderColor = "white";
      div3.current.style.border = "2px";
      div3.current.style.borderStyle = "solid";
      div3.current.style.borderColor = "#635959";
      div4.current.style.borderColor = "white";
      setNoteBgColor(colors.green);
    } else if (a === 4) {
      div1.current.style.borderColor = "white";
      div2.current.style.borderColor = "white";
      div3.current.style.borderColor = "white";
      div4.current.style.border = "2px";
      div4.current.style.borderStyle = "solid";
      div4.current.style.borderColor = "#635959";
      setNoteBgColor(colors.orange);
    }
  };

  const Save = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/Addnote", {
        NoteTitle,
        NoteObject,
        NoteContent,
        NoteBgColor,
      });
      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "The note is added successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        // Hide the form after successful save
        setIsFormVisible(false);
      } else if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The note could not be added.",
        });
      }
    } catch (error) {
      console.error("Oops", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  const handleClose = () => {
    setIsFormVisible(false); // Hide the form
  };

  return (
    <div className="AddNote">
      {isFormVisible && (
        <div ref={Add_note_div} className="Add_note_div">
          <div className="closebt">
            <img
              src={close}
              alt="close"
              className="close"
              onClick={handleClose} // Handle close button click
            />
          </div>
          <form className="Add_note_from">
            <input
              type="text"
              placeholder="Note title"
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Object"
              onChange={(e) => setNoteObject(e.target.value)}
            />
            <textarea
              placeholder="Content"
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
            <div className="colorspl">
              <div
                ref={div1}
                onClick={() => UpdateColor(1)}
                className="square"
                style={{ backgroundColor: colors.red }}
              ></div>
              <div
                ref={div2}
                onClick={() => UpdateColor(2)}
                className="square"
                style={{ backgroundColor: colors.blue }}
              ></div>
              <div
                ref={div3}
                onClick={() => UpdateColor(3)}
                className="square"
                style={{ backgroundColor: colors.green }}
              ></div>
              <div
                ref={div4}
                onClick={() => UpdateColor(4)}
                className="square"
                style={{ backgroundColor: colors.orange }}
              ></div>
            </div>
            <div className="reaction">
              <img src={save} alt="save" className="save" onClick={Save} />
              <img src={share} alt="share" className="share" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
