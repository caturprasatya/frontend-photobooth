import React, { useRef, useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';
import CarouselFrame from "../components/CarouselFrame";

const Frame = (props) => {
  const {state} = useLocation();

  const frameURI = useRef([])
  const regex = /\d+/

  if(state){
    frameURI.current = [];
    state.frame_list.eight_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex);
      a.URI = element;
      a.snap = 4;
      frameURI.current.push(a);
    });
    state.frame_list.six_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex);
      a.URI = element;
      a.snap = 3;
      frameURI.current.push(a);
    });
    state.frame_list.six_frame_six_takes_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex);
      a.URI = element;
      a.snap = 6;
      frameURI.current.push(a);
    });
  }
 
  const [frameSelected,setFrameSelected] = useState(frameURI.current[0]);

  return (
    <div className="bg-dark text-white text-center" style={{height:'100vh',overflowY:'hidden'}}>
      <h1 className="headerText">Choose Your Favourite Frame</h1>
      <CarouselFrame
        frameURI={frameURI.current}
        pickFrame = {(choosen)=>{
          setFrameSelected(choosen);
        }}
        whichSelected= {frameSelected}
      />
      <div className="text-center">
        <Link 
          to="/capture"
          state={{
              txID : state.txID.toString(),
              frameID : frameSelected.frameName,
              numberSnap : frameSelected.snap
          }}
        >
          <img src={"../../static/images/camera-icon.png"} style={{height:'8vh', marginTop:'20px'}} alt="camera-icon"/>
        </Link>
        <h2 style={{fontSize:'4vh'}} >Start</h2>
      </div>
    </div>
  );
}

export default Frame;