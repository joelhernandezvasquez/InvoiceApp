import React,{useState,useEffect,useRef} from 'react';
import useToogle from '../Hooks/useToogle';
import PropTypes from 'prop-types';

const Dropdown = ({ defaultItem,listItem,SelectCustomer}) => {
    const [open,setOpen] = useToogle(false);
     const[selectedItem,setItem] = useState(defaultItem);
      const dropdownRef = useRef();
 
      useEffect(()=>{
    document.body.addEventListener('click',(event)=>{
        if(dropdownRef.current && dropdownRef.current.contains(event.target))
        {
            return;
        }
        setOpen(false);
    })
  },[])

 

    const closeDropdown = (item) =>{
      setItem(item) ;
      setOpen(false);
      SelectCustomer(item);
    }
     return (
        <div ref= {dropdownRef} className="customer-dropdown">
               
            
           <div className="top-panel" onClick = {()=> setOpen(!open)}>
            <span>{selectedItem}</span>
            <i className="fa fa-chevron-down " aria-hidden="true"></i>
           </div> 
          
           <div className={`content-panel ${open?'open':null}`}>
              <ul className="menu-panel">
               {listItem.map((item)=>{
                   
                   if(item!==selectedItem)
                     return <li onClick={()=> closeDropdown(item)}> {item}</li>
               })}
              </ul>
           </div>
        </div>
    )
}

Dropdown.propTypes ={
    listItem:PropTypes.array.isRequired,
  }

export default Dropdown;
