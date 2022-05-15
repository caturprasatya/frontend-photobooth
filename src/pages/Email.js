import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";
import PhotoService from '../services/PhotoService';

const Email = (props) => {
  const { state } = useLocation();
  const [inputField , setInputField] = useState({
    full_name: '',
    email: ''
  })

  let txID;
  let frameID;
  let isEmailSuccess = false;
  let isPrintSuccess = false;
  if (state) {
    txID = state.txID;
    frameID = state.frameID;
    if (state.isEmailSuccess) {
      isEmailSuccess = true
    }

    if (state.isPrintSuccess) {
      isPrintSuccess = true
    }
  }
  // const []

  const inputsHandler = (e) =>{
    setInputField( {[e.target.name]: e.target.value} )
    console.log(inputField);
  }

  return (
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
          name="full_name" 
          onChange={inputsHandler} 
          placeholder="Nama Lengkap" 
          value={inputField.full_name}
        />
      </div>
      <br/>
      <div className="form-group">
        <input 
          className="form-control"
          type="email" 
          name="email" 
          onChange={inputsHandler} 
          placeholder="Email" 
          value={inputField.email}
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
            data: inputField,
            txID: txID,
            frameID: frameID
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
            data: inputField,
            txID: txID,
            frameID: frameID
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