
import MobileNavBar from './MobileNavBar';
import DesktopNavBar from './DesktopNavBar';
import UseScreenSize from '../Hooks/UseScreenSize';

const NavBar = () => {
   
  const screenWidth = UseScreenSize();
   return (
      <>
    {screenWidth < 1000?<MobileNavBar/>:<DesktopNavBar/>}
    </>
       
    )
}
export default NavBar;
