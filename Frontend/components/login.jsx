/*
Realiser par Jalal
*/
import "./login.css";
import logo from "../src/img/nwita.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginForm() {
  const navigate = useNavigate();
  const [token,setAuthToken]=useState(null);
  const [userName, SetUserName] = useState("");
  const [password, SetUserPassword] = useState("");

  const handleClick = () => {
    navigate("/signup"); // Navigate to the specified path
  };
  const loginPayload ={
     userName,
     password,
  }

  const handleClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login",loginPayload);

      // Check the response data, assuming it returns a boolean
      if (response.status === 200) {
        const token  =  response.data.token;
        localStorage.setItem("token", token);
        setAuthToken(token);

        Swal.fire({
          title: "Success!",
          text: "User and password are correct.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/Dashboard");
      } else if (response === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User and/or password is incorrect.",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
    
  };
  return (
    <div className="Login_Div">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="Login_Form">
        <input type="text" placeholder="Username or Email" 
        onChange={(e) => SetUserName(e.target.value)}/>
        <input type="password" placeholder="Password" 
        onChange={(e) => SetUserPassword(e.target.value)}/>
        <button onClick={handleClick} className="SignUp_Bt">
          SignUp
        </button>
        <button className="SignIn_Bt" onClick={handleClickLogin}>
          SignIn
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
