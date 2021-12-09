
import React,{useState} from 'react';
import Modal from '../Modal';
import {Link} from 'react-router-dom';
import logoIcon from '../../assets/images/logo.svg';

const MobileNavBar = () => {
   
    const [isMenuOpen,setIsMenuOpen] = useState(false);

    const renderMenuIcon = () =>{
        if(!isMenuOpen) 
         {
           return(
                <>
                <div className="bar bar1"></div>
                <div className="bar bar2"></div> 
                <div className="bar bar3"></div> 
                </> 
           )
         }
    
         else{
           return(
             <>
             <div className="bar bar1 close-bar"></div>
             <div className="bar bar3 close-bar"></div> 
             </>
           )
         }
       }
       const renderContent = () =>{
        return(
          <div className="container">
            <ul className={`mobile-menu ${isMenuOpen? 'open':'null'}`}>
               
               <li className="item">
                 <a href="#" className="links">Home</a>
               </li>
  
               <li className="item">
                 <a href="#" className="links">About US</a>
               </li>
  
               <li className="item">
                 <a href="#" className="links">Features</a>
               </li>
  
               <li className="item">
                 <a href="#" className="links">Pricing</a>
               </li>
  
               <li className="item">
                 <a href="#" className="links">Contact</a>
               </li>
  
               <div className="auth-btn-container">
                  <Link to ="/login" className="btn btn-default"> Sign in </Link> 
                  <Link to = "/signup" className="btn btn-primary"> Sign up </Link> 
             </div>
             
            </ul>
           
          </div>
        )
     }
    
    return (
        <nav className = {`main-nav-bar ${isMenuOpen? 'main-nav-bar-open':'null'}`}>
        <div className="container">
          <img className="logo" src={logoIcon} alt ="logo invoicely"/>
          <div className="menu-icon-container" onClick={() => setIsMenuOpen(!isMenuOpen)}>
           {renderMenuIcon()}
          </div>
           <Modal 
          modalStyle = {`nav-bar-modal ${isMenuOpen? 'active':'null'}`}
          content = {renderContent()}
          /> 
        </div>
     </nav>
    )
}

export default MobileNavBar; 
