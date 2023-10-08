import React from "react";
import {
  Box
} from "./FooterStyles";
import "../../styles/components/Footer.css";
  
const Footer = () => {
  return (
    <Box>
      <div className="footer-container">
          <div className="column">
            <h4 className="p-left">reach us at:</h4>
          </div>
          <div className="column">
            <h4 className="p-center"><i className="fa fa-brands fa-instagram"></i> @its.snaplab</h4>
          </div>
          <div className="column">
            <h4 className="p-right"><i className="fa fa-light fa-envelope"></i> its.snaplab@gmail.com</h4>
          </div>
        </div>
    </Box>
  );
};
export default Footer;