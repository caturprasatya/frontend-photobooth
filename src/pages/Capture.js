import React, { useEffect, useRef, useState } from "react";
import Shots from "../components/Shots"
import Background from "../assets/images/bg-home.png";
import Header from '../components/Header';
import Footer from '../components/Footer';
import OverlayCountdown from "../components/OverlayCountdown";
import OverlayPreview from "../components/OverlayPreview";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Capture = (props) => {
  const numberShots = useRef(6);
  const timer = 5;
  const shotsInterval = 1000;
  const { state } = useLocation();

  if(state){
    numberShots.current = state.number;
  }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isSnapEmpty = useRef(null);
  const videoWidth = useRef('85%');

  const [imageUrl, setImageUrl] = useState([]);
  const [isDone, setIsDone] = useState(false);  //Check if Capture's done
  const [isNext, setIsNext] = useState(true);   //Check if next button available
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay countdown active
  const [isOverlayPreview, setIsOverlayPreview] = useState('none'); //check if overlay preview active
  const [countdown, setCountdown] = useState(timer+1);  //Countdown timer
  const [isRetake, setIsRetake] = useState('Capture');

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
    setImageUrl([]);
    setIsDone(true);
    setIsNext(true);
    setIsRetake('Retake');

    let i = 0;
    let video = videoRef.current;
    let canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    isSnapEmpty.current.style.display = 'block';

    let myPromise = new Promise(myResolve=>{
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
      () => {
        isSnapEmpty.current.style.display = 'none';
        let interval = setInterval(() => {
          if (i<n){
            canvas.getContext('2d').drawImage(video, 0, 0);
            let photo = canvas.toDataURL("image/png");
            setImageUrl(prevImageUrl => {
              return [...prevImageUrl, photo];
            });
            i++;
          } else {
            clearInterval(interval);
            setIsDone(false);
            setIsNext(false);
          }
        },shotsInterval);
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
        <OverlayPreview
          isOverlayPreview={isOverlayPreview}
          imageUrl={imageUrl}
          closeOverlay={()=>{setIsOverlayPreview("none")}}
         />
      </div>
      <div className="container h-100"> 
        <div className="row h-100 justify-content-center align-items-center">  
          <div className="col-3 card">
            <div>
              <canvas ref={canvasRef} style={{display:"none"}}></canvas>
              <h1 style={{textAlign : 'center'}} ref={isSnapEmpty}>Your Snap is here</h1>
              <Shots
                imageUrl={imageUrl}
              />
            </div>
          </div>
          <div className="col">
              <video width={videoWidth.current} ref={videoRef} autoPlay/>
          </div>
          <div className="col-2">
            <button className="btn btn-danger btn-lg" onClick={() => takePhoto(numberShots.current)} disabled={isDone}>{isRetake}</button>
            <Link 
              to="/load" 
              state={{
                action: 'generate',
                data:{
                  txID : '0',
                  frameID : '0'
                }
              }}
            >
            <button className="btn btn-dark btn-lg"disabled={isNext}>Next</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Capture;