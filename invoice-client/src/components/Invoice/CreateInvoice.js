import React,{useEffect,useState} from 'react';
import UseScreenSize from '../Hooks/UseScreenSize';
import DashboardHeader from '../Dashboard/DashboardHeader';
import SideMenuDesktop from '../SideMenuDesktop';
import ReturnBackLink from '../ReusableComponents/ReturnBackLink';
import InvoiceForm from './InvoiceForm';
import { fetchCustomerNames } from '../../api/main';
import { fetchCustomerInfo } from '../../api/main';


const CreateInvoice = () => {
    const screenWidth = UseScreenSize();
    const [customerNames,setCustomerNames] = useState([]);
    const [customerData,setCustomerData] = useState([]);
    useEffect(() => {
      const getCustomerNames = async ()=>{
        const result = await fetchCustomerNames();

        if(result.success)
        {
          result.data.forEach(customer =>{
            customerNames.push(customer.name)
          })
        }

      }
      getCustomerNames();
    }, [])

     const fetchCustomer = async (customerName) =>{
      const response = await fetchCustomerInfo(customerName);
        if(response.success){
         
          setCustomerData(response.data)
        }
        if(response.error)
        { 
          console.log(response.data)
        }
     }
    
    return (
        <div className="create-wrapper">
          <DashboardHeader currentLocation={" Add Invoice"} />
            {screenWidth >= 1280 && (
        <div className='side-menu-desktop'>
          <SideMenuDesktop />
        </div>
            )}

           <div className="create-content container">
                       
                <ReturnBackLink route={'/invoice'}/>
                <h2 className="main-heading-title">New Invoice</h2>
                <InvoiceForm action={'add'} customersName = {customerNames} SelectCustomer = {fetchCustomer} data={customerData} /> 
             </div>
        </div>
    )
}

export default CreateInvoice;
