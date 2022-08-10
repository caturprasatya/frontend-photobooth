import React,{useState, useEffect} from 'react';
import { Link,useLocation } from 'react-router-dom';
import { Button,Modal } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Background from "../assets/images/bg-home.png";

const Login = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert,setShowAlert] = useState(false);
  const [messageAlert,setMessageAlert] = useState();

  useEffect(()=>{
      if(state){
        setShowAlert(true);
        setMessageAlert(state.errorMessage);
      }else{
        setShowAlert(false);
        setMessageAlert();
      }
    },[]
  );

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log(password);
  };

  const handleClose = () => setShowAlert(false);

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
        <h1 className="fw-bold text-center">
          Please login as Admin
        </h1>
        <h1 className="fw-bold text-center">
          to generate manual payment code!
        </h1>

        <Modal size="sm" centered show={showAlert} onHide={handleClose}>
          <Modal.Body>
            <h4 className="text-center fw-bold mt-3 mb-3">
              {messageAlert}
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            </div>
          </Modal.Body>
        </Modal>
        <form>
          <div className="form-group">
            <input 
              className="form-control form-control-lg"
              type="email" 
              name="emailLogin" 
              onChange={handleEmailChange} 
              placeholder="Email" 
              value={email}
            />
          </div>
          <br/>
          <div className="form-group">
            <input 
              className="form-control form-control-lg"
              type="password" 
              name="passwordLogin" 
              onChange={handlePasswordChange} 
              placeholder="Password" 
              value={password}
            />
          </div>
          <br/>
          <div className="form-group">
            <Link 
              to="/load" 
              state={{
                action: 'login',
                data: {
                  email: email,
                  password: password
                }
              }}
            >
              <Button className="btn btn-lg btn-primary mb-4 btn-block btn-email">
                Login
              </Button>
            </Link>
          </div>
        </form>
        <Link 
          to="/"
        >
          <Button className="btn btn-lg btn-danger">
            {"<< Back"}
          </Button>
        </Link>
      <Footer />
    </div>
  );
}
  
  export default Login;