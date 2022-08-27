import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

const GifPreview = (props) => {
    const { state } = useLocation();

    const [gif,setGif] = useState();
    const [compiledImage,setCompiledImage] = useState();
    const [isGif,setIsGif] = useState(false);

    useEffect(()=>{
      if(state){
        setCompiledImage(state.compiled);
        setGif(state.GIF);
      }
      // eslint-disable-next-line
      },[]);

    const gifOrImage = () => {
      if(isGif){
        setIsGif(false);
      }else{
        setIsGif(true);
      }
    }

    return(
        <div className="text-center container-fluid bg-dark" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
            <h1 className="text-white headerText">Yeay, you've got that snapped!</h1>
            {isGif ? (
                <img className="img-thumbnail" style={{height:'80vh'}} src={gif} alt="you are gifted"/>
            ) : (
                <img className="img-thumbnail" style={{height:'80vh'}} src={compiledImage} alt="you are snapped"/>
            )}
            <div className="nextButton">
              <button type="button" style={{width:'150px',display:'block'}} className="btn btn-light btn-lg" onClick={gifOrImage}>
                <span>{isGif ? "Photos" : "GIF"}</span>
              </button>
              <Link
                to="/email"
                state={{
                    txID : state.txID,
                    effect : state.effect
                }}
                style={{textDecoration:'none'}}
              >
                <button type="button" style={{width:'150px',display:'block',color:'white'}} className="btn btn-success btn-lg">
                  <span>{"Next >>"}</span>
                </button>
              </Link>
            </div>
        </div>
    );
}

export default GifPreview;
