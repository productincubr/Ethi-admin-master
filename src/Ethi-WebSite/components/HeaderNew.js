import React, { useState, useEffect } from "react";
import HeaderLogoNew from "../assests/newgreenethilog.svg";
import WhatsNewWeb from "../assests/whatsappNew1.png";
import { Link } from "react-router-dom";

function HeaderNew() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const sendWhatsAppMessage = () => {
    const phoneNumber = "+91 70420 10787";
    const message = "Hi!";

    const whatsappLink =
      "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

    window.open(whatsappLink, "_blank");
  };
  return (
    <>
      <div
        className={`headerNew newHaderPosition ${
          scrolled ? "Headerscrolled" : ""
        }`}
      >
        <div className="headerNewCOntaienr container-md">
          <div className="headerNewLog">
            <Link to="/">
              <img src={HeaderLogoNew} alt="icon" />
            </Link>
          </div>
          <button>Stay Connected</button>
        </div>
      </div>
      <div className="whatsIconWeb" onClick={sendWhatsAppMessage}>
        <img src={WhatsNewWeb} alt="Ethi" />
      </div>
    </>
  );
}

export default HeaderNew;
