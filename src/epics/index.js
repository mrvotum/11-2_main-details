import {ofType} from'redux-observable';
import {of} from 'rxjs';
import {ajax} from'rxjs/ajax';
import {map, switchMap, catchError} from 'rxjs/operators';
import * as types from '../actions/actionTypes';
import {fetchServicesSuccess,fetchServicesFailure,fetchServiceSuccess,fetchServiceFailure} from'../actions/actionCreators';

export const fetchServicesEpic = action$ => {return action$.pipe(
    ofType(types.FETCH_SERVICES_REQUEST),
    switchMap(() => {return ajax.getJSON(`${process.env.REACT_APP_ROOT_URL}/services`).pipe(
            map((response) => { return fetchServicesSuccess(response)}),
            catchError(({message}) => {return of(fetchServicesFailure(message));})
        )}
    ),
)};

export const fetchServiceEpic = action$ => action$.pipe(
    ofType(types.FETCH_SERVICE_REQUEST),
    map(o => o.payload.serviceId),
    switchMap((serviceId) => {return ajax.getJSON(`${process.env.REACT_APP_ROOT_URL}/services/${serviceId}`).pipe(
            map((item) => {return fetchServiceSuccess(item)}),
            catchError(message => of(fetchServiceFailure(message)))
        )}
    ),
);
/*
export const clearSearchEpic = action$ => action$.pipe(
    ofType(types.CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    filter(search => search ===''),
    map(() => {return clearSearchField()})
);
*/
/*
export const changeSearchEpic = action$ => action$.pipe(
    ofType(types.CHANGE_SEARCH_FIELD),
    map(o => o.payload.search.trim()),
    
    filter(search => search !==''),
    debounceTime(100),
    
    
    
    map( o => {
        return o.length > 0 
            ? concat(
                debounceTime(100),
                map(search => fetchSearchRequest(search))
            )
            : map(search => clearSearchField(search))
    })
    

);
*/
/*
export const searchEpic = action$ => action$.pipe(
    ofType(types.FETCH_SEARCH_REQUEST),
    map(o => o.payload.search),
    switchMap(search => {return ajax.post(
        `${process.env.REACT_APP_ROOT_URL}/search`, 
        {
            name: search
        }, 
        {
            'Content-Type': 'application/json',
        }).pipe(
            map(({response: items}) => { return fetchSearchSuccess(items)}),
            catchError(message => of(fetchSearchFailure(message)))
        )}
    ),
);
*/