import React from 'react';
import NavBar from './Home/NavBar';
import Features from './Home/Features';
import About from './Home/About';
import FeatureB from './Home/FeatureB';
import UseScreenSize from './Hooks/UseScreenSize';
import {Link} from 'react-router-dom';
import HeroImage from '../assets/images/hero.svg';
import BG from '../assets/images/Bg.svg';
import BgMobile from '../assets/images/BgMobile.png';
import Bg from '../assets/images/Bg.png';
import BGShape from '../assets/images/BGShape.png';

const Home = () => {

    const screenSize = UseScreenSize();

   const renderShape = () =>{
      if(screenSize <=376)
        return BgMobile;
      if(screenSize > 376 && screenSize < 1400)
         return Bg;
    if(screenSize > 1400)
      return BGShape;
   }
    return (
        <section className="home-page-wrapper">
                <div className="graphic-bg">
                 <img className="graphic-shape" src={renderShape()} alt="graphic"/>
                </div>
             
                <NavBar/>
                
                 <div className="hero-section">
                  
                     <div className="container">
                        <div className="hero-img-container">
                           <img className="hero-img" src={HeroImage} alt="hero"/>
                        </div>
                      
                      <div className="hero-content">
                          <h1>Make Your Business Easier & <span> Simple</span></h1>
                          <p className="leading-text text-center text">The poster concept but the never back we to and desk noise towards never of thought, of merit business least exerted considerable.</p>
                          <Link to="/login" className="btn btn-primary"> Try Free Trial </Link> 
                      </div>

                   </div> 
                   <img className="bg-hero-shape" src={BG} alt="shape background" /> 
                </div> 

                <Features/>
                <About/>
                <FeatureB/>
              
               <footer className="main-footer">
                   <div className="container">
                       <p>Copyright © 2021 OX . All rights reserved.</p>
                        <div className="footer-btn-container">
                            <Link to ="/signup" className="btn-link">Sign Up</Link>
                           
                        </div>
                      
                   </div>
               </footer>

        </section>
    )
}

export default Home;
