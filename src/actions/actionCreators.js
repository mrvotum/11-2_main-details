import * as types from'./actionTypes';

export const fetchServicesRequest = () => { 
    return {type:types.FETCH_SERVICES_REQUEST};
};
export const fetchServicesFailure = (message) => { 
    return {type:types.FETCH_SERVICES_FAILURE, payload:{message}};
};
export const fetchServicesSuccess = (items) => { 
    return {type:types.FETCH_SERVICES_SUCCESS, payload:{items}};
};

export const fetchServiceFailure = (message) => { 
    return {type:types.FETCH_SERVICE_FAILURE, payload:{message}};
};
export const fetchServiceRequest = (serviceId) => { 
    return {type:types.FETCH_SERVICE_REQUEST, payload:{serviceId}};
};
export const fetchServiceSuccess = (item) => { 
    
    return {type:types.FETCH_SERVICE_SUCCESS, payload:{item}};
};
export const fetchServiceSaveInit = () => { 
    return {type:types.SAVE_SERVICE_INIT, payload:{}};
};
export const fetchServiceSaveRequest = () => { 
    return {type:types.SAVE_SERVICE_REQUEST, payload:{}};
};
export const fetchServiceSaveSuccess = (item) => { 
    return {type:types.SAVE_SERVICE_SUCCESS, payload:{item}};
};
export const fetchServiceSaveFailure = (message) => { 
    return {type:types.SAVE_SERVICE_FAILURE, payload:{message}};
};

export const fetchServiceDeleteRequest = (serviceId) => { 
    return {type:types.DELETE_SERVICE_REQUEST, payload:{serviceId}};
};
export const fetchServiceDeleteSuccess = (serviceId) => { 
    return {type:types.DELETE_SERVICE_SUCCESS, payload:{serviceId}};
};
export const fetchServiceDeleteFailure = (serviceId,message) => { 
    return {type:types.DELETE_SERVICE_FAILURE, payload:{serviceId, message}};
};

export const fetchService = (serviceId) => { 
    
};


export function changeServiceField(name,value){
    return {type: types.CHANGE_SERVICE_FIELD, payload:{name,value}};
}

export function clearServiceField(){
    return {type: types.CLEAR_SERVICE_FIELD, payload:{}};
}
