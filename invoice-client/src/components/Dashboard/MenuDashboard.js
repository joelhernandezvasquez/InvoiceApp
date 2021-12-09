import React,{useState,useEffect} from 'react';
import SideMenu from '../SideMenu';
import UseScreenSize from '../Hooks/UseScreenSize';

const MenuDashboard = () => {
    
    const [isMenuOpen,setMenu] = useState(false);
    const viewportWidth = UseScreenSize();
   
   
    useEffect(()=>{
         isMenuOpen? document.body.style.overflow='hidden' : document.body.style.overflow='scroll'; 
    },[isMenuOpen])

    const renderBarMenuIcon = () =>{
      return(
              <>
                <div className="icon-bar top-bar"></div>
                 <div className="icon-bar  middle-bar"></div>
                 <div className="icon-bar  bottom-bar"></div>
             </>
      )}

    const renderCloseIcon = () =>{
        return(
            <>
                <div className="icon-bar top-close-bar"></div>
                 <div className="icon-bar bottom-close-bar"></div>  
            </>
        )}

    
    return (
        <div className="menu-icon-dashboard" onClick = {() => setMenu(!isMenuOpen)}>
          {isMenuOpen? renderCloseIcon(): renderBarMenuIcon()}
          {viewportWidth < 1280?  <SideMenu active ={isMenuOpen}/>:'' }
            
           
        </div>
    )
}

export default MenuDashboard;
