import React from 'react';

export function Loading(props){

    const {isLoading} = props;

    return (isLoading) && (
        <div className="loading">Loading...</div>
    );

}