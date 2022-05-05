import React from "react";

const Shots = (props) => {
    let width = "200px"
    return(
        <img width={width} src={props.url}></img>
    )
}

export default Shots;