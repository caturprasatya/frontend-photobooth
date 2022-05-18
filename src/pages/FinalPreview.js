import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FramePreview from "../components/FramePreview";

const FinalPreview = (props) => {
  const { state } = useLocation();

  // if(state){
  //   if(state.status_code===200){
  //     const resultUrl = state.result_url;
  //   }
  // }

  const listFilter = useRef(state.res.result_url);
  const [filter,setFilter] = useState(listFilter.current[0]);
  let regexFilter = filter.replace("http://localhost:8080/static/res_image/","");
  regexFilter = regexFilter.split("/")[1];
  console.log(regexFilter);
  
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
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-6">
            <h1 style={{textAlign : 'center', marginBottom:'15px'}}>Choose Your Filter</h1>
            <div style={{height:'300px', overflowY: 'scroll', overflowX: 'hidden'}}>
              <FramePreview
                frameUrl={listFilter.current}
                isSelected={(filter)=>{
                  setFilter(filter);
                }}
                detail={regexFilter}
              />
            </div>
          </div>
          <div className="col-5 text-center">
            <img className='img-thumbnail' style={{height:'400px'}} src={filter} alt='your frame'/>
          </div>
          <div className="col-1 text-center">
            <Link 
                to="/email" 
                state={{
                  data:{
                    txID : state.txID,
                    frameID : state.frameID,
                    filterID : regexFilter
                  }
                }}
              >
              <button className="btn btn-dark btn-lg">Next</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default FinalPreview;