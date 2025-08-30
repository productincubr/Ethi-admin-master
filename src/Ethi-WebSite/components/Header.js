import React from "react";
import EthiLogo from "../assests/weblogo.png";
import "./Header.css";
import { Link } from "react-router-dom";
function Header() {

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://ethi.ai/ethi.apk';
    downloadLink.download = 'ethi.apk';
    downloadLink.click();
  };

  return (
    <>
      <nav className="nav_bar navbar navbar-expand-lg navbar-light bg-light px-5">
        <a className="navbar-brand" href="#">
          <img className="logo" src={EthiLogo} alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className=" header collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar_list navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                About <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                Program <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                Reads <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" href="#">
                Contact <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <Link to="https://ethi.ai/ethi.apk" download="ethi.apk">
            <button id="downloadButton" className="book_apnt btn my-2 my-sm-0" onClick={handleDownload} type="submit">
              Download App
            </button>{" "}
          </Link>
          {/* <button className="book_apnt btn my-2 my-sm-0" type="submit">
            Book Appointment
          </button> */}
        </div>
      </nav>
    </>
  );
}

export default Header;
