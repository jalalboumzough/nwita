
import React from 'react';
import '../style/Notification.css';
import Sidebar from '../components/Sidebar';
import NoteCard from '../components/NoteCard';


const Notes = () => {
  
  return (
    <>
    <Sidebar />
    <div className="Notes">
      <div className="Note">
        <div className="Note-header">
          <div className="Note-avatar"></div>
          <div className="Note-title">Rida</div>
          <div className="Note-pin">📌</div>
        </div>
        <NoteCard/>
        <div className="Note-content">Commentaire</div>
      </div>
      <div className="Note">
        <div className="Note-header">
          <div className="Note-avatar"></div>
          <div className="Note-title">Sara</div>
          <div className="Note-pin">📌</div>
        </div>
        <NoteCard/>
        <div className="Note-content">Commentaire</div>
      </div>
    </div>
    </>
  );
};

export default Notes;
