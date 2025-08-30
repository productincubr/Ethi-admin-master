import React, { useState } from "react";
import instagramIcon from "../assests/newInsta.svg";
import playStoreIcon from "../assests/playstore.svg";
import appStoreIcon from "../assests/appstore.png";
import facebookIcon from "../assests/newfacebook.svg";

import { Link } from "react-router-dom";
import { web_contact_form } from "../../ServiceConnection/serviceconnection";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleEmailChange,
  validateName,
  validateEmail,
  validateMobile,
  handleAphabetsChange,
  handleNumbersChange,
  handleLinkClick,
} from "../../CommonJquery/CommonJquery.js";
import { server_post_data } from "../../ServiceConnection/serviceconnection.js";
import { set } from "date-fns";

function FooterNew() {
  const [showLoader, setShowLoader] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [thankMsg, setThankMsg] = useState(false);
  const [contactDetails, setContactDetails] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
  });
  const [isTouched, setIsTouched] = useState(false);

  const handleAlertMsg = (e) => {
    const newChange = e.target.value;

    setAlertMsg(false);
    setIsTouched(true);

    // Assuming you want to update the corresponding property in contactDetails
    setContactDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: newChange,
      };
    });
  };
  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (
      contactDetails.email.length === 0 ||
      contactDetails.phoneNo.length === 0 ||
      contactDetails.fullName.length === 0 ||
      isTouched
    ) {
      setAlertMsg(true);
      setThankMsg(false);
    } else {
      setAlertMsg(false); // Hide the alert if there's input
      setThankMsg(true);
    }
    if (vaild_data) {
      setAlertMsg(false);
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          empty_form(form_data);
          setThankMsg(true);
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }

    setContactDetails({ fullName: "", email: "", phoneNo: "" });
  };

  return (
    <div>
      <div className={showLoader ? "loading" : ""}></div>
      <footer className="footerContainer accordion">
        <div className="row m-0">
          <div className="col-md-5">
            <form id="contactFormWeb" className="formContainer ps-md-5 ">
              <div className=" position-relative mb-4">
                <h3 className="footerHeadingStyle contactUsBar">Contact Us</h3>
              </div>
              <div className="my-3 ">
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={handleAlertMsg}
                  className="trio_mendate trio_name "
                  onInput={handleAphabetsChange}
                  name="fullName"
                  maxLength={70}
                  value={contactDetails.fullName}
                />

                <input
                  type="text"
                  placeholder="Your Email"
                  className="trio_mendate trio_email "
                  onChange={handleAlertMsg}
                  name="email"
                  maxLength={65}
                  onInput={handleEmailChange}
                  value={contactDetails.email}
                />

                <input
                  type="text"
                  className="trio_mendate trio_no "
                  name="phoneNo"
                  maxLength={10}
                  placeholder="Phone Number"
                  onInput={handleNumbersChange}
                  onChange={handleAlertMsg}
                  value={contactDetails.phoneNo}
                />
              </div>
              <p
                className={`${
                  alertMsg ? "" : "d-none"
                } fs-6 text-danger fw-bold `}
              >
                Please Fill the Mandatory Fields!
              </p>
              <p
                className={`${
                  thankMsg ? "" : "d-none"
                } fs-6 text-white fw-bold `}
              >
                Thank You For Reaching Out To Us.
              </p>
              <button
                type="button"
                className="btn btn-outline-light formSubmitBtn"
                onClick={() =>
                  handleSaveChangesdynamic("contactFormWeb", web_contact_form)
                }
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-7">
            <div className="ContactContainer">
              <div>
                <h3 className="footerHeadingStyle">CONTACT DETAILS</h3>
                <p className=" text-white fw-light w-75">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Possimus ea dolore fugiat aliquid consectetur consequatur?
                </p>
              </div>
              <div className=" row m-0">
                <div className="col-sm-4" style={{ paddingLeft: "0" }}>
                  <h4 className="footerHeadingStyle mb-3">Follow Us</h4>
                  <div className=" d-flex gap-4 ">
                    <img
                      className="shadowStyle"
                      src={instagramIcon}
                      onClick={() =>
                        handleLinkClick(
                          "https://www.instagram.com/ethi.health/",
                          "_blank"
                        )
                      }
                      alt="Instagram Icon"
                    />
                    <img
                      className="shadowStyle"
                      src={facebookIcon}
                      onClick={() =>
                        handleLinkClick(
                          "https://play.google.com/store/apps/details?id=org.ethi",
                          "_blank"
                        )
                      }
                      alt="Facebook Icon"
                    />
                  </div>
                </div>

                <div className="col-md-7 col-sm-8" style={{ paddingLeft: "0" }}>
                  <h4 className="footerHeadingStyle maginafterSm mb-3">
                    Download App
                  </h4>
                  <div className="btnsPlayApp">
                    <button
                      className="playStoreBtn "
                      onClick={() =>
                        handleLinkClick(
                          "https://play.google.com/store/apps/details?id=org.ethi",
                          "_blank"
                        )
                      }
                    >
                      <img src={playStoreIcon} alt="Play Store " />
                      <span>Play Store</span>
                    </button>
                    <button className="playStoreBtn ">
                      <img src={appStoreIcon} alt="Play Store " />
                      <span>App Store</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyrightContainer">
        <span>&#169;</span> <span>All Rights Reserved. </span>
        <Link to="/return_&_refund_policy">| Return and Refund Policy </Link>
        <Link to="/privacy_policy">| Privacy Policy </Link>
        <Link to="/TermsofUse">| Terms & Conditions</Link>
      </div>
    </div>
  );
}

export default FooterNew;
