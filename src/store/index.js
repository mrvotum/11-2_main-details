import {createStore, combineReducers, applyMiddleware} from"redux";
import serviceReducer from'../reducers/service';
import servicesReducer from'../reducers/services';
import {combineEpics, createEpicMiddleware} from'redux-observable';
import {fetchServicesEpic, fetchServiceEpic}from'../epics';


const reducer = combineReducers({
    services: servicesReducer,
    service: serviceReducer,
});

const epic = combineEpics(
    fetchServicesEpic,
    fetchServiceEpic,
);
const epicMiddleware = createEpicMiddleware();

const store = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(epic);
export default store;