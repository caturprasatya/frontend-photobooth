import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import Swal from "sweetalert2";

import { cameraScale } from "../conf/conf";

const Capture = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const TIMER = 5; //Countdown time
  const LIMIT_RETAKE = 2;
  const audio = new Audio("../../static/audio/camera-shutter-click-08.mp3");

  const [imageBlob, setImageBlob] = useState([]); //List of captured image
  const [countdown, setCountdown] = useState(TIMER); //Countdown
  const [isOverlayCountdown, setIsOverlayCountdown] = useState("none"); //check if overlay countdown active
  const [isNext, setIsNext] = useState(true); //Check if next button available
  const [isVideo, setIsVideo] = useState("block"); //Check if camera is on
  const [isImage, setIsImage] = useState("none"); //Capture mode or Image preview
  const [recentSnap, setRecentSnap] = useState(); //Recent capture
  const [limitRetake, setLimitRetake] = useState(LIMIT_RETAKE);

  const isRetake = useRef("none"); //Retake button active or not
  const numberSnap = useRef(4); //Capture number
  const isFlashOn = useRef(null); //Flash effect
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollRef = useRef(null);
  const videoDivWidth = useRef(null);
  const didUpdateRetake = useRef(false); // update when limit value to 0

  const [videoNativeWidth, setVideoNativeWidth] = useState(0);
  const [videoNativeHeight, setVideoNativeHeight] = useState(0);
  const [videoScaledWidth, setVideoScaledWidth] = useState(0);
  const [videoScaledHeight, setVideoScaledHeight] = useState(0);

  const imgRef = useRef(null);

  useEffect(() => {
    if (limitRetake === 0) {
      setLimitRetake(LIMIT_RETAKE);
      didUpdateRetake.current = true;
    }
  }, [limitRetake]);

  const handleLimitRetake = () =>
    Swal.fire({
      html: `<p  style="font-size: 1.2em; color: black"><strong>Whoops, You've used the retake option 3 times, your chance has run out!</strong></p>`,
      width: "18em",
      confirmButtonColor: "#515151",
      confirmButtonText:
        '   <strong style="padding: 10px 50px;">Next</strong>    ',
    }).then((result) => {
      if (result.isConfirmed) {
        didUpdateRetake.current = false; // reset, after update to default value
        takeSnap("take");
      }
    });

  //------------------------------------Custom snap size----------------------------------//

  // Auto configure crop size function
  const findCropPxl = (
    cropWidthRatio,
    cropHeightRatio,
    videoWidthPxl,
    videoHeightPxl
  ) => {
    let x = 0;
    let y = 0;
    if (cropWidthRatio / cropHeightRatio >= videoWidthPxl / videoHeightPxl) {
      x = videoWidthPxl;
      y = x / (cropWidthRatio / cropHeightRatio);
    } else {
      y = videoHeightPxl;
      x = y * (cropWidthRatio / cropHeightRatio);
    }
    return { width: x, height: y };
  };

  let objSize = {
    //Default snap size
    width: 1024,
    height: 576,
  };

  let objSizeNative = {
    //Scaled snap size
    width: parseInt(objSize.width / cameraScale),
    height: parseInt(objSize.height / cameraScale),
  };

  //--------------------------------------------------------------------------------------------------//

  if (state) {
    numberSnap.current = state.numberSnap;

    objSize = findCropPxl(
      state.width,
      state.height,
      videoScaledWidth,
      videoScaledHeight
    );
    objSizeNative.width = parseInt(objSize.width / cameraScale);
    objSizeNative.height = parseInt(objSize.height / cameraScale);
  }

  const videoStyle = {
    MozTransform: `scale(-1, 1)`,
    WebkitTransform: `scale(-1, 1)`,
    OTransform: `scale(-1, 1)`,
    transform: `scale(-1, 1)`,
    width: videoScaledWidth,
    height: videoScaledHeight,

    //adjust camera position to crop template
    marginLeft: -1 * parseInt((videoScaledWidth - objSize.width) / 2),
    marginTop: -1 * parseInt((videoScaledHeight - objSize.height) / 2),
  };

  //styles for captured image tag
  const imgStyle = {
    display: isImage,
    MozTransform: `scale(${cameraScale}, ${cameraScale})`,
    WebkitTransform: `scale(${cameraScale}, ${cameraScale})`,
    OTransform: `scale(${cameraScale}, ${cameraScale})`,
    transform: `scale(${cameraScale}, ${cameraScale})`,
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", function (e) {
      setVideoNativeWidth(videoRef.current.videoWidth);
      setVideoNativeHeight(videoRef.current.videoHeight);
      setVideoScaledWidth(cameraScale * videoRef.current.videoWidth);
      setVideoScaledHeight(cameraScale * videoRef.current.videoHeight);
    });
  }, []);

  //Flash effect
  const flashOn = () => {
    isFlashOn.current.classList.add("on");
    audio.play();
    setTimeout(function () {
      isFlashOn.current.classList.remove("on");
    }, 10 * 2 + 45);
  };

  //Camera initialization
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        setIsNext(false);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const takeSnap = (mode, actionFrom = "function") => {
    if (mode === "take" && actionFrom === "layout")
      setLimitRetake(LIMIT_RETAKE); // reset limit, if user press button next

    if (mode === "retake") {
      if (didUpdateRetake.current) return handleLimitRetake();

      setLimitRetake((previousLimit) => previousLimit - 1); //will reduce variable standards of LIMIT_RETAKE

      if (imageBlob.length === 1) {
        setImageBlob([]);
      } else {
        let tmp = imageBlob;
        tmp.pop();
        setImageBlob(tmp);
      }
    }

    if (imageBlob.length < numberSnap.current) {
      setIsVideo("block");
      setIsImage("none");
      setIsNext(true);

      let canvas = canvasRef.current;
      canvas.width = objSizeNative.width;
      canvas.height = objSizeNative.height;

      isRetake.current.style.display = "none";

      new Promise((myResolve) => {
        let number = countdown;
        setIsOverlayCountdown("block");
        isRetake.current.style.display = "none";

        let starting = setInterval(() => {
          if (number > 1) {
            number--;
            setCountdown(number);
          } else {
            clearInterval(starting);
            setIsOverlayCountdown("none");
            setCountdown(TIMER);
            myResolve("Begin Shot");
          }
        }, 1000);
      })
        .then(() => {
          var ctx = canvas.getContext("2d");
          ctx.scale(-1, 1);
          ctx.drawImage(
            videoRef.current, //drawing source
            parseInt((videoNativeWidth - objSizeNative.width) / 2),
            parseInt((videoNativeHeight - objSizeNative.height) / 2),
            objSizeNative.width,
            objSizeNative.height, //source coordinates and sizes
            0,
            0,
            objSizeNative.width * -1,
            objSizeNative.height
          ); //destination coordinates and sizes
          canvas.toBlob((blob) => {
            setRecentSnap(blob);
            setImageBlob((prevImageBlob) => {
              return [...prevImageBlob, blob];
            });
          }, "image/png");

          flashOn();

          isRetake.current.style.display = "block";
          setIsNext(false);
          setIsVideo("none");
          setIsImage("block");
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/load", {
        state: {
          action: "generate",
          data: {
            txID: state.txID,
            frameID: state.frameID,
            isNoCut: state.isNoCut,
            imageBlob: imageBlob,
          },
        },
      });
    }
  };

  //render scrollbar
  const renderThumb = () => {
    const thumbStyle = {
      backgroundColor: "#C82826",
    };
    return <div style={{ ...thumbStyle }} />;
  };

  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", overflowY: "hidden", overflowX: "hidden" }}
    >
      <div id="flash" ref={isFlashOn} />
      <div className="row">
        <div
          className="col-3 bg-dark text-center px-0"
          style={{ height: "100vh" }}
        >
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <Scrollbars
            renderThumbHorizontal={renderThumb}
            renderThumbVertical={renderThumb}
          >
            <div ref={scrollRef} />
            {imageBlob
              .map((shots, index) => {
                return (
                  <img
                    key={index}
                    src={URL.createObjectURL(shots)}
                    className={`col-10 mb-4 mt-4 ${
                      imageBlob.length === index + 1 ? "greenBorder" : ""
                    }`}
                    alt={index}
                  ></img>
                );
              })
              .reverse()}
          </Scrollbars>
        </div>
        <div
          className="col fill"
          style={{ backgroundColor: "#000000", padding: "0px" }}
          ref={videoDivWidth}
        >
          <div className="styleOverlay" style={{ display: isOverlayCountdown }}>
            <div className="overlayText">{countdown}</div>
          </div>
          <div>
            <div
              style={{
                width: objSize.width,
                height: objSize.height,
                overflow: "hidden",
                display: isVideo,
              }}
            >
              <video ref={videoRef} style={videoStyle} autoPlay />
            </div>
            <img
              ref={imgRef}
              src={imageBlob.length > 0 ? URL.createObjectURL(recentSnap) : ""}
              style={imgStyle}
              className="img-thumbnail"
              alt="recent snap"
            />
            <div className="nextButton">
              <button
                ref={isRetake}
                type="button"
                className="btn btn-light btn-lg"
                onClick={() => takeSnap("retake", "layout")}
                style={{ display: "none" }}
              >
                <h2>
                  <b>Retake</b>
                </h2>
              </button>
              <button
                type="button"
                className="btn btn-dark btn-lg"
                disabled={isNext}
                onClick={() => takeSnap("take", "layout")}
              >
                <h2>
                  <b>{imageBlob.length === 0 ? "Start" : "Next >>"}</b>
                </h2>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capture;
