import React from 'react';
import useFormatDate from '../Hooks/useFormatDate';

const InvoiceItem = ({invoiceData}) => {
    const{invoiceNumber,customer,dueDate,totalAmount,status} = invoiceData;
    const [formatDate] = useFormatDate();
    const getStyle = () =>{
        if(status ==="Paid"){
            return{
             backgroundColor:'rgba(51,214,159,0.1)'
            }       
        }

        if(status==="Pending"){
          return{
            backgroundColor:'rgba(255,143,0,0.1)'
          }
        }

        if(status ==="Draft"){
          return{
            backgroundColor:'rgba(55,59,83,0.1)'
          }
        }
    }

    const getPaymentStatusColor = () =>{
      if(status==="Paid")
        return{
          backgroundColor:'#33D69F'
        }

        if(status==="Pending")
        return{
          backgroundColor:'#FF8F00'
        }

        if(status==="Draft")
          return{
            backgroundColor:'#373B53'
          }
    }

    const getPaymentColor = () =>{
      if(status==="Paid")
        return{
          color:'#33D69F'
        }
        if(status==="Pending")
        return{
          color:'#FF8F00'
        }

        if(status==="Draft")
          return{
            color:'#373B53'
          }
    }

   
    return (
        <div className="invoice-item">
          
          <div className="invoice-item-id"> 
              <span>{invoiceNumber}</span> 
          </div>

          <div className="invoice-item-date">
            <span> Due {formatDate(dueDate)}</span>
            
          </div> 
          
          <div className="invoice-item-customer">
            <span>{customer}</span>
          </div> 
          
          <div className="invoice-item-amount">
             <span>${parseFloat(totalAmount.toString()).toFixed(2)}</span> 
          
          </div> 
           
          <div className="invoice-item-status">
            <div className="inner-status" style = {getStyle()}>
                <div className="circle" style = {getPaymentStatusColor()}></div>
                 <span style = {getPaymentColor()}>{status}</span>
                </div>
          </div> 
            
        </div>
    )
}

export default InvoiceItem;
