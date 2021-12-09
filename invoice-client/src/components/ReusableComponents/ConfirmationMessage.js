import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationMessage = ({type,message,closeMessage}) => {
  
const getIcon = () =>{
 if(type==="error"|| type ==="Error" || type==="ERROR")
 return <i class="fa fa-exclamation-triangle icon-error" aria-hidden="true"></i>

 if(type==="success"|| type ==="Success" || type==="SUCCESS")
 return <i class="fa fa-check-circle-o icon-success" aria-hidden="true"></i> 

}
  
  return (
        <div className="confirmation">
       
         {type.toLowerCase()==='error' && (
             <i className="fa fa-times close-btn" aria-hidden="true" onClick = {closeMessage}></i>
         )}
       
         <div className="info-container">
         {getIcon(type)}
        <p className='message'>{message}</p>
           </div> 
         
        </div>
    )
}

ConfirmationMessage.propTypes ={
  type:PropTypes.string.isRequired,
  message:PropTypes.string.isRequired
}

export default ConfirmationMessage;
