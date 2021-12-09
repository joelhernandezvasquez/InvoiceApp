
const initialState = {
    invoices:[],
    invoiceFilter:[]
}

export const invoiceReducer = (state = initialState,action) =>{
    
    switch(action.type)
    {
      case 'FETCH_INVOICES':{
          return{
              ...state,
              invoices:action.payload
          }
      }

      case 'FILTER_INVOICES':{
       
        return{
            ...state,
            invoiceFilter: state.invoices.filter(invoice => invoice.status == action.payload)
          }
      }

      default:
          return state;
      
    }
}
export default invoiceReducer;