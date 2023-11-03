// import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Teacher from "./components/Teacher"
import Student from "./components/Student"
import Admin from "./components/Admin"
import ReactNavbar from './components/Navbar';
import Login from './components/Login';
// import {Home} from "./components/Home";

function App() {

  return (
    <div className="App">
    <ReactNavbar></ReactNavbar>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/teacher" element={<Teacher/>} />
          <Route path="/student" element={<Student/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
