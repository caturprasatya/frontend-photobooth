import React, { useEffect, useState } from 'react'
import ProgressBar from "@ramonak/react-progress-bar";
import '../styles/ProgressBar.css'

function ProgressBarAnimation({ completed }) {
  // Default variables
  const DEFAULT_INTERVAL = 1000;
  const TIMER_OVER = 85;
  const randomInt = Math.floor(Math.random() * 6) + 1;

  const [percentanse, setPercentanse] = useState(0);
  const [finished, setFinished] = useState(false);
  

  useEffect(() => {
    let interval;
  
    if (!finished) {
      interval = setInterval(() => {
        setPercentanse(percentanse + randomInt);
      }, DEFAULT_INTERVAL);
    } else {
      clearInterval(interval);
    }

    if (!finished && percentanse > TIMER_OVER) setFinished(true);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [finished, percentanse]);

  useEffect(() => {
    if (completed) {
      setFinished(true);
      setPercentanse(100);
    }
  }, [completed])
  

  return (
    <div style={{ 
      height: "100vh",
      width: "100%",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    > 
      <div className="loading d-flex flex-column">
        <text className="text-center bold">Please Wait</text>
        <text className="text-center bold">We are processing your photos!</text>
      </div>
      <div style={{ 
        height: "120",
        width: "50%",
      }}>
        <ProgressBar 
          completed={percentanse}
          width="20"  
          className="wrapper"
          bgColor="#f80000"
          isLabelVisible={false}
          baseBgColor="white"
        />
      </div>
      <div className="update-progress d-flex flex-column">
        <text className="text-center">{ percentanse }% completed!</text>
      </div>
    </div>
  )
}

export default ProgressBarAnimation