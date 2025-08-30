import React, { useState, useEffect } from "react";
import Header from "./Header";
import "../Css/NutritionistHome.css";
import "../Css/loading.css";
import deleteIcon from "../Assests/images/delete.png";
import {
  APL_LINK,
  goal_master_save,
  server_post_data,
  ethi_front_master_save,
  setting_page_save,
  delete_master_data,
  ethi_testmonial_master_save,
  ethi_faq_master_save,
  ethi_package_master_save,
  update_admin_master_save,
} from "../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../LocalConnection/LocalConnection.js";
import {
  check_vaild_save,
  combiled_form_data,
} from "../CommonJquery/CommonJquery.js";

let flag_for = 0;
let for_status_final = 0;

export default function AdminSettings() {
  const [showLoader, setShowLoader] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [goalsArray, setGoalsArray] = useState([]);
  const [select_image_goal, setSelectImageGoal] = useState([]);
  const [frontGoal, setFrontGoal] = useState([]);
  const [select_image_front, setSelectImageFront] = useState([]);
  const [testmonialGoal, setTestmonialGoal] = useState([]);
  const [faqgoal, setFaqGoal] = useState([]);
  const [select_image_testmonialGoal, setSelectImageTestmonialGoal] = useState(
    []
  );
  const [packagegoal, setPackageGoal] = useState([]);
  const [adminGoal, setAdminGoal] = useState([]);
  const [select_image_admin, setSelectImageAdmin] = useState([]);
  const [dynaicimage, setDynaicimage] = useState(null);
  const [featuresCount, setFeaturesCount] = useState(1);

  useEffect(() => {
    const retrieveDatafind = retrieveData("user_email");

    if (retrieveDatafind === null) {
      //      navigate('/login');
    } else {
      //    navigate('/Welcomepage');
    }
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(setting_page_save, fd)
      .then((Response) => {
        setGoalsArray(Response.data.data_goal);
        setSelectImageGoal(APL_LINK + Response.data.data_goal_image);

        setFrontGoal(Response.data.data_front);
        setSelectImageFront(APL_LINK + Response.data.data_front_image);
        setTestmonialGoal(Response.data.data_testmonial);
        setSelectImageTestmonialGoal(
          APL_LINK + Response.data.data_testmonial_image
        );
        setFaqGoal(Response.data.data_faq);

        setPackageGoal(Response.data.data_package);
        setAdminGoal(Response.data.data_admin[0]);
        setSelectImageAdmin(APL_LINK + Response.data.data_admin_image);

        setDynaicimage((prevImages) => ({
          ...prevImages,
          doctor_image: select_image_admin + adminGoal.doctor_image,
          doctor_image_show: select_image_admin + adminGoal.doctor_image,
        }));
        setDynaicimage((prevImages) => ({
          ...prevImages,
          apple_image: select_image_admin + adminGoal.apple_image,
          apple_image_show: select_image_admin + adminGoal.apple_image,
        }));
        setDynaicimage((prevImages) => ({
          ...prevImages,
          front_video_link: select_image_admin + adminGoal.front_video_link,
          front_video_link_show:
            select_image_admin + adminGoal.front_video_link,
        }));
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleFileChangedynamic = (keyname) => (event) => {
    const file = event.target.files[0];

    let new_file_name = keyname + "_show";

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      setDynaicimage((prevImages) => ({
        ...prevImages,
        [keyname]: null,
        [new_file_name]: null,
      }));
    }
  };

  // Function to handle the delete icon click
  const handleDeleteIconClick = (goalId, for_set, for_status) => {
    flag_for = for_set;
    for_status_final = for_status;
    setSelectedGoalId(goalId);
  };

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async (packageId) => {
    if (flag_for !== 0) {
      setShowLoader(true);
      const fd = new FormData();
      if (packageId === 0) {
        fd.append("id_for_delete", selectedGoalId);
      } else {
        fd.append("id_for_delete", packageId);
      }

      fd.append("flag_for", flag_for);
      fd.append("for_status_final", for_status_final);
      await server_post_data(delete_master_data, fd)
        .then((Response) => {
          setShowLoader(false);
          setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
          if (packageId === 0) {
            master_data_get();
          }
        })
        .catch((error) => {
          console.log(error);
          setShowLoader(false);
        });
    }
  };

  // Function to handle the delete operation for the selected goal
  const closepopup = () => {
    if (selectedGoalId !== null) {
      setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
    }
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.message) {
            alert(Response.data.message);
          } else {
            const closeButton = document.querySelector(
              "#" + form_data + ' [data-dismiss="modal"]'
            );

            if (closeButton) {
              closeButton.click();
            }
            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error);
        });
    }
  };

  const featureInputs = [];
  for (let i = 2; i <= featuresCount; i++) {
    featureInputs.push(
      <input
        key={i}
        placeholder={`Feature ${i}`}
        name={`feature_${i}`}
        className="p-2 my-2 trio_mendate"
      />
    );
  }

  const handleAddFeatureClick = () => {
    if (featuresCount < 5) {
      setFeaturesCount(featuresCount + 1);
    }
  };

  const [toggleStates, setToggleStates] = useState({});
  const handleToggleChange = (packageId) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [packageId]: !prevState[packageId],
    }));
    flag_for = 6;
    setSelectedGoalId(packageId);
    if (toggleStates[packageId]) {
      for_status_final = 0;
    } else {
      for_status_final = 1;
    }
    handleDeleteConfirmed(packageId);
  };

  const handleTextareaChange = (keyname) => (event) => {
    // Update the state when the textarea content changes
    setAdminGoal({
      ...adminGoal,
      [keyname]: event.target.value,
    });
  };

  return (
    <div className="container-lg nutritionist_home">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <Header />
      </div>
      <div className="dashboard mt-4">
        <div className="dashboard_wrapper">
          <div className="dashboard_container row">
            <div className="col-lg-12 m-0">
              {/* tracking/Counts cards */}

              {/* Upcoming appointments list */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3>Goals</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#addNewGoal"
                        >
                          +Add Goals
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <ul>
                        {goalsArray.map((item, index) => (
                          <li
                            className="d-flex addedGoalsList my-3 "
                            key={index}
                          >
                            <div className="d-flex addedGoalsContainer ActiveGoal">
                              <img
                                className="goalsIimg"
                                src={select_image_goal + item.goal_image}
                                alt="goals"
                              />
                              <div className="ml-3">
                                <h4 className="goalTitleAdd">
                                  {item.goal_name}
                                </h4>
                                <p className="goalDesAdd m-0">
                                  {item.goal_details}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <img
                                className="deleteIcon"
                                src={deleteIcon}
                                alt="delete"
                                data-toggle="modal"
                                data-target="#deleteGoalPopup"
                                onClick={() =>
                                  handleDeleteIconClick(item._id, 1, 0)
                                }
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Patients list */}
              {/* Upcoming appointments list */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3>What You will get from ETHI</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#getFromEthi"
                        >
                          +Add
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <ul>
                        {frontGoal.map((item, index) => (
                          <li
                            className="d-flex addedGoalsList my-3"
                            key={index}
                          >
                            <div className="d-flex addedGoalsContainer ActiveGoal">
                              <img
                                className="goalsIimg"
                                src={select_image_front + item.front_image}
                                alt="goals"
                              />
                              <img
                                className="goalsIimg goalsIimg2"
                                src={select_image_front + item.front_icon_image}
                                alt="goals"
                              />
                              <div className="ml-3">
                                <h4 className="goalTitleAdd">
                                  {item.front_name}
                                </h4>
                                <p className="goalDesAdd m-0">
                                  {item.front_detail}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <img
                                className="deleteIcon"
                                src={deleteIcon}
                                alt="delete"
                                data-toggle="modal"
                                data-target="#deleteGoalPopup"
                                onClick={() =>
                                  handleDeleteIconClick(item._id, 2, 0)
                                }
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3>Testimonials</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#testimonialsPopup"
                        >
                          +Add
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="row testHeadContainer">
                        {testmonialGoal.map((testimonial, index) => (
                          <div
                            key={index}
                            className="col-md-3 text-center testContainer m-2"
                          >
                            <img
                              className="deleteIcon"
                              src={deleteIcon}
                              alt="delete"
                              data-toggle="modal"
                              data-target="#deleteGoalPopup"
                              onClick={() =>
                                handleDeleteIconClick(testimonial._id, 3, 0)
                              }
                            />
                            {testimonial.image_name && (
                              <img
                                className="testImg"
                                src={
                                  select_image_testmonialGoal +
                                  testimonial.image_name
                                }
                                alt="testimonials"
                              />
                            )}
                            <h4>{testimonial.title_name}</h4>
                            <p>{testimonial.full_detail}</p>
                            <p className="testAuthor">
                              {testimonial.author_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Data */}

              {/* FAQ table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3> FAQ's</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#faqAdd"
                        >
                          +Add
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>S No.</th>
                              <th>Question</th>
                              <th>Answer</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {faqgoal.map((faq, index) => (
                              <tr key={faq._id}>
                                <td>{index + 1}</td>
                                <td>{faq.question_name}</td>
                                <td>{faq.answer_name}</td>
                                <td>
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(faq._id, 4, 0)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ table Data */}
              {/* FAQ table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3> Master</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#masterCardEdit"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Modal Edit Master */}
                    <div
                      className="modal fade"
                      id="masterCardEdit"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="masterCardEditTitle"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalLongTitle"
                            >
                              Edit Master
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <form id="form_data_admin">
                            <div className="modal-body">
                              <div className="borderBottomDiv mb-3">
                                <h6>First Card</h6>
                                <div>
                                  <div className="my-3 firstCardEdit">
                                    <p className="circleNo">1.</p>
                                    <div className="my-2 divEditFile">
                                      <input
                                        className="inputEditFile"
                                        type="file"
                                        name="doctor_image"
                                        onChange={handleFileChangedynamic(
                                          "doctor_image"
                                        )}
                                        accept=".jpg,.jpeg,.png"
                                      />
                                      <input
                                        className="inputEditFile trio_mendate"
                                        type="hidden"
                                        value={adminGoal.doctor_image}
                                        name="doctor_image_old"
                                      />
                                      <div className="previewEditBox">
                                        {dynaicimage &&
                                          dynaicimage.doctor_image_show && (
                                            <img
                                              src={
                                                dynaicimage.doctor_image_show
                                              }
                                              alt="Preview"
                                              className="imgEditMaster"
                                            />
                                          )}

                                        <p className="m-0">Preview</p>
                                      </div>
                                    </div>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.doctor_detail}
                                      type="text"
                                      name="doctor_detail"
                                      onChange={handleTextareaChange(
                                        "doctor_detail"
                                      )} // Listen to textarea changes
                                      placeholder="Enter Text"
                                      rows={2}
                                      cols={50}
                                    />
                                  </div>

                                  <div className="my-3 firstCardEdit">
                                    <p className="circleNo">2.</p>
                                    <div className="my-2 divEditFile">
                                      <input
                                        className="inputEditFile"
                                        type="file"
                                        name="apple_image"
                                        onChange={handleFileChangedynamic(
                                          "apple_image"
                                        )}
                                        accept=".jpg,.jpeg,.png"
                                      />
                                      <input
                                        className="inputEditFile trio_mendate"
                                        type="hidden"
                                        value={adminGoal.apple_image}
                                        name="apple_image_old"
                                      />
                                      <div className="previewEditBox">
                                        {dynaicimage &&
                                          dynaicimage.apple_image_show && (
                                            <img
                                              src={dynaicimage.apple_image_show}
                                              alt="Preview"
                                              className="imgEditMaster"
                                            />
                                          )}
                                        <p className="m-0">Preview</p>
                                      </div>
                                    </div>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.apple_detail}
                                      type="text"
                                      name="apple_detail"
                                      onChange={handleTextareaChange(
                                        "apple_detail"
                                      )} // Listen to textarea changes
                                      placeholder="Enter Text"
                                      readOnly={false} // This attribute can be omitted since it's true by default
                                      rows={2}
                                      cols={50}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="borderBottomDiv mb-3">
                                <h6>Second Card</h6>
                                <div className="row secondCardWrapper mx-2">
                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">1.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="number"
                                      name="front_first_card_per"
                                      onChange={handleTextareaChange(
                                        "front_first_card_per"
                                      )} // Listen to textarea changes
                                      value={adminGoal.front_first_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_first_card_detail}
                                      type="text"
                                      name="front_first_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_first_card_detail"
                                      )} // Listen to textarea changes
                                      placeholder="Enter Text"
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">2.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="number"
                                      name="front_sec_card_per"
                                      onChange={handleTextareaChange(
                                        "front_sec_card_per"
                                      )} // Listen to textarea changes
                                      value={adminGoal.front_sec_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_sec_card_detail}
                                      type="text"
                                      name="front_sec_card_detail"
                                      placeholder="Enter Text"
                                      onChange={handleTextareaChange(
                                        "front_sec_card_detail"
                                      )} // Listen to textarea changes
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">3.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="number"
                                      name="front_third_card_per"
                                      onChange={handleTextareaChange(
                                        "front_third_card_per"
                                      )} // Listen to textarea changes
                                      value={adminGoal.front_third_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1"
                                      value={adminGoal.front_third_card_detail}
                                      type="text"
                                      name="front_third_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_third_card_detail"
                                      )} // Listen to textarea changes
                                      placeholder="Enter Text trio_mendate"
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">4.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="number"
                                      name="front_four_card_per"
                                      onChange={handleTextareaChange(
                                        "front_four_card_per"
                                      )} // Listen to textarea changes
                                      value={adminGoal.front_four_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_four_card_detail}
                                      type="text"
                                      name="front_four_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_four_card_detail"
                                      )} // Listen to textarea changes
                                      placeholder="Enter Text"
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="borderBottomDiv mb-3">
                                <h6>Video</h6>
                                <div className="row videoWrapper">
                                  <input
                                    className="col-md-6"
                                    type="file"
                                    name="front_video_link"
                                    onChange={handleFileChangedynamic(
                                      "front_video_link"
                                    )}
                                    accept=".mp4"
                                  />
                                  <input
                                    className="inputEditFile trio_mendate"
                                    type="hidden"
                                    value={adminGoal.front_video_link}
                                    name="front_video_link_old"
                                  />

                                  {dynaicimage &&
                                    dynaicimage.front_video_link_show && (
                                      <video
                                        className="col-md-6 my-3 videoPreview"
                                        controls
                                        src={dynaicimage.front_video_link_show}
                                      />
                                    )}
                                </div>
                                <textarea
                                  value={adminGoal.front_video_text}
                                  type="text"
                                  placeholder="Enter Text"
                                  rows={5}
                                  name="front_video_text"
                                  onChange={handleTextareaChange(
                                    "front_video_text"
                                  )} // Listen to textarea changes
                                  className="textVideoEdit p-1 mb-3 trio_mendate"
                                />
                              </div>
                              <div className="borderBottomDiv mb-3">
                                <h6>Front Why Us</h6>
                                <textarea
                                  className="p-1 mb-3 textVideoEdit trio_mendate"
                                  value={adminGoal.front_why_us}
                                  name="front_why_us"
                                  onChange={handleTextareaChange(
                                    "front_why_us"
                                  )} // Listen to textarea changes
                                  type="text"
                                  rows={3}
                                />
                              </div>
                              <div className="borderBottomDiv mb-3">
                                <h6>Front Calling Number</h6>
                                <input
                                  className="p-1 mb-3 trio_mendate"
                                  value={adminGoal.front_calling_no}
                                  name="front_calling_no"
                                  onChange={handleTextareaChange(
                                    "front_calling_no"
                                  )} // Listen to textarea changes
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveChangesdynamic(
                                    "form_data_admin",
                                    update_admin_master_save
                                  )
                                }
                                className="btn btn-primary"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Modal Edit Master */}

                    <div className="list_items">
                      <div className="">
                        <div className="firstCard row my-3">
                          <h6 className="mx-2">First Card</h6>
                          <div className="col-md-4 mx-3 p-3">
                            <img
                              src={select_image_admin + adminGoal.doctor_image}
                              alt="doctor"
                            />
                            <p>{adminGoal.doctor_detail}</p>
                          </div>
                          <div className="col-md-4 mx-3 p-3">
                            <img
                              src={select_image_admin + adminGoal.apple_image}
                              alt="doctor"
                            />
                            <p>{adminGoal.apple_detail}</p>
                          </div>
                        </div>

                        <div className="secondCard row my-3">
                          <h6 className="mx-2">Second Card</h6>
                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_first_card_per}%
                            </p>
                            <p>{adminGoal.front_first_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_sec_card_per}%
                            </p>
                            <p>{adminGoal.front_sec_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_third_card_per}%
                            </p>
                            <p>{adminGoal.front_third_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_four_card_per}%
                            </p>
                            <p>{adminGoal.front_four_card_detail}</p>
                          </div>
                        </div>

                        <div className="thirdCard row my-3">
                          <h6 className="mx-2">Video</h6>
                          <div className="row textVideoWrapper">
                            <video
                              className="col-md-4 my-3"
                              controls
                              src={
                                select_image_admin + adminGoal.front_video_link
                              }
                            />
                            <div className="col-md-6">
                              <h6>Text Below Video</h6>
                              <p>{adminGoal.front_video_text}</p>
                            </div>
                          </div>
                        </div>

                        <div className="thirdCard row my-3">
                          <div className="col-md-8">
                            <h6 className="mx-2">Front Why Us</h6>
                            <div className="row textVideoWrapper">
                              <p className="mx-2">{adminGoal.front_why_us}</p>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mx-2">Front Calling Number</h6>
                            <div className="row textVideoWrapper">
                              <p className="mx-2">
                                {adminGoal.front_calling_no}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master End */}

              {/* Price table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3>Package Price</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#priceAdd"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Edit Package pla */}

                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table priceTable">
                          <thead>
                            <tr>
                              <th>S No.</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Month</th>
                              <th>days</th>
                              <th>Features</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {packagegoal.map((package_ii, index) => (
                              <tr key={package_ii._id}>
                                <td>{index + 1}</td>
                                <td>{package_ii.package_name}</td>
                                <td>{package_ii.package_price}</td>
                                <td>{package_ii.package_month_plan}</td>
                                <td>{package_ii.package_days}</td>
                                <td>
                                  <ul>
                                    <li>{package_ii.first_facility}</li>
                                    <li>{package_ii.sec_facility}</li>
                                    <li>{package_ii.thrid_facility}</li>
                                    <li>{package_ii.four_facility}</li>
                                    <li>{package_ii.five_facility}</li>
                                  </ul>
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    id={`switch-${package_ii._id}`}
                                    checked={package_ii.status_for === "0"}
                                    onChange={() =>
                                      handleToggleChange(package_ii._id)
                                    }
                                  />
                                  <label htmlFor={`switch-${package_ii._id}`}>
                                    Toggle
                                  </label>
                                </td>
                                <td>
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(
                                        package_ii._id,
                                        5,
                                        0
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Price table Data */}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Goals by Arsalan @27-07-2023 */}

      <div
        className="modal fade"
        id="addNewGoal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addNewGoalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add New Goals
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Goal Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for"
                      onChange={handleFileChangedynamic("image_for")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_show && (
                      <img
                        src={dynaicimage.image_for_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label>Add Goal Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Title"
                  />
                </div>
                <div>
                  <label>Add Goal Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Description"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleSaveChangesdynamic("form_data", goal_master_save)
                  }
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End Add New Goals by Arsalan @27-07-2023 */}

      {/*What you will get by Arsalan @31-07-2023 */}

      <div
        className="modal fade"
        id="getFromEthi"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="getFromEthiTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                What you will get from ETHI
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data2">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Icon Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_ethi"
                      onChange={handleFileChangedynamic("image_for_ethi")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_ethi_show && (
                      <img
                        src={dynaicimage.image_for_ethi_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="fileUploadDiv">
                  <label>Add Popup Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_popup"
                      onChange={handleFileChangedynamic("image_for_popup")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_popup_show && (
                      <img
                        src={dynaicimage.image_for_popup_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label>Add Popup Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Title"
                  />
                </div>
                <div>
                  <label>Add Popup Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Description"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data2",
                      ethi_front_master_save
                    )
                  }
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End What you will get by Arsalan @31-07-2023 */}

      {/*Testimonials by Arsalan @02-08-2023 */}

      <div
        className="modal fade"
        id="testimonialsPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="cardGetItemTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Testimonials
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_tes">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_tes"
                      onChange={handleFileChangedynamic("image_for_tes")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_tes_show && (
                      <img
                        src={dynaicimage.image_for_tes_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label>Add Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Title"
                  />
                </div>
                <div>
                  <label>Add Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Description"
                  />
                </div>
                <div>
                  <label>Add Author Name</label> <br />
                  <input
                    type="text"
                    name="authorname"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Author Name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_tes",
                      ethi_testmonial_master_save
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End Testimonials by Arsalan @02-08-2023 */}

      {/* FAQ by Arsalan @01-08-2023 */}

      <div
        className="modal fade"
        id="faqAdd"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="cardGetItemTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                FAQ's
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_faq">
              <div className="modal-body addNewGoalsDiv">
                <div>
                  <label>Question</label> <br />
                  <input
                    type="text"
                    name="question"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Type Question"
                  />
                </div>
                <div>
                  <label>Answer</label> <br />
                  <textarea
                    name="answer"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Type Answer"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_faq",
                      ethi_faq_master_save
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* FAQ by Arsalan @01-08-2023 */}

      {/* Package by Shubham jain @09-08-2023 */}
      <div
        className="modal fade"
        id="priceAdd"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Plan Package
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_package">
              <div className="modal-body">
                <div className="row editPackageWrapper">
                  <div className="col-md-6 my-2">
                    <h6>Package Name</h6>
                    <input
                      className="p-2 trio_mendate"
                      type="text"
                      name="package_name"
                      placeholder="Enter Package Name"
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Price</h6>
                    <input
                      className="p-2 trio_mendate"
                      type="number"
                      name="package_price"
                      placeholder="Enter Price"
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Month</h6>
                    <input
                      type="number"
                      name="package_month_plan"
                      placeholder="Enter Month"
                      className="p-2 trio_mendate"
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Days</h6>
                    <input
                      type="number"
                      name="package_days"
                      placeholder="Enter Days"
                      className="p-2 trio_mendate"
                    />
                  </div>
                  <div className="col-md-12 my-2">
                    <h6>Features</h6>
                    <input
                      key="1"
                      placeholder="Feature 1"
                      name="feature_1"
                      className="p-2 my-2 trio_mendate"
                    />
                    {featureInputs}
                    {featuresCount < 5 && (
                      <p
                        className="my-2"
                        style={{
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={handleAddFeatureClick}
                      >
                        Add another feature
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_package",
                      ethi_package_master_save
                    )
                  }
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Package by Shubham jain @09-08-2023 */}

      {/* Delete Goals Popup by Arsalan @27-07-2023 */}
      <div
        className="modal fade"
        id="deleteGoalPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGoalPopupTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure, you want to delete this Record?
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
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirmed(0)}
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Delete Goals Popup by Arsalan @27-07-2023 */}
    </div>
  );
}
