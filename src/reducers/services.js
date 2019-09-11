import * as types from'../actions/actionTypes';


const initState = {
    items: [],
    isLoading: false,
    hasError: null,
};


export default function servicesReducer(state = initState, action){
    switch(action.type){
        case types.FETCH_SERVICES_REQUEST:
            return {...state, isLoading:true, hasError:null};
        case types.FETCH_SERVICES_FAILURE:
                
            const {message} = action.payload;
            return {...state, isLoading:false, hasError:message};
        case types.FETCH_SERVICES_SUCCESS:
            const {items} = action.payload;
            return {...state, items, isLoading:false, hasError:null};
        default:
            return state;
    }

}