import React, { useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';


const Capture = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const TIMER = 3;
  var audio = new Audio('../../static/audio/camera-shutter-click-08.mp3');

  const [imageBlob, setImageBlob] = useState([]);
  const [countdown,setCountdown] = useState(TIMER);
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay countdown active
  const [isNext, setIsNext] = useState(false);   //Check if next button available
  const [isVideo,setIsVideo] = useState('block');
  const [isImage, setIsImage] = useState('none');
  const [recentSnap, setRecentSnap] = useState();
  const [snapCounter,setSnapCounter] = useState(0);
  
  const isRetake = useRef('none');
  const numberSnap = useRef(8);
  const isFlashOn = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  if(state){
    numberSnap.current = state.numberSnap;
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
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takeSnap = (mode) => {
    if(mode==='retake'){
      let m = snapCounter;
      m--;
      setSnapCounter(m);
      if(imageBlob.length===1){
        setImageBlob([]);
      }else{
        let tmp = imageBlob;
        tmp.pop();
        setImageBlob(tmp);
      }
    }

    if(imageBlob.length<numberSnap.current){
      setIsVideo('block');
      setIsImage('none');
      setIsNext(true);

      let video = videoRef.current;
      let canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      isRetake.current.style.display = 'none';

      new Promise(myResolve=>{
        let number = countdown;
        setIsOverlayCountdown('block');
        isRetake.current.style.display = 'none';
        let starting = setInterval(()=>{
          if(number>1){
            number--;
            setCountdown(number);
          }else{
            clearInterval(starting);
            setIsOverlayCountdown('none');
            setCountdown(TIMER);
            myResolve("Begin Shot");
          }
          },1000)
        }).then(
        () => {
          flashOn();
          canvas.getContext('2d').drawImage(video, 0, 0);
          canvas.toBlob(blob=>{
            setRecentSnap(blob);
            setImageBlob(prevImageBlob => {
              return [...prevImageBlob, blob]
            })
          },'image/png');
          
          console.log(snapCounter);
          let n = snapCounter;
          n++;
          // snapCounter.current++;
          setSnapCounter(n);
          isRetake.current.style.display = 'block';
          setIsNext(false);
          setIsVideo('none');
          setIsImage('block');
        }
        ).catch(
          (err) => console.log(err)
        )
      }else{
        navigate("/load", { state: { 
          action: 'generate',
          data:{
            txID : state.txID,
            frameID : state.frameID,
            imageBlob : imageBlob
          }
        } 
      });
    }
  }

  const renderThumb = () => {
    const thumbStyle = {
        backgroundColor: "#C82826"
    };
    return (
        <div
            style={{ ...thumbStyle }}
        />
    );
  }
  
  return (
    <div className="container-fluid" style={{height:'100vh',overflowY: 'hidden', overflowX:'hidden'}}>
      <div id="flash" ref={isFlashOn}/> 
      <div className="row">
        <div className="col-3 bg-dark text-center"  style={{backgroundColor:'#D9D9D9',height:'100vh'}}>
          <canvas ref={canvasRef} style={{display:"none"}}/>
          <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb} >
            {imageBlob.map((shots,index) => {
            return (
              <img key={index} src={URL.createObjectURL(shots)} className={`col-10 mb-4 mt-4 ${snapCounter===index ? "greenBorder" : ""}`}
                alt={index}></img>
              );
            })}
          </Scrollbars>
        </div>
        <div className="col text-center fill" style={{backgroundColor:'#000000'}}>
          <div className="styleOverlay" style={{display:isOverlayCountdown}}>
            <div className="overlayText">{countdown}</div>
          </div> 
          <div>
            <video width="100%" ref={videoRef} style={{display:isVideo}} autoPlay/>
            <img src={imageBlob.length>0?URL.createObjectURL(recentSnap):""} style={{width:'100%', display:isImage}} className="" alt="recent snap"/>
            <button ref={isRetake} type="button" className="btn btn-light btn-lg retakeButton" onClick={()=>takeSnap('retake')} style={{display:'none'}}>
              Retake
            </button>
            <button type="button" className="btn btn-dark btn-lg finishButton" disabled={isNext} onClick={()=>takeSnap('take')}>
              {"Next >>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;