import React, { useState, useRef,useEffect } from "react";
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

  const [email, setEmail] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchEmails = async () => {
      if (email && email.length > 0) {
        try {
          const response = await axios.post("http://localhost:3000/api/Users");
          
          // Assuming the API response is an array of user objects with an Email field
          const suggestions = response.data.map(user => user.Email);
          setEmailSuggestions(suggestions);

        } catch (error) {
          setError("Error fetching email suggestions.");
          console.error("Error fetching emails:", error);
        }
      } else {
        setEmailSuggestions([]);
      }
    };

    fetchEmails();
  }, [email]);
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



  const handleShare = () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing Email",
        text: "Please enter an email address to share the note.",
      });
      return;
    }
    Swal.fire({
      title: "Share Note",
      text: `The note will be shared with ${email}.`,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const handleClose = () => {
    setIsFormVisible(false);
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
              <img src={share} alt="share" className="share" onClick={handleShare}/>
            </div>
            <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setShowSuggestions(true);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && emailSuggestions.length > 0 && (
        <ul className="email-suggestions">
          {emailSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setEmail(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
          </form>
        </div>
      )}
    </div>
  );
}
