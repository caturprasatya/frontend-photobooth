import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import Background from "../assets/images/bg-payment.png";
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentService from '../services/PaymentService';
import PhotoService from '../services/PhotoService';

const LoadingScreen = () => {
  let requestCount = 1;
  const { state } = useLocation();
  // state = action, tambahan
  const navigate = useNavigate();

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
    PaymentService.getTransactionByID(ID)
    .then(
      (response) => {
        if (response.data.status === 'paid') {
          console.log(response.data);
          getFrame(response.data.ID);
        } else {
          console.log("else clause");
          return new Promise(function(resolve, reject) { 
            setTimeout(() => {
                verifyTransaction(ID)
                resolve();
            }, 10000)
        });
        }
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const generateImage = (data) => {
    PhotoService.generateImage(data.txID, data.frameID)
    .then(
      (response) => {
        console.log(response);
        navigate('/final-preview', {
          state: response
        })
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
    PhotoService.sendEmail(data.txID, data.effect, data.email, data.recipientName)
    .then(
      (response) => {
        isEmailSuccess = true
        response["txID"] = data.txID;
        response["effect"] = data.effect;
        response["action"] = isEmailSuccess;
        response["email"] = data.email;
        response["recipientName"] = data.recipientName;
        navigate('/email', {
          state: response
        })
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const printImage = (data) => {
    let isPrintSuccess = false;
    PhotoService.printImage(data.txID, data.effect)
    .then(
      (response) => {
        console.log("Print success!")
        isPrintSuccess = true
        response["txID"] = data.txID;
        response["frameID"] = data.effect;
        response["action"] = isPrintSuccess;
        navigate('/email', {
          state: response
        })
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  useEffect(() => {
    while (requestCount) {
      let temp = state;
      switch(state.action) {
        case 'payment': 
          postData(30000, 1);
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
            recipientName: state.data.full_name
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
      <Header/>
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
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoadingScreen;