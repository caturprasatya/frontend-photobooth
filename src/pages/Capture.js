import React, { useEffect, useRef, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import Shots from "../components/Shots"
import Background from "../assets/images/bg-home.png";
import Header from '../components/Header';
import Footer from '../components/Footer';
import OverlayCountdown from "../components/OverlayCountdown";

const Capture = (props) => {
  const { state } = useLocation();

  const TIMER = 5; //In seconds
  const SHOTSINTERVAL = 4; //In seconds
  let i = 0;
  var audio = new Audio('../../static/audio/camera-shutter-click-08.mp3');

  const numberShots = useRef(3);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isSnapEmpty = useRef(null);
  const isCameraOn = useRef(null);
  const isFlashOn = useRef(null);

  const [imageBlob, setImageBlob] = useState([]);
  const [isDone, setIsDone] = useState(true);  //Check if Capture's done
  const [isNext, setIsNext] = useState(true);   //Check if next button available
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay countdown active
  const [countdown, setCountdown] = useState(TIMER+1);  //Countdown timer
  const [isRetake, setIsRetake] = useState('Capture');
  const [snapCountdown, setSnapCountdown] = useState("Hello!");

  if(state){
    numberShots.current = state.numberSnap;
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const flashOn = () => {
    isFlashOn.current.classList.add('on');
    audio.play();
    setTimeout(function() {
      isFlashOn.current.classList.remove('on');
    }, 10*2+45);
  }
  
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video : true})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        setIsDone(false);
        setTimeout(()=>{
          isCameraOn.current.classList.remove('invisible');
        },100);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takePhoto = (n) => {
    setImageBlob([]);
    setIsDone(true);
    setIsNext(true);
    setIsRetake('Retake');
    isSnapEmpty.current.style.display = 'block';

    let video = videoRef.current;
    let canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    new Promise(myResolve=>{
      let number = countdown;
      let starting = setInterval(()=>{
        if(number>1){
          setIsOverlayCountdown('block');
          number--;
          setCountdown(number);
        }else{
          clearInterval(starting);
          setIsOverlayCountdown('none');
          setCountdown(TIMER+1);
          myResolve("Begin Shot");
        }
        },1000)
      }).then(
      () => {

        let delay=SHOTSINTERVAL;
        setSnapCountdown(SHOTSINTERVAL);
        i = 0;

        let interval = setInterval(() => {
          if(delay===1){
              flashOn();
              canvas.getContext('2d').drawImage(video, 0, 0);
              canvas.toBlob(blob=>{
                setImageBlob(prevImageBlob => {
                  return [...prevImageBlob, blob]
                })
              },'image/png');
              i++;

              
              if(i===3){
                isSnapEmpty.current.style.display = 'none';
              }
              
              if(i<n){
                delay=SHOTSINTERVAL;
                setSnapCountdown(delay);
              }else{
                setSnapCountdown("Great!")
                setIsDone(false);
                setIsNext(false);
                clearInterval(interval);
              }
              
          }else{
            delay--;
            setSnapCountdown(delay);
          }
        },1000);
      }
    ).catch(
      (err) => console.log(err)
    )

  };
  
  return (
    <div className='container' style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <div id="flash" ref={isFlashOn}/> 
      <Header/>
      <div>
        <OverlayCountdown 
          isOverlayCountdown={isOverlayCountdown}
          number={countdown}
         />
      </div>
      <div> 
        <div className="row justify-content-center align-items-center invisible" ref={isCameraOn}>  
          <div className="col-3 card">
            <div>
              <canvas ref={canvasRef} style={{display:"none"}}></canvas>
              <h1 className="display-6" style={{textAlign : 'center'}} ref={isSnapEmpty}>Your Snap is here</h1>
              <Shots
                imageBlob={imageBlob}
              />
            </div>
          </div>
          <div className="col text-center">
              <video width="85%" ref={videoRef} autoPlay/>
          </div>
          <div className="col-2 text-center">
            <div className="row">  
              <button style={{display:'block'}} className="btn btn-danger btn-lg mb-3" onClick={() => takePhoto(numberShots.current)} disabled={isDone}>{isRetake}</button>
                <p className="card mb-3 display-4 font-weight-bold">{snapCountdown}</p> 
              <Link
                style={{
                  pointerEvents: isNext ? 'none' : '',
                  display:'block',
                }}
                to="/load"
                state={{
                  action: 'generate',
                  data:{
                    txID : state.txID,
                    frameID : state.frameID,
                    imageBlob : imageBlob
                  }
                }}
              >
                <button className="btn btn-dark btn-lg" disabled={isNext}>{"Next"}</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Capture;