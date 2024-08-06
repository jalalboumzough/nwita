import './login.css'
import React, { useState } from 'react';
import logo from '../src/img/nwita.png'

function LoginForm() {
  return (
    <div className="Login_Div">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <form className="Login_Form">
        <input type="text" placeholder="Username or Email" />
        <input type="password" placeholder="Password" />
        <button className="SignUp_Bt">SignUp</button>
        <button className="SignIn_Bt">SignIn</button>
      </form>
    </div>
  );
}

export default LoginForm;
