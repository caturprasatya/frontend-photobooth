import Logo from "../assets/images/snaplab logo-red.png"
import React, { Component } from "react";
import {
  Box,
  Container,
  Row,
  Column,
} from "../styles/custom/HeaderStyles";
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
            <img className="p-right" src={Logo} width='180px' />
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