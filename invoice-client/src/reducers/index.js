import { combineReducers } from "redux";
import userReducer from "./userReducer";
import locationReducer from "./locationReducer";
import customerReducer from "./customerReducer";
import invoiceReducer from "./invoiceReducers";


const allReducers  = combineReducers({
    users:userReducer,
    routing:locationReducer,
    customer:customerReducer,
    invoice:invoiceReducer
})

export default allReducers;