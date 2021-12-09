
import PropTypes from 'prop-types';

const Message = ({type,title,message}) => {
   
   const getTypeOfMessage = () =>{
       if(type==="error"|| type ==="Error" || type==="ERROR")
       return 'error-message-box';

       if(type==="success"|| type ==="Success" || type==="SUCCESS")
       return 'sucessfull-message-box';  
   }
   const getIcon = () =>{
    if(type==="error"|| type ==="Error" || type==="ERROR")
    return <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>

    if(type==="success"|| type ==="Success" || type==="SUCCESS")
    return <i class="fa fa-check-circle-o" aria-hidden="true"></i> 

   }
    return (
        <div className={`${getTypeOfMessage(type)}`}>
           <h2 className="title">{getIcon(type)} {title}</h2> 
           <p className="text-message">{message}</p>
        </div>
    )
}

Message.propTypes ={
    type:PropTypes.string.isRequired,
    title:PropTypes.string.isRequired,
    message:PropTypes.string.isRequired
}

export default Message;
