import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

const GifPreview = (props) => {
    const { state } = useLocation();

    return(
        <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
            <h1 className="headerText">Yeay, you've got that snapped!</h1>
            <img src={state}/>
        </div>
    );
}

export default GifPreview;
