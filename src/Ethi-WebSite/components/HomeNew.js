import React, { useEffect, useRef, useState } from "react";
import HeaderNew from "./HeaderNew";
import FrontVideo from "../assests/Video.mp4";
import BottomVideo from "../assests/healthy.mp4";
import SubsUpdateImg from "../assests/subsUpdateImg.png";
import FooterNew from "./FooterNew";
import EthiLogoO from "../assests/newgreenethilog.svg";
import { web_subscribe_email } from "../../ServiceConnection/serviceconnection";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleEmailChange,
} from "../../CommonJquery/CommonJquery.js";
import { server_post_data } from "../../ServiceConnection/serviceconnection.js";

function HomeNew() {
  const videoRef = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [thankMsg, setThankMsg] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [subscriberEmailDetails, setSubscribeEmailDetails] = useState({
    email: "",
  });
  const [isTouched, setIsTouched] = useState(false);

  const [isCollapseOneOpen, setCollapseOneOpen] = useState(true);

  const handleCollapseToggle = () => {
    setCollapseOneOpen((prev) => !prev);
  };

  const handleAlertMsg = (e) => {
    const newChange = e.target.value;

    setAlertMsg(false);
    setIsTouched(true);
    // Assuming you want to update the corresponding property in contactDetails
    setSubscribeEmailDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: newChange,
      };
    });
  };

  useEffect(() => {
    // Ensure the video is present before attempting to play
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Autoplay was prevented, handle it here (e.g., show a play button)
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    setIsTouched(true);
    if (isTouched || subscriberEmailDetails.email?.trim().length === 0) {
      setAlertMsg(true);
      setThankMsg(false);
    } else {
      setAlertMsg(false); // Hide the alert if there's input
      setThankMsg(true);
    }
    if (vaild_data) {
      setShowLoader(true);
      setAlertMsg(false);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          setThankMsg(true);
          empty_form(form_data);
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
    setSubscribeEmailDetails("");
  };

  return (
    <div>
      <HeaderNew />
      <div className={showLoader ? "loading" : ""}></div>
      <section className="frontVideo">
        <div className="frontVideoContaienr">
          <video ref={videoRef} autoPlay playsInline loop muted>
            <source src={FrontVideo} type="video/mp4" />
          </video>
          <h2 style={{ color: "#ffffff" }}>
            We are on a mission to unlock the Future of Women's Health, and
            enabling them to do the same for their Families.
          </h2>
        </div>
      </section>

      <section className="SubsupdatesSection">
        <div className="SubsupdatesSection container-lg">
          <div className="row m-0">
            <div className="col-md-4 col-10 m-auto subsImgDiv">
              <img src={SubsUpdateImg} alt="Ethi" />
            </div>
            <div className="col-md-6 m-auto">
              <div className="SubsupdatesText">
                <div className="SubsupdatesTextCOnt">
                  <h4>
                    We're blending the power of nutrition, wellness, and
                    artificial intelligence to pioneer groundbreaking solutions.
                  </h4>
                </div>
                <div className="SubsupdatesForm">
                  <h4 className="mb-3">
                    <span style={{ fontWeight: "400" }}>Subscribe for</span>{" "}
                    UPDATES
                  </h4>

                  <form id="subscriberEmail">
                    <input
                      type="email"
                      placeholder="Your Email Address*"
                      name="email"
                      id="email"
                      className="trio_mendate trio_email"
                      onChange={handleEmailChange}
                      onInput={handleAlertMsg}
                      maxLength={100}
                      value={subscriberEmailDetails.email}
                    />

                    <p
                      className={`${
                        alertMsg ? "" : "d-none"
                      } fs-6 text-danger fw-bold `}
                    >
                      Please Fill the Mandatory Field!
                    </p>
                    <p
                      className={`${
                        thankMsg ? "" : "d-none"
                      } fs-6 text-success fw-bold `}
                    >
                      Thank You For Reaching Out To Us.
                    </p>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleSaveChangesdynamic(
                            "subscriberEmail",
                            web_subscribe_email
                          )
                        }
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="SubsupdatesSection bg-white">
        <div className="SubsupdatesSection container-lg bg-white">
          <div className="row m-0">
            <div className="col-md-6 m-auto">
              <div className="SubsupdatesText">
                <div className="SubsupdatesTextCOnt">
                  <h4>
                    We believe in a future where health is holistic,
                    personalized, and accessible. Let’s witness the unveiling of
                    a new era in women's well-being.
                  </h4>
                </div>
              </div>
            </div>
            <div
              className="col-md-4 col-10 m-auto subsImgDiv"
              style={{
                border: "5px solid #8CB27F",
                borderRadius: "25px",
                padding: "0",
              }}
            >
              <video autoPlay muted loop controls>
                <source src={BottomVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="joinUsSection">
        <div className="container-lg">
          <div className="col-11 m-auto">
            <div className="accordianHead">
              <h3>
                Together, we can craft the future of wellness with impact.
              </h3>
              <div className="accordianHeadLogo">
                <h3 className="m-0">Join us at </h3>
                <img src={EthiLogoO} alt="Ethi" />
              </div>
            </div>

            <div className="accordionContainer">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header  ">
                    <button
                      className={` accordion-button collapsed`}
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <h5 className="m-0">
                        Clinical Nutrition Research Associate
                      </h5>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsa itaque odit eius quod id sunt? Eos dolorum libero
                      placeat voluptatem laborum deserunt voluptates minima unde
                      hic sequi eligendi dolorem quibusdam aperiam voluptatibus,
                      architecto incidunt similique molestias mollitia! Tempore,
                      exercitationem. Earum aut distinctio laboriosam sit fugit
                      adipisci, iure odit quas minima. Illum laudantium rem
                      dolore optio, accusantium exercitationem. Nesciunt, sed
                      deserunt.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={` accordion-button collapsed`}
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <h5 className="m-0">Senior Creative Copywriter</h5>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nihil fugit excepturi ducimus tempore necessitatibus eaque
                      fuga quos repellat maxime ut, iste eum sunt ratione porro
                      consectetur soluta pariatur quasi praesentium eligendi.
                      Harum quod provident expedita deserunt, temporibus porro
                      nostrum officia labore amet, corporis, assumenda
                      voluptatem esse sequi quis itaque. Iusto.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button collapsed`}
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <h5 className="m-0">UX Research Intern</h5>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos reprehenderit incidunt at perspiciatis ipsa
                      sunt cupiditate obcaecati enim? Sed odio asperiores id
                      animi porro ut iure laborum rerum nulla. Porro quo
                      officiis voluptatem ex vitae ea fugit delectus odio,
                      facilis non! Ex odit ea assumenda.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button collapsed`}
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <h5 className="m-0">Customer Service Associate</h5>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nihil fugit excepturi ducimus tempore necessitatibus eaque
                      fuga quos repellat maxime ut, iste eum sunt ratione porro
                      consectetur soluta pariatur quasi praesentium eligendi.
                      Harum quod provident expedita deserunt, temporibus porro
                      nostrum officia labore amet, corporis, assumenda
                      voluptatem esse sequi quis itaque. Iusto.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={` accordion-button collapsed`}
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <h5 className="m-0">EA’s Founders Office</h5>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nihil fugit excepturi ducimus tempore necessitatibus eaque
                      fuga quos repellat maxime ut, iste eum sunt ratione porro
                      consectetur soluta pariatur quasi praesentium eligendi.
                      Harum quod provident expedita deserunt, temporibus porro
                      nostrum officia labore amet, corporis, assumenda
                      voluptatem esse sequi quis itaque. Iusto.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterNew />
    </div>
  );
}

export default HomeNew;
