import React from 'react'
import { footerStyles } from '../assets/dummyStyles';
import { ArrowUp,Clapperboard, Film, Star, Ticket, Popcorn, Mail, Phone, MapPin ,User,Facebook,Twitter,Instagram,Youtube} from 'lucide-react';
import { useState, useEffect } from 'react';

const Footer = () => {

    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }; // for smooth scrolling
  
  const links = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "Releases", href: "/releases" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" }
  ];
  
  const genreLinks = [
    { label: "Horror", href: "/movies" },
    { label: "Thriller", href: "/movies" },
    { label: "Action", href: "/movies" },
    { label: "Drama", href: "/movies" },
    { label: "Comedy", href: "/movies" },
  ];

  //help in scrolling to top when user clicks on the button and also helps in showing the button when user scrolls down 300px from the top of the page
  useEffect(() => { 
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const floatingIcons = [Clapperboard, Film, Star, Ticket, Popcorn];

  return (
    <footer className={footerStyles.footer}>
        <div className = {footerStyles.animatedBorder}></div>
        <div className = {footerStyles.bgContainer}>
            <div className= {footerStyles.bgGlow1}></div>
            <div className = {footerStyles.bgGlow2}></div> 
        </div>
        <div className = {footerStyles.floatingIconsContainer}>
            <div className={footerStyles.floatingIconsContainer}>
        {[...Array(12)].map((_, i) => {
          const IconComponent = floatingIcons[i % floatingIcons.length];
          const left = (i * 23) % 100;
          const top = (i * 17) % 100;
          const dur = 6 + (i % 5);
          const delay = (i % 4) * 0.6;
          return (
            <div
              key={i}
              className={footerStyles.floatingIcon}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animation: `float ${dur}s infinite ease-in-out`,
                animationDelay: `${delay}s`
              }}
            >
              <IconComponent className="w-8 h-8" />
            </div>
          );
        })}
      </div>
      </div>
      <div className= {footerStyles.miniContainer}>
        <div className = {footerStyles.gridContainer}>
            <div className = {footerStyles.brandContainer}>
                <div className = {footerStyles.brandLogoContainer}>
                    <div className = "relative">
                        <div className = {footerStyles.logoGlow}></div>
                        <div className = {footerStyles.logoContainer}>
                            <Clapperboard  className = {footerStyles.logoIcon}/>
                        </div>
                    </div>
                    <h2  style = {{fontFamily : "Monoton,cursive"}}className = {footerStyles.brandTitle}>
                    </h2>
                </div>
                <p className = {footerStyles.brandDescription}>
                    Experience the dark side cinema with the latest news, reviews,and exclusive content.
                </p>
                <div className = {footerStyles.socialContainer}>
                    {[
                        { Icon: Facebook },
                        { Icon: Twitter },
                        { Icon: Instagram },
                        { Icon: Youtube }
                    ].map((item,index) => (
                        <a href = "#" key = {index} className = {footerStyles.socialLink}>
                            <item.Icon className = {footerStyles.socialIcon}/>
                        </a>
                    ))}
                </div>
            </div>
            
            {/* quick link*/}

            <div >
                <h3 className = {footerStyles.sectionHeader}>
                    <div className = {footerStyles.sectionDot}/>
                    Explore
                </h3>
                <ul className = {footerStyles.linkList}>
                    {links.map((link) => (
                        <li key = {link.href}>
                            <a href = {link.href} className = {footerStyles.linkItem}>
                                <span className = {footerStyles.linkDot}/>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div >
                <h3 className = {footerStyles.sectionHeader}>
                    <div className = {footerStyles.sectionDot}/>
                    Genres
                </h3>
                <ul className = {footerStyles.linkList}>
                    {genreLinks.map((link) => (
                        <li key = {link.href}>
                            <a href = {link.href} className = {footerStyles.linkItem}>
                                <span className = {footerStyles.linkDot}/>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/*  Contact us  section*/}

             <div>
            <h3 className={footerStyles.sectionHeader}>
              <div className={footerStyles.sectionDot} />
              Contact Us
            </h3>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Mail className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>282004priyak@gmail.com</span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <Phone className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>+91 8756647866</span>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIconContainer}>
                  <MapPin className={footerStyles.contactIcon} />
                </div>
                <span className={footerStyles.contactText}>Lucknow, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* divider */}


        <div className = {footerStyles.divider}>
            <div className = {footerStyles.dividerIconContainer}>
                <Film className = {footerStyles.dividerIcon}/>
            </div>
        </div>
        <div className = {footerStyles.bottomBar}>
            <div className = {footerStyles.designedBy}>
                <span className = {footerStyles.designedByText}>Designed by</span>
                <a href = "#" target= "_blank" className={footerStyles.designedByLink} rel = "noopener noreferrer">
                   ❤️ Priya
                </a>
            </div>
            <div className={footerStyles.policyLinks}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <a 
                key={index}
                href="#" 
                className={footerStyles.policyLink}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        </div>
        {isVisible && (
          <button onClick={scrollToTop} className={footerStyles.scrollTopButton}>
            <ArrowUp className={footerStyles.scrollTopIcon} />
          </button>
        )}
        <style>{footerStyles.customCSS}</style>
    </footer>
  );
};

export default Footer