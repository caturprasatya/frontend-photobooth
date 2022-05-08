import React from "react";

const OverlayCountdown = (props) => {
    const styleOverlay={
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

    const styleText ={
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontSize: '400px',
        color: 'white',
        transform: 'translate(-50%,-50%)',
    }

    return(
        <div style={styleOverlay}>
            <div style={styleText}>{props.number}</div>
        </div> 
    )
}

export default OverlayCountdown;