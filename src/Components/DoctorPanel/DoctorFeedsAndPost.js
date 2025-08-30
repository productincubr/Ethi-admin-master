import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/FeedsAndPost.css";
import DoctorHeader from "../DoctorPanel/DoctorHeader";
import PrimaryButtonButton from "../RepeatingComponents/PrimaryButton";

import ArrowLeft from "../../Assests/images/arrow_left.svg";
import InputImgIcon from "../../Assests/images/input_img_icon.svg";
import InputVideoIcon from "../../Assests/images/input_video_icon.svg";
import InputAudioIcon from "../../Assests/images/input_audio_icon.svg";
import approvedIcon from "../../Assests/images/approvedIcon.svg.svg";
import rejectedIcon from "../../Assests/images/rejectedIcon.svg.svg";
import PdfImgIcon from "../../Assests/images/pdf_icon.png";
import Errorimage from "../../Assests/images/error.png";
import "bootstrap/dist/css/bootstrap.min.css";
import LikeSvg from "../../Assests/images/like.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import clockIcon from "../../Assests/images/clock_2.svg";
import addBtn from "../../Assests/images/add_svg.svg";
import {
  APL_LINK,
  post_doctor_save,
  server_post_data,
  post_doctor_get,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleIaphabetnumberChange,
} from "../../CommonJquery/CommonJquery.js";
import moment from "moment";

