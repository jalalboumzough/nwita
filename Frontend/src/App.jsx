import "./App.css";
import LoginForm from "../components/login";
import SignUp from "../components/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Notepost from "../components/note_post.jsx";
import AddNote from "../components/add_notes.jsx";
import Navbar from "../components/Navbar.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/notepost" element={<Notepost />} />
          <Route path="/addnote" element={<AddNote />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
