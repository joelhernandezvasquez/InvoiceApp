import React,{useEffect,useState} from 'react';
import { useFormik } from 'formik';


const CustomerForm = ({submit,action,data}) => {
  const[initialValues,setInitialValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    status:'',
    streetAddress:'',
    city:'',
    postCode:'',
    country:''
  })
  const[customerStatus,setCustomerStatus] = useState(null);
   

  const validate = values => {
    let errors = {}

    if (!values.name) {
      errors.name = 'Required'
    }

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email Format'
    }

    if(!values.phoneNumber){
      errors.phoneNumber = 'Required'
    }
    else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(values.phoneNumber))
    {
      errors.phoneNumber = 'Invalid Phone Number Format'
    }

    if(!values.streetAddress){
      errors.streetAddress = 'Required'
    }

    if(!values.city){
      errors.city = 'Required'
    }

    if(!values.postCode){
      errors.postCode = 'Required'
    }

    if(!values.country){
      errors.country='Required'
    }

    return errors;
  }
  const onSubmit = () =>{
    
    submit(formik.values,customerStatus);
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
 
const rehydrateCustomerData = (data) =>{

  
   for(const[key,value] of Object.entries(data))
{
   formik.values[key] = value;
 }

  for(const[key,value]of Object.entries(data.address))
   {      formik.values[key] = value;
  
  } 

  setCustomerStatus(data.status);
 
  setInitialValues({...initialValues,name:'joel' })
}

const getCustomerStatus = (event) =>{
  setCustomerStatus(event.target.value);
}

  useEffect(() => {
    if(data){
      rehydrateCustomerData(data)
    }
  }, [])

    return (
      
        <div className="customer-form">
          
          <h4 className="sub-heading"> Basic Info</h4> 
           <form className="main-form" onSubmit={formik.handleSubmit}>
               <div className="form-input-container name">
                  <label htmlFor='name'>Customer's name</label>
                  <input type ="text" 
                    className="input-text"
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                  
                  />
                  
              {formik.touched.name &&
              formik.errors.name ? (
                <div className='emptyField'>
                  {formik.errors.name}
                </div>
              ) : null} 
               </div>

               <div className="form-input-container email">
                  <label htmlFor="email">Customer's email</label>
                  <input type ="email" 
                     className="input-text"
                     name='email'
                     onChange={formik.handleChange}
                     value={formik.values.email}
                     onBlur={formik.handleBlur}
                     
                  /> 
                     {formik.touched.email && formik.errors.email ? (
                <div className='emptyField'>
                  {formik.errors.email}
                </div>
              ) : null} 
               </div>

               <div className="form-input-container phone-number">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input type ="tel" 
                   className="input-text"
                   name='phoneNumber'
                   onChange={formik.handleChange}
                   value={formik.values.phoneNumber}
                   onBlur={formik.handleBlur}
                   /> 
                      {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className='emptyField'>
                  {formik.errors.phoneNumber}
                </div>
              ) : null} 
               </div>

               {action === 'Edit' || action ==='edit' ? (
                 <div className="status-container">
                   <label>Customer status :</label>
                    
                    <div className="radio-button-group">
                     
                     <div className="radio-container">
                       <label>Active</label>
                       <input type="radio" name="customerStatus" 
                        value = 'Active'
                        checked = {customerStatus === 'Active'}
                        onChange = {(e) => getCustomerStatus(e)} 
                       />
                     </div>

                     <div className="radio-container">
                       <label>Inactive</label>
                       <input type="radio" name="customerStatus"
                        value='Inactive' 
                        checked = {customerStatus === 'Inactive'}
                        onChange = {(e) => getCustomerStatus(e)} 
                        />
                     </div>

                    </div> 
                 </div>
               ):null}

               <h4 className="sub-heading"> Billing Address</h4> 
                <div className="billing-address-container">
                
                <div className="form-input-container street-address">
                  <label htmlFor="streetAddress">Street address</label>
                  <input type ="text" 
                  className="input-text"
                  name='streetAddress'
                  onChange={formik.handleChange}
                  value={formik.values.streetAddress}
                  onBlur={formik.handleBlur}
                  /> 
                     {formik.touched.streetAddress && formik.errors.streetAddress ? (
                <div className='emptyField'>
                  {formik.errors.streetAddress}
                </div>
              ) : null} 
                </div>

                <div className="form-input-container city">
                  <label hmtlfor="city">City</label>
                  <input type ="text" 
                  className="input-text"
                  name='city'
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  onBlur={formik.handleBlur}
                  
                  /> 
                     {formik.touched.city&& formik.errors.city ? (
                <div className='emptyField'>
                  {formik.errors.city}
                </div>
              ) : null} 
                </div>

                <div className="form-input-container post-code">
                  <label htmlfor="postCode">Post code</label>
                  <input type ="text" 
                  className="input-text"
                  name='postCode'
                  onChange={formik.handleChange}
                  value={formik.values.postCode}
                  onBlur={formik.handleBlur}
                  /> 
                     {formik.touched.postCode && formik.errors.postCode ? (
                <div className='emptyField'>
                  {formik.errors.postCode}
                </div>
              ) : null} 
                </div>

                
                <div className="form-input-container country">
                  <label htmlfor="country">Country</label>
                  <input type ="text" 
                  className="input-text"
                  name='country'
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  onBlur={formik.handleBlur}
                  /> 
                     {formik.touched.country && formik.errors.country ? (
                <div className='emptyField'>
                  {formik.errors.country}
                </div>
              ) : null} 
                </div>


                </div>

                <button className="submit-btn" type="submit">{action} Customer</button>
           </form>
        </div>
    )
}

export default  CustomerForm;
