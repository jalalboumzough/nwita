import './App.css'
import LoginForm from '../components/login'
import SignUp from '../components/SignUp.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {

  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={<LoginForm />} />
    <Route path="/signup" element={<SignUp />} />
    </Routes>

    </Router>
    </>
  )
}

export default App
