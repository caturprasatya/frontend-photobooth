import React, { useEffect, useRef, useState } from "react";
import Shots from "../components/Shots"
import Background from "../assets/images/bg-payment.png";

const Capture = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [shotsArray, setShotsArray] = useState([]);

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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight

    let interval = setInterval(() => {
      if (i<n){
        canvas.getContext('2d').drawImage(video, 0, 0);
        let photo = canvas.toDataURL("image/png");
        setShotsArray(prevShotsArray => {
          return [...prevShotsArray, photo];
        });
        i++;
      } else {
        clearInterval(interval);
      }
    },1000);
  };


  return (
    <div style={{
      backgroundImage: `url(${Background}`,
    }}
    >
      <h1>Click Capture Button to Begin Countdown</h1>
      <div>
        <video width={videowidth} height={videoheight} ref={videoRef}/>
	    </div>
	    <div>
		    <button onClick={() => takePhoto(4)}>Capture</button>
		    <button>Next</button>
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
    </div>
  );
}

export default Capture;