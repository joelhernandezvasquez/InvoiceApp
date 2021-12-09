import React,{useState,useEffect,useRef} from 'react';
import UseScreenSize from '../Hooks/UseScreenSize';
import { BsFillPersonFill } from "react-icons/bs";
import {BsChevronDown} from 'react-icons/bs';
import { AiOutlineLogout } from "react-icons/ai";
import { fetchCurrentUser } from '../../actions';
import {Link} from 'react-router-dom';
import  {connect} from 'react-redux';
import Customer2 from '../../assets/images/imagetest.jpeg';

const ProfileUser = ({fetchCurrentUser,currentUser}) => {
    
    const [openModalProfile,setModalProfile] = useState(false);
    const viewportWidth = UseScreenSize();
    const profileUserRef = useRef();
    const profileUserModal = useRef();
   
   
    useEffect(()=>{
      fetchCurrentUser();
        document.body.addEventListener("click",(event)=>{
           if(profileUserRef.current && profileUserRef.current.contains(event.target)){
              return;
           }
           setModalProfile(false);
        })
    },[])

     const renderProfilePicture = () =>{
      if(currentUser){
        //console.log("inside the current user rendering the user avatar");
       // console.log(currentUser.avatar)
        return !currentUser.avatar?<BsFillPersonFill className="profile-image" />:<img src={currentUser.avatar} alt="user image"/>
      }
      }
    
  
    const getName = (fullName)=>{
        let name = "";
       for(let i =0; i< fullName.length;i++)
       {
         if(fullName[i] === " ") 
         break;
          
         name = [...name,fullName[i]];
       }
       
       return name.join("");
    }

     const handleModal = (e) =>{
        if(profileUserModal.current && profileUserModal.current.contains(e.target)){
          return;
        }
         setModalProfile(!openModalProfile);
     }

     const renderProfileUserMobileVersion = ()=>{
       return (
        <div ref={profileUserRef} className="profile-user" onClick={(e) => handleModal(e)}>
         
         {renderProfilePicture()}
      
        {openModalProfile && ( <div ref={profileUserModal} className="profile-user-modal">
             <div className="triangle"></div>
             <div className="header">
                 <div className="user-pic-container">
                     <div className={`${currentUser.avatar?"user-pic":"user-no-image"}`}>
                       
                       {!currentUser.avatar?<BsFillPersonFill className="icon-user" />:<img src={currentUser.avatar} alt="user account image"/>} 
                      
                     </div>
                 </div>
                 <div className="user-info">
                    <h3>{currentUser.name}</h3>
                    <span>{currentUser.email}</span>
                 </div>
             </div>

              <div className="content">
                  <Link to ='/profile' className="content-link">
                    <BsFillPersonFill className="profile-icon"/>
                    <span >Profile</span>
                  </Link>

                  <a className="content-link"  href='/api/logout'>
                    <AiOutlineLogout className="profile-icon"/>
                    <span>Sign Out</span>
                  </a>

              </div>
             
         </div>)}
     </div>
       )
     }

     const renderProfileUserLargeScreenVersion = () =>{
       return(
          <div ref={profileUserRef} className="profile-user-lg-screen-container" onClick={(e) => handleModal(e)}>
              <div  className="profile-user" >
              {renderProfilePicture()}
           {openModalProfile && ( <div ref={profileUserModal} className="profile-user-modal">
                <div className="triangle"></div>
                <div className="header">
                    <div className="user-pic-container">
                    <div className={`${currentUser.avatar?"user-pic":"user-no-image"}`}>
                       
                       {!currentUser.avatar?<BsFillPersonFill className="icon-user" />:<img src={currentUser.avatar} alt="user account image"/>} 
                      
                     </div>
                    </div>
                    <div className="user-info">
                       <h3>{currentUser.name}</h3>
                       <span>{currentUser.email}</span>
                    </div>
                </div>

                 <div className="content">
                     <Link to ='/profile' className="content-link">
                       <BsFillPersonFill className="profile-icon"/>
                       <span >Profile</span>
                     </Link>

                     <a className="content-link"  href='/api/logout'>
                       <AiOutlineLogout className="profile-icon"/>
                       <span>Sign Out</span>
                     </a>

                 </div>
                
            </div>)}
        </div>
         <div className="profile-user-info-container">
              <h3> {currentUser?getName(currentUser.name):''}</h3>
              <span>{currentUser?currentUser.role:''}</span>
         </div>

          <div className="dropdown">
             <BsChevronDown className= 'dropdown-icon'/>
          </div>
          </div>
       )
     }

    return (
        <>
       {viewportWidth < 767? renderProfileUserMobileVersion():renderProfileUserLargeScreenVersion()} 
       </>
    )
}


const mapStateToProps = (state) =>{
   
    return{
       currentUser:state.users.currentUser
    }
}

export default  connect(mapStateToProps,{fetchCurrentUser}) (ProfileUser);
