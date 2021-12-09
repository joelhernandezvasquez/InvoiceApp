
import {useEffect, useState} from 'react';
import DashboardHeader from "../Dashboard/DashboardHeader";
import CustomerForm from "./CustomerForm";
import ReturnBackLink from "../ReusableComponents/ReturnBackLink";
import UseScreenSize from '../Hooks/UseScreenSize';
import SideMenuDesktop from "../SideMenuDesktop";
import Modal from '../Modal';
import useModal from '../Hooks/useModal';
import ConfirmationMessage from '../ReusableComponents/ConfirmationMessage';
import {connect} from 'react-redux';
import { fetchCustomer,modifyCustomer } from '../../actions';

const EditCustomer = ({match,fetchCustomer,modifyCustomer,customer}) =>{
    
    const screenWidth = UseScreenSize();
    const [customerCreationMessage,openModal,closeModal] = useModal(false);
    const [customerStatus,setCustomerStatus] = useState(null);

    useEffect(() => {
       fetchCustomer(match.params.id);
      },[])


     
      const updateCustomers = async (values,customerStatus) =>{
       
        const {name,email,phoneNumber, streetAddress, city,postCode,country} = values;
        const status = await modifyCustomer({
          _id: customer._id,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          status:customerStatus,
          address: {
            streetAddress: streetAddress,
            city: city,
            postCode: postCode,
            country: country
          }
        })
         if(status === 200)
         {
           openModal();
           setCustomerStatus(status)
         }
        
      }

      useEffect(() => {
        if(customerCreationMessage)
        {
           if(customerStatus === 200)
           {
              setTimeout(() => {
              closeModal();
           }, 3000);
           }
        
        }
      }, [customerCreationMessage])

    return (
        <div className="create-customer-wrapper">
         <DashboardHeader  currentLocation={" Edit Customer"}/>

         {screenWidth >= 1280 && (
        <div className='side-menu-desktop'>
          <SideMenuDesktop />
        </div>
      )}

      {customerCreationMessage ? 
      <Modal modalStyle = {'create-customer-modal'} 
       content = {<ConfirmationMessage  type={customerStatus === 200? 'success':'error'}  message={ customerStatus=== 200?"Your Changes has been saved":'Error'} closeMessage = {customerStatus === 201 ? closeModal:null}/>}
       onDissmiss = {closeModal}  />
       :null}
        
         <div className="create-customer-content container">
                <ReturnBackLink route={`/customer/${match.params.id}`}/>
                <h2 className="main-heading-title">Edit Customer</h2>
                 {customer.name && ( <CustomerForm submit={updateCustomers} action="Edit" data={customer} />)}
                 
             </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
  return {
    customer:state.customer.selectedCustomer
  }
}

export default connect(mapStateToProps,{fetchCustomer,modifyCustomer})(EditCustomer);
