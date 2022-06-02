import React from "react";
import {
  Box
} from "../styles/custom/FooterStyles";
import '../styles/Footer.css';
  
const Footer = () => {
  return (
    <Box>
      <div className="footer-container">
          <div className="column">
            <h5 className="p-left">reach us at:</h5>
          </div>
          <div className="column">
            <h5 className="p-center"><i className="fa fa-brands fa-instagram"></i> @its.snaplab</h5>
          </div>
          <div className="column">
            <h5 className="p-right"><i className="fa fa-light fa-envelope"></i> its.snaplab@gmail.com</h5>
          </div>
        </div>
    </Box>
    // <Box>
    //   {/* <Container> */}
    //     <Row>
    //       <Column>
    //         <FooterLink>reach us at:</FooterLink>
    //       </Column>
    //       <Column>
    //         <FooterLink href="#"><i className="fa fa-brands fa-instagram"></i> @its.snaplab</FooterLink>
    //       </Column>
    //       <Column>
    //         <FooterLink href="#"><i className="fa fa-light fa-envelope"></i> its.snaplab@gmail.com</FooterLink>
    //       </Column>
    //     </Row>
    //   {/* </Container> */}
    // </Box>
  );
};
export default Footer;