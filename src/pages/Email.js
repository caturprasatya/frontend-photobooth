import React, { useState } from "react";
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";
import PhotoService from '../services/PhotoService';

const Email = (props) => {
  const [inputField , setInputField] = useState({
    full_name: '',
    email: ''
  })
  // const []

  const inputsHandler = (e) =>{
    setInputField( {[e.target.name]: e.target.value} )
    console.log(inputField);
  }

  const submitButton = () =>{
    alert(inputField.full_name)
  }

  const sendEmail = (data) => {
    PhotoService.sendEmail(data.fileName, data.frameID, data.email, data.recipientName)
    .then(
      (response) => {
        console.log("Check your email!")
      }
    ).catch(
      (err) => console.log(err)
    )
  }

  const printImage = (data) => {
    PhotoService.printImage(data.txID, data.frameID)
    .then(
      (response) => {
        console.log("Print success!")
      }
    ).catch(
      (err) => console.log(err)
    )
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
      <button className="btn btn-success mb-2" onClick={submitButton}>Print Photo!</button>
      <button className="btn btn-primary" onClick={submitButton}>Send Email!</button>
      <Footer />
    </div>
  )
}

export default Email;