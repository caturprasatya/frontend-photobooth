import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png";
import Placeholder from "../assets/images/placeholder.png";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state)

  let image = Placeholder
  if (state) {
    image = state.qr_code
  }

  React.useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, []);

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
      <Header/>
      <div 
        className='qr-code'
      >
        <h2 className="text-center">
          <span style={{ color: 'red' }}>Scan</span> here to pay!
        </h2>
        <h3 className='fw-bold text-center'>
         IDR 30.000
        </h3>
        <div className='text-center'>
          <Image className='text-center mb-4' src={image} height={300} width={300} style={{ 
            boxShadow: '2px 2px 2px 2px rgba(0,0,0,.2)'
          }}/>
        </div>
        <h5 className='text-center'>
          Available for all your payment methods!
        </h5>
        <Link 
          to="/load" 
          state={{
            action: 'verify',
            id: state.id
          }}
        >
          <h3 className='fw-bold text-center'>
            Verify Your Transaction!
          </h3>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;