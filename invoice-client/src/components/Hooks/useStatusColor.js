

import {useState} from 'react'

const useStatusColor = (defaultValue) => {
  
   const [status] = useState(defaultValue);
   
    const statusColors = {
        Pending:{
         background:'#FF8F00',
         foreground:'rgba(255,143,0,0.1)'
        },
 
        Paid:{
         background:'#33D69F',
         foreground:'rgba(51,214,159,0.1)'
        },
 
        Draft:{
         background:'#373B53' ,
         foreground:'rgba(55,59,83,0.1)' 
        },
 
        Active:{
            background:'#33D69F',
            foreground:'rgba(51,214,159,0.1)'
        },
        Inactive:
        {
         background:'rgb(217,4,41)' ,
         foreground:'rgba(217,4,41,0.1)' 
        }
 
     }

     const getStatusBackground = () =>{
        return statusColors[status].background
       
    } 

    const getStatusColor = () =>{
        return statusColors[status].foreground

    }
   
    return [getStatusBackground,getStatusColor];

}

export default useStatusColor;
