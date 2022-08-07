import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";
import CTA from "../assets/images/snaphere.png";

const Home = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Header />
      <div 
        className='home'
      >
        <h1 className="fw-bold text-center">
          hello!
        </h1>
        <Link 
          to="/load" 
          state={{
            action: 'payment'
          }}
        >
          <div className='text-center'>
            <Image className='text-center' src={CTA} height={132} width={300}/>
          </div>
        </Link>
        <h2 className='text-center mt-4'>
         IDR 35.000
        </h2>
        <p className='text-center mb-0'>
          Having trouble with payment?
        </p>
        <Link 
          to="/login"
        >
          <p className='text-center'>
            Click here!
          </p>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Home;