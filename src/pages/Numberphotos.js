import React from "react";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../assets/images/bg-payment.png";

const Numberphotos = (props) => {
  return (
    <div style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Header/>
        <h1>How Many Photo Shots Do You Prefer?</h1>
        <Link 
          to="/capture" 
          state={{
            number : 8
          }}
        >
          <button>8</button>
        </Link>
        <Link 
          to="/capture" 
          state={{
            number : 6
          }}
        >
          <button>6</button>
        </Link>
      <Footer/>
    </div>
  );
}

export default Numberphotos;