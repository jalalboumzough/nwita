import "./SignUp.css";
import PicProfile from "../src/img/PicProfil.png";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUp() {
  const navigate = useNavigate();
  const [ProfilePicture, setProfilePicture] = useState();
  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [Email, setUserEmail] = useState("");
  const [Password, setUserPassword] = useState("");
  const fileInputRef = useRef(null);
  const [file, setFile] = useState("");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the file to Base64 string
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const AddUser = async (e) => {
    e.preventDefault();
    try {
      console.log("this photo : ", ProfilePicture);
      const response = await axios.post("http://localhost:3000/api/signup", {
        FullName,
        UserName,
        Email,
        Password,
        ProfilePicture: {
          data: ProfilePicture,
          contentType: file.type,
        },
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User created successfully!",
          icon: "success",
        });
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text: error.response
          ? error.response.data.error
          : "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <div className="SignUp_Div">
      <form className="SignUp_Form">
        <div className="Profile" onClick={handleImageClick}>
          <div
            className={`Profile_Pic ${
              ProfilePicture !== PicProfile ? "" : "icon"
            }`}
          >
            <img src={ProfilePicture} alt="Profile_pic" />
            <input
              type="file"
              className="File_Input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Full Name"
          value={FullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={UserName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button type="" onClick={AddUser} className="SignUp_Bt">
          Sign Up
        </button>
      </form>
    </div>
  );
}
