import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FramePreview from "../components/FramePreview";

const FinalPreview = (props) => {
    const [frame,setFrame] = useState();
    const [listFrame8, setListFrame8] = useState([
        "http://localhost:8080/static/frame_assets/frame-1.png",
        "http://localhost:8080/static/frame_assets/frame-2.png",
        "http://localhost:8080/static/frame_assets/frame-3.png",
        "http://localhost:8080/static/frame_assets/frame-4.png",
        "http://localhost:8080/static/frame_assets/frame-8.png",
        "http://localhost:8080/static/frame_assets/frame-9.png"
        ]);
    const [listFrame6, setListFrame6] = useState([
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
            <h1>Choose Your Frame</h1>
            <FramePreview
            frameUrl={listFrame8}
            />
          </div>
          <div className="col-6">
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default FinalPreview;