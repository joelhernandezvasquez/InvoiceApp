import React from 'react';
import AboutImgSm from '../../assets/images/Image22.png';
import AboutImgBg from '../../assets/images/Image21.png';
import RectangleUpperShape from '../../assets/images/RectangleUpperAbout.svg';
import RectangleUpperShapeTablet from '../../assets/images/shapeRectangleATabletVersion.png';
import RectangleUpperShapeDesktop from '../../assets/images/rectangleDesktopVersion.png';

import UseScreenSize from '../Hooks/UseScreenSize';

const About = () => {
    
  const screenWidth = UseScreenSize();

  const renderShape = () =>{
      if(screenWidth < 767)
        return RectangleUpperShape;
      if(screenWidth > 767)
      return RectangleUpperShapeTablet
     if(screenWidth > 1200)
      return RectangleUpperShapeDesktop; 
  }
    return (
        <section className="about-section">
          <div className="container">
             <div className="about-image-container">
                 <img className="dashboard-about-img" src={ screenWidth < 1000? AboutImgSm:AboutImgBg} alt="dashboard img"/>
             </div>
             <div className="description-container">
                 <h2 className="section-title text-center"> Increase Your Business Growth & Sale</h2>
                 <p className="leading-text text-center">Seven from by my incentive the exerted each briefs make weather. Of surprise roman yes, either seemed I it amped make of very both and if the is neuter. Pros in two differences parents begin snapped future are of subdued her acquired in that tones.</p>
                 <button className="btn btn-primary"> Read More</button> 
               
                
             </div>
             <img className="shapeRectangleA" src={renderShape()} alt="shape"/>
          </div>
        </section>
    )
}

export default About;