function DoctorFeedsAndPost() {
  // Back button
  const navigate = useNavigate();
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [retriveAdminId, setRetriveAdminId] = useState("");
  const [retriveDoctorName, setretriveDoctorName] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [retriveDoctorImageSingle, setRetriveDoctorSingleImage] = useState("");
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [goalsArray, setGoalsArray] = useState([]);
  const [select_image_goal, setSelectImageGoal] = useState([]);
  const [select_image_doctor, setSelectImageDoctor] = useState([]);
  const [showAddPostPage, setShowAddPostPage] = useState(false);
  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    setRetriveAdminId("000000000000000000000000");
    setretriveDoctorName(retrieveData("doctor_name"));
    setRetriveDoctorImage(retrieveData("doctor_image"));
    setRetriveDoctorSingleImage(retrieveData("doctor_image_single"));
    master_data_feeds(retrievedDoctorId);
  }, []);

  const master_data_feeds = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(post_doctor_get, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setGoalsArray(Response.data.message.data_ethi_feeds_master);
          setSelectImageGoal(
            APL_LINK + Response.data.message.data_ethi_feeds_image
          );
          setSelectImageDoctor(
            APL_LINK + Response.data.message.data_data_doctor_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const [checkboxes, setCheckboxes] = useState({
    all: true,
    completed: false,
    pending: false,
    cancelled: false,
  });

  const handleCheckboxChange = (key) => {
    if (key == "all") {
      const updatedCheckboxes = { ...checkboxes };
      for (const checkboxKey in updatedCheckboxes) {
        updatedCheckboxes[checkboxKey] = !checkboxes.all;
      }
      setCheckboxes(updatedCheckboxes);
    } else {
      setCheckboxes((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    }
  };

  const handleFileChangedynamic = (keyname, image_type) => (event) => {
    const file = event.target.files[0];

    let new_file_name = keyname + "_show";
    let new_file_type = keyname + "_type";

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: reader.result,
          [new_file_type]: image_type,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setDynaicimage((prevImages) => ({
        ...prevImages,
        [keyname]: null,
        [new_file_name]: null,
        [new_file_type]: null,
      }));
    }
  };

  const renderFilePreview = (keyname) => {
    if (dynaicimage == null) return null;

    let new_file_type = keyname + "_type";
    switch (dynaicimage[new_file_type]) {
      case "image":
        return (
          <img src={URL.createObjectURL(dynaicimage[keyname])} alt="Selected" />
        );
      case "video":
        return (
          <video controls>
            <source
              src={URL.createObjectURL(dynaicimage[keyname])}
              type="video/mp4"
            />
          </video>
        );
      case "audio":
        return (
          <audio controls>
            <source
              src={URL.createObjectURL(dynaicimage[keyname])}
              type="audio/mp3"
            />
          </audio>
        );
      case "pdf":
        return (
          <div className="pdf-preview">
            <iframe
              src={URL.createObjectURL(dynaicimage[keyname])}
              title="PDF Preview"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    let new_file_type = "image_for_type";
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("admin_id", retriveAdminId);
      fd_from.append("doctor_admin_image", retriveDoctorImageSingle);
      fd_from.append("doctor_name", retriveDoctorName);
      if (dynaicimage) {
        fd_from.append("doctor_type", dynaicimage[new_file_type]);
      } else {
        fd_from.append("doctor_type", "");
      }

      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            setDynaicimage(null);
            if (caption.length !== 0) {
              alert("Post Successful");
            }
            setCaption("");
            empty_form(form_data);
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  // Show Feed or Post Page

  const updateElapsedTime = (postTimestamp) => {
    const currentTime = moment();
    const postTime = moment(postTimestamp, "DD/MM/YYYY hh:mm:ss a");
    const diffDuration = moment.duration(currentTime.diff(postTime));

    let elapsed = "";
    if (diffDuration.asMinutes() < 1) {
      elapsed = "Just now";
    } else if (diffDuration.asHours() < 1) {
      elapsed = `${Math.floor(diffDuration.asMinutes())} min `;
    } else if (diffDuration.asDays() < 1) {
      elapsed = `${Math.floor(diffDuration.asHours())} hr `;
    } else {
      elapsed = `${Math.floor(diffDuration.asDays())} days `;
    }

    return elapsed;
  };

  const togglePage = () => {
    setShowAddPostPage((prevState) => !prevState);
  };

  const [caption, setCaption] = useState("");

  const handleInputChange = (e) => {
    setCaption(e.target.value);
    e.target.style.height = "auto"; // Reset the height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Set the height to the scroll height of the content
  };

  const [showFullCaptionForPost, setShowFullCaptionForPost] = useState({});

  const toggleCaption = (index) => {
    // Toggle the state for the clicked post index
    setShowFullCaptionForPost((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    const video = document.getElementById("video");
    if (video) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // modal

  const [validationBorder, setValidationBorder] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container-lg feeds_and_post">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <DoctorHeader />
      </div>
      <div className="feeds_and_post_wrapper">
        <div className="feeds_and_post_container">
          <div className="feeds_and_post_dash_head my_patients_dash_head_container">
            <div className="back_btn_heading">
              <span>
                <div className="back_btn" onClick={() => navigate(-1)}>
                  <img src={ArrowLeft} alt="icon" />
                </div>
              </span>
              <h4 className="hds">Content Feeds</h4>
            </div>
            <div className="feedHeaderBtnContainer">
              {/* <PrimaryButtonButton
                onClick={togglePage}
                name={showAddPostPage ? "View Feed" : "Add New Post"}
              ></PrimaryButtonButton> */}
              <div className="add_new_patient_btn ">
                <button
                  className="btn"
                  name="Add New Post"
                  onClick={handleButtonClick}
                >
                  <img src={addBtn} />
                  ADD NEW POST
                </button>
              </div>

              <div className="dropdown filterBtnContainer">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Filter
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div className=" mx-3 checkBoxContainer">
                    <input
                      type="checkbox"
                      id="masterCheckbox"
                      checked={checkboxes.all}
                      onChange={() => handleCheckboxChange("all")}
                    />
                    <a className="dropdown-item ps-2 fntNanitu" href="#">
                      All
                    </a>
                  </div>
                  <div className="mx-3 checkBoxContainer">
                    <input
                      type="checkbox"
                      id="slaveCheckbox"
                      checked={checkboxes.completed}
                      onChange={() => handleCheckboxChange("completed")}
                    />
                    <a className="dropdown-item ps-2 fntNanitu" href="#">
                      Approved
                    </a>
                  </div>
                  <div className=" mx-3 checkBoxContainer">
                    <input
                      type="checkbox"
                      id="slaveCheckbox"
                      checked={checkboxes.pending}
                      onChange={() => handleCheckboxChange("pending")}
                    />
                    <a className="dropdown-item ps-2 fntNanitu" href="#">
                      Pending
                    </a>
                  </div>
                  <div className=" mx-3 checkBoxContainer">
                    <input
                      type="checkbox"
                      id="slaveCheckbox"
                      checked={checkboxes.cancelled}
                      onChange={() => handleCheckboxChange("cancelled")}
                    />
                    <a className="dropdown-item ps-2 fntNanitu" href="#">
                      Rejected
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="feeds_and_post_dash_body">
            {/* Feeds View */}
            {!showAddPostPage && (
              <div className="row">
                <div className="col-lg-12">
                  <div className="feeds_container">
                    <div className="feed_row ">
                      {goalsArray.map((item, index) => {
                        if (item.doctor_id !== retriveDoctorId) {
                          return null;
                        }

                        const shouldRender = () => {
                          if (checkboxes.all) return true;
                          if (
                            checkboxes.completed &&
                            item.approve_status === "c"
                          )
                            return true;
                          if (checkboxes.pending && item.approve_status === "e")
                            return true;
                          if (
                            checkboxes.cancelled &&
                            item.approve_status === "d"
                          )
                            return true;
                          return false;
                        };

                        if (shouldRender()) {
                          return (
                            <div
                              className="feedCardContainer col-lg-4 col-md-6 mt-4"
                              key={index}
                            >
                              <div
                                className="feed_card"
                                style={{ padding: "0 12px" }}
                              >
                                <div className="feed_card_head">
                                  <div className="feed_head_left">
                                    <img
                                      src={
                                        select_image_doctor +
                                        item.doctor_admin_image
                                      }
                                      onError={(e) => {
                                        e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                      }}
                                      alt="Doctor"
                                    />
                                    <div className="feed_head_text_left">
                                      <h6 className="hds">
                                        {item.doctor_name}
                                      </h6>
                                      <p className="feed_upload_time ">
                                        {updateElapsedTime(item.entry_date)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="feed_head_right">
                                    <p className="feed_tag hd">
                                      {item.doctor_tag}
                                    </p>
                                  </div>
                                </div>
                                <div className="feed_caption">
                                  <p
                                    className="feed_caption_text m-0 sps"
                                    style={{ lineHeight: "20px" }}
                                  >
                                    {/* {item.feed_detail} */}
                                    {showFullCaptionForPost[index]
                                      ? item.feed_detail
                                      : item.feed_detail.slice(0, 70) + "..."}
                                    {item.feed_detail.length > 100 && (
                                      <span
                                        onClick={() => toggleCaption(index)}
                                        className="caption-toggle"
                                        style={{
                                          fontSize: "14px",
                                          color: "#8C92A8",
                                          cursor: "pointer",
                                        }}
                                      >
                                        {showFullCaptionForPost[index]
                                          ? "See less"
                                          : "See more"}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="feed_content col-12">
                                  <div className="video_container">
                                    {item.feed_type === "image" ? (
                                      <img
                                        src={
                                          select_image_goal + item.feed_document
                                        }
                                        onError={(e) => {
                                          e.target.src = Errorimage; // Provide the path to your fallback image
                                        }}
                                        alt="feed"
                                      />
                                    ) : item.feed_type === "video" ? (
                                      <div className="video-container">
                                        <div
                                          className="overlay"
                                          onClick={togglePlay}
                                        ></div>
                                        <video
                                          controls
                                          className="videoSize"
                                          id="video"
                                          onEnded={() => setIsPlaying(false)} // Reset play state when the video ends
                                        >
                                          <source
                                            src={
                                              select_image_goal +
                                              item.feed_document
                                            }
                                            type="video/mp4"
                                          />
                                        </video>
                                      </div>
                                    ) : item.feed_type === "audio" ? (
                                      <audio controls>
                                        <source
                                          src={
                                            select_image_goal +
                                            item.feed_document
                                          }
                                          type="audio/mpeg"
                                        />
                                      </audio>
                                    ) : item.feed_type === "pdf" ? (
                                      <div className="pdf-preview">
                                        <iframe
                                          src={
                                            select_image_goal +
                                            item.feed_document
                                          }
                                          title="PDF Preview"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="feed_footer">
                                  <div className="like_button">
                                    <img src={LikeSvg} alt="icon" />
                                    <p> {item.total_likes} likes</p>
                                  </div>
                                </div>
                              </div>
                              {item.approve_status === "e" ? (
                                <div className="app_rjct_div">
                                  <button className=" pBtn newPBtn newStatusBtn d-flex justify-content-center align-items-center">
                                    <img src={clockIcon} className="me-2 " />
                                    Pending to be approved
                                  </button>
                                </div>
                              ) : item.approve_status === "c" ? (
                                <div className="app_rjct_div">
                                  <button className="aprBtn newAprBtn newStatusBtn">
                                    <img src={approvedIcon} className="me-2" />
                                    Approved
                                  </button>
                                </div>
                              ) : item.approve_status === "d" ? (
                                <div className="app_rjct_div">
                                  <button className="rjtBtn newRjtBtn newStatusBtn">
                                    <img src={rejectedIcon} className="me-2" />
                                    Rejected
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Create Post */}
            {showAddPostPage && (
              <div className="col-lg-8">
                <div className="post_container">
                  <form id="form_data_post">
                    <div className="post_head">
                      <div className="post_head_left">
                        <img
                          src={retriveDoctorImage}
                          onError={(e) => {
                            e.target.src = ProfileImgSample; // Provide the path to your fallback image
                          }}
                          alt="Doctor"
                        />
                        <div className="post_head_text_left">
                          <h5>{retriveDoctorName}</h5>
                          <select name="view_post" id="view_post">
                            <option value="public">Public </option>
                            <option value="private">Private</option>
                          </select>
                        </div>
                      </div>
                      <div className="post_head_right">
                        <div className="selected_post_tag">
                          <select
                            name="post_tag"
                            id="post_tag"
                            className="trio_mendate"
                          >
                            <option value="Workout">Workout</option>
                            <option value="Recipe">Recipe</option>
                            <option value="Mental Wellness">
                              Mental Wellness
                            </option>
                            <option value="Anxiety And Sleep">
                              Anxiety And Sleep
                            </option>
                            <option value="Fat Loss">Fat Loss</option>
                            <option value="Uplift Mood">Uplift Mood</option>
                            <option value="Lactation">Lactation</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="Thyroid">Thyroid</option>
                            <option value="Recipe">Recipe</option>
                            <option value="Skin Glow">Skin Glow</option>
                            <option value="Diet">Diet</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="post_body">
                      <div className="post_body_container">
                        <textarea
                          value={caption}
                          onChange={handleInputChange}
                          style={{ resize: "none", overflow: "hidden" }}
                          id="post_text_content"
                          name="post_text_content"
                          maxLength={500}
                          onInput={handleIaphabetnumberChange}
                          className="trio_mendate"
                          placeholder="What do you want to talk about? *"
                        ></textarea>
                      </div>
                      <div className="post_img_video_audio_div">
                        <div className="post_img">
                          {renderFilePreview("image_for")}
                        </div>
                      </div>
                      <div className="post_input_div">
                        <div className="post_input_types">
                          <div className="img_post_input">
                            <label htmlFor="post_image">
                              <img src={InputImgIcon} alt="icon" />
                              <p>Photo</p>
                            </label>
                            <input
                              id="post_image"
                              name="post_image"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChangedynamic(
                                "image_for",
                                "image"
                              )}
                              hidden
                            />
                          </div>
                          <div className="video_post_input">
                            <label htmlFor="post_video">
                              <img src={InputVideoIcon} alt="icon" />
                              <p>Video</p>
                            </label>
                            <input
                              id="post_video"
                              name="post_video"
                              type="file"
                              accept="video/*"
                              onChange={handleFileChangedynamic(
                                "image_for",
                                "video"
                              )}
                              hidden
                            />
                          </div>
                          <div className="audio_post_input">
                            <label htmlFor="post_audio">
                              <img src={InputAudioIcon} alt="icon" />
                              <p>Audio</p>
                            </label>
                            <input
                              id="post_audio"
                              name="post_audio"
                              type="file"
                              accept="audio/*"
                              onChange={handleFileChangedynamic(
                                "image_for",
                                "audio"
                              )}
                              hidden
                            />
                          </div>
                          <div className="pdf_post_input hidden_class">
                            <label htmlFor="post_pdf">
                              <img src={PdfImgIcon} alt="icon" />
                              <p>PDF file</p>
                            </label>
                            <input
                              id="post_pdf"
                              name="post_pdf"
                              type="file"
                              accept="pdf/*"
                              onChange={handleFileChangedynamic(
                                "image_for",
                                "pdf"
                              )}
                              hidden
                            />
                          </div>
                        </div>
                        <div className="post_cancel_post_btns">
                          <button
                            className="post_btn"
                            type="button"
                            onClick={() => navigate(0)}
                          >
                            CANCEL
                          </button>
                          <button
                            className="post_btn"
                            type="button"
                            onClick={() => {
                              if (caption.trim() === "") {
                                // Show an alert message or handle it as per your requirements
                                alert("Please write something before posting.");
                              } else {
                                handleSaveChangesdynamic(
                                  "form_data_post",
                                  post_doctor_save
                                );
                              }
                            }}
                          >
                            POST
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content feedModalContent">
              <button
                type="button"
                className="modal-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true"></span>
              </button>
              <div className="post_container">
                <form id="form_data_post">
                  <div className="post_head">
                    <div className="post_head_left">
                      <img
                        src={retriveDoctorImage}
                        onError={(e) => {
                          e.target.src = ProfileImgSample; // Provide the path to your fallback image
                        }}
                        alt="Doctor"
                      />
                      <div className="post_head_text_left">
                        <h5 className="sps">{retriveDoctorName}</h5>
                        <select name="view_post" id="view_post">
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div className="post_head_right">
                      <div className="selected_post_tag">
                        <select name="post_tag" id="post_tag">
                          <option value="Workout">Workout</option>
                          <option value="Recipe">Recipe</option>
                          <option value="Mental Wellness">
                            Mental Wellness
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="post_body">
                    <div className="post_body_container">
                      <textarea
                        value={caption}
                        onChange={handleInputChange}
                        style={{ resize: "none", overflow: "hidden" }}
                        id="post_text_content"
                        name="post_text_content"
                        maxLength={500}
                        onInput={handleIaphabetnumberChange}
                        placeholder="What do you want to talk about? *"
                        className={` textAreaStyle  ${
                          validationBorder ? "border-danger" : ""
                        }`}
                      ></textarea>
                    </div>
                    <div className="post_img_video_audio_div">
                      <div className="post_img">
                        {renderFilePreview("image_for")}
                      </div>
                    </div>
                    <div className="post_input_div">
                      <div className="post_input_types">
                        <div className="img_post_input">
                          <label htmlFor="post_image">
                            <img src={InputImgIcon} alt="icon" />
                            <p>Photo</p>
                          </label>
                          <input
                            id="post_image"
                            name="post_image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChangedynamic(
                              "image_for",
                              "image"
                            )}
                            hidden
                          />
                        </div>
                        <div className="video_post_input">
                          <label htmlFor="post_video">
                            <img src={InputVideoIcon} alt="icon" />
                            <p>Video</p>
                          </label>
                          <input
                            id="post_video"
                            name="post_video"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChangedynamic(
                              "image_for",
                              "video"
                            )}
                            hidden
                          />
                          {/* <input id='post_video' type="file" accept="video/*" onClick={handleVideoChange} hidden /> */}
                        </div>
                        <div className="audio_post_input">
                          <label htmlFor="post_audio">
                            <img src={InputAudioIcon} alt="icon" />
                            <p>Audio</p>
                          </label>
                          <input
                            id="post_audio"
                            name="post_audio"
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChangedynamic(
                              "image_for",
                              "audio"
                            )}
                            hidden
                          />
                        </div>
                        <div className="pdf_post_input hidden_class">
                          <label htmlFor="post_pdf">
                            <img src={PdfImgIcon} alt="icon" />
                            <p>PDF file</p>
                          </label>
                          <input
                            id="post_pdf"
                            name="post_pdf"
                            type="file"
                            accept="pdf/*"
                            onChange={handleFileChangedynamic(
                              "image_for",
                              "pdf"
                            )}
                            hidden
                          />
                        </div>
                      </div>
                      <div className="post_cancel_post_btns sp">
                        <button
                          className="post_btn modalCancelBtn"
                          type="button"
                          onClick={handleCloseModal}
                        >
                          CANCEL
                        </button>
                        <button
                          className="post_btn modalAddBtn sps"
                          type="button"
                          onClick={() => {
                            if (caption.trim() === "") {
                              // Show an alert message or handle it as per your requirements
                              alert("Please write something before posting.");
                            } else {
                              handleSaveChangesdynamic(
                                "form_data_post",
                                post_doctor_save
                              );
                            }
                          }}
                        >
                          POST
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorFeedsAndPost;
