import "./SignUp.css";
import PicProfile from "../src/img/PicProfil.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();
  const [ProfilePicture, setProfilePicture] = useState(PicProfile);
  const [FullName, setFullName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setUserEmail] = useState('');
  const [Password, setUserPassword] = useState('');
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
        // Convert the file to Base64 string
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
    console.log('yes that all work');
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  

  const AddUser = async (e) => {
    // Adding New user to database
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/signup", {
        FullName,
        UserName,
        Email,
        Password,
        ProfilePicture,
      });

      // If the response indicates success (HTTP status 201)
      if (response.status === 201) {
        // Show SweetAlert on success
        Swal.fire({
          title: "Success!",
          text: "User created successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error adding user:", error);

      // Show SweetAlert on error
      Swal.fire({
        title: "Oops!",
        text: error.response
          ? error.response.data.error
          : "Something went wrong!",
        icon: "error",
      });

    }finally{
      navigate('/');
    }
    
  };

  return (
    <div className="SignUp_Div" onSubmit={handleSubmit}>
      <form className="SignUp_Form" onSubmit={AddUser}>
      <div className="Profile" >
        <div className="Profile_Pic">
          <span>
            <img src={PicProfile} alt="Profil_pic" className="profilePic" onClick={handleImageClick}/>
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
        <input type="text" placeholder="FullName"         
        value={FullName}
          onChange={(e) => setFullName(e.target.value)} />
        <input type="text" placeholder="Username"           
        value={UserName}
          onChange={(e) => setUserName(e.target.value)}/>
        <input type="text" placeholder="Email" 
        value={Email}
        onChange={(e) => setUserEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={Password}
        onChange={(e) => setUserPassword(e.target.value)} />
        <button type="submit" className="SignUp_Bt">
          SignUp
        </button>
      </form>
    </div>
  );
}
