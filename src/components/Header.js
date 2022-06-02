import React from "react";
import { Link } from 'react-router-dom';
import {
  Box
} from "../styles/custom/HeaderStyles";
import Logo from "../assets/images/snaplab logo-red.png"
import '../styles/Header.css';

const Header = () => {
  return (
    <Box>
      <div className="header-container">
        <div className="row">
          <div className="column">
            <div className="p-left"></div>
          </div>
          <div className="column">
            <div className="p-center"></div>
          </div>
          <div className="column">
            <Link 
              to="/" 
            >
              <img className="p-right" src={Logo} width='150px' />
            </Link>
          </div>
        </div>
      </div>
    </Box>
    // <Box>
    //   {/* <Container> */}
    //     <Row>
    //         <Column>
    //         </Column>
    //         <Column>
    //         </Column>
    //         <Column>
    //         <img src={Logo} width='150px' />
    //         </Column>
    //     </Row>
    //   {/* </Container> */}
    // </Box>
  );
};
export default Header;