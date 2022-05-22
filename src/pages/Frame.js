import React, { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FrameTab from "../components/FrameTab";

const Frame = (props) => {
  const {state} = useLocation();

  const numberSnap = useRef(3);
  const listFrame8 = useRef([]);
  const listFrame6 = useRef([]);
  const listFrame8Regex = useRef([]);
  const listFrame6Regex = useRef([]);

  if(state){
    listFrame8.current = state.frame_list.eight_frame_list;
    listFrame6.current = state.frame_list.six_frame_list;
  }

  const [frame,setFrame] = useState(listFrame6.current[0]);
  let regexFrame = frame.match(/frame-\d/)[0][6];

  listFrame8.current.forEach(frame=>{
    listFrame8Regex.current.push(frame.match(/frame-\d/)[0]);
  })
  listFrame6.current.forEach(frame=>{
    listFrame6Regex.current.push(frame.match(/frame-\d/)[0]);
  })

  return (
    <div className="container" style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <Header/>
      <div>
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            <h1 style={{textAlign : 'center', marginBottom:'15px'}}>Choose Your Frame</h1>
            <FrameTab
              frame8={listFrame8.current}
              frame6={listFrame6.current}
              frameSelected={(frameStyle,shotsNumber)=>{
                setFrame(frameStyle);
                numberSnap.current = shotsNumber;
              }}
              detailframe8={listFrame8Regex.current}
              detailframe6={listFrame6Regex.current}
            />
          </div>
          <div className="col-5 text-center">
            <img className='img-thumbnail' style={{height:'400px'}} src={frame} alt='your frame'/>
          </div>
          <div className="col-1 text-center">
            <Link 
                to="/capture"
                state={{
                    txID : state.txID.toString(),
                    frameID : regexFrame,
                    numberSnap : numberSnap.current
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