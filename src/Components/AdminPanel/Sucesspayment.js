import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ethiicon from "../../Assests/images/EthiIconLogin.svg";
import Payment from "../../Css/Payment.css";

const PaymentSuccess = () => {
  return (
    <div>
      {/* Header with logo */}
      <header className="bg-light py-3">
        <Container>
          <Row>
            <Col>
              <img src={ethiicon}></img>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main content */}
      <main>
        <Container className="py-5">
          <Row>
            <Col>
              <h1 className="text-success mb-4">Payment Successful!</h1>
              <p>
                Your payment has been processed successfully. Thank you for your
                purchase.
              </p>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-3 ftrEthi">
        <Container>
          <Row>
            <Col>
              <p className="m-0 text-center">
                © 2024{" "}
                <span>
                  <a href="/">Ethi.health</a>
                </span>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default PaymentSuccess;
