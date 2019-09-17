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
            catchError(({message}) => of(fetchServiceFailure(message)))
        )}
    ),
);
