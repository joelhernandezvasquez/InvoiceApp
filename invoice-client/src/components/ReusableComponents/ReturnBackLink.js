
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
const ReturnBackLink = ({route}) => {
   
  
  const getStyle = () =>{
    return{
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      width:'80px',
      fontSize:'0.874rem',
      color:'#202224',
      fontFamily:'Poppins',
      fontWeight:'700'
      
    }
  }

  const styleIcon = () =>{
     return{
       color:'#FE6C4D',
       fontSize:'0.75rem'
     }
  }
  
  return (
    
           <Link className="return-back-link" to={route} style={getStyle()}>
            <i className="fa fa-chevron-left" aria-hidden="true" style = {styleIcon()}></i>
              Go Back
            </Link>   
    
    )
}

ReturnBackLink.propTypes = {
  route:PropTypes.string.isRequired
}

export default ReturnBackLink;
