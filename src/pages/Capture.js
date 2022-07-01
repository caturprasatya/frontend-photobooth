import React, { useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { frameRatio } from "../assets/frameRatio/frameRatio";


const Capture = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const TIMER = 5;  //Countdown time
  const audio = new Audio('../../static/audio/camera-shutter-click-08.mp3');

  const [imageBlob, setImageBlob] = useState([]); //List of captured image
  const [countdown,setCountdown] = useState(TIMER); //Countdown
  const [isOverlayCountdown, setIsOverlayCountdown] = useState('none');  //check if overlay countdown active
  const [isNext, setIsNext] = useState(true);   //Check if next button available
  const [isVideo,setIsVideo] = useState('block'); //Check if camera is on
  const [isImage, setIsImage] = useState('none'); //Capture mode or Image preview
  const [recentSnap, setRecentSnap] = useState(); //Recent capture
  
  const isRetake = useRef('none');  //Retake button active or not
  const numberSnap = useRef(4); //Capture number
  const isFlashOn = useRef(null); //Flash effect
  const videoRef = useRef(null);  
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);

  const[videoNativeWidth,setVideoNativeWidth] = useState(0);
  const[videoNativeHeight,setVideoNativeHeight] = useState(0);

  //------------------------------------Custom snap size----------------------------------//

  const findCropPxl = (cropWidthRatio,cropHeightRatio,videoWidthPxl,videoHeightPxl) => {
    let x = 0;
    let y = 0;
    if((cropWidthRatio/cropHeightRatio)>=(videoWidthPxl/videoHeightPxl)){
      x = videoWidthPxl;
      y = x / (cropWidthRatio/cropHeightRatio);
    } else{
      y = videoHeightPxl;
      x = y * (cropWidthRatio/cropHeightRatio);
    }

    return {width:x,height:y};
  }

  const sizePict = [
    {
      // eight frame
      width: 992,
      height: 781,
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
      // width: 240,
      // height: 240
    }
  ]

  const listOfEllipseFrame = ["8", "9", "10"];   //List of EllipseFrame

  let objSize = {    //Default snap size
    // width: 992,
    // height: 781,
    width: 320,
    height: 240
  };

  //--------------------------------------------------------------------------------------------------//


  if(state){
    numberSnap.current = state.numberSnap;
    // console.log(state.frameID);
    // if (listOfEllipseFrame.includes(state.frameID)) {
    //   objSize.height = sizePict[1].height;
    //   objSize.width = sizePict[1].width;
    // } else {
    //   if (numberSnap.current === 4) {
    //     objSize.height = sizePict[0].height;
    //     objSize.width = sizePict[0].width;
    //   } else {
    //     objSize.height = sizePict[2].height;
    //     objSize.width = sizePict[2].width;
    //   }
    // }

    if (listOfEllipseFrame.includes(state.frameID)){
      objSize = findCropPxl(frameRatio.ellipseFrame.width,frameRatio.ellipseFrame.height,videoNativeWidth,videoNativeHeight);
    } else {
      if(numberSnap.current === 4){
        objSize = findCropPxl(frameRatio.eightFrame.width,frameRatio.eightFrame.height,videoNativeWidth,videoNativeHeight);
      } else{
        objSize = findCropPxl(frameRatio.sixFrame.width,frameRatio.sixFrame.height,videoNativeWidth,videoNativeHeight);
      }
    }
  }

  const videoStyle = {
    MozTransform: "scale(-1, 1)",
    WebkitTransform: "scale(-1, 1)",
    OTransform: "scale(-1, 1)",
    transform: "scale(-1, 1)",
    filter: "FlipH",
    marginLeft: -1*parseInt((videoNativeWidth-objSize.width)/2),
    marginTop:  -1*parseInt((videoNativeHeight-objSize.height)/2),
    // marginLeft: "-160px",
    // marginTop:  "-120px",
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(()=>{
    videoRef.current.addEventListener('loadedmetadata', function(e){
      // // Print the native height of the video
      // console.log(videoRef.current.videoHeight);
  
      // // Print the native width of the video
      // console.log(videoRef.current.videoWidth);

      setVideoNativeWidth(videoRef.current.videoWidth);
      setVideoNativeHeight(videoRef.current.videoHeight);
    });
  },[])

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
        setIsNext(false);
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takeSnap = (mode) => {
    console.log(mode);
    console.log(imageBlob.length);
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
      canvas.width = objSize.width;
      canvas.height = objSize.height;
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
          ctx.scale(-1, 1); 
          ctx.drawImage(video,                                                                                                                    //drawing source
                        parseInt((video.videoWidth-objSize.width)/2),parseInt((video.videoHeight-objSize.height)/2),objSize.width,objSize.height,  //source coordinates and sizes
                        0,0,objSize.width*-1,objSize.height);                                                                                     //destination coordinates and sizes
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
        <div className="col fill" style={{backgroundColor:'#000000'}}>
          <div className="styleOverlay" style={{display:isOverlayCountdown}}>
            <div className="overlayText">{countdown}</div>
          </div> 
          <div>
            <div style={{
                  width: objSize.width,
                  height: objSize.height,
                  overflow:"hidden",
                  display:isVideo
                  }}
            >
              <video ref={videoRef}  style={videoStyle} autoPlay/>
            </div>
            <img src={imageBlob.length>0 ? URL.createObjectURL(recentSnap):""} style={{width:"100%", display:isImage}} className="img-thumbnail" alt="recent snap"/>
            <div className="nextButton">
              <button ref={isRetake} type="button" className="btn btn-light btn-lg" onClick={()=>takeSnap('retake')} style={{display:'none'}}>
                <span>Retake</span>
              </button>
              <button type="button" className="btn btn-dark btn-lg" disabled={isNext} onClick={()=>takeSnap('take')}>
                <span>{imageBlob.length===0 ? "Start":"Next >>"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Capture;