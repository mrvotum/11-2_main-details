import React from 'react';
import {connect, useSelector,useDispatch} from'react-redux';
import {fetchServicesRequest} from '../actions/actionCreators';
import {Message} from '../components/Message';


function Services(props){

    const {
        items = [], 
        hasError,
    } = useSelector(state => state.services);

    const dispatch = useDispatch();

    React.useEffect( () => {
        dispatch(fetchServicesRequest());
        return () => {};
    },[]);

    const handleRepeate = () => {
        dispatch(fetchServicesRequest());
    };
    
    return (
        ((hasError) && <Message message={hasError} isHide={!hasError} handleRepeate={handleRepeate} />) || 
        (
            <ul>
            {
                
                items.map( (item) => {
                    return (
                        <li key={item.id}>
                            <a href={`/services/${item.id}`}>
                                <span className="item-text">{item.name}</span>
                            </a>
                            :
                            <span className="item-price">{item.price}</span>
                        </li>
                    )
                } )
            }
            </ul>
        )
    );

}

const mapStateToProps = (state,ownProps) => {
    const {services: {items, isLoading, hasError}} = state;
    return {...ownProps, items, isLoading, hasError};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...ownProps,
    };
};

const ConnectedComponent = connect(mapStateToProps,mapDispatchToProps)(Services);
export {ConnectedComponent as Services};

