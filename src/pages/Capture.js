import React, { useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';


const Capture = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const TIMER = 5;
  const audio = new Audio('../../static/audio/camera-shutter-click-08.mp3');

  const [imageBlob, setImageBlob] = useState([]);
  const [countdown,setCountdown] = useState(TIMER);
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay countdown active
  const [isNext, setIsNext] = useState(true);   //Check if next button available
  const [isVideo,setIsVideo] = useState('block');
  const [isImage, setIsImage] = useState('none');
  const [recentSnap, setRecentSnap] = useState();
  
  const isRetake = useRef('none');
  const numberSnap = useRef(4);
  const isFlashOn = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  
  const sizePict = [
    {
      // eight frame
      width: 992,
      height: 781
    },
    {
      // eight frame ellipse
      width: 1022,
      height: 716
    },
    {
      // six frame
      width: 993,
      height: 945
    }
  ]

  const listOfEllipseFrame = [8, 9, 10];

  let objSize = {
    height: 992,
    width: 781
  };

  if(state){
    numberSnap.current = state.numberSnap;
    if (listOfEllipseFrame.includes(state.frameID)) {
      objSize.height = sizePict[1].height;
      objSize.width = sizePict[1].width;
    } else {
      if (numberSnap.current == 4) {
        objSize.height = sizePict[0].height;
        objSize.width = sizePict[0].width;
      } else {
        objSize.height = sizePict[2].height;
        objSize.width = sizePict[2].width;
      }
    }
  }

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  });

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
        video.style.cssText = "-moz-transform: scale(-1, 1); \
        -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
        transform: scale(-1, 1); filter: FlipH;";
        setIsNext(false);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takeSnap = (mode) => {
    if(mode==='retake'){
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
          var ctx = canvas.getContext('2d');
          ctx.scale(-1,1);
          ctx.drawImage(video,-video.videoWidth,0);
          canvas.toBlob(blob=>{
            setRecentSnap(blob);
            setImageBlob(prevImageBlob => {
              return [...prevImageBlob, blob]
            })
          },'image/png');
          flashOn();
          
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
    <div className="container-fluid" style={{height:'100vh',overflowY:'hidden',overflowX:'hidden'}}>
      <div id="flash" ref={isFlashOn}/> 
      <div className="row">
        <div className="col-3 bg-dark text-center px-0" style={{height:'100vh'}}>
          <canvas ref={canvasRef} style={{display:"none"}}/>
          <Scrollbars renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb} >
              <div ref={scrollRef}/>
              {imageBlob.map((shots,index) => {
              return (
                <img key={index} src={URL.createObjectURL(shots)} className={`col-10 mb-4 mt-4 ${imageBlob.length===index+1 ? "greenBorder" : ""}`}
                  alt={index}></img>
                );
              }).reverse()}
          </Scrollbars>
        </div>
        <div className="col text-center fill" style={{backgroundColor:'#000000'}}>
          <div className="styleOverlay" style={{display:isOverlayCountdown}}>
            <div className="overlayText">{countdown}</div>
          </div> 
          <div>
            <video width={objSize.width} height={objSize.height} ref={videoRef} className="img-thumbnail" style={{display:isVideo}} autoPlay/>
            <img src={imageBlob.length>0 ? URL.createObjectURL(recentSnap):""} style={{width:objSize.width, height:objSize.height, display:isImage}} className="img-thumbnail" alt="recent snap"/>
            <div className="nextButton">
              <button ref={isRetake} type="button" className="btn btn-light btn-lg mb-4" onClick={()=>takeSnap('retake')} style={{display:'none'}}>
                <h2>Retake</h2>
              </button>
              <button type="button" className="btn btn-dark btn-lg mt-4" disabled={isNext} onClick={()=>takeSnap('take')}>
                {<h2>Next >></h2>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;