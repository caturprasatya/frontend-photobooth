import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

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
      <div className="row center">
        <div className="col-3 px-0 text-center bg-dark" style={{backgroundColor:'#FFFFFF',height:'100vh'}}>
          <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb} >
            {listEffectsURI.current.map((effect,index) => {
              return (
                <img key={index} src={effect.imgURI} className={`col-10 mb-4 mt-4 ${effectSelected.effectName===effect.effectName ? "greenBorder" : ""}`}
                alt={index} onClick={()=>{setEffectSelected(effect)}}></img>
                );
              })}
          </Scrollbars>
        </div>
        <div className="col px-0 text-center fill" style={{backgroundColor:'#000000'}}>
          <img src={effectSelected.imgURI} className="" alt="selected effect"></img>
          <Link
            to="/email"
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
  );
}

export default FinalPreview;