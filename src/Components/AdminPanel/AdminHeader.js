import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../Css/Header.css";
import "../../Css/loading.css";
import stuffImage from "../../Assests/images/users-three1.svg";
import HomeSvgActive from "../../Assests/images/home_svg.svg";
import addBtn from "../../Assests/images/add_svg.svg";
import HomeSvg from "../../Assests/images/home_black.svg";
import crossIcon from "../../Assests/images/rejectedIcon.svg.svg";
import FeedSvg from "../../Assests/images/feed_svg.svg";
import UsersSvg from "../../Assests/images/users_svg.svg";
import NotificationsSvg from "../../Assests/images/notifications_svg.svg";
import ProfileSvg from "../../Assests/images/profile_svg.svg";
import CalendarSvg from "../../Assests/images/calendar_svg.svg";
import MyStaffSvg from "../../Assests/images/mystaff_svg.svg";
import MyStaffActive from "../../Assests/images/Union.svg";
import CalendarSvgActive from "../../Assests/images/calender_active.svg";
import FeedSvgActive from "../../Assests/images/feeds_active.svg";
import UsersSvgActive from "../../Assests/images/my_patients_active.svg";
import NotificationsSvgActive from "../../Assests/images/notifications_active.svg";
import ProfileSvgActive from "../../Assests/images/my_profile_active.svg";
import settingIcon from "../../Assests/images/settingspng.png";
import settingIcon1 from "../../Assests/images/settingwite.svg";
import leaveIcon from "../../Assests/images/leave-svgrepo-com2.svg";
import leaveIcon1 from "../../Assests/images/leave-svgrepo-com.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import CorporateIcon from "../../Assests/images/bussi.svg";
import CorporateIcon1 from "../../Assests/images/bussi1.svg";
import ChatSvg from "../../Assests/images/chat_svg.svg";
import ChatSvgActive from "../../Assests/images/chats_active.svg";
import { PhoneInput } from "react-international-phone";
import { useNavigate } from "react-router-dom";
import {
  retrieveData,
  removeData,
} from "../../LocalConnection/LocalConnection.js";
import {
  server_post_data,
  create_appointments_by_doctor,
  change_password_admin_save,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  computeTodayDate,
  computeFutureDate,
} from "../../CommonJquery/CommonJquery.js";

