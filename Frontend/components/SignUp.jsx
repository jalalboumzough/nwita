import './SignUp.css'
import PicProfile from '../src/img/PicProfil.png'
import { useNavigate } from 'react-router-dom';



export default function SignUp() {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/'); // Navigate to the specified path
    };
  
  return (
    <div className="SignUp_Div">
      <div className="Profile">
        <div className="Profile_Pic">
          <span>
            <img src={PicProfile} alt="Profil_pic" className="profilePic" />
            <input
              type="file"
              className="File_Input"
              accept="image/*"
            />
          </span>
        </div> 
      </div>
      <form className="SignUp_Form">
        <input type="text" placeholder="FullName" />
        <input type="text" placeholder="Username" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button onClick={handleClick} className="SignUp_Bt">SignUp</button>
      </form>
    </div>
  )
}
