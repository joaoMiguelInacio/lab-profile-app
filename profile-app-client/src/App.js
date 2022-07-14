import React from 'react';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    
    <NavBar />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
      </Routes>

    </>
  );
}

export default App;
