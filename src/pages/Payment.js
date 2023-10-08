import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Background from "../assets/images/bg-payment.png";
import Placeholder from "../assets/images/placeholder.png";
import Utilities from '../utils/Utils'
import { pricePoint } from "../conf/conf";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [image,setImage] = useState(Placeholder);
  const pricePointString = Utilities.int2string_price(pricePoint)
  const [snapFee,setSnapFee] = useState(pricePointString);
  
  useEffect(() => {
    if (!state) {
      navigate('/');
    }else{
      setImage(state.qr_code);
      setSnapFee(Utilities.int2string_price(state.amount));
    }
    // eslint-disable-next-line
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
         IDR {snapFee}
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
            trx_id: state.trx_id
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