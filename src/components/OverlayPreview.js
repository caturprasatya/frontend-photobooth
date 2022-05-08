import React from "react";

const OverlayPreview = (props) => {
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
        display : props.isOverlayPreview,
    }

    const styleCloseButton={
        position: 'absolute',
        top: '20px',
        right: '45px',
        fontSize: '60px',
        color: 'white',
    }
    return(
        <div style={styleOverlay}>
            <div onClick={props.closeOverlay} style={styleCloseButton}>&times;</div>
            
        </div> 
    )
}

export default OverlayPreview;