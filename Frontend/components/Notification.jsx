import React from "react";
import "./Notification.css";
import "./Notecard.css";
import SVGComponent from "./Epingle";
import { useEffect,useState } from "react";
import axios from 'axios'  

 // Initialize as an empty array




const Notes = (props) => {
  const [allNotes, setAllNotes] = useState([]);
  const [userpic,setUserPic]=useState();
 

  useEffect(() => {
    const userpic=localStorage.getItem('userpic');
    setUserPic(userpic);
      const fetchNotes = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/AllNotes');
          setAllNotes(response.data); 
        } catch (error) {
          console.error("Error fetching notes:", error); // Correct the error message
        }
      };
      fetchNotes();
    }, []);
  return (
    <>
    {
      allNotes.map(note => (
      <div key={note._id} className="Notes">
        <div className="Note">
          <div className="Note-header">
            <div className="Note-avatar"><img src={userpic} alt="" srcset="" /></div>
            <div className="Note-title">Vous</div>
            <div className="Post_title">
              <h4>{note.NoteTitle}</h4>
            </div>
            <div className="Note-pin">
              <SVGComponent ispang={props.ispang} />
            </div>
          </div>
          <div>
            <div className="Post_Content">
              <p>
              {note.NoteContent}
              </p>
            </div>
          </div>
        </div>
      </div>


      ))
    }
    </>
  );
};

export default Notes;
