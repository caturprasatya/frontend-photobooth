import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import Background from "../assets/images/bg-payment.png";
import Footer from '../components/Footer';
import Header from '../components/Header';
import PaymentService from '../services/PaymentService';

const LoadingScreen = () => {
  let requestCount = 1;
  const { state } = useLocation();
  // state = action, tambahan
  const [spinnerLoading, setSpinnerLoading] = useState(true);
  const [data, setData] = React.useState();
  const navigate = useNavigate();

  const postData = (amount, paymentType) => {
    PaymentService.createTransaction(amount, paymentType)
    .then(
      (response) => {
        // setData(response.data);
        navigate('/payment', {
          state: response.data
        })
      }   
    )
  }

  const verifyTransaction = (ID) => {
    PaymentService.getTransactionByID(ID)
    .then(
      (response) => {
        if (response.data.status === 'paid') {
          console.log(response.data);
          navigate('/number-photos', {
            state: response.data
          })
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
        
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const getFrame = () => {
    PhotoService.getFrame()
    .then(
      (response) => {
        navigate('/frame', {
          state: response.data
        })
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const sendEmail = (data) => {
    PhotoService.sendEmail(data.fileName, data.frameID, data.email, data.recipientName)
    .then(
      (response) => {

      }
    ).catch(
      (err) => console.log(err)
    )
  }

  useEffect(() => {
    postData(30000, 0);
    if (requestCount) {
      switch(state.action) {
        case 'payment': 
          postData(30000, 0);
          requestCount--;
          break;
        case 'verify':
          verifyTransaction(state.id);
          requestCount--;
          break;
        case 'generate':
          generateImage(data);
          requestCount--;
          break;
        case 'get-frame':
          getFrame();
          requestCount--;
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