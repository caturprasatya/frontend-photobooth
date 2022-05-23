import React, { useState,useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from '../components/Header';
import Background from "../assets/images/bg-payment.png"
import FramePreview from "../components/FramePreview";

const FinalPreview = (props) => {
  const { state } = useLocation();
  console.log(state);

  const listFilter = useRef([]);
  const listFilterRegex = useRef([]);

  if(state){
    if(state.status_code===200){
      listFilter.current = state.result_url;
    }
  }

  const [filter,setFilter] = useState(listFilter.current[0]);
  let regexFilter = filter.replace("http://localhost:8080/static/res_image/","").split("/")[1];

  listFilter.current.forEach(filter=>{
    listFilterRegex.current.push(filter.replace("http://localhost:8080/static/res_image/","").split("/")[1])
  })
  
  return (
    <div className="container" style={{
      backgroundImage: `url(${Background}`,
      backgroundSize: 'contain',
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      <Header/>
      <div>
        <div className="row justify-content-center align-items-center">
          <div className="col-6">
            <h2 style={{textAlign : 'center', marginBottom:'15px'}}>Choose Your Filter</h2>
            <div style={{height:'350px', overflowY: 'scroll', overflowX: 'hidden'}}>
              <FramePreview
                frameUrl={listFilter.current}
                isSelected={(filter)=>{
                  setFilter(filter);
                }}
                detail={listFilterRegex.current}
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
                  txID : state.txID,
                  effect : regexFilter
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