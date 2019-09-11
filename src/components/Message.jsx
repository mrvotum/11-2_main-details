import React from 'react';

export function Message(props){

    const {message, isHide, handleRepeate} = props;
    const [hide, setHide] = React.useState(false);
    
    React.useEffect ( () => {
        setHide(isHide);
        return () =>{ setHide(false)} ;
    },[message, isHide])

    return (
        <>
        {
            !hide && message && 
            (
                <div className="message">
                    <button onClick={ (evt) => { evt.preventDefault(); setHide(true);} }>X</button>
                    <p>{message}</p>
                    {
                        (handleRepeate) && (<button onClick={ (evt) => { evt.preventDefault(); handleRepeate(); } }>Repeate</button>)    
                    }
                </div>
            )
        }
        </>
    )

}