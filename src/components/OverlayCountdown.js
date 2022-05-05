import React from "react";

const OverlayCountdown = (props) => {
    const style={
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: '1',
        top: '0',
        left: '0',
        backgroundColor: 'rgb(0,0,0)',
        backgroundColor: 'rgba(0,0,0, 0.9)',
        overflowX: 'hidden',
        display : props.isOverlayCountdown,
    }

    return(
        <div style={style}>
            <div><h1>{props.number}</h1></div>
        </div> 
    )
}

export default OverlayCountdown;