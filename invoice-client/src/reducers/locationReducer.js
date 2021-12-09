
const locationState = null;


export const locationReducer = (state=locationState,action ) =>{

    switch(action.type){
        case 'FETCH_CURRENT_LOCATION':
            return{
                ...state,
                location:action.payload
            }

            default:
                return state;
    }
}
export default locationReducer;