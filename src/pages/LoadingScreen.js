import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import PaymentService from '../services/PaymentService';
import PhotoService from '../services/PhotoService';
import ProgressBarAnimation from '../components/ProgressBar';
import { pricePoint,paymentType_conf, LOCATION_ID } from "../conf/conf";

const LoadingScreen = () => {
  // payment variables
  const snapFee = useRef(pricePoint);
  
  // 1 -> GoPay, 0 -> QRIS
  let paymentType = paymentType_conf;  

  // request limiter
  let requestCount = 1;

  // verify transaction helper variables
  let timeoutVerify = 1;
  let TIMEOUT_LIMIT_VERIFY = 60 / 5;

  //get frame helper variables
  let timeoutGetFrame = 1;
  let TIMEOUT_GET_FRAME = 600 / 30;

  // verify transaction helper variables
  let timeoutGenerateImage = 1;
  let TIMEOUT_GENERATE_IMAGE = 600 / 30;

  // email timeout helper variables
  let timeoutEmail = 1;
  let TIMEOUT_EMAIL_LIMIT = 20 / 5;


  const [isTimeoutUniversal, setTimeoutUniversal] = useState(false);
  const [isTimeoutVerify, setTimeoutVerify] = useState(false);
  const [isEmailFailed, setEmailFailed] = useState(false);
  const [isPrintFailed, setPrintFailed] = useState(false);
  const [isGenerateImg, setGenerateImg] = useState(false);
  const [isTimeoutGetFrame, setTimeoutGetFrame] = useState(false)
  const [isTimeoutGenerateImage, setTimeoutGenerateImage] = useState(false)
  const [completed, setCompleted] = useState(false);
  const [renderPleaseWait, setRenderPleaseWait] = useState(true);
  const [isLoginFailed, setLoginFailed] = React.useState(false);
  const [isBypassFailed, setBypassFailed] = React.useState(false);

  // state = action, tambahan
  const { state } = useLocation();

  const navigate = useNavigate();
  //Check concurrent render on Hooks
  const isMounted = useRef();

  const postData = (amount, paymentType, locationIndex) => {
    PaymentService.createTransaction(amount, paymentType, locationIndex)
    .then(
      (response) => {
        navigate('/payment', {
          state: response.data
        })
      }   
    ).catch(
      (err) => setTimeout(() => {
        navigate('/')
      }, 2000)
    )
  }

  const verifyTransaction = (ID) => {
    if (timeoutVerify < TIMEOUT_LIMIT_VERIFY) {
      PaymentService.getTransactionByID(ID)
      .then(
        (response) => {
          if (response.data.status === 'paid') {
            getFrame(response.data.trx_id);
          } else {
            return new Promise(function(resolve, reject) { 
              setTimeout(() => {
                  timeoutVerify++;
                  verifyTransaction(ID);
                  resolve();
              }, 5000)
            });
          }
        }
      ).catch(
        (err) => console.log(err)
      )
    } else {
      setRenderPleaseWait(false);
      setTimeoutVerify(true);
      setTimeout(() => {
        navigate('/')
      }, 7000)
    }
    
    return
  }

  const generateImage = (data) => {
    if (timeoutGenerateImage < TIMEOUT_GENERATE_IMAGE) {
      PhotoService.uploadImage(data.txID, data.imageBlob)
      .then(
        (response1) => {
          PhotoService.generateImage(data.txID, data.frameID)
          .then(
            (response2) => {
              setCompleted(true);
              response2["txID"] = data.txID;
              response2["frameID"] = data.frameID;
              response2["isNoCut"] = data.isNoCut;
              navigate('/final-preview', {
                state: response2
              })
            }
          )
          .catch(
            (err) => {
              new Promise(function(resolve, reject) { 
                setTimeout(() => {
                    setTimeoutUniversal(true)
                    timeoutGenerateImage++;
                    generateImage(data);
                    resolve();
                  }, 30000)
                }
              ) 
            }
          )
        }
      ).catch(
        (err) => {
          new Promise(function(resolve, reject) { 
            setTimeout(() => {
                setTimeoutUniversal(true)
                timeoutGenerateImage++;
                generateImage(data);
                resolve();
              }, 30000)
            }
          ) 
        }
      )
      }else{
        setRenderPleaseWait(false);
        setTimeoutGenerateImage(true);
        setGenerateImg(false);
        setTimeout(() => {
          navigate('/')
        }, 7000)
      }
  }

  const getFrame = (ID) => {
    if(timeoutGetFrame < TIMEOUT_GET_FRAME){
      PhotoService.getFrame()
      .then(
        (response) => {
          response["txID"] = ID;
          navigate('/print-style', {
            state: response
          })
        }
      ).catch(
        (err) => {
          new Promise(function(resolve, reject) { 
            setTimeout(() => {
                setTimeoutUniversal(true)
                timeoutGetFrame++;
                getFrame(ID);
                resolve();
              }, 30000)
            }
          ) 
        }
      )
    }else{
      setRenderPleaseWait(false);
      setTimeoutGetFrame(true);
      setTimeout(() => {
        navigate('/')
      }, 7000)
    }
    
  }

  const sendEmail = (data) => {
    let isEmailSuccess = false
    if (timeoutEmail < TIMEOUT_EMAIL_LIMIT) {
      PhotoService.sendEmail(data.txID, data.effect, data.email, data.recipient_name)
      .then(
        (response) => {     
          if (response.status_code === 200) {
            isEmailSuccess = true
            response["txID"] = data.txID;
            response["effect"] = data.effect;
            response["isEmailSuccess"] = isEmailSuccess;
            response["email"] = data.email;
            response["recipient_name"] = data.recipient_name;
            response["isNoCut"] =data.isNoCut;
            setTimeout(() => {
              navigate('/email', {
                state: response
              })
            }, 3000)
          } else {
            setRenderPleaseWait(false);
            isEmailSuccess = false
            response["txID"] = data.txID;
            response["effect"] = data.effect;
            response["isEmailSuccess"] = isEmailSuccess;
            response["email"] = data.email;
            response["recipient_name"] = data.recipient_name;
            response["isNoCut"] =data.isNoCut;
            setEmailFailed(true);
            setTimeout(() => {
              navigate('/email', {
                state: response
              })
            }, 3000)
          }
        }
      ).catch(
        (err) => {
          setRenderPleaseWait(false);
          let response = {};
          isEmailSuccess = false
          response["txID"] = data.txID;
          response["effect"] = data.effect;
          response["isEmailSuccess"] = isEmailSuccess;
          response["email"] = data.email;
          response["recipient_name"] = data.recipient_name;
          response["isNoCut"] =data.isNoCut;
          setEmailFailed(true);
          setTimeout(() => {
            navigate('/email', {
              state: response
            })
          }, 3000)
        }
      )
    }
  }

  const printImage = (data) => {
    let isPrintSuccess = false;
    PhotoService.printImage(data.txID, data.effect, data.isNoCut)
    .then(
      (response) => {
        isPrintSuccess = true
        response["txID"] = data.txID;
        response["effect"] = data.effect;
        response["isPrintSuccess"] = isPrintSuccess;
        response["isNoCut"] = data.isNoCut;
        navigate('/email', {
          state: response
        })
      }
    ).catch(
      (err) => {
        setRenderPleaseWait(false);
        let response = {};
        isPrintSuccess = false
        response["txID"] = data.txID;
        response["effect"] = data.effect;
        response["isPrintSuccess"] = isPrintSuccess;
        response["email"] = data.email;
        response["recipient_name"] = data.recipient_name;
        response["isNoCut"] = data.isNoCut;
        setPrintFailed(true);
        setTimeout(() => {
          navigate('/email', {
            state: response
          })
        }, 3000)
      }
    )
  }

  const login = (data) => {
    PaymentService.login(data.email,data.password)
    .then(
      (response) => {
        let selectedResponse = {};
        selectedResponse["id"] = response.data.id;
        selectedResponse["token"] = response.data.token;
        navigate('/bypass', {
          state: selectedResponse
        })
      }
    ).catch(
      (err) => {
        console.log(err);
        let selectedResponse = {};
        selectedResponse["errorMessage"] = "Incorrect Email or Password!";
        setRenderPleaseWait(false);
        setLoginFailed(true);
        setTimeout(() => {
          navigate('/login', {
            state: selectedResponse
          })
        }, 3000)
      }
    )
  };

  const getBypass = (token) => {
    PaymentService.getBypass(token)
    .then(
      (response) => {
        getFrame(response.data.trx_id);
      }
    ).catch(
      (err) => {
        console.log(err);
        let selectedResponse = {};
        selectedResponse["errorMessage"] = err.response.data.data.errors;
        setRenderPleaseWait(false);
        setBypassFailed(true);
        setTimeout(() => {
          navigate('/login',{
            state: selectedResponse
          })
        }, 5000)
      }
    )
  };

  useEffect(() => {
    if(isMounted.current){
      return
    }

    isMounted.current = true;
    while (requestCount) {
      switch(state.action) {
        case 'payment':
          snapFee.current = state.data.snapFee; //set new snapFee Value from home page
          postData(snapFee.current, paymentType, LOCATION_ID);
          requestCount--;
          break;
        case 'verify':
          verifyTransaction(state.trx_id);
          requestCount--;
          break;
        case 'generate':
          setGenerateImg(true);
          generateImage(state.data);
          requestCount--;
          break;
        case 'get-frame':
          getFrame(state.data.txID);
          requestCount--;
          break;
        case 'send-email':
          let data = {
            txID: state.txID,
            effect: state.effect,
            email: state.data.email,
            recipient_name: state.data.recipient_name,
            isNoCut: state.isNoCut
          };
          sendEmail(data);
          requestCount--;
          break;
        case 'print-photo':
          printImage(state);
          requestCount--;
          break;
        case 'login' :
          login(state.data);
          requestCount--;
          break;
        case 'get-bypass' :
          getBypass(state.data.token);
          requestCount--;
          break;
        default:
          navigate('/');
          break;
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {
        isGenerateImg 
          ?   
            <>
              {
                isTimeoutUniversal ? 
                <div 
                  style={{ 
                    height: "100vh",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <h4 className="fw-bold text-center">No response, Retrying...</h4>
                  <div className="text-center py-5">
                    <Spinner animation="border" />
                  </div>
                </div>
                 :
                <ProgressBarAnimation completed={completed} />
              }
            </>
          : 
            <div 
              style={{ 
                height: "100vh",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {
              isTimeoutUniversal && (<h4 className="fw-bold text-center">No response, Retrying...</h4>)
              }
              {renderPleaseWait && (<h4 className="fw-bold text-center">Please Wait</h4>)}
              {
                isTimeoutVerify && 
                  (<>
                    <h4 className="fw-bold text-center">Problem verifying your transaction</h4>
                    <Link 
                      to="/" 
                    >
                      <h3 className="fw-bold text-center">Back to Home</h3>
                    </Link>
                  </>)
              }
              {
                isTimeoutGetFrame && 
                  (<>
                    <h4 className="fw-bold text-center">Problem Getting Frame List</h4>
                    <Link 
                      to="/" 
                    >
                      <h3 className="fw-bold text-center">Back to Home</h3>
                    </Link>
                  </>)
              }
              {
                isTimeoutGenerateImage && 
                  (<>
                    <h4 className="fw-bold text-center">Problem Processing Images</h4>
                    <Link 
                      to="/" 
                    >
                      <h3 className="fw-bold text-center">Back to Home</h3>
                    </Link>
                  </>)
              }
              {
                isEmailFailed && (
                  <>
                    <h4 className="fw-bold text-center">Problem Sending Email</h4>
                    <h3 className="fw-bold text-center">Sending Back to Snap Form!</h3>
                  </>)
              }
              {
                isPrintFailed && (
                  <>
                    <h4 className="fw-bold text-center">Problem Printing Photo!</h4>
                    <h3 className="fw-bold text-center">Sending Back to Snap Form!</h3>
                  </>)
              }
        {isLoginFailed ? (
          <>
            <h4 className="fw-bold text-center">Problem Logging in!</h4>
            <h3 className="fw-bold text-center">Sending Back to Login Page!</h3>
          </>
        ) : (
          <>
          </>
        )}
        {isBypassFailed ? (
          <>
            <h4 className="fw-bold text-center">Problem Generating code!</h4>
            <h3 className="fw-bold text-center">Sending Back to Login Page!</h3>
          </>
        ) : (
          <>
          </>
        )}
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            </div>
      }
    </>
  );
};

export default LoadingScreen;
