import React from 'react'
import { bannerStyles } from '../assets/dummyStyles';
import { Info, Star, Tickets } from 'lucide-react';
import video from '../assets/MovieBannerVideo.mp4';


function Banner() {
  return (
    <>
        <div className= {bannerStyles.container}>
            <video autoPlay loop muted playsInline className= {bannerStyles.video}>
                <source src={video} type="video/mp4" />
                {/* Fallback content for browsers that do not support the video tag */}
                Your browser does not support the video tag.
                
            </video>
            <div className= {bannerStyles.overlay}></div>
            </div>
            <div className= {bannerStyles.content}>
                <div className = { bannerStyles.contentInner}>
                    <h1 
                    className= {bannerStyles.title} style = {{
                        fontFamily : "'Dancing Script', cursive",
                    }}>
                        Ocean's Legacy
                    </h1>
                    <p className= {bannerStyles.description}>
                        Experience the magic of cinema with our exclusive movie selection and seamless booking process.
                    </p>
                    <div className= {bannerStyles.ratingGenreContainer}>
                        <div className= {bannerStyles.ratingContainer}>
                            <div className={bannerStyles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={bannerStyles.star}
                                    aria-hidden="true"
                            />
                             ))}
                            </div>
                            <span className= {bannerStyles.ratingText}>4.8/5</span>
                        </div>
                        <div className= {bannerStyles.genreText}> Adventure •Fantasy •Drama </div>
                    </div>

                    <div className= {bannerStyles.buttonsContainer}>
                        <a href="/movies" className= {bannerStyles.bookButton}>
                        <Tickets className = {bannerStyles.icon} fill = "white"/>
                        Book Movies
                        </a>
                        <a href="/contact" className= {bannerStyles.infoButton}>
                            <Info className = {bannerStyles.icon}/>More Info
                        </a>
                    </div>
                </div>
        </div>
        <style> {bannerStyles.customCSS}</style>
    </>
  )
}

export default Banner
