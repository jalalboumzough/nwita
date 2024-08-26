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
  const [NoteTitle,setNoteTitle]=useState('');
  const [NoteObject,setNoteObject]=useState('');
  const [NoteContent,setNoteContent]=useState('');
  const [NoteBgColor, setNoteBgColor] = useState("");

  /*Reda Argan : UseState du changement du color et functionalité  */

  const [colors, setColors] = useState({
    red: "#fb9c88",
    blue: "#88bbfb",
    green: "#bcfb88",
  });
  
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
      setNoteBgColor(colors.red);
    } else if (a == 2) {
      div1.current.style.borderColor = "white";
      div2.current.style.border = "1px";
      div2.current.style.borderStyle = "solid";
      div2.current.style.borderColor = "#635959";
      div3.current.style.borderColor = "white";
      Add_note_div.current.style.backgroundColor = "#88bbfb";
      setNoteBgColor(colors.blue);
    } else if (a == 3) {
      div1.current.style.borderColor = "white";
      div2.current.style.borderColor = "white";
      div3.current.style.border = "1px";
      div3.current.style.borderStyle = "solid";
      div3.current.style.borderColor = "#635959";
      Add_note_div.current.style.backgroundColor = "#bcfb88";
      Add_note_div.current.style.borderStyle ="none";
      setNoteBgColor(colors.green);
    }
  console.log(NoteBgColor);
  }
  const Save= async (e)=>{
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:3000/api/Addnote",{
        NoteTitle,
        NoteObject,
        NoteContent,
        NoteBgColor,});
        if(response.status===201){
          Swal.fire({
            title: "Success!",
            text: "The note is adding ",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        }else if( response===400){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The note is note adding",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }}catch(error){
          console.error("Opps",error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. Please try again later.",
          })
        }
      }
  return (
    <div ref={Add_note_div} className="Add_note_div" style={{ backgroundColor: NoteBgColor }}>
<from className="Add_note_from">
        <input type="text" placeholder="Note title"
        onChange={(e)=>setNoteTitle(e.target.value)}
        ></input>
        <input type="text" placeholder="Object" onChange={(e)=>setNoteObject(e.target.value)}></input>
        <textarea name="" placeholder="Content" onChange={(e)=>setNoteContent(e.target.value)} ></textarea>
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
        </div>
        <div className="reaction">
          <img src={save} alt="save" className="save" onClick={Save} />
          <img src={close} alt="close" className="close" />
          <img src={share} alt="share" className="share" />
        </div>
      </from>
    </div>
  );
}
