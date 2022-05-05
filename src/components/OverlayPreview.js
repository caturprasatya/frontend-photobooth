import React from "react";

const OverlayPreview = (props) => {
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
        display : props.isOverlay,
    }

    return(
        <div style={style}>
            <a href="javascript:void(0)"  onclick="() => SetIsOverlay('none')">&times;</a>
        </div> 
    )
}

export default OverlayPreview;