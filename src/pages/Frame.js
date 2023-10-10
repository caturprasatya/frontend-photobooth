import React, { useRef, useState} from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import CarouselFrame from "../components/CarouselFrame";
import Swal from 'sweetalert2'

import Logo from "../assets/images/alert.png"
import cameraIcon from "../assets/icons/camera-icon.png"

const Frame = (props) => {
  const {state} = useLocation(); 
  const navigate = useNavigate();
  
  const navigateTo = () => navigate('/capture', { 
    replace: true, 
    state: {
      txID : state.txID.toString(),
      frameID : frameSelected.frame_id.toString(),
      isNoCut : frameSelected.is_no_cut.toString(),
      numberSnap : frameSelected.counter,
      width : frameSelected.width,
      height : frameSelected.height,
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

  const frameURI = useRef()

  if(state){
    frameURI.current = state.printStyle.frameList;
  }

  const [frameSelected,setFrameSelected] = useState(frameURI.current[0]);

  return (
    <div className="bg-dark text-white text-center" style={{height:'100vh',overflowY:'hidden'}}>
      <Link
        to="/load"
        state={{
          action: 'get-frame',
          data: {
            txID : state.txID
          }
        }}
      > 
        <div className="previousButton">
          <button type="button" className="btn btn-danger btn-lg">
            <span>{"<< Back"}</span>
          </button>
        </div>
      </Link> 
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
          className="btn bg-transparent"
          onClick={confirmButton}
        >
          <img src={cameraIcon} style={{height:'8vh', marginTop:'20px'}} alt="camera-icon"/>
        </button>
        <h2 style={{fontSize:'4vh'}} >Start</h2>
      </div>
    </div>
  );
}

export default Frame;