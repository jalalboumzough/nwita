import React, { useState, useRef,useEffect } from "react";
import "./profile.css";
import axios from 'axios';

export default function Profile() {
  const [ProfilePicture, setProfilePicture] = useState(null);
  const [UserFullName,setUserFullName]=useState(null);
  const [UserName,setUserName]=useState("");
  const fileInputRef = useRef(null);
  const token =localStorage.getItem('token');
  const [User, setUser] = useState([]);



  const handleImageClick = () => {
    fileInputRef.current.click();
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
    console.log(ProfilePicture);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/UpdateProfile', {      
          FullName:UserFullName,
          UserName,
          ProfilePicture
      },
      {headers: {
        Authorization: `Bearer ${token}` 
      },}
    );
      if(response.status===200){
        console.log('YES ')
      }else{
        console.log('NO ')
      }
    } catch (error) {
      console.error("Error fetching notes:", error); // Correct the error message
    }

  };


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/User', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        const user =response.data;
        setProfilePicture(user.ProfilePicture);
        setUserFullName(user.FullName);
        setUserName(user.UserName);
         // Use response.data directly
      } catch (error) {
        console.error("Error fetching notes:", error); // Correct the error message
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="Profile_Div">

      <form className="Profile_Form" onSubmit={handleSubmit}>
      <div className="UpProfile">
          <div className="UpProfile_Pic" onClick={handleImageClick}>
            <img src={ProfilePicture} alt="Pic Profile" className="UpprofilePic" />
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
        <input type="text" placeholder="FullName" value={UserFullName} onChange={(e)=>setUserFullName(e.target.value)}/>
        <input type="text" placeholder="UserName" value={UserName} onChange={(e)=>setUserName(e.target.value)} />
        <button type="submit" className="Profile_Bt">
          Save Change
        </button>
      </form>
    </div>
  );
}
