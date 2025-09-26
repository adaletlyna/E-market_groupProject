import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Left side */}
          <Col md={6} className="mb-3 mb-md-0">
            <div className="mb-2 d-flex align-items-center justify-content-center justify-content-md-start">
              <FaWhatsapp className="me-2 text-success" size={20} />
              <span>Guest Service: +1234567890</span>
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <FaMapMarkerAlt className="me-2 text-danger" size={20} />
              <span>123 Main Street, Your City</span>
            </div>
          </Col>

          {/* Right side */}
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-3">
              <span className="fw-semibold">Follow us</span>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-dark">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-dark">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-dark">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;