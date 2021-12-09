
const initialState = {
    customers:[],
    selectedCustomer:{},
    filterCustomers:[],
    errorCustomer:null
}

export const customerReducer = (state = initialState,action) =>{
   switch(action.type)
   {
       case 'FETCH_CUSTOMERS':{
           return{
               ...state,
               customers:action.payload
           }
       }

       case'FETCH_CUSTOMER':{
           return{
               ...state,
               selectedCustomer:action.payload
           }
       }

       case 'FILTER_CUSTOMER':{
           return{
               ...state,
               filterCustomers:state.customers.filter(customer => customer.name.toLowerCase().includes(action.payload))
            
           }
       }

       case 'CLEAR_CUSTOMER_FILTER':{
          return{
              ...state,
              filterCustomers:[]
          }
       }

       case'ADD_CUSTOMER':{
          console.log('from the add customer')
          console.log(state.customers);
        return{
               ...state,
               customers:[...state.customers,action.payload]
           }
       }

       case'EDIT_CUSTOMER':{
        return{
            
             ...state,
             customers:state.customers.map(customer => customer._id === action.payload._id ? action.payload : customer )
           }
       }

       case 'DELETE_CUSTOMER':{
           return{
               ...state,
               customers: state.customers.filter(customer => customer._id != action.payload)
           }
       }

       case 'ERROR_CUSTOMER':{
           return{
               ...state,
               errorCustomer:action.payload
        }
       }

       default:
           return state;
   }
}
export default customerReducer;