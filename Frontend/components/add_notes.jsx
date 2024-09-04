import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./add_notes.css";
import save from "../src/img/save.svg";
import close from "../src/img/close.svg";

export default function AddNotes() {
  const [token, setToken] = useState("");
  const [NoteTitle, setNoteTitle] = useState("");
  const [NoteObject, setNoteObject] = useState("");
  const [NoteContent, setNoteContent] = useState("");
  const [NoteBgColor, setNoteBgColor] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [usernames, setUsernames] = useState("");
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);

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
  const usernameInputRef = useRef();
  const suggestionsRef = useRef();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  const UpdateColor = (a) => {
    const borderColor = "#635959";
    const resetBorder = (div) => (div.current.style.borderColor = "white");

    if (a === 1) {
      div1.current.style.border = `2px solid ${borderColor}`;
      resetBorder(div2);
      resetBorder(div3);
      resetBorder(div4);
      setNoteBgColor(colors.red);
    } else if (a === 2) {
      resetBorder(div1);
      div2.current.style.border = `2px solid ${borderColor}`;
      resetBorder(div3);
      resetBorder(div4);
      setNoteBgColor(colors.blue);
    } else if (a === 3) {
      resetBorder(div1);
      resetBorder(div2);
      div3.current.style.border = `2px solid ${borderColor}`;
      resetBorder(div4);
      setNoteBgColor(colors.green);
    } else if (a === 4) {
      resetBorder(div1);
      resetBorder(div2);
      resetBorder(div3);
      div4.current.style.border = `2px solid ${borderColor}`;
      setNoteBgColor(colors.orange);
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/Users");
        const suggestions = response.data.map((user) => user.UserName);
        setUsernameSuggestions(suggestions);
      } catch (error) {
        setError("Error fetching username suggestions.");
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  useEffect(() => {
    if (usernames.length > 0) {
      const filtered = usernameSuggestions.filter((username) =>
        username.toLowerCase().startsWith(usernames.toLowerCase().trim())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [usernames, usernameSuggestions]);

  const handleClickOutside = (event) => {
    if (
      usernameInputRef.current &&
      !usernameInputRef.current.contains(event.target) &&
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const Save = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Addnote",
        {
          NoteTitle,
          NoteObject,
          NoteContent,
          NoteBgColor,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "The note is added successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          Swal.fire({
            title: "Share Note",
            text: "Would you like to share this note with others?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              setIsShareVisible(true); // Show the share input field
            } else {
              setIsFormVisible(false);
            }
          });
        });
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
    const usernameList = usernames
      .split(",")
      .map((username) => username.trim())
      .filter((username) => username);

    if (usernameList.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing usernames",
        text: "Please enter at least one username to share the note.",
      });
      return;
    }

    Swal.fire({
      title: "Sharing Note",
      text: `The note will be shared with ${usernameList.join(", ")}.`,
      icon: "info",
      confirmButtonText: "OK",
    }).then(() => {
      setIsFormVisible(false); // Close the form after sharing
    });
  };

  const handleClose = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="AddNote">
      {isFormVisible && (
        <div ref={Add_note_div} className="Add_note_div">
          <form className="Add_note_from">
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
            <div className="reaction">
              <img src={save} alt="save" className="save" onClick={Save} />
              {/* Share button is removed because it is handled in Save */}
            </div>
            {isShareVisible && (
              <div className="sheared">
                <input
                  type="text"
                  placeholder="Enter username"
                  value={usernames}
                  onChange={(e) => setUsernames(e.target.value)}
                  onFocus={() => {
                    if (filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  ref={usernameInputRef}
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <ul className="username-suggestions" ref={suggestionsRef}>
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setUsernames((prevUsernames) => {
                            const usernameList = prevUsernames
                              .split(",")
                              .map((username) => username.trim());
                            if (!usernameList.includes(suggestion)) {
                              return `${prevUsernames}, ${suggestion}`;
                            }
                            return prevUsernames;
                          });
                          setShowSuggestions(false);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <button type="button" onClick={handleShare}>
                  Share
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
