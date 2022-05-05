import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Background from "../assets/images/bg-home.png";
import CTA from "../assets/images/snaphere.png";

const Home = () => {
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
      {/* Navbar */}
      <div 
        className='home'
      >
        <h3 className="fw-bold text-center">
          hello!
        </h3>
        <Link 
          to="/load" 
          state={{
            action: 'payment'
          }}
        >
          <div className='text-center'>
            <Image className='text-center' src={CTA} height={220} width={500}/>
          </div>
        </Link>
        <h3 className='text-center mt-2'>
         IDR 30.000
        </h3>
      </div>
      <Footer />
    </div>
  );
}

export default Home;