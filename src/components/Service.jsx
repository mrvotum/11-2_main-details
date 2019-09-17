import React from 'react';
import {connect, useSelector, useDispatch} from'react-redux';
import { fetchServiceRequest } from '../actions/actionCreators';
import { Message } from '../components/Message';

function Service(props){
    const {match: {params: {id: serviceId } } } = props;
    const {
        service:{
            item: {id, name = '', price = '', content = ''}, 
            isLoading, 
            hasError,
        },
        services: {items = []}
    } = useSelector(state => state);
    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(fetchServiceRequest(serviceId));
        return () => {};
    },[serviceId]);

    const handleRepeate = () => {
        dispatch(fetchServiceRequest(serviceId));
    };
    
    return (
        ((hasError) && <Message message={hasError} isHide={!hasError} handleRepeate={handleRepeate} />) || 
        (
            <div className="item">
                <div className="item-field-control">
                    <label>Name</label>
                    <input name="name" value={name} disabled={isLoading} readOnly={true} type="text" />
                </div>
                <div className="item-field-control">
                    <label>Price</label>
                    <input name="price" value={price} disabled={isLoading} readOnly={true} type="number" />
                </div>
                <div className="item-field-control">
                    <label>Context</label>
                    <textarea name="context" value={content} disabled={isLoading} readOnly={true} ></textarea>
                </div>
            </div>
        )
    );
}

const mapStateToProps = (state, ownProps) => {
    const {service: {item, isLoading, hasError}} = state;
    return {...ownProps, item, isLoading, hasError};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Service);
export {ConnectedComponent as Service};

