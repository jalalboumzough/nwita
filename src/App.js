import React from 'react';
import Notes from './pages/Notes';
import './App.css';
import Notification from './pages/Notification';
import { BrowserRouter , Routes ,Route } from "react-router-dom"

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/Notes" element={<Notes />}/>
        <Route path="/Notification" element={<Notification />}/>
      </Routes>
      </BrowserRouter>
   
    </div>
  );
};

export default App;
