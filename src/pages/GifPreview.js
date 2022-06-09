import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

const GifPreview = (props) => {
    const { state } = useLocation();

    const [compiledImage,setCompiledImage] = useState();
    const [gif,setGif] = useState();
    const isGif = useRef(false);

    if(state){
      setCompiledImage(state.compiled);
      setGif(state.GIF);
    }

    const gifOrImage = () => {
      if(isGif.current){
        isGif.current = false;
      }else{
        isGif.current = true;
      }
    }

    return(
        <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
            <h1 className="headerText">Yeay, you've got that snapped!</h1>
            <img src={isGif.current ? gif : compiledImage} alt="you are snapped"/>
            <div className="nextButton">
              <button type="button" className="btn btn-light btn-lg w-100 mb-2" onClick={()=>gifOrImage} style={{display:'none'}}>
                Retake
              </button>
              <Link
                to="/email"
                state={{
                    txID : state.txID,
                    effect : state.effect
                }}
              >
                <button type="button" className="btn btn-success btn-lg w-100 mt-2">
                  {"Next >>"}
                </button>
              </Link>
            </div>
        </div>
    );
}

export default GifPreview;
