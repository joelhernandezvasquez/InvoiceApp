import React,{useEffect,useState} from 'react';
import UseScreenSize from '../Hooks/UseScreenSize';
import useModal from '../Hooks/useModal';
import DashboardHeader from '../Dashboard/DashboardHeader';
import SideMenuDesktop from '../SideMenuDesktop';
import ReturnBackLink from '../ReusableComponents/ReturnBackLink';
import history from '../../history';
import Modal from '../Modal';
 import ConfirmationMessage from '../ReusableComponents/ConfirmationMessage';
import { addCustomer } from '../../actions';
import {connect} from 'react-redux';
import CustomerForm from './CustomerForm';

const CreateCustomer = ({addCustomer}) => {
    
  const [customerCreationMessage,openModal,closeModal] = useModal(false);
  const [customerStatus ,setCustomerStatus] = useState(null);

  const createCustomerMethod =  async (values) =>{
  const status = await addCustomer({name:values.name, 
    email:values.email,
    phoneNumber:values.phoneNumber,
    registerDate:Date.now(),
    amountDue:0.00,
    address:{
      streetAdress:values.streetAddress,
      city:values.city,
      postCode:values.postCode,
      country:values.country},
      status:'Active'});

      if(status === 200 || status === 201){
        setCustomerStatus(status)
        openModal();
      }


  }

  useEffect(()=>{ 
    if(customerCreationMessage)
    {
       if(customerStatus === 200)
       {
          setTimeout(() => {
          closeModal();
          history.push('/customer')
       }, 5000);
       }
    
    }
    
  },[customerCreationMessage])


    const screenWidth = UseScreenSize();
    return (
        <div className="create-wrapper">
            <DashboardHeader currentLocation={" Add Customer"} />
            {screenWidth >= 1280 && (
        <div className='side-menu-desktop'>
          <SideMenuDesktop />
        </div>
      )}

          {customerCreationMessage ? (
           <Modal modalStyle = {'create-customer-modal'}  
           content = {<ConfirmationMessage  type={customerStatus === 200? 'success':'error'}  message={ customerStatus=== 200?"Customer has been created":'This Customer already exists'} closeMessage = {customerStatus === 201 ? closeModal:null}/>}
           onDissmiss = {closeModal}
           />
          ):null}
    
             <div className="create-content container">
                <ReturnBackLink route={'/customer'}/>
                <h2 className="main-heading-title">New Customer</h2>
                <CustomerForm submit={createCustomerMethod} action={'Add'}/>
             </div>
        </div>
    )
}
const mapStateToProps = () =>{

}
export default connect(mapStateToProps,{addCustomer})(CreateCustomer);
