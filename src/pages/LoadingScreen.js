import React, { useRef,useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import Background from "../assets/images/bg-payment.png";
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentService from '../services/PaymentService';
import PhotoService from '../services/PhotoService';

const LoadingScreen = () => {
  // payment variables
  let snapFee = 1;
  // 1 -> GoPay, 0 -> QRIS
  let paymentType = 1;  

  // request limiter
  let requestCount = 1;

  // verify transaction helper variables
  let timeoutVerify = 1;
  let TIMEOUT_LIMIT = 60 / 5;

  // email timeout helper variables
  let timeoutEmail = 1;
  let TIMEOUT_EMAIL_LIMIT = 20 / 5;

  const [isTimeout, setTimeoutVerify] = React.useState(false);
  const [isEmailFailed, setEmailFailed] = React.useState(false);
  const [isPrintFailed, setPrintFailed] = React.useState(false);

  // state = action, tambahan
  const { state } = useLocation();

  const navigate = useNavigate();
  //Check concurrent render on Hooks
  const isMounted = useRef();

  const postData = (amount, paymentType) => {
    PaymentService.createTransaction(amount, paymentType)
    .then(
      (response) => {
        navigate('/payment', {
          state: response.data
        })
      }   
    ).catch(
      (err) => console.log(err)
    )
  }

  const verifyTransaction = (ID) => {
    if (timeoutVerify < TIMEOUT_LIMIT) {
      PaymentService.getTransactionByID(ID)
      .then(
        (response) => {
          console.log(response.data);
          if (response.data.status === 'paid') {
            getFrame(response.data.id);
          } else {
            console.log("else clause");
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
      setTimeoutVerify(true);
      setTimeout(() => {
        navigate('/')
      }, 7000)
    }
    
    return
  }

  const generateImage = (data) => {
    console.log(data);
    PhotoService.uploadImage(data.txID, data.imageBlob)
    .then(
      (response1) => {
        console.log(response1);
        if(response1.status_code === 200){
          PhotoService.generateImage(data.txID, data.frameID)
          .then(
            (response2) => {
              response2["txID"] = data.txID;
              response2["frameID"] = data.frameID;
              // if (response2.status_code != 200) {
              //   setGenerateImageFailed(true);
              // }
              // setTimeout(() => {
              //   navigate('/email', {
              //     state: response
              //   })
              // }, 3000)
              navigate('/final-preview', {
                state: response2
              })
            }
          )
        } else{
          console.log("else clause");
        }
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const getFrame = (ID) => {
    PhotoService.getFrame()
    .then(
      (response) => {
        response["txID"] = ID;
        navigate('/frame', {
          state: response
        })
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const sendEmail = (data) => {
    let isEmailSuccess = false
    if (timeoutEmail < TIMEOUT_EMAIL_LIMIT) {
      PhotoService.sendEmail(data.txID, data.effect, data.email, data.recipient_name)
      .then(
        (response) => {     
          if (response.status_code == 200) {
            isEmailSuccess = true
            response["txID"] = data.txID;
            response["effect"] = data.effect;
            response["isEmailSuccess"] = isEmailSuccess;
            response["email"] = data.email;
            response["recipient_name"] = data.recipient_name;
            setTimeout(() => {
              navigate('/email', {
                state: response
              })
            }, 3000)
          } else {
            isEmailSuccess = false
            response["txID"] = data.txID;
            response["effect"] = data.effect;
            response["isEmailSuccess"] = isEmailSuccess;
            response["email"] = data.email;
            response["recipient_name"] = data.recipient_name;
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
          let response = {};
          isEmailSuccess = false
          response["txID"] = data.txID;
          response["effect"] = data.effect;
          response["isEmailSuccess"] = isEmailSuccess;
          response["email"] = data.email;
          response["recipient_name"] = data.recipient_name;
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
    PhotoService.printImage(data.txID, data.effect)
    .then(
      (response) => {
        console.log("Print success!")
        isPrintSuccess = true
        response["txID"] = data.txID;
        response["effect"] = data.effect;
        response["isPrintSuccess"] = isPrintSuccess;
        navigate('/email', {
          state: response
        })
      }
    ).catch(
      (err) => {
        let response = {};
        isPrintSuccess = false
        response["txID"] = data.txID;
        response["effect"] = data.effect;
        response["isEmailSuccess"] = isEmailSuccess;
        response["email"] = data.email;
        response["recipient_name"] = data.recipient_name;
        setPrintFailed(true);
        setTimeout(() => {
          navigate('/email', {
            state: response
          })
        }, 3000)
      }
    )
  }

  useEffect(() => {
    if(isMounted.current){
      return
    }

    isMounted.current = true;
    while (requestCount) {
      // let temp = state;
      switch(state.action) {
        case 'payment': 
          postData(snapFee, paymentType);
          requestCount--;
          break;
        case 'verify':
          verifyTransaction(state.id);
          requestCount--;
          break;
        case 'generate':
          generateImage(state.data);
          requestCount--;
          break;
        case 'get-frame':
          getFrame();
          requestCount--;
          break;
        case 'send-email':
          let data = {
            txID: state.txID,
            effect: state.effect,
            email: state.data.email,
            recipient_name: state.data.recipient_name
          };
          sendEmail(data);
          requestCount--;
          // temp.isEmailSuccess = true
          // navigate('/email', {
          //   state: temp
          // })
          break;
        case 'print-photo':
          printImage(state);
          requestCount--;
          // temp.isPrintSuccess = true
          // navigate('/email', {
          //   state: temp
          // })
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, []);

  return (
    <>
      <div style={{ 
        height: "100vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        {isTimeout ? (
          <>
            <h4 className="fw-bold text-center">Problem verifying your transaction</h4>
            <Link 
              to="/" 
            >
              <h3 className="fw-bold text-center">Back to Home</h3>
            </Link>
          </>
        ) : (
          <>
          </>
        )}
        {isEmailFailed ? (
          <>
            <h4 className="fw-bold text-center">Problem Sending Email</h4>
            <h3 className="fw-bold text-center">Sending Back to Snap Form!</h3>
          </>
        ) : (
          <>
            <h4 className="fw-bold text-center">Please Wait</h4>
          </>
        )}
        {isPrintFailed ? (
          <>
            <h4 className="fw-bold text-center">Problem Printing Photo!</h4>
            <h3 className="fw-bold text-center">Sending Back to Snap Form!</h3>
          </>
        ) : (
          <>
            <h4 className="fw-bold text-center">Please Wait</h4>
          </>
        )}
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;