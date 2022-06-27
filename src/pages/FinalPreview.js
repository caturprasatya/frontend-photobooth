import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

const FinalPreview = (props) => {
  const { state } = useLocation();

  const listEffectsURI = useRef([]);

  if(state){
    listEffectsURI.current = [];
    console.log(state.img_url);
    state.img_url.forEach((element,index) => {
      const a = {};
      a.effectName = element.replace("http://localhost:8080/static/res_image/","").split("/")[1];
      a.imgURI = element;
      a.GIF = state.gif_url[index];
      a.compiled = state.compiled_url[index];
      listEffectsURI.current.push(a);
    });
  }

  const [effectSelected,setEffectSelected] = useState(listEffectsURI.current[0]);

  const renderThumb = () => {
    const thumbStyle = {
        backgroundColor: "#C82826"
    };
    return (
        <div
            style={{ ...thumbStyle }}
        />
    );
  }
  
  return (
    <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
      <div className="row"> 
        <div className="col-3 text-center bg-dark px-0" style={{height:'100vh'}}>
            <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
              <div>
                <p className="text-white mt-3 mb-0" style={{fontSize:'4vh'}}>Choose an effect</p>
              </div>
              <div>
                {listEffectsURI.current.map((effect,index) => {
                  return (
                    <img key={index} src={effect.imgURI} className={`col-10 mb-4 mt-4 ${effectSelected.effectName===effect.effectName ? "greenBorder" : ""}`}
                    alt={index} onClick={()=>{setEffectSelected(effect)}}></img>
                    );
                })}
              </div>
            </Scrollbars>
        </div>
        <div className="col text-center fill" style={{backgroundColor:'#000000'}}>
          <img src={effectSelected.imgURI} className="img-thumbnail" alt="selected effect"></img>
          <Link
            to="/gif-preview"
            state={{
                txID : state.txID,
                effect : effectSelected.effectName,
                compiled : effectSelected.compiled,
                GIF : effectSelected.GIF
            }}
          > 
            <div className="nextButton">
              <button type="button" className="btn btn-success btn-lg">
                <h2>Finish</h2>
              </button>
            </div>
          </Link>  
        </div>
      </div>
    </div>  
  );
}

export default FinalPreview;