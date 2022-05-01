import React, { useEffect, useRef, useState } from "react";
import Shots from "../components/Shots"

const Capture = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const shotsArray = useRef([]);

  const [videoheight, setVideoheight] = useState(576);
  const [videowidth, setVideowidth] = useState(1024);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video : true})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const takePhoto = (n) => {
    let i = 0;
    let video = videoRef.current;
    let canvas = canvasRef.current;
    let shots = shotsArray.current;

    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    let interval = setInterval(() => {
      if (i<n){
        canvas.getContext('2d').drawImage(video, 0, 0);
        let photo = canvas.toDataURL("image/png");
        shots.push({key : i,url : photo});
        i++;
        console.log(shots);
      } else {
        clearInterval(interval);
      }
    },1000);
  };

  const createShots = (shot) => {
    return(
      <Shots 
        key = {shot.key}
        url = {shot.url}
      />
    )
  }


  return (
    <div>
      <h1>Click Capture Button to Begin Countdown</h1>
      <div>
        <video width={videowidth} height={videoheight} ref={videoRef}/>
	    </div>
	    <div>
		    <button onClick={() => takePhoto(4)}>Capture</button>
		    <button>Save</button>
	    </div>
	    <div>
        <canvas ref={canvasRef} style={{display:"none"}}></canvas>

      </div>
    </div>
  );
}

export default Capture;