import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import "../../Css/MyPatients.css";

import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import crossIcon from "../../Assests/images/rejectedIcon.svg.svg";
import Errorimage from "../../Assests/images/error.png";
import chatIcon from "../../Assests/images/Chaticon.svg";
import telephoneIcon from "../../Assests/images/Callicon.svg";
import deleteIcon from "../../Assests/images/deleteicon.svg";
import { Link, useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Modal, Button } from "react-bootstrap";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleIaphabetnumberChange,
} from "../../CommonJquery/CommonJquery.js";

import {
  my_patients_full_details_doctor,
  cancel_appointment_by_doctor,
  my_patients_data_single,
  server_post_data,
  ethi_customer_update_call_flag,
  create_patient_by_doctor,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import SearchIcon from "../../Assests/images/search_icon.svg";
import addBtn from "../../Assests/images/add_svg.svg";

export default function DoctorMyPatients() {
  const navigate = useNavigate();
  const [patientStatus, setPatientStatus] = useState(null);
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [clickedAppointIndex, setClickedAppointIndex] = useState(null);
  const [patients, setPatients] = useState([]);
  const [patientsold, setPatientsold] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
  const [customergoal, setcustomergoal] = useState([]);
  const [filterHide, setFilterHide] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  const [showdietplan, setshowdietplan] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [appointmentWithDoctor, setAppointmentWithDoctor] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);

  /*shubham jain codeing */

  const master_data_get = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(my_patients_full_details_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log("gggg gggggg ggg", Response.data.message);
          setPatients(Response.data.message.data_customer_data);
          setSubscriptionDetails(Response.data.message.ethi_package_data);
          console.log("akash", Response.data.message.ethi_package_data);
          setAppointmentWithDoctor(
            Response.data.message.customers_ethi_appointment_with_doctors
          );

          setPatientsold(Response.data.message.data_customer_data_past);

          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleChatClick = () => {
    //click on chart
    navigate("/doctor_chats");
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (form_data === "createNewPatient") {
      if (userNumber === "") {
        alert("Enter Vaild Mobile No");
        vaild_data = false;
      } else if (userNumber.length < 8) {
        vaild_data = false;
        alert("Enter Vaild Mobile No");
      }
    }
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("user_number", userNumber);
      fd_from.append("person_id", selectedPatient);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            //  master_data_get();
            let form_data2 = "createNewPatient";
            const closeButton = document.querySelector(
              "#" + form_data2 + ' [data-dismiss="modal"]'
            );
            let form_data3 = "editcreateNewPatient";
            const closeButton1 = document.querySelector(
              "#" + form_data3 + ' [data-dismiss="modal"]'
            );
            empty_form(form_data);
            if (closeButton) {
              closeButton.click();
            }
            if (closeButton1) {
              closeButton1.click();
            }
            if (form_data === "createNewPatient") {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const [checkboxes, setCheckboxes] = useState({
    all: true,
    completed: false,
    pending: false,
    cancelled: false,
  });

  const openModal = (index) => {
    setClickedAppointIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
  const call_single_data = async (customer_id, index) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("customer_id", customer_id);
    fd.append("doctor_id", retriveDoctorId);
    fd.append("extra_flag", "1");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setcustomergoal(Response.data.message.customers_goals);

          handleShowProfile(index);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    master_data_get(retrievedDoctorId);
  }, []);
  /*shubham jain codeing */

  // Function to handle the patient click
  const handlePatientClick = (patient, index, click_by) => {
    setshowdietplan(click_by);
    call_single_data(patient._id, index);
    setSelectedPatient({ ...patient, keyIndex: index });
  };

  // OLd

  // Change the tab
  const [acivePatientsTab, setacivePatientsTab] = useState("current_tab");

  const handleTabClick = (tab) => {
    setFilterHide(!filterHide);
    setacivePatientsTab(tab);
  };

  // Seacrh Bar filter
  const [currentTabSearchValue, setCurrentTabSearchValue] = useState("");
  const [pastTabSearchValue, setPastTabSearchValue] = useState("");
  const [filteredCurrentPatients, setFilteredCurrentPatients] = useState([]);
  const [filteredPastPatients, setFilteredPastPatients] = useState([]);

  const handleCurrentTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setCurrentTabSearchValue(searchInput);

    if (searchInput.trim() !== "") {
      const filtered = patients.filter((patient) => {
        return patient.customer_name.toLowerCase().includes(searchInput);
      });
      setFilteredCurrentPatients(filtered);
    } else {
      setFilteredCurrentPatients([]);
    }
  };

  const handlePastTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setPastTabSearchValue(searchInput);

    // Filter patients for "Past Patients" tab based on the search input value
    if (searchInput.trim() !== "") {
      const filtered = patientsold.filter((patient) => {
        return patient.customer_name.toLowerCase().includes(searchInput);
      });

      setFilteredPastPatients(filtered);
    } else {
      setFilteredPastPatients([]);
    }
  };

  const handleShowProfile = (index, click_by) => {
    setshowProfile(true);
  };

  const addNewPatientHandler = () => {
    return 0;
  };

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

  const handlecallgo = (customer_id) => {
    //click on chart
    navigate("/doctor_video_call/" + customer_id);
  };

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

  const findAppointmentByCustomerId = (customerId) => {
    return appointmentWithDoctor.find(
      (appointment) => appointment.customer_id === customerId
    );
  };

  return (
    <>
      <div className="container-lg my_patients">
        <div className={showLoader ? "loading" : ""}></div>
        <div>
          <DoctorHeader />
        </div>
      </div>
      <div className="my_patients_dash_container container-lg">
        <div className="my_patient_header row m-0">
          <h2 className="col-md-4 my-2 sp">My Patients</h2>

          <div className="col-md-8 d-flex gap-2 justify-content-end">
            <div className="add_new_patient_btn">
              <button data-target="#addPatientModal" data-toggle="modal">
                <img src={addBtn} />
                ADD NEW PATIENT
              </button>
            </div>
            <div
              className={`dropdown filterBtnContainer ${
                filterHide ? "border-0" : ""
              }`}
            >
              <button
                className={`btn dropdown-toggle ${filterHide ? "hidden" : ""}`}
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
                  <a className="dropdown-item ps-2" href="#">
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
                  <a className="dropdown-item ps-2" href="#">
                    Completed
                  </a>
                </div>
                <div className=" mx-3 checkBoxContainer">
                  <input
                    type="checkbox"
                    id="slaveCheckbox"
                    checked={checkboxes.pending}
                    onChange={() => handleCheckboxChange("pending")}
                  />
                  <a className="dropdown-item ps-2" href="#">
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
                  <a className="dropdown-item ps-2" href="#">
                    Cancelled
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0">
          <div
            // className="col-lg-8 _container"
            className={`_container col-lg-12`}
          >
            <div className="my_patients_list_container">
              <div className="my_patients_list_head container">
                <div className="current_past_tabs">
                  <div
                    onClick={() => handleTabClick("current_tab")}
                    className={
                      acivePatientsTab === "current_tab"
                        ? "current_tab active_patient_list_tab"
                        : "current_tab"
                    }
                  >
                    <h6 className="sps">Current Patients</h6>
                  </div>
                  <div
                    onClick={() => handleTabClick("past_tab")}
                    className={
                      acivePatientsTab === "past_tab"
                        ? "past_tab past_patient_list_tab"
                        : "past_tab"
                    }
                  >
                    <h6 className="sps">Past Patients</h6>
                  </div>
                </div>
                <div className="my_patients_search_bar my-1 my-md-0">
                  {/* <input className='serach_bar' type='text' placeholder='Search...' /> */}
                  {/* For Current tab */}
                  {acivePatientsTab === "current_tab" && (
                    <input
                      className="serach_bar"
                      type="text"
                      placeholder="Search..."
                      value={currentTabSearchValue}
                      onChange={handleCurrentTabSearchInputChange}
                    />
                  )}
                  {/* For Past tab */}
                  {acivePatientsTab === "past_tab" && (
                    <input
                      className="serach_bar "
                      type="text"
                      placeholder="Search..."
                      value={pastTabSearchValue}
                      onChange={handlePastTabSearchInputChange}
                    />
                  )}
                  <img
                    className="search_bar_icon"
                    src={SearchIcon}
                    alt="icon"
                  />
                </div>
              </div>
            </div>
            <div className="my_patients_list_wrapper container" id="style-1">
              <h3 className="sps">Patients List</h3>
              <div className="my_patientslist_items">
                {acivePatientsTab === "current_tab" ? (
                  <ul>
                    {currentTabSearchValue.trim() !== "" ? (
                      filteredCurrentPatients.map((item, index) => {
                        let appointmentData = findAppointmentByCustomerId(
                          item._id
                        );

                        const getStatus = (appointmentData) => {
                          if (appointmentData) {
                            return appointmentData.status_for_complete;
                          } else {
                            console.log(
                              "No appointment found for patient:",
                              item._id
                            );
                          }
                        };

                        let isEnabled = false;
                        if (appointmentData) {
                          isEnabled = handleEnableDisabled(appointmentData);
                        }
                        const shouldRender = () => {
                          if (checkboxes.all) return true;
                          if (
                            checkboxes.completed &&
                            getStatus(appointmentData) === "1"
                          )
                            return true;
                          if (
                            checkboxes.pending &&
                            getStatus(appointmentData) === "0"
                          )
                            return true;
                          if (
                            checkboxes.cancelled &&
                            getStatus(appointmentData) === "2"
                          )
                            return true;
                          return false;
                        };
                        if (shouldRender()) {
                          return (
                            <>
                              <li key={index}>
                                <div className="my_patients_item">
                                  <div
                                    className="my_patients_item_left"
                                    // onClick={() =>
                                    //   handlePatientClick(item, index, true)
                                    // }
                                  >
                                    <div className="my_patients_item_img">
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
                                          e.target.src = Errorimage; // Provide the path to your fallback image
                                        }}
                                        alt="Patient"
                                      />
                                    </div>
                                    <div className="my_patients_item_text ">
                                      <h5>{item.customer_name}</h5>
                                      <p>{item.customer_mobile_no}</p>
                                    </div>
                                    <div className="patientAppointmentStatus">
                                      {getStatus(appointmentData) === "0" && (
                                        <button className="pendingBtn">
                                          Pending
                                        </button>
                                      )}
                                      {getStatus(appointmentData) === "1" && (
                                        <button className="completedBtn">
                                          Completed
                                        </button>
                                      )}
                                      {getStatus(appointmentData) === "2" && (
                                        <button className="canceledBtn">
                                          Canceled
                                        </button>
                                      )}
                                      {getStatus(appointmentData) === "3" && (
                                        <button className="upcomingBtn">
                                          Upcoming
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <div className="my_patients_item_right">
                                    <div className="iconListContainer">
                                      <button
                                        type="button"
                                        className={`${
                                          getStatus(appointmentData) == "1"
                                            ? "hidden"
                                            : ""
                                        }`}
                                      >
                                        <img
                                          src={chatIcon}
                                          className={`${
                                            getStatus(appointmentData) == "1"
                                              ? "hidden"
                                              : ""
                                          }`}
                                          onClick={() => handleChatClick(index)}
                                        />
                                      </button>
                                      <button
                                        type="button"
                                        className={`${
                                          getStatus(appointmentData) == "1"
                                            ? "hidden"
                                            : ""
                                        }  ${
                                          isEnabled ? "" : "call_btn_disabled"
                                        }`}
                                        onClick={() =>
                                          isEnabled &&
                                          handlecallgo(appointmentData._id)
                                        }
                                        disabled={!isEnabled}
                                      >
                                        <img src={telephoneIcon} />
                                      </button>
                                      <button
                                        type="button"
                                        className={`${
                                          getStatus(appointmentData) == "1"
                                            ? "hidden"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          if (appointmentData) {
                                            openModal(appointmentData._id);
                                          }
                                        }}
                                      >
                                        <img src={deleteIcon} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </>
                          );
                        } else {
                          return null;
                        }
                      })
                    ) : (
                      <>
                        {patients.map((item, index) => {
                          let appointmentData = findAppointmentByCustomerId(
                            item._id
                          );
                          let call_flag = "0";
                          if (item.call_flag) {
                            call_flag = item.call_flag;
                          }

                          const getStatus = (appointmentData) => {
                            if (appointmentData) {
                              return appointmentData.status_for_complete;
                            } else {
                              return "-1";
                            }
                          };

                          let isEnabled = false;
                          if (appointmentData) {
                            isEnabled = handleEnableDisabled(appointmentData);
                          }

                          const shouldRender = () => {
                            if (checkboxes.all) return true;
                            if (
                              checkboxes.completed &&
                              getStatus(appointmentData) === "1"
                            )
                              return true;
                            if (
                              checkboxes.pending &&
                              getStatus(appointmentData) === "0"
                            )
                              return true;
                            if (
                              checkboxes.cancelled &&
                              getStatus(appointmentData) === "2"
                            )
                              return true;
                            return false;
                          };
                          if (shouldRender()) {
                            return (
                              <>
                                <li key={index}>
                                  <>
                                    <li key={index}>
                                      <div className="my_patients_item">
                                        <Link
                                          to={`/DoctorPatientProfile/${item._id}`}
                                        >
                                          <div className="my_patients_item_left">
                                            <div className="my_patients_item_img">
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
                                                  e.target.src = Errorimage; // Provide the path to your fallback image
                                                }}
                                                alt="Petient"
                                              />
                                            </div>
                                            <div className="my_patients_item_text">
                                              <h5 className="sps">
                                                {item.customer_name}
                                              </h5>
                                              <p
                                                className="sps"
                                                style={{ color: "black" }}
                                              >
                                                {item.customer_mobile_no}
                                              </p>
                                            </div>
                                            <div className="patientAppointmentStatus">
                                              {getStatus(appointmentData) ==
                                                "0" && (
                                                <button className="pendingBtn">
                                                  Pending
                                                </button>
                                              )}
                                              {getStatus(appointmentData) ==
                                                "1" && (
                                                <button className="completedBtn">
                                                  Completed
                                                </button>
                                              )}
                                              {getStatus(appointmentData) ==
                                                "2" && (
                                                <button className="canceledBtn">
                                                  Canceled
                                                </button>
                                              )}
                                              {getStatus(appointmentData) ==
                                                "3" && (
                                                <button className="upcomingBtn">
                                                  Upcoming
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </Link>
                                        <div className="my_patients_item_right">
                                          <div className="iconListContainer">
                                            {call_flag === "1" && (
                                              <div className="statuS">
                                                {" "}
                                                <button
                                                  type="button"
                                                  className="statusBtn"
                                                  data-toggle="modal"
                                                  data-target="#myModal"
                                                  onClick={() =>
                                                    setSelectedPatient(item._id)
                                                  }
                                                >
                                                  Add By Wati
                                                </button>
                                              </div>
                                            )}
                                            {call_flag === "0" && (
                                              <>
                                                <button
                                                  type="button"
                                                  className={`${
                                                    getStatus(
                                                      appointmentData
                                                    ) == "1"
                                                      ? "hidden"
                                                      : ""
                                                  } ${
                                                    getStatus(
                                                      appointmentData
                                                    ) === "2"
                                                      ? "hidden"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    handleChatClick(index)
                                                  }
                                                >
                                                  <img src={chatIcon} />
                                                </button>
                                                {getStatus(appointmentData) !==
                                                  "-1" && (
                                                  <>
                                                    <button
                                                      type="button"
                                                      className={`${
                                                        getStatus(
                                                          appointmentData
                                                        ) == "1"
                                                          ? "hidden"
                                                          : ""
                                                      }  ${
                                                        isEnabled
                                                          ? ""
                                                          : "call_btn_disabled "
                                                      }   ${
                                                        getStatus(
                                                          appointmentData
                                                        ) === "2"
                                                          ? "hidden"
                                                          : ""
                                                      }`}
                                                      onClick={() =>
                                                        isEnabled &&
                                                        handlecallgo(
                                                          appointmentData._id
                                                        )
                                                      }
                                                      disabled={!isEnabled}
                                                    >
                                                      <img
                                                        src={telephoneIcon}
                                                      />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className={`${
                                                        getStatus(
                                                          appointmentData
                                                        ) == "1"
                                                          ? "hidden"
                                                          : ""
                                                      }
                                                    ${
                                                      getStatus(
                                                        appointmentData
                                                      ) === "2"
                                                        ? "hidden"
                                                        : ""
                                                    }`}
                                                      onClick={() => {
                                                        if (appointmentData) {
                                                          openModal(
                                                            appointmentData._id
                                                          );
                                                        }
                                                      }}
                                                    >
                                                      <img src={deleteIcon} />
                                                    </button>
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </>
                                </li>
                                <hr className="border_top" />
                              </>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </>
                    )}
                    {filteredCurrentPatients.length == 0 &&
                    currentTabSearchValue.trim() !== "" ? (
                      <div className=" fs-4 text-center ">No Patient Found</div>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  <ul>
                    {pastTabSearchValue.trim() !== "" ? (
                      filteredPastPatients.map((item, index) => {
                        return (
                          <>
                            <li key={index}>
                              <div className="my_patients_item">
                                <div className="my_patients_item_left">
                                  <div className="my_patients_item_img">
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
                                        e.target.src = Errorimage; // Provide the path to your fallback image
                                      }}
                                      alt="Petient"
                                    />
                                  </div>
                                  <div className="my_patients_item_text">
                                    <h5>{item.customer_name}</h5>
                                    <p>{item.customer_mobile_no}</p>
                                  </div>
                                  <div className="patientAppointmentStatus">
                                    {item.status_for_complete === "0" && (
                                      <button className="pendingBtn">
                                        Pending
                                      </button>
                                    )}
                                    {item.status_for_complete === "1" && (
                                      <button className="completedBtn">
                                        Completed
                                      </button>
                                    )}
                                    {item.status_for_complete === "2" && (
                                      <button className="canceledBtn">
                                        Canceled
                                      </button>
                                    )}
                                    {item.status_for_complete === "3" && (
                                      <button className="upcomingBtn">
                                        Upcoming
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <hr className="border_top" />
                          </>
                        );
                      })
                    ) : (
                      <>
                        {patientsold.map((item, index) => (
                          <>
                            <li key={index}>
                              <div className="my_patients_item">
                                <div
                                  className="my_patients_item_left"
                                  // onClick={() =>
                                  //   handlePatientClick(item, index, false)
                                  // }
                                >
                                  <div className="my_patients_item_img">
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
                                        e.target.src = Errorimage; // Provide the path to your fallback image
                                      }}
                                      alt="Petient"
                                    />
                                  </div>
                                  <div className="my_patients_item_text">
                                    <h5>{item.customer_name}</h5>
                                    <p>{item.customer_mobile_no}</p>
                                  </div>
                                  <div className="patientAppointmentStatus"></div>
                                </div>
                                <div className="my_patients_item_right"></div>
                              </div>
                            </li>
                            <hr className="border_top" />
                          </>
                        ))}
                      </>
                    )}
                    {filteredPastPatients.length == 0 &&
                    pastTabSearchValue.trim() !== "" ? (
                      <div className=" fs-4 text-center ">No Patient Found</div>
                    ) : (
                      ""
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* status updation */}
        <div className="modal" id="myModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modalContentBox w-100">
              <div className="modal-header"></div>
              <div className="modal-body">
                <form id="createNewPatient112">
                  <h3
                    className="hds"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    Call Status
                  </h3>
                  <div className="form-group">
                    <label className="text-start">Status</label>
                    <select
                      id="selected_status"
                      name="selected_status"
                      className="trio_mendate"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="0">Positive</option>
                      <option value="1">Negative</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="patientDescription"
                      className="groupHeadingBox"
                    >
                      <label className="text-start">Message</label>
                    </label>
                    <textarea
                      name="comment"
                      className="form-control trio_mendate"
                      id="patientDescription"
                      rows="3"
                      placeholder="Write a message."
                      required
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn modalAddBtn"
                      onClick={() =>
                        handleSaveChangesdynamic(
                          "createNewPatient112",
                          ethi_customer_update_call_flag
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn modalCancelBtn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Status update */}

        {/* Details PopUp modal */}
        <div className="modal" id="addPatientModal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modalContentBox w-100">
              <div className="modal-header">
                <h5 className="modal-title sps">Add new patient</h5>
                <button
                  type="button"
                  className="close m-1"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <img src={crossIcon} />
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form id="createNewPatient">
                  <div className="form-group">
                    <label htmlFor="patientName" className="text-start">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      className="form-control trio_mendate"
                      id="patientName"
                      maxLength={30}
                      onInput={handleAphabetsChange}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNo" className="text-start">
                      Patient contact number
                    </label>
                    <div className="d-flex w-100">
                      <PhoneInput
                        id="phone"
                        name="customer_mobile_no"
                        className=" w-100"
                        defaultCountry="in"
                        value={userNumber}
                        onChange={(phone) => setUserNumber(phone)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="referredBy" className="groupHeadingBox">
                      <span className="sps">Referred By</span>
                      <span className="sps">Optional</span>
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="referredBy"
                      maxLength={30}
                      onInput={handleAphabetsChange}
                      name="referred_by"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-start">Subscription</label>
                    <select
                      id="subscription"
                      name="last_subscription_id"
                      className="trio_mendate"
                    >
                      {subscriptionDetails.map((data) => {
                        return (
                          <option value={data._id + "~@~" + data.package_days}>
                            {data.package_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="patientDescription"
                      className="groupHeadingBox"
                    >
                      <span className="sps">Patient Description</span>
                      <span className="sps">Optional</span>
                    </label>
                    <textarea
                      name="description"
                      className="form-control sps"
                      id="patientDescription"
                      maxLength={100}
                      onInput={handleIaphabetnumberChange}
                      rows="3"
                      placeholder="Write a short description to explain the purpose of this appointment."
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn modalCancelBtn"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn modalAddBtn"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "createNewPatient",
                      create_patient_by_doctor
                    )
                  }
                >
                  Add
                </button>
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
    </>
  );
}
