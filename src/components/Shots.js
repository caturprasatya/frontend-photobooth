import React from "react";

const Shots = (props) => {
    return(
        <img width={props.width} src={props.url} onClick={props.activateOverlayPreview}></img>
    )
}

export default Shots;