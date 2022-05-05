import Logo from "../assets/images/snaplab logo-red.png"
import React, { Component } from "react";
import {
  Box,
  Container,
  Row,
  Column,
} from "../styles/custom/HeaderStyles";
  
const Header = () => {
  return (
    <Box>
      <Container>
        <Row>
            <Column>
            </Column>
            <Column>
            </Column>
            <Column>
            <img src={Logo} width='150px' />
            </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Header;