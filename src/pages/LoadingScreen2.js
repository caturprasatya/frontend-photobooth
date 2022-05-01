import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import Background from "../assets/images/bg-payment.png";
import PaymentService from '../services/PaymentService';

const LoadingScreen2 = () => {
  const { state } = useLocation()
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
          console.log(response.data)
          // navigate
        } 
      }
    )
  }

  useEffect(() => {
    switch(state.action) {
      case 'payment': 
        postData(30000, 0);
        break;
      case 'verify':
        verifyTransaction(state.id);
        break;
    }
    
  }, []);

  return (
    <>
      {/* <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Loader
                type="Audio"
                color="#3F51B5"
                height={100}
                width={100}
                visible={spinnerLoading}
            />
          </Box>
        </Container>
      </Box> */}
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
    </>
  );
};

export default LoadingScreen2;