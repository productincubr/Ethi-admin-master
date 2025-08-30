import React from "react";
import FooterLogo from "../assests/ethi_footer_logo.png";
import "./Footer.css";
import FaceBook from "../assests/faceBook.svg";
import InstaGram from "../assests/Instagram.svg";
import Twitter from "../assests/twitter.svg";
import LinkedIn from "../assests/LinkedIn.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="web_footer">
      <div className="web_footer_container p-5 pb-3">
        <div className="web_footer_wrapper row col-lg-10 m-auto">
          <div className="left_container_wrapper col-sm-5">
            <div className="left_container">
              <div className="brand_img">
                <img src={FooterLogo} alt="brand Logo" />
              </div>
              <p>Phone: +91 9999988493</p>
              <div className="social_media_links">
                <ul>
                  <li>
                    <a href="/">
                      <img src={FaceBook} alt="Social Media" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={InstaGram} alt="Social Media" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={Twitter} alt="Social Media" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={LinkedIn} alt="Social Media" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-4 col-7">
            <div className="center_container">
              <h4>Get Started</h4>
              <ul>
                <li>
                  <p><Link to='/superadmin'>Home</Link> </p>
                </li>
                <li>
                  <p>About Nutrition by Loveneet</p>
                </li>
                <li>
                  <p>Nutrition Plans</p>
                </li>
                <li>
                  <p>Calorie Calculator</p>
                </li>
                <li>
                  <p>Health Challenges</p>
                </li>
                <li>
                  <p><Link to='/login' className="nav-item active">Doctor Login</Link> </p>
                </li>
                <li>
                <p><Link to='/superadmin'>Admin Login</Link></p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3 col-5">
            <div className="right_container">
              <h4>Resources</h4>
              <ul>
                <li>
                  <p>Blogs</p>
                </li>
                <li>
                  <p>Recipes</p>
                </li>
                <li>
                  <p>Podcast</p>
                </li>
                <li>
                  <p>Books</p>
                </li>
                <li>
                  <p>Videos</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_end">
        <div className="footer_end_container p-4">
            <p>© All Rights Reserved. | <Link to='/return_&_refund_policy'>Return and Refund Policy</Link> | <Link to='/privacy_policy'>Privacy Policy</Link> | <Link to='/TermsofUse'>Terms & Conditions</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

