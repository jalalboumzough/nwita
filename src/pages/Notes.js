import React from 'react';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';
import '../style/Notes.css';

const Notes = () => {
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="header">
          <h2>All notes</h2>
          <div>
            <input type="text" placeholder="search by email" />
            <input type="date" />
          </div>
        </div>
        <div className="notes-grid">
          {Array(6).fill(0).map((_, index) => (
            <NoteCard key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Notes;
