import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink
} from "../styles/custom/FooterStyles";
  
const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <FooterLink>reach us at:</FooterLink>
          </Column>
          <Column>
            <FooterLink href="#"><i className="fa fa-brands fa-instagram"></i> @its.snaplab</FooterLink>
          </Column>
          <Column>
            <FooterLink href="#"><i className="fa fa-light fa-envelope"></i> its.snaplab@gmail.com</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;