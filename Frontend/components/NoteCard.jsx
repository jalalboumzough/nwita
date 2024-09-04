import React, { useState, useEffect } from "react";
import "./Notecard.css";
import SVGComponent from "./Epingle";
import axios from "axios";

const NoteCard = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [epingleStates, setEpingleStates] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        const initialEpingleStates = notes.reduce((acc, note) => {
          acc[note._id] = false;
          return acc;
        }, {});
        setEpingleStates(initialEpingleStates);

        // Initialize or use a default date if createdAt is missing
        const notesWithDates = notes.map((note) => ({
          ...note,
          createdAt: note.createdAt ? new Date(note.createdAt) : new Date(),
        }));

        // Group notes by date
        const groupedNotes = notesWithDates.reduce((acc, note) => {
          const dateKey = note.createdAt.toDateString(); // Use date string as key
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(note);
          return acc;
        }, {});

        // Convert grouped notes to an array of date groups
        const sortedGroupedNotes = Object.keys(groupedNotes)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((dateKey) => ({
            date: dateKey,
            notes: groupedNotes[dateKey],
          }));

        setAllNotes(sortedGroupedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleEpingleClick = (noteId) => {
    setEpingleStates((prevStates) => ({
      ...prevStates,
      [noteId]: !prevStates[noteId],
    }));
  };

  const formatDate = (date) => {
    if (isNaN(date.getTime())) {
      return "No Date Available";
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {allNotes.map((group) => (
        <div key={group.date} className="notes-group">
          <div className="notes-date-header">
            <div className="StyleTime"></div>
            {formatDate(new Date(group.date))}
          </div>
          {group.notes.map((note) => (
            <div
              key={note._id}
              className="note-card"
              style={{ backgroundColor: note.NoteBgColor }}
            >
              <div className="note-header">
                <div className="note-title">
                  {note.NoteTitle}
                  <SVGComponent
                    ispang={epingleStates[note._id]}
                    onClick={() => handleEpingleClick(note._id)}
                    className="epingler"
                  />
                </div>
              </div>
              <div className="note-content">{note.NoteContent}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default NoteCard;
