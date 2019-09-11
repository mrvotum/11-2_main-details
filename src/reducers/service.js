import * as types from'../actions/actionTypes';


const initState = {
    item: {},
    isLoading: false,
    hasError: null,
};


export default function serviceReducer(state = initState, action){

    switch(action.type){
        case types.FETCH_SERVICE_REQUEST:
            const {serviceId} = action.payload;
            return {...state, item: {id:serviceId}, isLoading: true, hasError: null};
        case types.FETCH_SERVICE_FAILURE:
            const {message} = action.payload;
            return {...state, isLoading: false, hasError: message};
        case types.FETCH_SERVICE_SUCCESS:
            const {item:itemFetched} = action.payload
            return {...state, isLoading:false, item: itemFetched  }
        case types.CLEAR_SERVICE_FIELD:
            return {...initState};
        default:
            return state;
    }

}