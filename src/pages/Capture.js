import React, { useEffect, useRef, useState} from "react";
import {Link, useLocation} from 'react-router-dom';


const Capture = (props) => {
  const { state } = useLocation();

  const numberSnap = useRef(8);
  const imageBlob = useState([]);
  const snapCounter = useRef(0);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const isCountdown = useRef(false);

  if(state){
    numberSnap.current = state.numberSnap;
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video : true})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takeSnap = () => {
    if(snapCounter.current<numberSnap.current){

    }
  }
  
  return (
    <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
      <div className="row">
        <div className="col-3 bg-dark">
          <div  className="text-center" style={{height:'100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
            {/* {listEffectsURI.current.map((effect,index) => {
              return (
                <img key={index} src={effect.imgURI} className={`col-10 mb-4 mt-4 rounded ${effectSelected.effectName===effect.effectName ? "greenBorder" : ""}`}
                alt={index} onClick={()=>{setEffectSelected(effect)}}></img>
                );
              })} */}
          </div>
        </div>
        <div className="col text-center center" style={{backgroundColor:'#000000'}}>
          <div className="styleOverlay">
            <div className="overlayText">{snapCounter.current}</div>
          </div> 
          <div style={{overflowY: 'hidden', overflowX:'hidden'}}>
            <video width="100%" ref={videoRef} autoPlay/>
            {/* <img src={effectSelected.imgURI} style={{width:'100%'}} className="rounded" alt="selected effect"></img> */}
            <button type="button" className="btn btn-light btn-lg retakeButton">
              Retake
            </button>
            <Link
              to="/"
              state={{
                  txID : state.txID,
                  frameID : state.frameID,
                  imageBlob : imageBlob
              }}
            >
              <button type="button" className="btn btn-dark btn-lg finishButton">
                Next >
              </button>
            </Link>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;