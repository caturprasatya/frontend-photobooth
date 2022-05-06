import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
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
      navigate('/load');
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
        <h3 className="fw-bold text-center">
          Scan Here to Pay!
        </h3>
        <div className='text-center'>
          <Image className='text-center' src={image} height={300} width={300}/>
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