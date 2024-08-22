import "./SignUp.css";
import PicProfile from "../src/img/PicProfil.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(PicProfile);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    console.log("Image clicked");
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="SignUp_Div" onSubmit={handleSubmit}>
      <div className="Profile" onClick={handleImageClick}>
        <div className="Profile_Pic">
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
      <form className="SignUp_Form">
        <input type="text" placeholder="FullName" />
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleClick} className="SignUp_Bt">
          SignUp
        </button>
      </form>
    </div>
  );
}
