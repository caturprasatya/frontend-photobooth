import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';

const FinalPreview = (props) => {
  const { state } = useLocation();

  const listEffectsURI = useRef([]);

  if(state){
    listEffectsURI.current = [];
    state.img_url.forEach((element,index) => {
      const a = {};
      a.effectName = element.replace("http://localhost:8080/static/res_image/","").split("/")[1];
      a.imgURI = element;
      a.GIF = state.gif_url[index];
      listEffectsURI.current.push(a);
    });
  }

  const [effectSelected,setEffectSelected] = useState(listEffectsURI.current[0]);
  
  return (
    <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
      <div className="row">
        <div className="col-3 bg-dark">
          <div  className="text-center" style={{height:'100vh', overflowY: 'scroll', overflowX: 'hidden'}}>
            {listEffectsURI.current.map((effect,index) => {
              return (
                <img key={index} src={effect.imgURI} className={`col-10 mb-4 mt-4 rounded ${effectSelected.effectName===effect.effectName ? "greenBorder" : ""}`}
                alt={index} onClick={()=>{setEffectSelected(effect)}}></img>
                );
              })}
          </div>
        </div>
        <div className="col text-center center" style={{backgroundColor:'#000000'}}>
          <div style={{overflowY: 'hidden', overflowX:'hidden'}}>
            <img src={effectSelected.imgURI} style={{width:'100%'}} className="rounded" alt="selected effect"></img>
            <Link
              to="/"
              state={{
                  txID : state.txID,
                  effect : effectSelected.effectName,
                  GIF : effectSelected.GIF
              }}
            >
              <button type="button" className="btn btn-success btn-lg finishButton">
                Finish
              </button>
            </Link>  
          </div>
        </div>
      </div>
    </div>  
  );
}

export default FinalPreview;