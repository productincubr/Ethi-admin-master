import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import "../../Css/NutritionistHome.css";
import Filter from "../../Assests/images/filter_svg.svg";
import searchIcon from "../../Assests/images/searchIcon.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  welcome_doctor,
  server_post_data,
  APL_LINK,
  cancel_appointment_by_doctor,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";

export default function DoctorWelcomepage() {
  const navigate = useNavigate();
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [patients, setPatients] = useState([]);
  const [charts, setCharts] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [clickedAppointIndex, setClickedAppointIndex] = useState(null);

  let noOfCalling = 0; // Parse as integer
  let makeofCalling = 0; // Parse as integer
  let makeofCallingper = "100%"; // Parse as integer

  const [patientSearchValue, setPatientTabSearchValue] = useState("");
  const [searchedPatients, setSearchedPatients] = useState([]);

  const handleCurrentTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setPatientTabSearchValue(searchInput);

    // Filter patients for "Current Patients" tab based on the search input value
    if (searchInput.trim() !== "" && patients) {
      const filtered = patients.filter((patient) => {
        return patient.customer_name.toLowerCase().includes(searchInput);
      });
      setSearchedPatients(filtered);
    } else {
      setSearchedPatients([]);
    }
  };

  const handleChatClick = () => {
    //click on chart
    navigate("/doctor_chats");
  };

  const handlecallgo = (customer_id) => {
    //click on chart
    navigate("/doctor_video_call/" + customer_id);
  };

  // Camcelled Button

  const openModal = (index) => {
    setClickedAppointIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    master_data_get(retrievedDoctorId);
  }, []);

  const master_data_get = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(welcome_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setUpcomingAppoint(Response.data.message.data_appointment);
          setPatients(Response.data.message.data_customer_data);
          setCharts(Response.data.message.data_chart);
          console.log(Response.data.message.data_customer_data);
          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setShowLoader(false);
      });
  };

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async () => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("appointment_id", clickedAppointIndex);
    fd.append("doctor_id", retriveDoctorId);
    await server_post_data(cancel_appointment_by_doctor, fd)
      .then((Response) => {
        setShowLoader(false);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          master_data_get(retriveDoctorId);
          setClickedAppointIndex(null);
          closeModal();
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  /*shubham jain codeing */

  // Appointment Call Button Disbled and Enable at the Time of Meeting
  const handleEnableDisabled = (item) => {
    let shouldEnableButton = false;
    const enableCallButtonTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentDate = new Date().toDateString();

    const now = new Date().getTime();
    const meetingDate = new Date(item.booking_date).toDateString();
    const startTime = new Date(
      item.booking_date + " " + item.booking_start_time
    ).getTime();
    const endTime = new Date(
      item.booking_date + " " + item.booking_end_time
    ).getTime();

    if (
      currentDate === meetingDate &&
      now >= startTime - enableCallButtonTime &&
      now <= endTime + enableCallButtonTime
    ) {
      shouldEnableButton = true;
    }
    return shouldEnableButton;
  };

  return (
    <div className="container-lg nutritionist_home">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <DoctorHeader />
      </div>
      <div className="dashboard mt-4">
        <div className="dashboard_wrapper">
          <div className="dashboard_container row">
            <div className="col-lg-8 m-0">
              {/* tracking/Counts cards */}
              <div className="details-card">
                <div className="row justify-content-between">
                  <div className="col-md-4 card pt-0 ">
                    <div className="card_body ">
                      <div className="count_div1">
                        <p>{upcomingAppoint.length}</p>
                      </div>
                      <p className="count_text hd">Total Appointments</p>
                    </div>
                  </div>

                  <div className="col-md-4 card pt-0">
                    <div className="card_body">
                      <div className="count_div2">
                        <p>{patients.length}</p>
                      </div>
                      <p className="count_text hd">Total Patients</p>
                    </div>
                  </div>

                  <div className="col-md-4 card pt-0">
                    <div className="card_body">
                      <div className="count_div3">
                        <p>{charts.length}</p>
                      </div>
                      <p className="count_text hd">Unread Chats</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming appointments list */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="list_head">
                      <h3 className="hds">Upcoming Appointments</h3>
                    </div>
                    <div className="list_items scrollbarNew">
                      <ul>
                        {upcomingAppoint.map((item, index) => {
                          const isEnabled = handleEnableDisabled(item); // Calculate whether the button should be enabled

                          return (
                            <li key={index}>
                              <div className="item">
                                <div className="item_left">
                                  <div className="item_img">
                                    <img
                                      src={
                                        item.customer_image === "user_image.png"
                                          ? make_image_from_letter(
                                              item.customer_name
                                            ) // If condition is true
                                          : upcomingAppointImage +
                                            item.customer_image // If condition is false
                                      }
                                      onError={(e) => {
                                        e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                      }}
                                      alt="Patient"
                                    />
                                  </div>
                                  <div className="item_text">
                                    <h5 className="hd">{item.customer_name}</h5>
                                    <p>
                                      {item.booking_date} |{" "}
                                      {item.booking_start_time}-
                                      {item.booking_end_time}
                                    </p>
                                  </div>
                                </div>
                                <div className="item_right">
                                  {item.status_for_complete === "1" && (
                                    <div>
                                      <p className="cmpl_apnmt_status">
                                        Completed
                                      </p>
                                    </div>
                                  )}
                                  {item.status_for_complete === "0" && (
                                    <div>
                                      <span
                                        className="btn cancel_btn sps"
                                        onClick={() => openModal(item._id)}
                                      >
                                        Cancel
                                      </span>
                                      <button
                                        className={`btn call_btn ${
                                          isEnabled ? "" : "call_btn_disabled"
                                        }`}
                                        onClick={() =>
                                          isEnabled && handlecallgo(item._id)
                                        }
                                        disabled={!isEnabled}
                                        style={{ fontFamily: "nunito" }}
                                      >
                                        Call
                                      </button>
                                    </div>
                                  )}
                                  {item.status_for_complete === "2" && (
                                    <div>
                                      <span
                                        className="btn cancel_btn cancelled_appoint_btn hd"
                                        onClick={() => openModal(item._id)}
                                      >
                                        Cancel
                                      </span>
                                      <button
                                        className="btn call_btn call_btn_disabled hd"
                                        disabled
                                      >
                                        Call
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <hr className="border_top" />
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Patients list */}
              <div className="patients">
                <div className="patients_wrapper">
                  <div className="patients_container">
                    <div className="list_head">
                      <h3 className="hds">My Patients</h3>
                      <Link to="/doctor_patients">
                        <p className="hds">View All</p>
                      </Link>
                    </div>
                    <div className="list_items">
                      <ul>
                        {patients.map((item, index) => (
                          <li key={index}>
                            <div className="item">
                              <div className="item_left">
                                <div className="item_img">
                                  <img
                                    src={
                                      item.customer_image === "user_image.png"
                                        ? make_image_from_letter(
                                            item.customer_name
                                          ) // If condition is true
                                        : upcomingAppointImage +
                                          item.customer_image // If condition is false
                                    }
                                    onError={(e) => {
                                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                    }}
                                    alt="Patient"
                                  />
                                </div>
                                <div className="item_text">
                                  <h5 className="hd">{item.customer_name}</h5>
                                </div>
                              </div>
                              <div className="week_btn">
                                {item.no_of_calling !==
                                  item.complete_calling && (
                                  <div>
                                    {(() => {
                                      noOfCalling = parseInt(
                                        item.no_of_calling,
                                        10
                                      ); // Parse as integer
                                      if (item.complete_calling) {
                                        makeofCalling = parseInt(
                                          item.complete_calling,
                                          10
                                        ); // Parse as integer
                                      } else {
                                        makeofCalling = 0;
                                      }

                                      makeofCallingper =
                                        parseInt(
                                          (noOfCalling / makeofCalling) * 100
                                        ) + "%"; // Parse as integer
                                      console.log(noOfCalling, makeofCalling);
                                      console.log(makeofCallingper);
                                      let make_loop = noOfCalling + 3;

                                      if (make_loop > makeofCalling) {
                                        make_loop = makeofCalling;
                                      }

                                      make_loop = parseInt(make_loop, 10); // Parse as integer
                                      const elements = [];
                                      let i = 0;

                                      for (
                                        i = noOfCalling + 1;
                                        i <= make_loop;
                                        i++
                                      ) {
                                        elements.push(
                                          <span
                                            key={`w${i}`}
                                            className="btn filled_btn shadow active"
                                          >
                                            w{i}
                                          </span>
                                        );
                                      }

                                      return elements;
                                    })()}
                                  </div>
                                )}
                              </div>
                              <div className="item_right">
                                <div className="progress_bar">
                                  <div
                                    className="progress_color"
                                    style={{
                                      maxWidth: "100%",
                                      width: makeofCallingper,
                                    }}
                                  ></div>
                                </div>
                                <span className="percent_text">
                                  {makeofCallingper}
                                </span>
                              </div>
                            </div>
                            <hr className="border_top" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 m-0">
              {/* Chat section */}
              <div className="chat">
                <div className="chat_wrapper col-">
                  <div className="chat_container">
                    <div className="list_head">
                      <h3 className="hds">Chats</h3>
                    </div>
                    <div className="search_bar">
                      <div className="d-flex">
                        <img src={searchIcon} alt="Search" />
                        <input
                          className="search "
                          type="text"
                          placeholder="Search..."
                          value={patientSearchValue}
                          onChange={handleCurrentTabSearchInputChange}
                        />
                      </div>
                      {/* <div className="filter_img">
                        <img src={Filter} alt="Filter" />
                      </div> */}
                    </div>

                    <div className="list_items chatsList" id="style-1">
                      <ul className="p-2">
                        {patientSearchValue.trim() !== "" ? (
                          <>
                            {searchedPatients.length > 0 ? (
                              searchedPatients.map((item, index) => {
                                let show_time = "";
                                if (item.last_msg_time) {
                                  const parts =
                                    item.last_msg_time.split(/[\s,]+/);
                                  if (parts.length !== 1) {
                                    show_time = parts[1] + " " + parts[2]; // Extracting time;
                                  }
                                }

                                return (
                                  <li
                                    key={index}
                                    onClick={() => handleChatClick(index)}
                                  >
                                    <div className="item">
                                      <div className="item_left">
                                        <div className="item_img">
                                          <img
                                            src={
                                              item.customer_image ===
                                              "user_image.png"
                                                ? make_image_from_letter(
                                                    item.customer_name
                                                  ) // If condition is true
                                                : upcomingAppointImage +
                                                  item.customer_image // If condition is false
                                            }
                                            onError={(e) => {
                                              e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                            }}
                                            alt="Patient"
                                          />
                                        </div>
                                        <div className="item_text">
                                          <h5>{item.customer_name}</h5>
                                        </div>
                                      </div>
                                      <div className="item_right">
                                        <p className="chat_time">{show_time}</p>
                                        <div className="msg_count">
                                          <div
                                            className="count_div"
                                            onClick={(e) => e.stopPropagation()}
                                          >
                                            <p>1</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="border_top" />
                                  </li>
                                );
                              })
                            ) : (
                              <div className="m-4">
                                <p className="empty_text">No Chats Found</p>
                              </div>
                            )}
                          </>
                        ) : (
                          charts.map((item, index) => {
                            const parts = item.last_msg_time.split(/[\s,]+/); // Splitting the string
                            let show_time = "";
                            if (parts.length !== 1) {
                              show_time = parts[1] + " " + parts[2]; // Extracting time;
                            }
                            return (
                              <li
                                key={index}
                                onClick={() => handleChatClick(index)}
                              >
                                <div className="item">
                                  <div className="item_left">
                                    <div className="item_img">
                                      <img
                                        src={
                                          item.customer_image ===
                                          "user_image.png"
                                            ? make_image_from_letter(
                                                item.customer_name
                                              ) // If condition is true
                                            : upcomingAppointImage +
                                              item.customer_image // If condition is false
                                        }
                                        onError={(e) => {
                                          e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                        }}
                                        alt="Patient"
                                      />
                                    </div>
                                    <div className="item_text">
                                      <h5>{item.customer_name}</h5>
                                    </div>
                                  </div>
                                  <div className="item_right">
                                    <p className="chat_time">{show_time}</p>
                                    <div className="msg_count">
                                      <div
                                        className="count_div"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <p>1</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr className="border_top" />
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={closeModal} centered backdrop="static">
        <Modal.Body className="modal_body">
          <div className="success_img d-flex justify-content-center">
            {/* ... Modal content goes here ... */}
          </div>
          <p>Are you sure you want to cancel this appointment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="bookCancelBtn"
            onClick={closeModal}
            style={{ backgroundColor: "white" }}
          >
            Close
          </Button>
          <Button className="bookBtn" onClick={handleDeleteConfirmed}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
