import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation} from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Overlay from "../components/Overlay";

const Email = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [recipient_name, setRecipientName] = React.useState('');
  const [isOverlay, setIsOverlay] = useState('none');
  const [show, setShow] = useState(false);

  let txID = 37;
  let effect;
  let isEmailSuccess = false;
  let isPrintSuccess = false;
  if (state) {
    txID = state.txID;
    effect = state.effect;
    if (state.isEmailSuccess) {
      isEmailSuccess = true
    }

    if (state.isPrintSuccess) {
      isPrintSuccess = true
    }
  }
  
  useEffect(() => {
    // console.log(state);
    if (!state) {
      navigate('/')
    } else {
      if (state) {
        if (state.isEmailSuccess) {
          setShow(true);
        }
    
        if (state.isPrintSuccess) {
          // console.log("tes");
          setIsOverlay('block');
          setShow(false);
          setTimeout(() => {
            navigate('/')
          }, 5000)
        }
      }
  
      if (state.data) {
        setEmail(state.data.email);
        setRecipientName(state.data.recipient_name);
      } 
    }
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  }

  const handleNameChange = (e) => {
    setRecipientName(e.target.value);
    // console.log(recipient_name);
  }

  const handleClose = () => setShow(false);

  return (
    <div className="container" style={{ 
      height: "100vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Header />
      <Modal size="sm" centered show={show} onHide={handleClose}>
        <Modal.Body>
          <h4 className="text-center fw-bold mt-3 mb-3">
            We've sent the <br></br> photos to your email!
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Link 
              to="/load" 
              state={{
                action: 'print-photo',
                data: {
                  email: email,
                  recipient_name: recipient_name
                },
                txID: txID,
                effect: effect
              }}
            >
              <button className="btn text-center btn-print" onClick={handleClose}>
                Print Photo!
              </button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
      <h1 className="fw-bold text-center">
        Thanks for using SnapLab!
      </h1>
      <h3 className="text-center">
        For the next step, please fill this form and we will get you your photos!
      </h3>
      <br/>
      <form>
        <div className="form-group">
          <input 
            className="form-control form-control-lg"
            type="text" 
            name="recipient_name" 
            onChange={handleNameChange} 
            placeholder="Your Name" 
            value={recipient_name}
          />
        </div>
        <br/>
        <div className="form-group">
          <input 
            className="form-control form-control-lg"
            type="email" 
            name="email" 
            onChange={handleEmailChange} 
            placeholder="Email" 
            value={email}
          />
        </div>
        <br/>
        <div className="form-group">
          {isEmailSuccess ? (
            <></>
          ) : (
            <Link 
              to="/load" 
              state={{
                action: 'send-email',
                data: {
                  email: email,
                  recipient_name: recipient_name
                },
                txID: txID,
                effect: effect
              }}
            >
              <button className="btn btn-lg btn-primary mb-2 btn-block btn-email">
                Send Email!
              </button>
            </Link>
          )}
        </div>
        <div className="form-group">
          {isPrintSuccess ? (
            <>
              <Overlay
                isOverlay={isOverlay}
                text="Printing..."
              />
              <Link 
                to="/load" 
                state={{
                  action: 'print-photo',
                  data: {
                    email: email,
                    recipient_name: recipient_name
                  },
                  txID: txID,
                  effect: effect
                }}
              >
                <button className="btn btn-lg btn-print mb-2">Print Photo!</button>
              </Link>
            </>
          ) : (
            <Link 
              to="/load" 
              state={{
                action: 'print-photo',
                data: {
                  email: email,
                  recipient_name: recipient_name
                },
                txID: txID,
                effect: effect
              }}
            >
              <button className="btn btn-lg btn-print mb-2">Print Photo!</button>
            </Link>
          )}
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Email;