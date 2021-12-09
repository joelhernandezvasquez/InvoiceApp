import React,{useEffect} from 'react';
import DashboardHeader from '../Dashboard/DashboardHeader';
import HeaderList from '../ReusableComponents/HeaderList';
import InvoiceItem from './InvoiceItem';
import SideMenuDesktop from '../SideMenuDesktop';
import EmptyData from '../ReusableComponents/EmptyData';
import Pagination from '../ReusableComponents/Pagination';
import UseScreenSize from '../Hooks/UseScreenSize';
import InvoiceImg from '../../assets/images/email_empty_invoice.svg';
import { connect } from 'react-redux'
import {fetchCurrentLocation,fetchInvoices } from '../../actions'

const Invoices = ({location,fetchCurrentLocation,routing,fetchInvoices,invoices,invoicesFilter}) => {
  
    const screenWidth = UseScreenSize();

  useEffect(() => {
    fetchCurrentLocation(location.pathname.replace('/',''))
  }, [])

  useEffect(() => {
     fetchInvoices(); 
  }, [])
 
  const loadInvoiceData = () =>{
      if(invoicesFilter.length < 1)
      {
          return( 
            invoices.map(invoice => {
                return  <InvoiceItem invoiceData = {invoice}/>
            })
          ) 
      }
      else{
          return(
            invoicesFilter.map(invoice => {
                return <InvoiceItem invoiceData = {invoice}/>
            }) 
          )
      }
  }

  const renderInvoiceCount = () =>{
      return invoicesFilter.length < 1? invoices.length:invoicesFilter.length
  }

  
 return (
        <div className ="invoice-wrapper">
           <DashboardHeader currentLocation = {routing?routing.location:''}/> 
           {screenWidth>=1280 &&(
               <div className="side-menu-desktop">
                <SideMenuDesktop/> 
               </div>
             )}
           {}
           <div className="invoice-content container">
           <HeaderList routingName="Invoices" link={'/add/invoice'} count={ renderInvoiceCount()} overlay={true}/>
            
            {invoices.length > 0?loadInvoiceData():<EmptyData description = {"an invoice"} illustration={InvoiceImg}/> }

            {invoices.length > 0 && (
              <div className="pagination-container">
              {screenWidth < 767?'':<p>{`Showing ${5} from ${renderInvoiceCount()} data`}</p>}
               {/* <Pagination totalItem={20} rangePerPage={5}/> */}
              </div>
            )}
         
        
          
          
        </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
  return{
      routing: state.routing,
      invoices:state.invoice.invoices,
      invoicesFilter:state.invoice.invoiceFilter
  }
}
export default connect(mapStateToProps,{fetchCurrentLocation,fetchInvoices}) (Invoices);
