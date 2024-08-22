/*
Realiser par Jalal
*/

import "./login.css";
import logo from "../src/img/nwita.png";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup"); // Navigate to the specified path
  };
  const handleClickLogin = () => {
    navigate("/Dashboard");
  };

  
  return (
    <div className="Login_Div">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="Login_Form">
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
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
