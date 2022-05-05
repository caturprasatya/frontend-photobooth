import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Shots from "../components/Shots"
import Background from "../assets/images/bg-payment.png";
import Header from '../components/Header';
import Footer from '../components/Footer'
import OverlayCountdown from "../components/OverlayCountdown";
import OverlayPreview from "../components/OverlayPreview";

const Capture = (props) => {
  const numberShots = useRef(4);
  const { state } = useLocation();
  const timer = 5;
  if(state){
    numberShots.current = state.number;
  }
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [shotsArray, setShotsArray] = useState([]);
  const [isDone, setIsDone] = useState(false);  //Check if Capture's done
  const [isNext, setIsNext] = useState(true);   //Check if next button available
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay active
  const [countdown, setCountdown] = useState(timer+1);  //Countdown

  const videowidth = useRef(512);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video : true})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takePhoto = (n) => {
    setShotsArray([]);
    setIsDone(true);
    setIsNext(true);

    let i = 0;
    let video = videoRef.current;
    let canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    let myPromise = new Promise((myResolve,myReject)=>{
      let number = countdown;
      let starting = setInterval(()=>{
        if(number>=1){
          setIsOverlayCountdown('block');
          number--;
          setCountdown(number);
          console.log(countdown);
        }else{
          clearInterval(starting);
          setIsOverlayCountdown('none');
          myResolve("Begin Shot");
          setCountdown(timer+1);
        }
        },1000)
      });
    
    myPromise.then(
      (value) => {
        let interval = setInterval(() => {
          if (i<n){
            canvas.getContext('2d').drawImage(video, 0, 0);
            let photo = canvas.toDataURL("image/png");
            console.log(photo);
            setShotsArray(prevShotsArray => {
              return [...prevShotsArray, photo];
            });
            i++;
          } else {
            clearInterval(interval);
            setIsDone(false);
            setIsNext(false);
          }
        },1000);
      }
    )

  };


  return (
    <div style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    > 
      <Header/>
      <div>
        <OverlayCountdown 
        isOverlayCountdown={isOverlayCountdown}
        number={countdown}
         />
      </div>   
      <div>
        <video width={videowidth} ref={videoRef} autoPlay/>
	    </div>
	    <div>
		    <button onClick={() => takePhoto(numberShots.current)} disabled={isDone}>Capture</button>
		    <button disabled={isNext}>Next</button>
	    </div>
	    <div>
        <canvas ref={canvasRef} style={{display:"none"}}></canvas>
        {shotsArray.map((shots, index) => {
        return (
          <Shots
            key={index}
            url={shots}
          />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Capture;