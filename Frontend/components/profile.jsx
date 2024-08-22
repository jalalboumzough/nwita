import React, { useState, useRef } from "react";
import "./profile.css";
import PicProfile from "../src/img/PicProfil.png";

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

  return (
    <div className="Profile_Div">
      <div className="Profile">
        <div className="Profile_Pic" onClick={handleImageClick}>
          <span>
            <img src={profilePicture} alt="Profil_pic" className="profilePic" />
            <input
              type="file"
              className="File_Input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // Cache le champ input
            />
          </span>
        </div>
      </div>
      <form className="Profile_Form" onSubmit={handleSubmit}>
        <input type="text" placeholder="FullName" />
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" className="Profile_Bt">
          SignUp
        </button>
      </form>
    </div>
  );
}
