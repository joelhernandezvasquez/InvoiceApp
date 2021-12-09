
const initialState = {
    users:[],
    currentUser:null,
    userError:null,
    userAccountItem:'profile'
}


export const userReducer = (state =initialState,action) =>{
 
    switch(action.type){
       
       case 'FETCH_CURRENT_USER':
           return{
            ...state,
            currentUser:action.payload
           }

           case 'FETCH_USERS':
            return{
                ...state,
                users:action.payload
            }
        case 'CREATE_USER':
          return{
              ...state,
              users:[...state.users,action.payload]
          }

          case 'UPDATE_USER':
             
          return{
                  ...state,
                  users:state.users.map(user => user._id === action.payload._id ? action.payload : user ) 
              }

              case 'UPDATE_PASSWORD ':
            return{
                ...state,
                users: state.users.map(user => user._id === action.payload._id? action.payload:user)
              }

              case 'DELETE_USER':
                  return{
                      ...state,
                      user:state.users.filter(user => user._id != action.payload)
                  }
              

          case 'SELECT_ACCOUNT_ITEMS':
              return{
                  ...state,
                  userAccountItem:action.payload
              }

          case 'ERROR_USER':
         return{
              ...state,
              userError:action.payload
          }
          
          default:
              return state;
  }
}
export default userReducer;