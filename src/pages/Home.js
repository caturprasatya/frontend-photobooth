import React,{useState,useRef} from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";
import CTA from "../assets/images/snaphere.png";
import Check from "../assets/icons/check-circle-fill.svg";
import { pricePoint } from "../conf/conf";
import PaymentService from '../services/PaymentService';
import Utilities from '../utils/Utils'

const Home = () => {
  const [promo, setPromo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPromoInvalid, setIsPromoInvalid] = useState(true);
  const [isAlert, setIsAlert] = useState(false);
  const priceRef = useRef(null);
  const [discountPrice, setDiscountPrice] = useState(pricePoint.stringFormat);
  const finalPrice = useRef(pricePoint.intFormat)

  const handlePromoChange = (e) => {
    setPromo(e.target.value);
  };

  const handleVerify = () => {
    setIsLoading(true);
    PaymentService.getPromo(promo)
    .then(
      (response)=>{
        if(response.data.id===0){
          setIsPromoInvalid(true);
          priceRef.current.style.display = "none";
          setDiscountPrice(pricePoint.stringFormat);
        }else{
          setIsPromoInvalid(false);
          priceRef.current.style.display = "inline"
          finalPrice.current = pricePoint.intFormat - response.data.discount_amount;
          let s_finalPrice = Utilities.int2string_price(finalPrice.current);
          setDiscountPrice(s_finalPrice);
        }
        setIsLoading(false);
        setIsAlert(true);
      }
    ).catch((err)=>{
      console.log(err);
      setIsPromoInvalid(true);
      priceRef.current.style.display = "none";
      setDiscountPrice(pricePoint.stringFormat);
      setIsLoading(false);
      setIsAlert(true);
    }
    )
  }

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
            action: 'payment',
            data : {
              snapFee : finalPrice.current,
              isPromoInvalid : isPromoInvalid,
              code : promo
            }
          }}
        >
          <div className='text-center'>
            <Image className='text-center' src={CTA} height={132} width={300}/>
          </div>
        </Link>
        <h2 className='text-center mt-4'>
         <p><span>IDR </span><span style={{textDecoration: "line-through",display:"none"}} ref={priceRef}>{pricePoint.stringFormat}</span><span> </span>{discountPrice}</p>
        </h2>
        <div className="input-group mb-3">
          <input 
            className="form-control"
            placeholder="Have promo code? Input here"
            type="text" 
            name="promo" 
            onChange={handlePromoChange}  
            value={promo}
          />
          <button className="btn btn-outline-primary" type="button" onClick={handleVerify}>
            <>
              {
                isLoading?
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                :
                <span>Verify</span>
              }
            </>
          </button>
        </div>
        <div className='text-center' style={{color:isPromoInvalid? "red" : "green",visibility:isAlert?"":"hidden"}}>
          <>
              {
                isPromoInvalid?
                <p><strong>Failed to redeem promo code!</strong> Code could be invalid or expire.</p>
                :
                <p><img src={Check} style={{width:"1.3rem"}} alt="check-icon"/><strong> You've successfully redeemed the Code</strong> Enjoy the promo.</p>
              }
          </>
        </div>
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