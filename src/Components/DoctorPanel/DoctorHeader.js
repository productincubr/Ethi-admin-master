import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Css/Header.css";
import "../../Css/loading.css";
import StopWatch from "../../Assests/images/stopwatch_svg.svg";
import HomeSvgActive from "../../Assests/images/home_svg.svg";
import HomeSvg from "../../Assests/images/home_black.svg";
import FeedSvg from "../../Assests/images/feed_svg.svg";
import UsersSvg from "../../Assests/images/users_svg.svg";
import ChatSvg from "../../Assests/images/chat_svg.svg";
import ChatSvgActive from "../../Assests/images/chats_active.svg";
import ProfileSvg from "../../Assests/images/profile_svg.svg";
import crossIcon from "../../Assests/images/rejectedIcon.svg.svg";
import CalendarSvg from "../../Assests/images/calendar_svg.svg";
import CalendarSvgActive from "../../Assests/images/calender_active.svg";
import FeedSvgActive from "../../Assests/images/feeds_active.svg";
import UsersSvgActive from "../../Assests/images/my_patients_active.svg";
import ProfileSvgActive from "../../Assests/images/my_profile_active.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import { useNavigate } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import addBtn from "../../Assests/images/add_svg.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import countries from "countries-list";

import {
  server_post_data,
  get_last_appointment,
  add_staff,
  create_appointments_by_doctor,
  update_staff,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleIaphabetnumberChange,
  handleEmailChange,
  handleAphabetsChange,
  validatePassword,
  handleNumbersChange,
  computeTodayDate,
  computeFutureDate,
} from "../../CommonJquery/CommonJquery.js";
function DoctorHeader() {
  const imageInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [selecteddata, setselecteddataa] = useState([]);
  const [retriveDoctorName, setRetriveDoctorName] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retriveDoctorProfession, setRetriveDoctorProfession] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState("");
  const [userNumber, setUserNumber] = useState("");
  let countdownInterval = 100;
  useEffect(() => {
    const retrievedDoctorName = retrieveData("doctor_name");
    const retrievedDoctorProfession = retrieveData("doctor_profession");
    const retrievedDoctorImage = retrieveData("doctor_image");
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    setRetriveDoctorName(retrievedDoctorName);
    setRetriveDoctorProfession(retrievedDoctorProfession);
    setRetriveDoctorImage(retrievedDoctorImage);

    const retrievedDataFind = retrieveData("doctor_email");
    if (retrievedDataFind === "null" || retrievedDataFind === null) {
      navigate("/login");
    }
    master_data_get(retrievedDoctorId);
  }, [navigate]);

  const master_data_get = async (retrievedDoctorId) => {
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(get_last_appointment, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          if (Response.data.message.data_appointment.length > 0) {
            countdownTimer(
              Response.data.message.data_appointment[0].booking_date +
                "T" +
                Response.data.message.data_appointment[0].booking_start_time +
                ":00"
            );
          }
        }
      })
      .catch((error) => {
        //err
      });
  };

  const checkUrl = (urlSegment, check_url) => {
    const parts = urlSegment.split("/");

    const action = parts[1]; // "doctor_my_patients_create_diet_plan"
    if (action === check_url) {
      return true;
    }
    return false;
  };

  function countdownTimer(targetDateTime) {
    const targetTime = new Date(targetDateTime).getTime();

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
      } else {
        const seconds = Math.floor(timeDifference / 1000) % 60;
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor((timeDifference / 1000 / 60 / 60) % 24);
        const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

        let show_data = "";

        if (days > 0) {
          show_data = show_data + `${days}D `;
        }
        if (hours > 0) {
          show_data = show_data + `${hours}H `;
        }
        if (minutes > 0) {
          show_data = show_data + `${minutes}M `;
        }
        if (seconds > 0) {
          show_data = show_data + `${seconds}S `;
        }
        setCountdown(show_data);
      }
    };

    updateCountdown(); // Call the function immediately to avoid initial delay

    countdownInterval = setInterval(updateCountdown, 1000); // Update every second
  }

  useEffect(() => {
    master_data_get();
  }, []);

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (form_data === "addStaffProfileheader") {
      if (userNumber === "") {
        alert("Enter Vaild Mobile No");
        vaild_data = false;
      } else if (userNumber.length < 8) {
        vaild_data = false;
        alert("Enter Vaild Mobile No ");
      }
    }
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("user_number", userNumber);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            master_data_get();
            let form_data2 = "addStaff";
            const closeButton = document.querySelector(
              "#" + form_data2 + ' [data-dismiss="modal"]'
            );
            let form_data3 = "editStaffProfile";
            const closeButton1 = document.querySelector(
              "#" + form_data3 + ' [data-dismiss="modal"]'
            );
            let form_data4 = "addStaffProfileheader";
            const closeButton4 = document.querySelector(
              "#" + form_data4 + ' [data-dismiss="modal"]'
            );
            empty_form(form_data);
            if (closeButton) {
              closeButton.click();
            } else {
              window.location.reload();
            }
            if (closeButton1) {
              closeButton1.click();
            } else {
              window.location.reload();
            }
            if (closeButton4) {
              closeButton4.click();
            } else {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          console.log(error);
          setShowLoader(false);
        });
    }
  };

  const [showMinimumLengthMessage, setshowMinimumLengthMessage] =
    useState(false);
  const handlePasswordError = () => {
    if (password.length < 8) {
      setshowMinimumLengthMessage(true);
    } else {
      setshowMinimumLengthMessage(false);
    }
  };
  const countryOptions = (selectedCountry) =>
    Object.keys(countries.countries).map((code) => (
      <option key={code} value={code} selected={selectedCountry === code}>
        {countries.countries[code].name}
      </option>
    ));

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    if (event.target.value.length < 8) {
      setshowMinimumLengthMessage(true);
    } else {
      setshowMinimumLengthMessage(false);
    }

    const newPassword = event.target.value;
    setPassword(newPassword);
  };
  const [adminType, setAdminType] = useState("");

  const handleDropdownChange = (e) => {
    setAdminType(e.target.value);
  };

  return (
    <div className="header">
      <div className="header_wrapper">
        <div className="header_container d-flex justify-content-between flex-wrap">
          <div className="img_name_div d-flex align-items-center">
            <div className="img_div">
              <img
                src={retriveDoctorImage}
                alt="Nutritionist"
                onError={(e) => {
                  e.target.src = ProfileImgSample; // Provide the path to your fallback image
                }}
              />
            </div>
            <div className="name_div">
              <h5 className="m-0 hds">{retriveDoctorName}</h5>
              <p className="m-0 hd">{retriveDoctorProfession}</p>
            </div>
          </div>

          <div className="d-flex gap-2 align-items-center justify-content-center">
            {countdown ? (
              <div className="time_appointment_div d-flex align-items-center">
                <div className="time_div text-center">
                  <p className="m-0 font-weight-bold text-black">
                    Next Appointment In
                  </p>
                  <div>
                    <img src={StopWatch} alt="StopWatch" />
                    <span className="text-black">
                      <span className="time_span">&nbsp;{countdown}</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="createAppointment_btn">
              <button data-target="#addStaff" data-toggle="modal">
                <img src={addBtn} />
                CREATE APPOINTMENT
              </button>
            </div>
            {/* <div className="aiToolContainer">
              <div className="aiToolCircle"></div>
              <p className="mb-0 text-center">AI TOOL</p>
            </div> */}
          </div>
        </div>

        <div className="menu_bar">
          <div className="menu_bar_wrapper">
            <div className="menu_bar_container d-flex justify-content-around">
              <Link to="/doctorwelcomepage">
                <div
                  className={`card text-center ${
                    location.pathname === "/doctorwelcomepage"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1  ">
                    {location.pathname === "/doctorwelcomepage" ? (
                      <img src={HomeSvgActive} alt="icon" />
                    ) : (
                      <img src={HomeSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Home</p>
                  </div>
                </div>
              </Link>

              <Link to="/doctor_my_calendar">
                <div
                  className={`card text-center ${
                    location.pathname === "/doctor_my_calendar"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 ">
                    {location.pathname === "/doctor_my_calendar" ? (
                      <img src={CalendarSvgActive} alt="icon" />
                    ) : (
                      <img src={CalendarSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Calendar</p>
                  </div>
                </div>
              </Link>

              <Link to="/doctor_feeds_and_post">
                <div
                  className={`card text-center ${
                    location.pathname === "/doctor_feeds_and_post"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1">
                    {location.pathname === "/doctor_feeds_and_post" ? (
                      <img src={FeedSvgActive} alt="icon" />
                    ) : (
                      <img src={FeedSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Feeds</p>
                  </div>
                </div>
              </Link>

              <Link to="/doctor_patients">
                <div
                  className={`card text-center ${
                    checkUrl(location.pathname, "doctor_patients") ||
                    checkUrl(
                      location.pathname,
                      "doctor_my_patients_create_diet_plan"
                    ) ||
                    checkUrl(
                      location.pathname,
                      "doctor_my_patients_show_diet_plan"
                    ) ||
                    checkUrl(location.pathname, "MoreDetail")
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 ">
                    {checkUrl(location.pathname, "doctor_patients") ||
                    checkUrl(
                      location.pathname,
                      "doctor_my_patients_create_diet_plan"
                    ) ||
                    checkUrl(
                      location.pathname,
                      "doctor_my_patients_show_diet_plan"
                    ) ||
                    checkUrl(location.pathname, "MoreDetail") ? (
                      <img src={UsersSvgActive} alt="icon" />
                    ) : (
                      <img src={UsersSvg} alt="icon" />
                    )}
                    <p className="card-text hds">My Patients</p>
                  </div>
                </div>
              </Link>

              <Link to="/doctor_chats">
                <div
                  className={`card text-center ${
                    location.pathname === "/doctor_chats" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1">
                    {location.pathname === "/doctor_chats" ? (
                      <img src={ChatSvgActive} alt="icon" />
                    ) : (
                      <img src={ChatSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Chats</p>
                  </div>
                </div>
              </Link>

              <Link to="/doctor_admin_general_profile">
                <div
                  className={`card text-center d-flex align-items-center justify-content-center  ${
                    location.pathname === "/doctor_admin_general_profile"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 ">
                    {location.pathname === "/doctor_admin_general_profile" ? (
                      <img src={ProfileSvgActive} alt="icon" />
                    ) : (
                      <img src={ProfileSvg} alt="icon" />
                    )}
                    <p className="card-text hds">My Profile</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Book Appointment Modal */}
      <div
        className="modal fade"
        id="addStaff"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addStaffLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content modalHeight">
            <div className="frm">
              <div className="d-flex align-items-start justify-content-between">
                <h1>Book Appointment</h1>
                <img
                  src={crossIcon}
                  data-dismiss="modal"
                  className="m-1"
                  style={{ cursor: "pointer" }}
                />
              </div>

              <form id="addStaffProfileheader">
                <div className="form-group">
                  <label className="text-start">
                    Patient name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="trio_mendate"
                    id="patient-name"
                    name="customer_name"
                    maxLength={70}
                    onInput={handleAphabetsChange}
                  />
                </div>
                <div className="form-group">
                  <label className="text-start">
                    Patient contact number{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <PhoneInput
                    id="phone"
                    name="customer_mobile_no"
                    className=" w-100"
                    defaultCountry="in"
                    placeholder="Enter patient contact number"
                    value={userNumber}
                    onChange={(phone) => setUserNumber(phone)}
                  />
                  {/* <input
                    type="tel"
                    placeholder="Enter Your Name"
                    className="trio_mendate"
                    id="patient-contact-number"
                    pattern="[0-9]{10}"
                    name="patient_contact_number"
                    maxLength={70}
                  /> */}
                </div>
                {/* <div className="form-group">
                  <label>Nutritionist name</label>
                  <input
                    type="text"
                    placeholder="Enter  Name"
                    className="trio_mendate"
                    id="patient-contact-number"
                    pattern="[0-9]{10}"
                    name="patient_contact_number"
                    maxLength={70}
                  />
                </div> */}
                <div className="form-group">
                  <div className="reservation-box">
                    <div className="top ">
                      <div className="static">
                        <div
                          className="input-container"
                          id="date-picker-container"
                        >
                          <label htmlFor="date-from" className="text-start">
                            Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </label>
                          <input
                            type="date"
                            id="date-checkin"
                            className="date-field trio_mendate"
                            name="entry_date"
                            min={computeTodayDate()}
                            max={computeFutureDate()}
                          />
                        </div>
                      </div>
                      <div className="flex me-3">
                        <div
                          className="input-container"
                          id="time-picker-container"
                        >
                          <label htmlFor="time-from" className="text-start">
                            From Time{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </label>
                          <input
                            type="time"
                            id="time-checkin"
                            className="time-field trio_mendate"
                            name="booking_start_time"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div
                          className="input-container"
                          id="time-picker-container"
                        >
                          <label htmlFor="time-to" className="text-start">
                            To Time{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </label>
                          <input
                            type="time"
                            id="time-checkout"
                            className="time-field trio_mendate"
                            name="booking_end_time"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="color_red">
                      Please note that the office timings are from 9:30AM to
                      07:00PM
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="text-start" tabIndex="1">
                    Occurence
                  </label>
                  <select
                    id="repeat-option"
                    name="occurrence"
                    className="trio_mendate"
                  >
                    <option value="Does-not-repeat">Does not repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className=" groupHeadingBox">
                    <span>Category</span>
                    <span>Optional</span>
                  </label>
                  <select
                    id="appointment-category"
                    placeholder="Select appointment category"
                    name="category"
                  >
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className=" groupHeadingBox">
                    <span>Description</span>
                    <span>Optional</span>
                  </label>

                  <textarea
                    id="appointment-description"
                    rows="4"
                    cols="50"
                    name="description"
                    required
                    placeholder="Write a short description to explain the purpose of this appointment."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                Book
                Appointment
                className="btn bookCancelBtn"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn bookBtn"
                onClick={() =>
                  handleSaveChangesdynamic(
                    "addStaffProfileheader",
                    create_appointments_by_doctor
                  )
                }
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ############ */}
    </div>
  );
}

export default DoctorHeader;
