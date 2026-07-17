import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MoviesPages from '../components/MoviesPages';


const Movie = () => {
  return (
    <div>
        <NavBar/>
        <MoviesPages/>
        <Footer/>
    </div>
  )
}

export default Movie