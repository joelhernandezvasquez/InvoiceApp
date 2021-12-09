import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchCurrentUser} from '../../actions'

const SideMenuSettings = ({fetchCurrentUser, currentUser}) => {

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const renderAccountItem = () =>{
    if(currentUser)
    {
      if(!currentUser.password)
      {
        return 'hidden'
      }
    }
  }
    
  return (
        <div className={`side-menu-setting ${renderAccountItem()}`}>
         <ul className = "menu-items">
             
             <h2>Settings</h2>
             <li>
               <Link to = '/profile' className="links">
                Profile
               </Link>
             </li>
            
             <li>
             <Link to = '/account' className="links">
                Account
               </Link>
             </li>

         </ul>
        </div>
    )
}
const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser
  }
}
export default connect(mapStateToProps, { fetchCurrentUser})( SideMenuSettings);
