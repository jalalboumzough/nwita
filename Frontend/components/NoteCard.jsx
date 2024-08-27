import React, { useState, useEffect } from "react";
import "./Notecard.css";
import Epingle from "./Epingle";
import axios from 'axios';

const NoteCard = (props) => {
  const [allNotes, setAllNotes] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/AllNotes');
        setAllNotes(response.data); // Use response.data directly
      } catch (error) {
        console.error("Error fetching notes:", error); // Correct the error message
      }
    };
    fetchNotes();
  }, []);

  return (
    <>
      {allNotes.map(note => (
        <div key={note._id} className="note-card" style={{backgroundColor:note.NoteBgColor}}>
          <div className="note-title">
            {note.NoteTitle}
            <Epingle ispang={props.ispang} className="epingler" />
          </div>
          <div className="note-content">
            {note.NoteContent}
          </div>
        </div>
      ))}
    </>
  );
};

export default NoteCard;
