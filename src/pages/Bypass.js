import React,{useState,useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Button,Image } from 'react-bootstrap';

import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Background from "../assets/images/bg-home.png";
import CTA from "../assets/images/snaphere.png";
import { pricePoint } from "../conf/conf";
import Utilities from '../utils/Utils'

const Bypass = () => {
  const { state } = useLocation();
  const [token,setToken] = useState();
  const pricePointString = Utilities.int2string_price(pricePoint)

  useEffect(()=>{
      if(state){
        setToken(state.token);
      }
    },[state]
  );

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
          className='home text-center'
        >
          <h1 className="fw-bold text-center">
            Click to Generate Manual Payment!
          </h1>
          <Link 
            to="/load" 
            state={{
              action: 'get-bypass',
              data: {
                token : token
              }
            }}
          >
            <div className='text-center'>
              <Image className='text-center' src={CTA} height={132} width={300}/>
            </div>
          </Link>
          <h2 className='text-center mt-4'>
           IDR {pricePointString}
          </h2>
          <Link 
            to="/"
          >
          <Button className="btn btn-lg btn-danger">
            {"<< Back"}
          </Button>
        </Link>
        </div>
        <Footer />
      </div>
  );
}
  
export default Bypass;