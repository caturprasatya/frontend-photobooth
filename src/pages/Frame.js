import React, { useRef, useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import CarouselFrame from "../components/CarouselFrame";
import Swal from 'sweetalert2'

import Logo from "../assets/images/alert.png"

const Frame = (props) => {
  const {state} = useLocation(); 
  const navigate = useNavigate();
  
  const navigateTo = () => navigate('/capture', { 
    replace: true, 
    state: {
      txID : state.txID.toString(),
      frameID : frameSelected.frameName,
      numberSnap : frameSelected.snap
    }
  });

  const confirmButton = () => Swal.fire({
    html: '<p style="font-size: 1.2em;"><strong>You only have 3 chances to use <span style="color:red;">Retake</span> option in each photos!</strong></p>',
    imageUrl: Logo,
    imageHeight: 63,
    width: '20em',
    imageWidth: 63,
    confirmButtonColor: '#D63030',
    confirmButtonText: '   <strong style="padding: 10px 50px;">OK</strong>    '
  }).then((result) => {
    if (result.isConfirmed) {
      navigateTo();
    }
  });

  const frameURI = useRef([])
  const regex = /\d+/

  if(state){
    frameURI.current = [];
    state.frame_list.eight_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex)[0];
      a.URI = element;
      a.snap = 4;
      frameURI.current.push(a);
    });
    state.frame_list.six_frame_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex)[0];
      a.URI = element;
      a.snap = 3;
      frameURI.current.push(a);
    });
    state.frame_list.six_frame_six_takes_list.forEach(element => {
      const a = {};
      a.frameName = element.replace("http://localhost:8080/static/frame_assets/","").match(regex)[0];
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
        <button
          class="btn bg-transparent"
          onClick={confirmButton}
        >
          <img src={"../../static/images/camera-icon.png"} style={{height:'8vh', marginTop:'20px'}} alt="camera-icon"/>
        </button>
        <h2 style={{fontSize:'4vh'}} >Start</h2>
      </div>
    </div>
  );
}

export default Frame;