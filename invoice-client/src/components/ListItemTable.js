import React from 'react';
import ReactDom from 'react-dom';

const ListItemTable = (props) => {
 
  return ReactDom.createPortal(
   
   <div className="listItemTable">
  {/*    {console.log(props.content)} */}
    {/* <div>{props.content.map((element)=>{
       return element
    })}</div> */}
   </div>,
   document.querySelector('#list-item-table')
 )
}

export default ListItemTable;
