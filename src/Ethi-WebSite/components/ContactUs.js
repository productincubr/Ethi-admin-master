import React from 'react';
import "../../Css/Contact.css"; 
import Header from './Header';
import Footer from './Footer';

function ContactUs() {
  return (
    <div>
    <Header/>
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center mb-5">
            <h1 className="heading-section">Contact Us</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="wrapper">
              <div className="row no-gutters mb-5">
                <div className="col-md-7 leftContact">
                  <div className="column">
                    <div className="row-md-3">
                      <div className="dbox w-100">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-map-marker"></span>
                        </div>
                        <div className="text">
                          <p>198 gegira complex, mp nagar Bhopal BPL 462024</p>
                        </div>
                      </div>
                    </div>
                    <div className="row-md-3">
                      <div className="dbox w-100">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-phone"></span>
                        </div>
                        <div className="text">
                          <p><a href="tel://1234567920">+91 7771948302</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="row-md-3">
                      <div className="dbox w-100">
                        <div className="icon d-flex align-items-center justify-content-center">
                          <span className="fa fa-paper-plane"></span>
                        </div>
                        <div className="text">
                          <p><a href="mailto:info@yoursite.com">info@ethi.com</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 d-flex align-items-stretch">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14664.932156154766!2d77.42329470685767!3d23.23460543192033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4269deb07df9%3A0xfee61a854a2e5374!2sMaharana%20Pratap%20Nagar%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1698408480815!5m2!1sen!2sin"
                    width="100%"
                    style={{ border: '0' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default ContactUs;
