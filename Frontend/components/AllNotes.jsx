import React, { useState, useEffect } from "react";
import "./AllNotes.css";
import "./Notecard.css";
import SVGComponent from "./Epingle";
import axios from "axios";

const Notes = (props) => {
  const [allNotes, setAllNotes] = useState([]);
  const [userpic, setUserPic] = useState();
  const [Token, setToken] = useState([]);
  const [epingleStates, setEpingleStates] = useState({});

  useEffect(() => {
    const userpic = localStorage.getItem("userpic");
    setUserPic(userpic);
    const token = localStorage.getItem("token");
    setToken(token);

    const fetchNotes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/AllNotes",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const notes = response.data;
        setAllNotes(sortNotes(notes));

        const initialEpingleStates = notes.reduce((acc, note) => {
          acc[note._id] = note.isPinned || false;
          return acc;
        }, {});
        setEpingleStates(initialEpingleStates);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const sortNotes = (notes) => {
    return notes.sort((a, b) => {
      // First, sort by epingle (pinned) status (pinned notes first)
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
      // Then, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const handleEpingleClick = async (noteId) => {
    const newEpingleState = !epingleStates[noteId];
    setEpingleStates((prevStates) => ({
      ...prevStates,
      [noteId]: newEpingleState,
    }));

    await updatePinState(noteId, newEpingleState);
  };

  const updatePinState = async (noteId, isPinned) => {
    try {
      await axios.put(
        "http://localhost:3000/api/updateNotePinState",
        { noteId, isPinned },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating pin state:", error);
    }
  };

  return (
    <>
      {allNotes.map((note) => (
        <div key={note._id} className="Notes">
          <div className="Note">
            <div className="Note-header">
              <div className="Note-avatar">
                <img src={userpic} alt="User Avatar" />
              </div>
              <div className="Note-title">Vous</div>
              <div className="Post_title">
                <h4>{note.NoteTitle}</h4>
              </div>
              <div className="Note-pin">
                <SVGComponent
                  ispang={epingleStates[note._id]}
                  onClick={() => handleEpingleClick(note._id)}
                />
              </div>
            </div>
            <div className="Post_Content">
              <p>{note.NoteContent}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notes;
