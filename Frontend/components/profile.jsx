import React, { useState, useRef,useEffect } from "react";
import "./profile.css";
import PicProfile from "../src/img/PicProfil.png";
import axios from 'axios';

export default function Profile() {
  const [profilePicture, setProfilePicture] = useState(PicProfile);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    console.log("Image clicked"); // Ajoute ceci pour voir si le clic est détecté
    fileInputRef.current.click(); // Ouvre le sélecteur de fichiers
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Met à jour l'image de profil
      };
      reader.readAsDataURL(file); // Lis le fichier sélectionné comme URL de données
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire
    // Ajoute ici la logique pour sauvegarder les changements
    console.log("Form submitted");
  };

  const [User, setUser] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/User');
        setUser(response.data); // Use response.data directly
      } catch (error) {
        console.error("Error fetching notes:", error); // Correct the error message
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="Profile_Div">
      <div className="UpProfile">
          <div className="UpProfile_Pic">
            <img src={User.ProfilePicture} alt="Pic Profile" className="UpprofilePic" />
            <input
              type="file"
              className="File_Input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // Cache le champ input
            />
      </div>
      </div>
      <form className="Profile_Form" onSubmit={handleSubmit}>
        <input type="text" placeholder="FullName" value={User.FullName} />
        <input type="text" placeholder="UserName" value={User.UserName} />
        <input type="text" placeholder="Email" value={User.Email} />
        <button type="submit" className="Profile_Bt">
          Save Change
        </button>
      </form>
    </div>
  );
}
