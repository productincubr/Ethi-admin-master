import React, { useState, useEffect } from "react";
// import Modal from "react-modal"
import { useNavigate } from "react-router-dom";
import "../../Css/FeedsAndPost.css";
import "../../Css/loading.css";
import PrimaryButtonButton from "../RepeatingComponents/PrimaryButton";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import InputImgIcon from "../../Assests/images/input_img_icon.svg";
import InputVideoIcon from "../../Assests/images/input_video_icon.svg";
import InputAudioIcon from "../../Assests/images/input_audio_icon.svg";
import PdfImgIcon from "../../Assests/images/pdf_icon.png";
import CrossIcon from "../../Assests/images/Icons.png";
import checkmark from "../../Assests/images/checkmark.png";
import Errorimage from "../../Assests/images/error.png";
import "bootstrap/dist/css/bootstrap.min.css";
import LikeSvg from "../../Assests/images/like.svg";
import SearchIcon from "../../Assests/images/search_icon.svg";
import addBtn from "../../Assests/images/add_svg.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import {
  APL_LINK,
  post_doctor_save,
  server_post_data,
  post_doctor_get,
  delete_master_data,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleIaphabetnumberChange,
} from "../../CommonJquery/CommonJquery.js";
import AdminHeader from "./AdminHeader";
import moment from "moment";

