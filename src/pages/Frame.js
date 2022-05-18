import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FrameTab from "../components/FrameTab";

const Frame = (props) => {
  const {state} = useLocation();
  console.log(state);

  let res8frame = [];
  let res6frame = [];

  if(state){
    res8frame = state.frame_list.eight_frame_list;
    res6frame = state.frame_list.six_frame_list;
  }

  const numberSnap = useRef(3);
  const listFrame8 = useRef(res8frame);
  const listFrame6 = useRef(res6frame);
  const [frame,setFrame] = useState(listFrame6.current[0]);

  return (
    <div style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <Header/>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-6">
            <h1 style={{textAlign : 'center', marginBottom:'15px'}}>Choose Your Frame</h1>
            <FrameTab
              frame8={listFrame8.current}
              frame6={listFrame6.current}
              frameSelected={(frameStyle,shotsNumber)=>{
                setFrame(frameStyle);
                numberSnap.current = shotsNumber;
              }}
            />
          </div>
          <div className="col-5 text-center">
            <img className='img-thumbnail' style={{height:'400px'}} src={frame} alt='your frame'/>
          </div>
          <div className="col-1 text-center">
            <Link 
                to="/capture" 
                state={{
                  data:{
                    txID : state.txID.toString(),
                    frameID : frame.match(/frame-\d/)[0][6],
                    numberSnap : numberSnap.current
                  }
                }}
              >
              <button className="btn btn-dark btn-lg">Next</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Frame;