function AdminHeader() {
  const [time, setTime] = useState("12:00");
  const location = useLocation();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (form_data === "addStaffProfileheader") {
      if (userNumber === "") {
        alert("Enter Vaild Mobile No");
        vaild_data = false;
      } else if (userNumber.length < 8) {
        vaild_data = false;
        alert("Enter Vaild Mobile No");
      }
    }
    if (vaild_data) {
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("admin_id", retriveDoctorId);
      fd_from.append("user_number", userNumber);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          if (!Response.data.error) {
            empty_form(form_data);
          }
          alert(Response.data.message);
          const closeButton = document.querySelector(
            "#" + form_data + ' [data-dismiss="modal"]'
          );

          if (closeButton) {
            closeButton.click();
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const logoutpopup = () => {
    removeData();
    navigate("/superadmin");
  };

  const handleUpdate = () => {
    if (passwordsMatch) {
      handleSaveChangesdynamic(
        "form_save_password",
        change_password_admin_save
      );
    }
  };

  const [passwordFormatValid, setPasswordFormatValid] = useState(true);
  const handlePasswordChange = () => {
    const newPassword = document.getElementById("newpassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);

      // Validate the new password format
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (passwordRegex.test(newPassword)) {
        setPasswordFormatValid(true);
      } else {
        setPasswordFormatValid(false);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  // Retrived data
  const navigate = useNavigate();
  const [retriveDoctorName, setRetriveDoctorName] = useState("");
  const [retriveDoctorProfession, setRetriveDoctorProfession] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [userNumber, setUserNumber] = useState("");

  useEffect(() => {
    const retrievedDoctorName = retrieveData("admin_name");
    setRetriveDoctorId(retrieveData("admin_id"));
    const retrievedDoctorProfession = retrieveData("admin_profession");
    const retrievedDoctorImage = retrieveData("admin_image");

    setRetriveDoctorName(retrievedDoctorName);
    setRetriveDoctorProfession(retrievedDoctorProfession);
    setRetriveDoctorImage(retrievedDoctorImage);

    const retrievedDataFind = retrieveData("admin_email");
    if (retrievedDataFind === "null" || retrievedDataFind === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="header">
      <div className="header_wrapper">
        <div className="header_container d-flex justify-content-between flex-wrap">
          <div className="img_name_div d-flex align-items-center">
            <div className="img_div">
              <img
                src={retriveDoctorImage}
                onError={(e) => {
                  e.target.src = ProfileImgSample; // Provide the path to your fallback image
                }}
                alt="Nutritionist"
              />
            </div>
            <div className="name_div">
              <h5 className="m-0 sps">{retriveDoctorName}</h5>
              <p className="m-0 sps">{retriveDoctorProfession}</p>
            </div>
          </div>

          <div
            className="dropdown "
            style={{
              display: "flex",
              justifyContent: "center",
              height: "fit-content ",
            }}
          >
            <div className="d-flex gap-2 align-items-center justify-content-center">
              <div className="createAppointment_btn mrgin">
                <button data-target="#addStaff" data-toggle="modal">
                  <img src={addBtn} />
                  CREATE APPOINTMENT
                </button>
              </div>
            </div>

            <button
              className="btn btn-secondary dropdown-toggle Accbtn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              ACCOUNT
            </button>
            <div
              className="dropdown-menu headerDropdown dropdown-menu-lg-start "
              aria-labelledby="dropdownMenuButton"
            >
              <div className="dropdown-item">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#changePassword"
                  tabIndex={1}
                >
                  <i className="fa fa-lock" aria-hidden="true"></i> &nbsp;{" "}
                  Change Password
                </button>
              </div>

              <Link className="dropdown-item" to="/superadmin">
                <button
                  className="btn btn-primary"
                  onClick={logoutpopup}
                  tabIndex={2}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i> &nbsp;{" "}
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="menu_bar menu_barAdmin">
          <div className="menu_bar_wrapper menu_bar_wrapper_admin">
            <div className="menu_bar_container d-flex justify-content-around">
              <Link to="/AdminWelcomepage">
                <div
                  className={`card text-center ${
                    location.pathname === "/AdminWelcomepage"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3 ">
                    {location.pathname === "/AdminWelcomepage" ? (
                      <img src={HomeSvgActive} alt="icon" />
                    ) : (
                      <img src={HomeSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Home</p>
                  </div>
                </div>
              </Link>
              <Link to="/AdminFeed">
                <div
                  className={`card text-center ${
                    location.pathname === "/AdminFeed" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/AdminFeed" ? (
                      <img src={FeedSvgActive} alt="icon" />
                    ) : (
                      <img src={FeedSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Feeds</p>
                  </div>
                </div>
              </Link>
              <Link to="/ViewAdminPatient">
                <div
                  className={`card text-center ${
                    location.pathname === "/ViewAdminPatient"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/ViewAdminPatient" ? (
                      <img src={UsersSvgActive} alt="icon" />
                    ) : (
                      <img src={UsersSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Patients</p>
                  </div>
                </div>
              </Link>

              <Link to="/AdminCalendar">
                <div
                  className={`card text-center ${
                    location.pathname === "/AdminCalendar" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/AdminCalendar" ? (
                      <img src={CalendarSvgActive} alt="icon" />
                    ) : (
                      <img src={CalendarSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Calendar</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin_chats">
                <div
                  className={`card text-center ${
                    location.pathname === "/admin_chats" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/admin_chats" ? (
                      <img src={ChatSvgActive} alt="icon" />
                    ) : (
                      <img src={ChatSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Chats</p>
                  </div>
                </div>
              </Link>
              <Link to="/AddDoctorProfile">
                <div
                  className={`card text-center d-flex align-items-center ${
                    location.pathname === "/AddDoctorProfile"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/AddDoctorProfile" ? (
                      <img src={ProfileSvgActive} alt="icon" />
                    ) : (
                      <img src={ProfileSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Nutritionist</p>
                  </div>
                </div>
              </Link>

              {/* <Link to="/NotificationsAdmin">
                <div
                  className={`card text-center ${
                    location.pathname === "/NotificationsAdmin"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/NotificationsAdmin" ? (
                      <img src={NotificationsSvgActive} alt="icon" />
                    ) : (
                      <img src={NotificationsSvg} alt="icon" />
                    )}
                    <p className="card-text hds">Notifications</p>
                  </div>
                </div>
              </Link> */}

              <Link to="/StaffProfiles">
                <div
                  className={`card text-center d-flex align-items-center  ${
                    location.pathname === "/StaffProfiles" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/StaffProfiles" ? (
                      <img src={MyStaffActive} alt="icon" />
                    ) : (
                      <img src={stuffImage} alt="icon" />
                    )}
                    <p className="card-text hds">Staff</p>
                  </div>
                </div>
              </Link>

              <Link to="/LeaveRequest">
                <div
                  className={`card text-center d-flex align-items-center ${
                    location.pathname === "/LeaveRequest" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/LeaveRequest" ? (
                      <img src={leaveIcon1} alt="icon" />
                    ) : (
                      <img src={leaveIcon} alt="icon" />
                    )}
                    <p className="card-text hds">Leave Request</p>
                  </div>
                </div>
              </Link>
              {/* <Link to="/AdminPanelSettings">
                <div
                  className={`card text-center d-flex align-items-center ${
                    location.pathname === "/AdminPanelSettings"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/AdminPanelSettings" ? (
                      <img src={settingIcon1} alt="icon" />
                    ) : (
                      <img src={settingIcon} alt="icon" />
                    )}
                    <p className="card-text hds">App Master</p>
                  </div>
                </div>
              </Link> */}

              <Link to="/AdminCorporateDetalis">
                <div
                  className={`card text-center d-flex align-items-center ${
                    location.pathname === "/AdminCorporateDetalis"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/AdminCorporateDetalis" ? (
                      <img src={CorporateIcon1} alt="icon" />
                    ) : (
                      <img src={CorporateIcon} alt="icon" />
                    )}
                    <p className="card-text hds">Corporate</p>
                  </div>
                </div>
              </Link>
              <Link to="/MyProfileAdmin">
                <div
                  className={`card text-center d-flex align-items-center justify-content-center  ${
                    location.pathname === "/MyProfileAdmin" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-3">
                    {location.pathname === "/MyProfileAdmin" ? (
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

      {/* Chnage Password by Arsalan @21-08-2023 */}
      <div
        className="modal fade"
        id="changePassword"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="changePassword"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changePassword">
                Change Password
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                tabIndex={1}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="changePasswordContianer">
                <form id="form_save_password">
                  <label htmlFor="currentPassword">
                    Enter Current Password
                  </label>
                  <div className="passwordWrapper">
                    <input
                      type={
                        passwordVisibility.currentpassword ? "text" : "password"
                      }
                      placeholder="Enter Current Password"
                      className="p-2 trio_mendate"
                      name="currentpassword"
                      id="currentpassword"
                      tabIndex={2}
                    />
                    <i
                      className={`fa ${
                        passwordVisibility.currentpassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                      aria-hidden="true"
                      tabIndex={3}
                      onClick={() =>
                        togglePasswordVisibility("currentpassword")
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("currentpassword");
                        }
                      }}
                    ></i>
                  </div>

                  <label htmlFor="newPassword">Enter New Password</label>
                  <div className="passwordWrapper">
                    <input
                      type={
                        passwordVisibility.newpassword ? "text" : "password"
                      }
                      placeholder="Enter New Password"
                      className="p-2 trio_mendate"
                      name="newpassword"
                      id="newpassword"
                      onChange={handlePasswordChange}
                      tabIndex={4}
                    />
                    <i
                      className={`fa ${
                        passwordVisibility.newpassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                      aria-hidden="true"
                      onClick={() => togglePasswordVisibility("newpassword")}
                      tabIndex={5}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("newpassword");
                        }
                      }}
                    ></i>
                  </div>

                  {passwordsMatch && !passwordFormatValid && (
                    <p
                      className="m-0 notMatchWarning"
                      style={{ fontSize: "13px" }}
                    >
                      Password must contain at least one uppercase letter, one
                      lowercase letter, one digit, one special character, be at
                      least 8 characters long, and should not contain spaces.
                    </p>
                  )}

                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <div className="passwordWrapper">
                    <input
                      type={
                        passwordVisibility.confirmNewPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm New Password"
                      className="p-2 trio_mendate"
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      onChange={handlePasswordChange}
                      tabIndex={6}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("password1");
                        }
                      }}
                    />
                    <i
                      className={`fa ${
                        passwordVisibility.confirmNewPassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                      aria-hidden="true"
                      onClick={() =>
                        togglePasswordVisibility("confirmNewPassword")
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("confirmNewPassword");
                        }
                      }}
                      tabIndex={7}
                    ></i>
                  </div>

                  {!passwordsMatch && (
                    <p
                      className="m-0 notMatchWarning"
                      style={{ fontSize: "13px" }}
                    >
                      Password does not match
                    </p>
                  )}
                </form>
              </div>
            </div>
            <div className="modal-footer ">
              <button
                type="button"
                className="modalAddBtn updBtn"
                onClick={handleUpdate}
                tabIndex={8}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Chnage Password by Arsalan @21-08-2023 */}
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
                    Patient name
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="trio_mendate"
                    id="patient-name"
                    name="customer_name"
                    onInput={handleAphabetsChange}
                    maxLength={70}
                  />
                </div>

                <div className="form-group">
                  <label className="text-start">
                    Patient contact number
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
                </div>

                <div className="form-group">
                  <div className="reservation-box">
                    <div className="top ">
                      <div className="static">
                        <div
                          className="input-container"
                          id="date-picker-container"
                        >
                          <label htmlFor="date-from" className="text-start">
                            Date
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
                            From Time
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </label>
                          {/* <TimePicker onChange={setTime} value={time} /> */}
                          <input
                            type="time"
                            id="time-checkin"
                            className="trio_mendate"
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
                            To Time
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
                  <label className="text-start">Occurrence</label>
                  <select
                    id="repeat-option"
                    className="trio_mendate"
                    name="occurrence"
                  >
                    <option value="Does-not-repeat">Does not repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className=" groupHeadingBox">
                    <span className="sps">Optional</span>
                    <span className="sps">Category</span>
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
                    <span className="sps">Description</span>
                    <span className="sps">Optional</span>
                  </label>

                  <textarea
                    className="sps"
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
                className="btn modalCancelBtn"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn modalAddBtn"
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
    </div>
  );
}

export default AdminHeader;
