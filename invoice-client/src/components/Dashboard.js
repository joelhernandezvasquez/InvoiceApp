import React,{useState,useEffect} from 'react';
import UseScreenSize from './Hooks/UseScreenSize';
import DashboardHeader from './Dashboard/DashboardHeader';
import InvoiceStats from './ReusableComponents/InvoiceStats';
import DataItemProfile from './ReusableComponents/DataItemProfile';
import {connect} from 'react-redux';
import { userAccess, fetchUsers } from '../actions';
import history from '../history';
import Modal from './Modal';
import SideMenuDesktop from './SideMenuDesktop';
import LogoIcon from '../assets/images/logo.svg';
import TotalInvoicesIcon from '../assets/images/totalInvoiceIcon.svg';
import PaidInvoicesIcon from '../assets/images/PaidInvoicesIcon.svg';
import UnpaidInvoicesIcon from '../assets/images/unpaidInvoicesIcon.svg';
import SentInvoicesIcon from '../assets/images/InvoicesSentIcon.svg';
import GraphicBarIcon from '../assets/images/graphicBar.svg';
import GraphicBarPaidIcon from '../assets/images/graphicBarPaid.svg';
import GraphicBarUnpaidIcon from '../assets/images/graphicBarUnPaid.svg';
import GraphicBarSentIcon from '../assets/images/graphicBarSent.svg';
import { fetchCurrentLocation } from '../actions';

const Dashboard = ({location,userAccess,fetchUsers,userError,fetchCurrentLocation,routing}) =>{
    
  const[showWelcomeModal,setShowWelcomeModal] = useState(location.state);
  const viewportWidth = UseScreenSize();
  const invoices = [
    {
      customer:'Chef Renata',
      date:'4 June 2020',
      status:'paid',
      amount:5111
    },
    {
    
      customer:'Renata',
      date:'7 June 2020',
      status:'pending',
      amount:4032
    },
    {
      customer:'Nobu 57',
      date:'8 June 2021',
      status:'sent',
      amount:253
    },

    {
      customer:'Security',
      date:'1 June 2020',
      status:'pending',
      amount:5853
    },

    {
      customer:'Angel Bury',
      date:'10 June 2020',
      status:'paid',
      amount:10553
    },
  ]

  const customers = [
    {
      customer:'Chef Renata',
      date:'2 June 2020',
      customerStatus:'active',
      id:5111
    },
    {
    
      customer:'Renata',
      date:'7 June 2020',
      customerStatus:'inactive',
      id:4032
    },
    {
      customer:'Nobu 57',
      date:'8 June 2021',
      customerStatus:'active',
      id:253
    },

    {
      customer:'Security',
      date:'1 June 2020',
      customerStatus:'inactive',
      id:5853
    },

    {
      customer:'Angel Bury',
      date:'10 June 2020',
      customerStatus:'active',
      id:10553
    },
  ]

 useEffect(()=>{
   userAccess();
  
   fetchCurrentLocation(location.pathname.replace('/',''))
   
    // eslint-disable-next-line

   // this is only for tests purposes because only Admin can see and have access to see all users other roles cannot.
   fetchUsers();
 },[])

 
  useEffect(()=>{
   history.replace("/dashboard",null); 
 },[])

  
 const renderUserFailedMessage = () =>{
    return(
         <Modal  
            modalStyle ={'user-failed-message'} 
            content = {renderUserErrorModal()}
            onDissmiss = {closeUserErrorMessage}
         />
    ) 
 }
 
 const renderUserErrorModal = () =>{
    return (
      <div className="user-failed-card container">
      <h1>User Failed</h1>
      <p className="text-center">You Must Log in!
     </p>
      <button className="btn btn-primary" onClick ={()=> closeWelcomeModal()}> Close</button>
    </div>
    )
 }

 const closeUserErrorMessage = () =>{
   history.push('/login');
 }

 const closeWelcomeModal = async () =>{
     history.replace('/dashboard',null)
    setShowWelcomeModal(" "); 
  
  }

    const renderWelcomeModal = () =>{
         return(
         
            <div className="welcome-card container">
              <img  src={LogoIcon} alt="iconi"/>
              <h1>Welcome to Invoicely</h1>
              <p className="text-center">Start creating professional invoices quickly, Make your small business look professional, save time and
                 Access all customer information in one place.
             </p>
              <button className="btn btn-primary" onClick ={()=> closeWelcomeModal()}> Continue</button>
            </div>
        )
    }
    return (
        <div className="dashboard-wrapper">
           
            {userError? renderUserFailedMessage():null} 
              {showWelcomeModal === 'signUp' ?  <Modal
              modalStyle ={'welcome-message'}
              content = {renderWelcomeModal()}
              onDissmiss = {closeWelcomeModal}
            />:null}

            <DashboardHeader currentLocation = {routing?routing.location:''}/> 
             {viewportWidth>=1280 &&(
               <div className="side-menu-desktop">
                <SideMenuDesktop/> 
               </div>
             )}
            <div className="invoice-stats-container">
              <div className="container">
               <InvoiceStats
                 numberOfStats = {2478}
                 type={"Total Invoices"}
                 iconStats = {TotalInvoicesIcon}
                 graphicBar = {GraphicBarIcon}
               />

                <InvoiceStats
                 numberOfStats = {2478}
                 type={"Paid Invoices"}
                 iconStats = {PaidInvoicesIcon}
                 graphicBar = {GraphicBarPaidIcon}
               />

                <InvoiceStats
                 numberOfStats = {2478}
                 type={"Unpaid Invoices"}
                 iconStats = {UnpaidInvoicesIcon}
                 graphicBar = {GraphicBarUnpaidIcon}
               />

                <InvoiceStats
                 numberOfStats = {2478}
                 type={"Invoices Sent"}
                 iconStats = {SentInvoicesIcon}
                 graphicBar = {GraphicBarSentIcon}
               />
              </div>
            </div>

            <div className="invoices-list container">
              <div className="recent-list-container">
                <div className="header">
                  <h2>Recent Invoices</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <div className="recent-list">
                 {
                  invoices.map((invoice,index) =>{
                    return <DataItemProfile key={index} dataItem = {invoice}/>
                  })
                 }
               
                </div>
               <div className = "btn-container">
                    <button className="btn btn-primary"> View All</button>
                 </div> 
              </div>
            </div> 

             <div className="container customers-list">
              <div className="recent-list-container">
                <div className="header">
                  <h2>Recent Customers</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
                <div className="recent-list">
                 {
                  customers.map((customer,index) =>{
                    return <DataItemProfile key={index} dataItem = {customer}/>
                  })
                 }
               
                </div>
               <div className = "btn-container">
                    <button className="btn btn-primary"> View All</button>
                 </div> 
              </div>
            </div> 
            </div>
           
        
    )
}

const mapStateToProps = (state) =>{
  
  return{
    userError:state.users.userError,
    users:state.users.users,
    routing:state.routing
   
  }
}

export default connect(mapStateToProps,{userAccess,fetchUsers,fetchCurrentLocation}) (Dashboard);
