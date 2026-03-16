import React from 'react'
import NavBar from '../components/NavBar';
import Banner from '../components/Banner';
import Movies from '../components/Movies';
import Trailers from '../components/Trailers';  
import News from '../components/News';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
        <NavBar />
        <Banner />
        <Movies />
        <Trailers />
        <News />
        <Footer/>
        
    </>
  )
}

export default Home