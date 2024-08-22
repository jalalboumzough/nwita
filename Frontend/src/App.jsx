import "./App.css";
import LoginForm from "../components/login";
import SignUp from "../components/SignUp.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Notepost from "../components/note_post.jsx";
// import AddNote from "../components/add_notes.jsx";
// import Navbar from "../components/Navbar.jsx";
// import Add_Note from "../components/add_notes.jsx";
import Dashboard from "../components/Dashboard.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
