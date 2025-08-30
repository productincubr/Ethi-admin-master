import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Payment from "../../Css/Payment.css";
import ethiicon from "../../Assests/images/EthiIconLogin.svg";
const PaymentCancel = () => {
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
              <h1 className="text-danger mb-4">Payment Cancelled!</h1>
              <p>
                Sorry, your payment was panding or something went wrong during
                the payment process.
              </p>
              <Button className="addmore HomeBTn" href="/">
                Go to Homepage
              </Button>
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

export default PaymentCancel;
