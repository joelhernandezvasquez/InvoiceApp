import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectAccountItems} from '../../actions/index';
import {BsChevronDown} from 'react-icons/bs';

const DropdownUser = ({selectAccountItems,selectedOption}) => {
    const[openItemsMenu,setOpenMenu] = useState(false);
    const menuRef = useRef();

    useEffect(()=>{
        document.body.addEventListener("click",(e) =>{
          if(menuRef.current && menuRef.current.contains(e.target))
          {
            return;
          }
   
          setOpenMenu(false);
        })
      },[])

      const renderMenuItems = () =>{
        const arrayItems = ["profile","account"];
       
        return(
             <ul className={`menu-items ${openItemsMenu?'visible':''}`}>
        
               {arrayItems.map((item =>{
                 if(item === selectedOption)
                    return null;
                 else
                 {
                   return(
                     <li className="items" onClick = {(e)=> handleDropdownSelection(item)}>
                      <Link to = {`/${item}`} style={{color:'#202224'}}>
                       <label>{item}</label>
                      </Link>
                     </li>
                   )
                 }
                 
               }))}
             </ul>
         )
     }

     const handleDropdownSelection = (item) =>{
        selectAccountItems(item);
        setOpenMenu(!openItemsMenu);
     }
   
    return (
        <div  ref = {menuRef} className={`dropdown-menu ${openItemsMenu? 'open':''}`}>
        <div className="dropdown-menu__header" onClick = {() =>setOpenMenu(!openItemsMenu)}>
            <label>{selectedOption}</label>
            <BsChevronDown id="dropdown-icon"/>
        </div>
        {renderMenuItems()}
        
      </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        selectedOption:state.users.userAccountItem
    }
}

export default connect(mapStateToProps,{selectAccountItems}) (DropdownUser);
