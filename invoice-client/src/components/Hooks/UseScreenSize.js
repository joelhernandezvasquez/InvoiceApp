
import {useState,useEffect} from 'react';

const UseScreenSize = () =>{
 
    const [screenWidth,setScreenWidth] = useState(window.screen.width);

   useEffect(() => {
     window.addEventListener("resize",()=>{
         setScreenWidth(window.screen.width);
     }) 
   }, [])

   return screenWidth;
}
export default UseScreenSize;

