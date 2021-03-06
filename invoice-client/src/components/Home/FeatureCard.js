import React from 'react';

const FeatureCard = ({thumbnailIcon,title,content,link,bgCard}) => {
    return (
        <div className={`feature-card ${bgCard?'bgCard':''}`}>
            <img src={thumbnailIcon} alt ="time tracking"/>
           
            <h3 className="feature-heading"> {title}</h3>  
            <p className="leading-text text-center"> {content}</p>
            
            {link && (
                    <a className="feature-card-link" href={link}>Learn More 
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0171 4.70704C13.7175 4.42167 13.2424 4.43292 12.957 4.73292C12.6712 5.03292 12.6832 5.50767 12.9829 5.79342L18.7361 11.25H3.75C3.336 11.25 3 11.586 3 12C3 12.414 3.336 12.75 3.75 12.75H18.7121L12.9829 18.207C12.6829 18.4928 12.6712 18.9675 12.957 19.2675C13.1044 19.422 13.302 19.5 13.5 19.5C13.686 19.5 13.872 19.4314 14.0171 19.293L20.5605 13.0605C20.844 12.7774 21 12.4009 21 12C21 11.5992 20.844 11.2227 20.5474 10.9268L14.0171 4.70704Z"/>
                    </svg>
                    </a>
                )
            }
        </div>
    )
}

export default FeatureCard;
