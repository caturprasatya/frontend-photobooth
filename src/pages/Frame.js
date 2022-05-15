import React, { useState, useRef } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FrameTab from "../components/FrameTab";

const Frame = (props) => {
  const [frame,setFrame] = useState("http://localhost:8080/static/frame_assets/frame-1.png");
  const listFrame8 = useRef([
    "http://localhost:8080/static/frame_assets/frame-1.png",
    "http://localhost:8080/static/frame_assets/frame-2.png",
    "http://localhost:8080/static/frame_assets/frame-3.png",
    "http://localhost:8080/static/frame_assets/frame-4.png",
    "http://localhost:8080/static/frame_assets/frame-8.png",
    "http://localhost:8080/static/frame_assets/frame-9.png",
    ]);
const listFrame6 = useRef([
    "http://localhost:8080/static/frame_assets/frame-5.png",
    "http://localhost:8080/static/frame_assets/frame-6.png",
    "http://localhost:8080/static/frame_assets/frame-7.png"
    ]);

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
              frameSelected={(select)=>{setFrame(select)}}
            />
          </div>
          <div className="col-5 text-center">
            <img className='img-thumbnail' style={{height:'400px'}} src={frame} alt='your frame'/>
          </div>
          <div className="col-1 text-center">
            <button className="btn btn-dark btn-lg">Next</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Frame;