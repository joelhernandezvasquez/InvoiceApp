import React, { useState, useRef, useEffect } from 'react'
import Dropdown from '../ReusableComponents/Dropdown'
import DatePicker from 'react-datepicker'
import InvoiceFormFooter from './InvoiceFormFooter'
import EmptyField from '../ReusableComponents/EmptyField'
import { Formik, useFormik } from 'formik';
import { paymentTerms } from '../constant'
import 'react-datepicker/dist/react-datepicker.css'

const InvoiceForm = ({action,data,customersName,SelectCustomer}) => {
 
  const [startDate, setStartDate] = useState(new Date())
  const [listItems, setListItems] = new useState([
    {
      itemName: '',
      quantity: '',
      price: '',
      total: '0.00'
    }
  ])
  const [itemErrors,setItemErrors] = useState([]);
  const [customerFields,setCustomerFields]  = useState({
    email:"",
    streetAddress:"",
    city:"",
    postCode:"",
    country:""
  })
  const[initialValues,setInitialValues] = useState({
    invoice_street_address:"",
    invoice_city:"",
    invoice_post_code:"",
    invoice_country:"",
    customer_email:"",
    customer_street_address:"",
    customer_city:"",
    customer_post_code:"",
    customer_country:"",
    project_description:""
  })

  const validate = values => {
    let errors = {}

    if (!values.invoice_street_address) {
      errors.invoice_street_address = 'Required'
    }

    if (!values.invoice_city) {
      errors.invoice_city = 'Required'
    } 

    if(!values.invoice_post_code){
      errors.invoice_post_code = 'Required'
    }

    if(!values.invoice_country){
      errors.invoice_country = 'Required'
    }

    if(!values.customer_email){
      errors.customer_email= 'Required'
    }

    if(!values.customer_street_address){
      errors.customer_street_address = 'Required'
    }

    if(!values.customer_city){
      errors.customer_city='Required'
    }

    if(!values.customer_post_code){
      errors.customer_post_code='Required'
    }
    if(!values.customer_country){
      errors.customer_country = 'Required'
    }

    if(!values.project_description){
      errors.project_description = 'Required'
    }

    return errors;
  }

  const onSubmit = () =>{
    
    console.log("submit");
    //submit(formik.values,customerStatus);
  }


  const formik = useFormik({
    initialValues,
    validate,
    onSubmit
    
  })

   const updateCustomersFields = (fields) =>
   {
    for(const[key,value] of Object.entries(fields)){
      formik.values[key] = value
     }
   }
   
  useEffect(()=>{
     if(action==="add" && data.length > 0)
    {
      const {email:customer_email} = data[0];
      const{streetAddress:customer_street_address,city:customer_city,postCode:customer_post_code,country:customer_country}= data[0].address
      updateCustomersFields({customer_email,customer_street_address,customer_city,customer_post_code,customer_country})
    
      setCustomerFields({customer_email,customer_street_address,customer_city,customer_post_code,customer_country})
    }
  },[data])
  
   const getCustomerNames = (name) =>{
    SelectCustomer(name);
   }

  const createErrors = (errors) =>{
    setItemErrors([...itemErrors,errors]);
  }

  const updateErrors = (errors,index) =>{
    const values = [...itemErrors];
    const errorProps = Object.keys(errors);
  
     for(let i=0;i <errorProps.length;i++)
     {
      values[index][errorProps[i]] = errors[errorProps[i]];
     }

      setItemErrors(values);
  }

  const deleteErrors =(indexN) =>{
    setItemErrors(itemErrors.filter((error,index)=> index !== indexN? error:null ))
  }

  const validateItem = (index)=>{
    let errors = {itemName:false,quantity:false,price:false};
    let flag = true;
  
    if(index < 0){
     return true;
   }
   
    if(listItems[index].itemName === ""){
       errors.itemName = true;
       flag =  false;
    }
    
    if(listItems[index].quantity ===""){
      errors.quantity = true;
      flag = false;
    }
   

    if(listItems[index].price === ""){
      errors.price = true;
      flag =  false;
    }
     
    if(!itemErrors[index])
    {
      createErrors(errors);
    }
    else{
       updateErrors(errors,index);
    }
   
   return flag;
  }

  const createNewItem = () =>{
    if(validateItem(listItems.length - 1))
    {
      
      setListItems([...listItems,{
      itemName: '',
      quantity: '',
      price: '',
      total: '0.00'
    }])
    }
    
    
  }

  const onHandleChange = (e,index)=>
  {
     if(e.target.name ==='quantity' || e.target.name ==="price")
     {
       e.target.value = reverseNegativeInteger(e.target.value);
     }
    const values = [...listItems];
    values[index][e.target.name] = e.target.value;
    setListItems(values);
   
  }
  
  const deleteItem = (indexN) =>{
    setListItems(listItems.filter((item,index)=> index!==indexN))

    if(itemErrors.length > 0){
      deleteErrors(indexN);
    }
     
  }

  const validateEmptyInput = (e,index) =>{
     

     if(!e.target.value){
       const values = [...itemErrors];
       values[index][e.target.name] = true;
      
       setItemErrors(values);
     }
      
  }

  const calculateTotal = (e,index) =>{
    
   if(!listItems[index].quantity || !listItems[index].price){ 
    return ;
    }
  
    let total = parseInt(Math.abs(listItems[index].quantity)) * parseInt(Math.abs(listItems[index].price))
    const values = [...listItems];
    values[index]['total'] = total.toFixed(2)
   setListItems(values);

  }
  const reverseNegativeInteger = (value) =>{
     return value.replace("-","");
  }


  return (
    <div className='invoice-form'>
      <h4 className='sub-heading'>Bill From</h4>
      <form className='main-form' onSubmit={formik.handleSubmit}>
        <div className='invoice-bill_from-container'>
          <div className='form-input-container street-address-invoice'>
            <label htmlFor='invoice_street_address'>Street Address</label>
            <input 
            type='text' 
            className='input-text' 
            name='invoice_street_address' 
             value = {formik.values.invoice_street_address}
             onChange = {formik.handleChange}
             onBlur = {formik.handleBlur}
            />
             {formik.touched.invoice_street_address &&
              formik.errors.invoice_street_address ? (
                <EmptyField error = {formik.errors.invoice_street_address}/>
              ) : null} 
          </div>

          <div className='form-input-container city-invoice'>
            <label htmlFor='invoice_city'>City</label>
            <input type='text' 
            className='input-text' 
            name='invoice_city' 
            value = {formik.values.invoice_city}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            />
            {formik.touched.invoice_city &&
              formik.errors.invoice_city ? (
                <EmptyField error = {formik.errors.invoice_city}/>
              ) : null} 
          </div>

          <div className='form-input-container post-code-invoice'>
            <label htmlFor='invoice_post_code'>Post Code</label>
            <input type='text' 
            className='input-text' 
            name='invoice_post_code' 
            value = {formik.values.invoice_post_code}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            />
            {formik.touched.invoice_post_code &&
              formik.errors.invoice_post_code ? (
                <EmptyField error = {formik.errors.invoice_post_code}/>
              ) : null} 
          </div>

          <div className='form-input-container country-invoice'>
            <label htmlFor='invoice_country'>Country</label>
            <input type='text' 
            className='input-text' 
            name='invoice_country'
            value = {formik.values.invoice_country}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            />
            {formik.touched.invoice_country &&
              formik.errors.invoice_country ? (
                <EmptyField error = {formik.errors.invoice_country}/>
              ) : null} 
          </div>
        </div>

        <div className='invoice-bill_to-container'>
          <h4 className='sub-heading'>Bill To</h4>
          <div className='form-input-container customer_name-invoice'>
            <label htmlFor='customer'>Customer's Name</label>
            {action==="add"?<Dropdown defaultItem='Select Customer' listItem={customersName} SelectCustomer = {getCustomerNames} />:
             <input type='text' className='input-text' name='customer-name' />
            }
            
          </div>

          <div className='form-input-container email-invoice'>
            <label htmlFor='customer_email'>Customer's Email</label>
            <input type='text' 
            className='input-text' 
            name='customer_email'
            value = {formik.values.customer_email}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            // value = {customerFields.email}
            disabled />
            {formik.errors.customer_email ? (
                <EmptyField error = {formik.errors.customer_email}/>
              ) : null} 
          </div>

          <div className='form-input-container street-customer-address-invoice'>
            <label htmlFor='customer_street_address'>Street Address</label>
            <input type='text' 
            className='input-text' 
            name='customer_street_address' 
            value = {formik.values.customer_street_address}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            // value ={customerFields.streetAddress}
            disabled />
             {formik.errors.customer_street_address ? (
                <EmptyField error = {formik.errors.customer_street_address}/>
              ) : null} 
          </div>

          <div className='form-input-container customer-city-invoice'>
            <label htmlFor='customer_city'>City</label>
            <input type='text' 
            className='input-text' 
            name='customer_city' 
            value = {formik.values.customer_city}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            // value = {customerFields.city}
            disabled />
             {formik.errors.customer_city ? (
                <EmptyField error = {formik.errors.customer_city}/>
              ) : null} 
          </div>

          <div className='form-input-container customer-post-code-invoice'>
            <label htmlFor='customer_post_code'>Post Code</label>
            <input
              type='text'
              className='input-text'
              name='customer_post_code'
              value = {formik.values.customer_post_code}
              onChange = {formik.handleChange}
              onBlur = {formik.handleBlur}
              // value = {customerFields.postCode}
              disabled
            />
             {formik.errors.customer_post_code ? (
                <EmptyField error = {formik.errors.customer_post_code}/>
              ) : null} 
          </div>

          <div className='form-input-container customer-country-invoice'>
            <label htmlFor='customer_country'>Country</label>
            <input type='text' 
            className='input-text' 
            name='customer_country' 
            value = {formik.values.customer_country}
            onChange = {formik.handleChange}
            onBlur = {formik.handleBlur}
            // value = {customerFields.country}
            disabled/>
             {formik.errors.customer_country ? (
                <EmptyField error = {formik.errors.customer_country}/>
              ) : null} 
          </div>
        </div>
        <div className='invoice-terms-container'>
          <div className='form-input-container invoice-date'>
            <label htmlFor='invoice-date'>Invoice Date </label>
            <div className='date-picker-container'>
              <DatePicker
                className='date-component'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
              <i
                className='fa fa-calendar-o calendar-icon'
                aria-hidden='true'
              ></i>
            </div>
          </div>

          <div className='form-input-container invoice-terms'>
            <label htmlFor='terms'>Payment Terms</label>
             <Dropdown defaultItem='Net 30 Days' listItem={paymentTerms} />
          </div>

          <div className='form-input-container project-description'>
            <label htmlFor='project_description'>Project Description</label>
            <input
              type='text'
              className='input-text'
              name='project_description'
              value = {formik.values.project_description}
              onChange = {formik.handleChange}
              onBlur = {formik.handleBlur}
            />
          </div>


          <div className='list-table'>
            
          <h4 className='sub-heading'>Item List</h4>
            {listItems.map((item,index) => {
              return (
                <div className='list-item' key={index}>
                  <div className='form-input-container'>
                    <label className="item-name" htmlFor='item-name'>Item Name</label>
                    <input
                      type='text'
                      className='input-text'
                      name='itemName'
                      value={item.itemName}
                      onChange = {(e)=> onHandleChange(e,index)}
                      
                    />
                   
                   <p className={`empty-input ${!itemErrors[index]?null: itemErrors[index].itemName?'required':null}`}> Required* </p>
                  </div>
                 
                  <div className='list-item-details'>
                    <div className='detail-container quantity' onBlur={(e)=> calculateTotal(e,index)}>
                      <label>Qty</label>
                      <div className='input-container'>
                        <input
                          type='number'
                          className='input-item'
                          name='quantity'
                          value ={item.quantity}
                          onChange = {(e)=> onHandleChange(e,index)}
                          
                        />
                        
                      </div>
                      <p className={`empty-input ${!itemErrors[index]?null: itemErrors[index].quantity?'required':null}`}> Required* </p>
                    </div>

                    <div class='detail-container price' onBlur={(e)=> calculateTotal(e,index)}>
                      <label>Price</label>
                      <div className='input-container'>
                        <input
                          id='price-input'
                          type='number'
                          className='input-item price'
                          name='price'
                          value={item.price}
                          onChange = {(e)=> onHandleChange(e,index)}

                        />
                       
                      </div>
                      <p className={`empty-input ${!itemErrors[index]?null: itemErrors[index].price?'required':null}`}> Required* </p>
                    </div>

                    <div className='detail-container total'>
                      <label>Total</label>
                      <div className='input-container'>
                        <div>
                          
                          <span>{item.total}</span>
                        </div>
                      </div>
                    </div>

                    <div className='detail-container delete-icon' onClick={(e)=> deleteItem(index)}>
                      <div className='input-container'>
                        <i
                          className='fa fa-trash delete-btn'
                          aria-hidden='true'
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>

     <div className="create-item-btn-container">
      <button className=' btn btn-create-item' onClick={(e)=> createNewItem()}>
        + Add New Item
      </button>
      </div>
      
      <InvoiceFormFooter status = {'add'}/>
      
    </div>
  )
}

export default InvoiceForm