let for_status_final = "c";
function AdminFeed() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Back button
  const navigate = useNavigate();
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retriveAdminId, setRetriveAdminId] = useState("");
  const [retriveDoctorName, setretriveDoctorName] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [retriveAdminImage, setRetriveAdminImage] = useState("");
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [goalsArray, setGoalsArray] = useState([]);
  const [select_image_goal, setSelectImageGoal] = useState([]);
  const [select_image_doctor, setSelectImageDoctor] = useState([]);
  const [selectedFeedId, setSelectedFeedId] = useState("");
  const [validationBorder, setValidationBorder] = useState(false);
  const [selectedchnageText, setSelectedchnageText] = useState("");
  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrieveData("doctor_id"));
    setRetriveAdminId(retrieveData("admin_id"));
    setretriveDoctorName(retrieveData("admin_name"));
    setRetriveAdminImage(retrieveData("admin_image_single"));
    setRetriveDoctorImage(retrieveData("admin_image"));
    master_data_feeds(retrievedDoctorId);
  }, []);

  const master_data_feeds = async (retrievedDoctorId_ss) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId_ss);
    await server_post_data(post_doctor_get, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setGoalsArray(Response.data.message.data_ethi_feeds_master);
          console.log(
            "dddddddddd",
            Response.data.message.data_ethi_feeds_master
          );
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
      // setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("admin_id", retriveAdminId);
      fd_from.append("doctor_admin_image", retriveAdminImage);
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
              alert("Success! Your post is live!");
            } else {
              setValidationBorder(true);
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
  const [showAddPostPage, setShowAddPostPage] = useState(false);

  const togglePage = () => {
    setShowAddPostPage((prevState) => !prevState);
  };

  const [caption, setCaption] = useState("");

  const handleInputChange = (e) => {
    setCaption(e.target.value);
    setValidationBorder(false);
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

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async () => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("flag_for", "7");
    fd.append("id_for_delete", selectedFeedId);
    fd.append("for_status_final", for_status_final);

    await server_post_data(delete_master_data, fd)
      .then((Response) => {
        setShowLoader(false);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          master_data_feeds(retriveDoctorId);
        }
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
      });
  };

  // Function to handle the delete operation for the selected goal
  const closepopup = () => {
    if (selectedFeedId !== null) {
      setSelectedFeedId(null); // Clear the selectedGoalId to close the delete popup
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

  // Function to handle the delete icon click
  const handleDeleteIconClick = (feedId, for_set, chnage_text) => {
    for_status_final = for_set;
    setSelectedFeedId(feedId);
    setSelectedchnageText(chnage_text);
  };

  const [buttonStates, setButtonStates] = useState({
    fatLoss: true,
    workout: true,
    anxietyAndSleep: true,
    upliftMood: true,
    lactation: true,
    muscleGain: true,
    thyroid: true,
    recipe: true,
    skinGlow: true,
    diet: true,
  });

  const handleButtonClick1 = (buttonName) => {
    setButtonStates((prevStates) => ({
      ...prevStates,
      [buttonName]: !prevStates[buttonName],
    }));
  };

  return (
    <div className="container-lg feeds_and_post">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="feeds_and_post_wrapper">
        <div className="feeds_and_post_container">
          <div className="d-flex contHead">
            <div className="feeds_and_post_dash_head my_patients_dash_head_container">
              <div className="back_btn_heading">
                {/* <div className="back_button">
                  <div className="back_btn" onClick={() => navigate(-1)}>
                    <img src={ArrowLeft} alt="icon" />
                  </div>
                </div> */}
                <div className="page_heading">
                  <h3 className="fntNanitu mrgbtmZero">Content Feeds</h3>
                </div>
              </div>
            </div>
            <div className="d-flex addNPost">
              <div>
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
                  className="dropdown-menu filterDropdown"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div>
                    <div className="my_patients_search_bar2 d-flex">
                      <img
                        className="search_bar_icon"
                        src={SearchIcon}
                        alt="icon"
                      />
                      <input
                        className="serach_bar"
                        type="text"
                        placeholder="Searching By Tags"
                      />
                    </div>
                    <div className="upload_btns_div1 col-12 ">
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.fatLoss ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("fatLoss")}
                      >
                        Fat Loss
                      </button>
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.workout ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("workout")}
                      >
                        Workout
                      </button>
                    </div>
                    <div className="upload_btns_div1 col-12">
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.anxietyAndSleep ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("anxietyAndSleep")}
                      >
                        Anxiety & Sleep
                      </button>
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.upliftMood ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("upliftMood")}
                      >
                        Uplift Mood
                      </button>
                    </div>
                    <div className="upload_btns_div1 col-12 ">
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.lactation ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("lactation")}
                      >
                        Lactation
                      </button>
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.muscleGain ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("muscleGain")}
                      >
                        Muscle gain
                      </button>
                    </div>
                    <div className="upload_btns_div1 col-12 ">
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.thyroid ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("thyroid")}
                      >
                        Thyroid
                      </button>
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.recipe ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("recipe")}
                      >
                        Recipe
                      </button>
                    </div>
                    <div className="upload_btns_div1 col-12 ">
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.skinGlow ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("skinGlow")}
                      >
                        Skin Glow
                      </button>
                      <button
                        type="button"
                        className={`upload_list_upload_btn123 ${
                          buttonStates.diet ? "clicked" : ""
                        }`}
                        onClick={() => handleButtonClick1("diet")}
                      >
                        Diet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feeds_and_post_dash_body">
            <div className="row">
              {/* Feeds View */}
              {!showAddPostPage && (
                <div className="row">
                  <div className="col-lg-12">
                    <div className="feeds_container">
                      <div className="feed_row">
                        {goalsArray.map((item, index) => {
                          if (
                            (item.doctor_tag === "Fat Loss" &&
                              buttonStates.fatLoss) ||
                            (item.doctor_tag === "Workout" &&
                              buttonStates.workout) ||
                            (item.doctor_tag === "Anxiety And Sleep" &&
                              buttonStates.anxietyAndSleep) ||
                            (item.doctor_tag === "Uplift Mood" &&
                              buttonStates.upliftMood) ||
                            (item.doctor_tag === "Lactation" &&
                              buttonStates.lactation) ||
                            (item.doctor_tag === "Muscle Gain" &&
                              buttonStates.muscleGain) ||
                            (item.doctor_tag === "Thyroid" &&
                              buttonStates.thyroid) ||
                            (item.doctor_tag === "Recipe" &&
                              buttonStates.recipe) ||
                            (item.doctor_tag === "Skin Glow" &&
                              buttonStates.skinGlow) ||
                            (item.doctor_tag === "Diet" && buttonStates.diet)
                          )
                            return (
                              <div
                                className="col-md-4 col-sm-6 col-12 mt-4 feedCard "
                                key={index}
                              >
                                <div className="feed_card">
                                  {item.approve_status === "e" ? (
                                    <div className="app_rjct_div app_rjct_div1 ">
                                      <button
                                        className="aprBtn aprBTn"
                                        data-toggle="modal"
                                        data-target="#deleteGoalPopup"
                                        onClick={() =>
                                          handleDeleteIconClick(
                                            item._id,
                                            "c",
                                            "Approve"
                                          )
                                        }
                                      >
                                        <div className="d-flex crsout">
                                          <div className="crsimg crsimg1 ">
                                            <img src={checkmark} />
                                          </div>
                                          <div> Approve</div>
                                        </div>
                                      </button>
                                      <button
                                        className="rjtBtn rejectAdminBtn"
                                        data-toggle="modal"
                                        data-target="#deleteGoalPopup"
                                        onClick={() =>
                                          handleDeleteIconClick(
                                            item._id,
                                            "d",
                                            "Reject"
                                          )
                                        }
                                      >
                                        <div className="d-flex crsout">
                                          <div className="crsimg ">
                                            <img src={CrossIcon} />
                                          </div>
                                          <div> Disapprove</div>
                                        </div>
                                      </button>
                                    </div>
                                  ) : item.approve_status === "c" ? (
                                    <div className="app_rjct_div app_rjct_div1">
                                      <button className="aprBtn approveAdminBtn">
                                        <div className="d-flex crsout">
                                          <div className="crsimg crsimg1 ">
                                            <img src={checkmark} />
                                          </div>
                                          <div> Approved</div>
                                        </div>
                                      </button>
                                    </div>
                                  ) : item.approve_status === "d" ? (
                                    <div className="app_rjct_div app_rjct_div1">
                                      <button className="rjtBtn">
                                        <div className="d-flex crsout">
                                          <div className="crsimg ">
                                            <img src={CrossIcon} />
                                          </div>
                                          <div> Rejected</div>
                                        </div>
                                      </button>
                                    </div>
                                  ) : null}

                                  <div className="feed_card_head mx-2">
                                    <div className="feed_head_left">
                                      <img
                                        src={
                                          select_image_doctor +
                                          item.doctor_admin_image
                                        }
                                        onError={(e) => {
                                          e.target.src = Errorimage; // Provide the path to your fallback image
                                        }}
                                        alt="Doctor"
                                      />
                                      <div className="feed_head_text_left">
                                        <h6 className="hd">
                                          {item.doctor_name}
                                        </h6>
                                        <p className="feed_upload_time">
                                          {updateElapsedTime(item.entry_date)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="feed_head_right">
                                      <p className="feed_tag">
                                        {item.doctor_tag}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="feed_caption mx-2">
                                    <p
                                      className="feed_caption_text m-0 hds"
                                      style={{ lineHeight: "20px" }}
                                    >
                                      {/* {item.feed_detail} */}
                                      {showFullCaptionForPost[index]
                                        ? item.feed_detail
                                        : item.feed_detail.slice(0, 100) +
                                          "..."}
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
                                            select_image_goal +
                                            item.feed_document
                                          }
                                          onError={(e) => {
                                            e.target.src = Errorimage; // Provide the path to your fallback image
                                          }}
                                          alt="feed"
                                        />
                                      ) : item.feed_type === "video" ? (
                                        <>
                                          <video
                                            controls
                                            className="videoSize"
                                            id="video"
                                          >
                                            <source
                                              src={
                                                select_image_goal +
                                                item.feed_document
                                              }
                                              type="video/mp4"
                                            />
                                          </video>
                                        </>
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
                              </div>
                            );
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
                              <option value="public">Public</option>
                              <option value="private">Private</option>
                            </select>
                          </div>
                        </div>
                        <div className="post_head_right">
                          <div className="selected_post_tag">
                            <select
                              name="post_tag"
                              id="post_tag "
                              className="sngebgclr"
                            >
                              <option value="Workout">Workout</option>
                              <option value="Recipe">Recipe</option>

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
                            placeholder="What do you want to talk about?"
                            className={`border  ${
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
                            <div className="pdf_post_input ">
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
                          <div className="post_cancel_post_btns fntNanitu">
                            <button
                              className="post_btn"
                              type="button"
                              onClick={() => navigate(0)}
                            >
                              CANCEL
                            </button>
                            <button
                              className="post_btn fntNanitu"
                              type="button"
                              onClick={() =>
                                handleSaveChangesdynamic(
                                  "form_data_post",
                                  post_doctor_save
                                )
                              }
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
      </div>
      <div
        className="modal fade"
        id="deleteGoalPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGoalPopupTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content feedModalContent">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure, you want to {selectedchnageText} this Post?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closepopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn modalCancelBtn fntNanitu"
                data-dismiss="modal"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button "
                onClick={handleDeleteConfirmed}
                className="btn modalAddBtn fntNanitu"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="deleteGoalPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGoalPopupTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content feedModalContent">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure, you want to {selectedchnageText} this Post?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closepopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary fntNanitu"
                data-dismiss="modal"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="btn btn-primary fntNanitu"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content feedModalContent">
              {/* <button
                style={{ backgroundColor: "white" }}
                type="button"
                className="modal-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
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
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                    </div>
                    <div className="post_head_right">
                      <div className="selected_post_tag">
                        <select
                          name="post_tag"
                          id="post_tag"
                          className="sngebgclr"
                        >
                          <option value="Workout">Workout</option>
                          <option value="Recipe">Recipe</option>
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
                        placeholder="What do you want to talk about? *"
                        className={`border  ${
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
                        <div className="pdf_post_input">
                          <label htmlFor="post_pdf">
                            <img src={PdfImgIcon} alt="icon" />
                            <p>Document</p>
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
                          className="post_btn  modalCancelBtn fntNanitu"
                          type="button"
                          onClick={handleCloseModal}
                        >
                          CANCEL
                        </button>
                        <button
                          className="post_btn modalAddBtn fntNanitu"
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

export default AdminFeed;
