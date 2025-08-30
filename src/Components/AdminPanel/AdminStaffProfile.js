import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/AdminGeneralProfile.css";
import EmailSvg from "../../Assests/images/email.svg";
import MapPinSvg from "../../Assests/images/map-pin.svg";
import DegreeSvg from "../../Assests/images/degree.svg";
import countries from "countries-list";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import AdminHeader from "./AdminHeader";
import AddBtn from "../../Assests/images/add_svg.svg";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import lvrtImg from "../../Assests/images/lvrtImg.png";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarSvg from "../../Assests//images/calendar_svg.svg";
import BriefcaseSvg from "../../Assests//images/briefcase .svg";
import passwordIcon from "../../Assests//images/passwordIcon.png";
import SignOutSvg from "../../Assests//images/sign-out.svg";
import dacTOR from "../../Assests/images/dacTOR.png";
import deleteIcon from "../../Assests/images/dLT.png";
import { Modal, Button } from "react-bootstrap";

import {
  storeData,
  retrieveData,
  removeData,
} from "../../LocalConnection/LocalConnection.js";
import {
  delete_master_data,
  get_all_admin,
  server_post_data,
  add_staff,
  APL_LINK,
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
} from "../../CommonJquery/CommonJquery.js";

let flag_for = 0;
let for_status_final = 0;

