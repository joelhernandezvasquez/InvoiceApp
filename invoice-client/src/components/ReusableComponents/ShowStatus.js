import React from 'react'
import useStatusColor from '../Hooks/useStatusColor';
import PropTypes from 'prop-types';

const ShowStatus = ({status}) => {
    
    const [getStatusBackground,getStatusColor] = useStatusColor(status)
  
    const getStyle = () =>{
        return{
            color:'#717579',
            fontSize:'0.875rem'
        }
    }

    return (
        <div className="show-status">
         <span style={getStyle()}>Status</span>   
         <div className="status-container" style={{background:getStatusColor()}} >
             <div className="circle" style={{background:getStatusBackground()}}></div>
             <span className="status" style={{color:getStatusBackground()}}>{status}</span> 
         </div>
        </div>
    )
}

ShowStatus.propTypes ={
    status:PropTypes.string.isRequired
}
export default ShowStatus;
