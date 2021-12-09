import React from 'react';
import FeatureCard from './FeatureCard';
import  timeTrackingIcon from '../../assets/images/timeTrackingIcon.svg';
import  monthlyStatsIcon from '../../assets/images/monthlyStatsIcon.svg';
import  settingsIcon from '../../assets/images/settingsIcon.svg';

const Features = () => {
    return (
        <section className="features-section">
            <div className="container">
               <h2 className="section-title text-center"> Making Great Things Posible</h2>
               <p className="subheading-text leading-text text-center">Our powerfull AI tool organizes sales reports for daily, weekly, monthly and overall yearly. Which leads less human works and maintenence</p>
            
               <div className="features-card-container">
                   <FeatureCard
                     thumbnailIcon = {timeTrackingIcon}
                     title = "Time Tracking"
                     content = "Have the sacred, reached could livethought this is to the easy apparent all tonesHave the sacred, reached could."
                     link = "#"
                     bgCard = {true}
                   />

                   <FeatureCard
                    thumbnailIcon = {monthlyStatsIcon}
                    title = "Monthly Stats"
                    content = "Have the sacred, reached could livethought this is to the easy apparent all tonesHave the sacred, reached could."
                    link = "#"
                    bgCard = {true}
                   />

                   <FeatureCard
                    thumbnailIcon = {settingsIcon}
                    title = "Online Customize"
                    content = "Have the sacred, reached could livethought this is to the easy apparent all tonesHave the sacred, reached could."
                    link = "#"
                    bgCard = {true}
                   />

                  
               </div>
            </div>
        </section>
    )
}

export default Features;