function AddDoctorProfile() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const imageInputRef = useRef(null);
  const [toggleStates, setToggleStates] = useState({});

  const countryOptions = (selectedCountry) =>
    Object.keys(countries.countries).map((code) => (
      <option key={code} value={code} selected={selectedCountry === code}>
        {countries.countries[code].name}
      </option>
    ));

  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [notificationdata, setNotificationdata] = useState([]);
  const [selecteddata, setselecteddataa] = useState([]);
  const [data_front_image, setdata_front_image] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    master_data_get();
  }, []);

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
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
            empty_form(form_data);
            if (closeButton) {
              closeButton.click();
            }
            if (closeButton1) {
              closeButton1.click();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
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
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(get_all_admin, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setNotificationdata(Response.data.message.data_admin);
          setdata_front_image(
            APL_LINK + Response.data.message.data_doctor_image
          );
          const initialLikesplues = Response.data.message.data_admin.map(
            (item) => {
              return item.allow_access === "1";
            }
          );
          setToggleStates(initialLikesplues);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
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

  useEffect(() => {
    master_data_get();
    handlePasswordError();
  }, []);

  const handleGetId = (index) => {
    setselecteddataa(notificationdata[index]);
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

  const handleToggleChange = (packageId, index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    flag_for = 12;
    setSelectedGoalId(packageId);
    if (toggleStates[index]) {
      for_status_final = 0;
    } else {
      for_status_final = 1;
    }
    handleDeleteConfirmed(packageId);
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

  const tileClassName = ({ view }) => {
    if (view === "year" || view === "decade" || view === "century") {
      return "custom-header";
    }
    return "";
  };

  const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const logoutpopup = () => {
    setShowModal(false);
    removeData();
    navigate("/login");
  };

  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="my_patients_dash_head_container notifications_dash_container">
        <div className="back_btn_heading d-flex addNotf">
          <div className="d-flex">
            <span className="mr-3">
              <div className="back_btn" onClick={() => navigate(-1)}>
                <img src={ArrowLeft} alt="icon" />
              </div>
            </span>
            <h4 className="ms-2 hd">Dr Emma Scotts</h4>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-8 py-3">
          <div className="levReqst mt-3">
            <div className="d-flex levRqt justify-content: space-between">
              <div>
                <h5 className="hds">Leave Request: 04</h5>
              </div>
              <div className="vAll">
                <p>View All</p>
              </div>
            </div>
          </div>
          <div className="bckcolor p-5 ">
            <div className="lvrt d-flex ">
              <div className="ImgLvrt d-flex">
                <img src={lvrtImg} alt="icon" />
                <p>24/07/23 | 10:00AM-10:30AM</p>
              </div>
              <div className="btns">
                <button type="button" className="approveBtn ">
                  APPROVE
                </button>
              </div>
            </div>
            <div className="lvrt d-flex  mt-3">
              <div className="ImgLvrt d-flex">
                <img src={lvrtImg} alt="icon" />
                <p>24/07/23 | 10:00AM-10:30AM</p>
              </div>
              <div className="btns">
                <button type="button" className="caNCELBtn">
                  CANCEL
                </button>
              </div>
            </div>
          </div>

          <div className="shiFT row">
            <div className="col-6">
              <div className="mt-5">
                <h5 className="hds">Change shift and days</h5>
              </div>

              <div className="mt-4 bckcolor p-5">
                <h5 className="hds">Select Date</h5>
                <Calendar
                  onChange={setDate}
                  value={date}
                  tileClassName={tileClassName}
                />
              </div>
            </div>
            <div className="col-6 " style={{ paddingRight: "10px !important" }}>
              <div className="textBox ">
                <h5 className="mt-5 mb-3 hds ">Select Time</h5>
                <div className="timeBox d-flex mt-5  p-5">
                  <div className="timeOptions timeOption mt-2">
                    <label>Sleep Time</label> <br />
                    <input
                      className="trio_mendate"
                      id="sleepTime"
                      name="sleepTime"
                      type="time"
                    />
                  </div>
                  <div className="timeOptions timeOption mt-3">
                    <label>Wake up Time</label> <br />
                    <input
                      className="trio_mendate"
                      id="wakeTime"
                      name="wakeTime"
                      type="time"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="wkks mt-5  p-5 ">
              <h5 className="hds">Shift Days</h5>
              <div className="week">
                {daysInWeek.map((day, index) => (
                  <div
                    key={index}
                    className={`day-circle ${
                      selectedDays.includes(day) ? "selected" : ""
                    }`}
                    onClick={() => toggleDaySelection(day)}
                  >
                    <span>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="general_profile_form_button_div col-12 m-auto mt-3">
            <button type="button" className="general_profile_cancel_btn1">
              CANCEL
            </button>
            <button type="button" className="general_profile_save_btn1">
              SAVE
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div className="">
            <div className="create_diet_patient_wrapper general_profile_details_wrapper">
              <div className="create_diet_patient_details_div">
                <div className="create_diet_patient_img_div">
                  <img
                    src={dacTOR}
                    onError={(e) => {
                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                    }}
                    alt="Patient"
                  />
                </div>
                <div className="create_diet_patient_details general_profile_nutritionist">
                  <div className="patient_details">
                    {/* <h3>{retriveDoctorName}</h3>
                    
                    <p>{retriveDoctorProfession}</p> */}
                    <b className="sps">Dr. Emma Scotts</b>
                    <p className="sps">Nutritionist</p>
                  </div>
                </div>
              </div>
              <div className="container mt-4">
                <div className="row">
                  {/* First Column */}
                  <div className="col-md-4 mb-4">
                    <div className="number-box">
                      <div className="numbrs hds">55</div>
                      <div className="desct">Patient</div>
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="col-md-4 mb-4">
                    <div className="number-box">
                      <div className="numbrs hds">55K</div>
                      <div className="desct">Earnings</div>
                    </div>
                  </div>

                  {/* Third Column */}
                  <div className="col-md-4 mb-4">
                    <div className="number-box">
                      <div className="numbrs hds">4.9</div>
                      <div className="desct">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="patient_medical_wrapper">
                <div className="saved_profile_details_wrapper">
                  <div className="saved_email saved_profile_detail sps">
                    <img src={EmailSvg} alt="icon" />
                    {/* <p>{DoctorData.doctor_email}</p> */}
                    abhya@gmail.com
                  </div>
                  <div className="saved_address saved_profile_detail ">
                    <img src={MapPinSvg} alt="icon" />
                    <p className="sps">
                      {/* {DoctorData.doctor_zipcode},{DoctorData.doctor_city},
                      {DoctorData.doctor_state},{DoctorData.doctor_country} */}
                      Bhopal
                    </p>
                  </div>
                  <div className="saved_address saved_profile_detail sps">
                    <img src={CalendarSvg} alt="icon" />
                    {/* <p>{DoctorData.doctor_join_date}</p> */}
                    03-08-2001
                  </div>
                  <div className="saved_education saved_profile_detail sps sps">
                    <img src={DegreeSvg} alt="icon" />
                    {/* <p>{DoctorData.doctor_education}</p> */}
                    MBBS
                  </div>
                  <div className="saved_experience saved_profile_detail sps">
                    <img src={BriefcaseSvg} alt="icon" />
                    {/* <p>{DoctorData.doctor_exp_years} Years</p> */}
                    10 Year
                  </div>
                  <div
                    className="saved_experience saved_profile_detail mt-5 frCUrsor sps "
                    onClick={() => openModal()}
                  >
                    <img src={deleteIcon} alt="icon" />
                    Delete Account
                  </div>

                  <div className="saved_experience saved_profile_detail general_profile_form_button_div1 ">
                    <button
                      type="button"
                      className="general_profile_cancel_btn1 "
                    >
                      MAKE A PAYMENT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal} centered backdrop="static">
        <Modal.Body className="modal_body">
          <div className="success_img d-flex justify-content-center">
            {/* ... Modal content goes here ... */}
          </div>
          <p>Are you sure you want to Delete account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" modalCancelBtn bRDClose btn btn-primary"
            onClick={closeModal}
          >
            Close
          </Button>

          <Button className="modalAddBtn btn btn-primary" Click={logoutpopup}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddDoctorProfile;
