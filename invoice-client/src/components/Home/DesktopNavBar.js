import {useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import logoIcon from '../../assets/images/logo.svg';

const DesktopNavBar = () => {
    
    const linkRef = useRef(null);
  
    useEffect(() => {
       linkRef.current.addEventListener("mouseover",(e)=>{  
         e.target.matches("a") &&(e.target.firstElementChild.classList.toggle("active"))
       })

       linkRef.current.addEventListener("mouseout",(e)=>{
        e.target.matches("a") &&(e.target.firstElementChild.classList.toggle("active"))
       })
    }, [])

    return (
        <nav className = "desktop-nav-bar">
          <img className="logo" src={logoIcon} alt ="logo invoicely"/>
              <ul ref={linkRef} className = "desktop-menu-links">
                 <li>
                     <a className="desktop-links" href="#"> About Us
                        <div className="border-link"></div>
                     </a>
                 </li>

                 <li>
                     <a className="desktop-links" href="#"> Feature
                        <div className="border-link"></div>
                     </a>
                 </li>

                 <li>
                     <a className="desktop-links" href="#"> Pricing
                        <div className="border-link"></div>
                     </a>
                 </li>

                 <li>
                     <a className="desktop-links" href="#"> Contact
                         <div className="border-link"></div>
                     </a>
                 </li>
              </ul>
         
          <div className="authentication-btn-container">
                <Link to ="/login" className="btn btn-default">Log In</Link>
                <Link to = "/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </nav>
    )
}

export default DesktopNavBar;
