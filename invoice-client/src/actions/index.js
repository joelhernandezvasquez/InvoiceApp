
import axios from 'axios';
import history from '../history';
import ErrorMessage from '../components/ReusableComponents/Message';

export const fetchCurrentLocation = (location) =>{
  return{
    type:'FETCH_CURRENT_LOCATION',
    payload:location
  }
}

export const fetchCurrentUser = () =>{ 
 return async(dispatch) =>{
     const response = await axios.get('/api/current_user');
     dispatch({type:'FETCH_CURRENT_USER',payload:response.data})
 }
}

export const fetchUsers = () =>{
  return async(dispatch) =>{
      const response = await axios.get('/api/get/users');
      dispatch({type:'FETCH_USERS',payload:response.data});
  }
} 
export const createUser = (user) =>{
    return async(dispatch) =>{
        const response = await axios.post("/api/users",{...user});
        dispatch({type:'CREATE_USER',payload:response.data})
       
         history.push(
            {
                pathname:'/dashboard',
                state:'signUp'
        }); 
    }
}

 export const updateUser = (formData) =>{
   
    return async(dispatch) =>{
      try{
        const response = await axios.put(`/api/update_user`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
        dispatch({type:'UPDATE_USER',payload:response.data});
    
      }
      catch(err){
        dispatch({type:'ERROR_USER',payload:err})
      }
    } 
} 

export const updateUserPassword = (id,password) =>{
  let status = null;
  return async (dispatch) =>{
    try{
    
      const response = await axios.put(`/api/update_password`,{_id:id,newPassword:password});
      dispatch({type:'UPDATE_PASSWORD',payload:response.data})
      return status =  response.status;
    }
    catch(err){
      dispatch({type:'ERROR_USER',payload:err})
      return status;
    }
  }
}
 
export const deleteUser = (id) =>{
  let status = null;

  return async(dispatch) => {
    try{
      const response = await axios.delete(`/api/delete_user/${id}`);
      dispatch({type:'DELETE_USER', payload:response.data}) 
      status = response.status;
      return status;
    }
    catch(err)
    {
      dispatch({type:'ERROR_USER',payload:err})
       return status;
    }
     
  }
}
export const loginUser = (user) =>{
    return async (dispatch) =>{
        try{
            const response = await axios.post('/api/login/user',{...user})
           if(response.data.userExist)
            {
               history.push("/dashboard"); 
            } 
        }

        catch(err)
        {
            history.push(
                {
                    pathname:'/login',
                    state:'login failed'
            });
        }
    }
}

export const userAccess = () =>{
     return async (dispatch) =>{
         try{
              await axios.get('/api/dashboard');
         }
         catch(err){
           dispatch({type:'ERROR_USER',payload:err})
         }
     }  
}

export const selectAccountItems = (item) =>{
    return{
     type:'SELECT_ACCOUNT_ITEMS',
     payload:item
    }
}

export const fetchCustomers = () =>{
  return async(dispatch) =>{
    try{
      const response = await axios.get('/api/get/customers');
      dispatch({type:'FETCH_CUSTOMERS',payload:response.data})
    }
    catch(err)
    {
     dispatch({type:'ERROR_CUSTOMER',payload:err})
    }
  }
}

export const fetchCustomer = (id) =>{
  return async(dispatch) =>{
    try{
      const response = await axios.get(`/api/customer/${id}`);
      dispatch({type:'FETCH_CUSTOMER',payload:response.data})
    }
    catch(err){
      dispatch({type:'ERROR_CUSTOMER',payload:err})
    }
  }
}

export const filterCustomers = (term)=>{
  try{
    return{type:'FILTER_CUSTOMER',payload:term}
  }
  catch(err)
  {
    return{type:'ERROR_CUSTOMER',payload:err}
  }
}

export const clearCustomerFilter = () =>{
   try{
     return{ type:'CLEAR_CUSTOMER_FILTER'}
   }
   catch(err)
   {
     console.log(err);
   }
}

export const addCustomer =  (customer) =>{
 
  return async(dispatch) =>{
    try{
      const response = await axios.post(`/api/customers`,customer);
      dispatch({type:'ADD_CUSTOMERS',payload:response.data})
    
      return response.status;
      
    }
    catch(err)
    {
      console.log(err);
    }
  }
  
}

 export const modifyCustomer = (customer) =>{
  
   return async(dispatch) =>{

    try{
   
    const response = await axios.put(`/api/edit_customers`,customer)
   
    
    dispatch({type:"EDIT_CUSTOMER",payload:response.data})
   return response.status;
      
   }
   catch(err)
   {
    return{type:'ERROR_CUSTOMER',payload:err}
   }
   }
 }
 export const deleteCustomer = (customerId) =>{
   
   return async(dispatch) =>{
     try{
        const response = await axios.delete(`/api/delete_customer/${customerId}`)
       dispatch({type:'DELETE_CUSTOMER',payload:response.data})
       return response.status;
      }
     catch(err)
     {
       console.log(err);
       return{type:'ERROR_CUSTOMER',payload:err}
     }
   }
 }
  


export const fetchInvoices  = () =>{
  return async(dispatch) =>{
    try{
        const response = await axios.get('/api/get/invoices');
        dispatch({type:'FETCH_INVOICES',payload:response.data})
    }
    catch(err){
     console.log(err);
    }
  }
}

export const filterInvoices = (status) =>{
  
 
    try{
      return{type:'FILTER_INVOICES',payload:status}
    }
    catch(err){
      console.log(err);
    }
  
}

