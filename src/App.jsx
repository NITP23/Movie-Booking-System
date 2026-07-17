import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Movie from './pages/Movie';
import Release from './pages/Release';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/movies" element = {<Movie/>}/>
          <Route path="/releases" element = {<Release/>}/>
          <Route path= "/bookings" element = {<Booking/>}/>
          <Route path="/contact" element = {<Contact/>}/>
      </Routes>
    </>
  )
}

export default App