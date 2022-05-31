import React, { useRef, useState} from "react";
import { Link, useLocation } from 'react-router-dom';
import CarouselFrame from "../components/CarouselFrame";

const Frame = (props) => {
  const {state} = useLocation();

  const frameURI = useRef([])
  const regex = /frame-\d/

  if(state){
    frameURI.current = [];
    state.frame_list.eight_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.match(regex)[0][6];
      a.URI = element;
      a.snap = 8;
      frameURI.current.push(a);
    });
    state.frame_list.six_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.match(regex)[0][6];
      a.URI = element;
      a.snap = 3;
      frameURI.current.push(a);
    });
  }

  const [frameSelected,setFrameSelected] = useState(frameURI.current[0]);

  return (
    <div className="bg-dark text-white" style={{height:'100vh'}}>
      <div className="container" style={{height:'100vh', alignItems: 'center'}}>
        <div className="row">
            <h1 style={{textAlign : 'center', fontSize:'5vh', marginTop:'5vh'}}>Choose Your Favourite Frame</h1>
        </div>
        <div className="row" style={{height:'60vh'}}>
            <CarouselFrame
              frameURI={frameURI.current}
              pickFrame = {(choosen)=>{
                setFrameSelected(choosen);
              }}
              whichSelected= {frameSelected}
            />
        </div>
        <div style={{textAlign : 'center'}}>
            <Link 
              to="/capture"
              state={{
                  txID : state.txID.toString(),
                  frameID : frameSelected.frameName,
                  numberSnap : frameSelected.snap
              }}
            >
              <img src={"../../static/images/camera-icon.png"} style={{height:'10vh', marginTop:'5vh'}} alt="camera-icon"/>
            </Link>
            <p>Start</p>
        </div>
      </div>
    </div>
  );
}

export default Frame;