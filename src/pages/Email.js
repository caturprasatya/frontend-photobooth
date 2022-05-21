import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";
import PhotoService from '../services/PhotoService';

const Email = (props) => {
  const { state } = useLocation();
  const [email, setEmail] = React.useState('');
  const [recipient_name, setRecipientName] = React.useState('');

  let txID = 37;
  let effect;
  let isEmailSuccess = false;
  let isPrintSuccess = false;
  if (state) {
    txID = state.txID;
    effect = state.effect;
    if (state.isEmailSuccess) {
      isEmailSuccess = true
    }

    if (state.isPrintSuccess) {
      isPrintSuccess = true
    }
  }
  
  useEffect(() => {
    if (state.data) {
      setEmail(state.data.email);
      setRecipientName(state.data.recipient_name);
    } 
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  }

  const handleNameChange = (e) => {
    setRecipientName(e.target.value);
    console.log(recipient_name);
  }

  return (
    <div className="container" style={{ 
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Header />
      <h3 className="fw-bold text-center">
        Thanks for using SnapLab!
      </h3>
      <h5 className="text-center">
        For the next step, please fill this form and we will get you your photos!
      </h5>
      <br/>
      <div className="form-group">
        <input 
          className="form-control"
          type="text" 
          name="recipient_name" 
          onChange={handleNameChange} 
          placeholder="Nama Lengkap" 
          value={recipient_name}
        />
      </div>
      <br/>
      <div className="form-group">
        <input 
          className="form-control"
          type="email" 
          name="email" 
          onChange={handleEmailChange} 
          placeholder="Email" 
          value={email}
        />
      </div>
      <br/>
      {isEmailSuccess ? (
        <h6 className="fw-bold text-center" style={{'color': '#5EBA7D'}}>Email Sent!</h6>
      ) : (
        <Link 
          to="/load" 
          state={{
            action: 'send-email',
            data: {
              email: email,
              recipient_name: recipient_name
            },
            txID: txID,
            effect: effect
          }}
        >
          <button className="btn btn-primary mb-2">Send Email!</button>
        </Link>
      )}
      {isPrintSuccess ? (
        <h6 className="fw-bold text-center" style={{'color': '#5EBA7D'}}>Photo Printed!</h6>
      ) : (
        <Link 
          to="/load" 
          state={{
            action: 'print-photo',
            data: {
              email: email,
              recipient_name: recipient_name
            },
            txID: txID,
            effect: effect
          }}
        >
          <button className="btn btn-print mb-2">Print Photo!</button>
      </Link>
      )}
      {/* <Link 
          to="/load" 
          state={{
            action: 'send-email',
            data: inputField,
            txID: txID,
            frameID: frameID
          }}
        >
        <button className="btn btn-primary mb-2" onClick={submitButton}>Send Email!</button>
      </Link> */}
      {/* <Link 
          to="/load" 
          state={{
            action: 'print-photo',
            data: inputField,
            txID: txID,
            frameID: frameID
          }}
        >
          <button className="btn btn-print mb-2" onClick={submitButton}>Print Photo!</button>
      </Link> */}
      <Footer />
    </div>
  )
}

export default Email;