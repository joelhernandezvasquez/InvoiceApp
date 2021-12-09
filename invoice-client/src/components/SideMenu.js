import React,{useEffect,useRef} from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import { fetchCurrentUser} from '../actions';
import {Link} from 'react-router-dom';
import UseScreenSize from './Hooks/UseScreenSize';

const SideMenu = ({active,fetchCurrentUser,currentUser}) => {
 
   const innerMenuRef = useRef(null);
   const menuItemsRef = useRef();
   const viewportWidth = UseScreenSize();

   useEffect(()=>{
       
    if(viewportWidth < 1280){
       document.addEventListener("scroll",()=>{
        if(innerMenuRef.current)
            innerMenuRef.current.style.marginTop = `${window.scrollY + 32}px`;
      })}} ,[])
    

    useEffect(()=>{
    
      innerMenuRef.current.addEventListener("click",(e)=>{
          const currentItem = document.querySelector(".show");
          const selectedItem = e.target.closest(".item").firstElementChild;
       
          if(selectedItem){
            currentItem.classList.remove('show');
            selectedItem.classList.add('show');
          } 
       })
    },[])

    useEffect(()=>{
       innerMenuRef.current.addEventListener("click",(e)=>{
            const activeItem = document.querySelector(".activeItem");
            const selectedItem = e.target.closest(".item").querySelector(".inner-item");
          
            if(selectedItem){
              activeItem.classList.remove('activeItem');
              selectedItem.classList.add('activeItem');
            } 
         })  
    },[]) 

    useEffect(()=>{
        innerMenuRef.current.addEventListener("click",(e)=>{
            if(!e.target.matches("a")){
                e.stopPropagation();
            } 
        })
    })

    useEffect(() => {
      fetchCurrentUser();
    }, [])

    const renderAccountItem = () =>{
        if(currentUser && currentUser.password)
        {
            return (
                <li className="item"> 
                <div className="side-bar-item"></div>
                <div className="inner-item">
                <i class="fa fa-id-badge" aria-hidden="true"></i>
 
                    <Link to = "/account" className="link">Account</Link>
                </div>
              
                </li>
            )
        }
        
    }

    return ReactDom.createPortal(
        
        <div className = {`side-menu ${active? 'active':''}`}>
          <div ref={innerMenuRef} className={`inner-menu ${active? 'active':''}`} >
           <span>Menu</span>
           <ul ref={menuItemsRef} className="menu-items">
               <li className="item"> 
                <div className="side-bar-item show"></div>
                <div className="inner-item activeItem">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.29701 5.2338C3.52243 4.27279 4.27279 3.52243 5.2338 3.29701V3.29701C6.06663 3.10165 6.93337 3.10165 7.7662 3.29701V3.29701C8.72721 3.52243 9.47757 4.27279 9.70299 5.2338V5.2338C9.89835 6.06663 9.89835 6.93337 9.70299 7.7662V7.7662C9.47757 8.72721 8.72721 9.47757 7.7662 9.70299V9.70299C6.93337 9.89835 6.06663 9.89835 5.2338 9.70299V9.70299C4.27279 9.47757 3.52243 8.72721 3.29701 7.7662V7.7662C3.10166 6.93337 3.10166 6.06663 3.29701 5.2338V5.2338Z" stroke="#202224" stroke-width="1.5"/>
                    <path d="M3.29701 16.2338C3.52243 15.2728 4.27279 14.5224 5.2338 14.297V14.297C6.06663 14.1017 6.93337 14.1017 7.7662 14.297V14.297C8.72721 14.5224 9.47757 15.2728 9.70299 16.2338V16.2338C9.89835 17.0666 9.89835 17.9334 9.70299 18.7662V18.7662C9.47757 19.7272 8.72721 20.4776 7.7662 20.703V20.703C6.93337 20.8983 6.06663 20.8983 5.2338 20.703V20.703C4.27279 20.4776 3.52243 19.7272 3.29701 18.7662V18.7662C3.10166 17.9334 3.10166 17.0666 3.29701 16.2338V16.2338Z" stroke="#202224" stroke-width="1.5"/>
                    <path d="M14.297 5.2338C14.5224 4.27279 15.2728 3.52243 16.2338 3.29701V3.29701C17.0666 3.10165 17.9334 3.10165 18.7662 3.29701V3.29701C19.7272 3.52243 20.4776 4.27279 20.703 5.2338V5.2338C20.8983 6.06663 20.8983 6.93337 20.703 7.7662V7.7662C20.4776 8.72721 19.7272 9.47757 18.7662 9.70299V9.70299C17.9334 9.89835 17.0666 9.89835 16.2338 9.70299V9.70299C15.2728 9.47757 14.5224 8.72721 14.297 7.7662V7.7662C14.1017 6.93337 14.1017 6.06663 14.297 5.2338V5.2338Z" stroke="#202224" stroke-width="1.5"/>
                    <path d="M14.297 16.2338C14.5224 15.2728 15.2728 14.5224 16.2338 14.297V14.297C17.0666 14.1017 17.9334 14.1017 18.7662 14.297V14.297C19.7272 14.5224 20.4776 15.2728 20.703 16.2338V16.2338C20.8983 17.0666 20.8983 17.9334 20.703 18.7662V18.7662C20.4776 19.7272 19.7272 20.4776 18.7662 20.703V20.703C17.9334 20.8983 17.0666 20.8983 16.2338 20.703V20.703C15.2728 20.4776 14.5224 19.7272 14.297 18.7662V18.7662C14.1017 17.9334 14.1017 17.0666 14.297 16.2338V16.2338Z" stroke="#202224" stroke-width="1.5"/>
                </svg>
                
                <Link to="/dashboard" className="link">
                    Dashboard
                </Link>
                
                </div>  
               </li>

               <li className="item"> 
               <div className="side-bar-item"></div>
               <div className="inner-item">
               <i className="fa fa-file-text-o" aria-hidden="true"></i>
                   <Link to="/invoice" className="link">Invoice</Link>
               </div>
               
               </li>

               <li className="item"> 
               <div className="side-bar-item"></div>
                <div className = "inner-item"> 
                <i class="fa fa-money" aria-hidden="true"></i>
                   <a href="#" className="link">Expense</a>
                </div>
               
               </li>

               <li className="item"> 
               <div className="side-bar-item"></div>
               <div className = "inner-item"> 
               <i className="fa fa-user-o" aria-hidden="true"></i>
                   <Link to="/customer" className="link">Customer</Link>
               </div>
               
               </li>

               <li className="item"> 
               <div className="side-bar-item"></div>
               <div className = "inner-item">
               <i className="fa fa-calendar-o" aria-hidden="true"></i>
                   <a href="#" className="link">Estimates</a>
               </div>
              
               </li>

               <li className="item"> 
               <div className="side-bar-item"></div>
               <div className="inner-item">
               <i class="fa fa-credit-card" aria-hidden="true"></i>

                   <a href="#" className="link">Payments</a>
               </div>
             
               </li>
             
               <div className="divider"></div>

               <li className="item"> 
               <div className="side-bar-item"></div>
               <div className="inner-item">
               <i class="fa fa-address-card-o" aria-hidden="true"></i>

                   <Link to = "/profile" className="link">Profile</Link>
               </div>
             
               </li>

              {renderAccountItem()}
               

               <li className="item"> 
                <div className="inner-item">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                   <a href="/api/logout" className="link">Logout</a>
                </div>
               
               </li>
           </ul>
           </div>
        </div>,
         document.querySelector('#side-bar-menu')
    )
}

const mapStateToProps = (state) =>{
  return{
      currentUser:state.users.currentUser
  }
}

export default connect(mapStateToProps,{fetchCurrentUser}) (SideMenu);
