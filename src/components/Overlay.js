import React from "react";

const Overlay = (props) => {
    const styleOverlay={
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: '1',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        overflowX: 'hidden',
        display : props.isOverlay
    }

    const styleText ={
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontFamily: 'Poppins',
        fontSize: '50px',
        color: 'white',
        transform: 'translate(-50%,-50%)',
    }

    return(
        <div style={styleOverlay}>
            <div style={styleText}>{props.text}</div>
        </div> 
    )
}

export default Overlay;