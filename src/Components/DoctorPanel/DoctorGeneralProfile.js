import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Css/AdminGeneralProfile.css";
import ArrowLeft from "../../Assests//images/arrow_left.svg";
import GeneralSvg from "../../Assests//images/general_profile.svg";
import General1Svg from "../../Assests//images/general_profile_white.svg";
import delIcon from "../../Assests/images/figmaDeleteIcon.svg";
import adminFeedbackSvg from "../../Assests//images/general_profile_white_adminFeedback.svg";
import adminFeedbackInactive from "../../Assests/images/general_profile_white_adminFeedbackInactive.svg";
import LeaveSvg from "../../Assests//images/leave_general.svg";
import Leave1Svg from "../../Assests//images/leave_general_white.svg";
import UploadSvg from "../../Assests//images/upload_general.svg";
import Upload1Svg from "../../Assests//images/upload_general _white.svg";
import EmailSvg from "../../Assests//images/email.svg";
import CalendarSvg from "../../Assests//images/calendar_svg.svg";
import MapPinSvg from "../../Assests/images/map-pin.svg";
import DegreeSvg from "../../Assests//images/degree.svg";
import BriefcaseSvg from "../../Assests//images/briefcase .svg";
import SignOutSvg from "../../Assests//images/sign-out.svg";
import { Modal, Button } from "react-bootstrap";
import passwordIcon from "../../Assests//images/passwordIcon.png";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import DoctorHeader from "./DoctorHeader";

import {
  APL_LINK,
  server_post_data,
  get_doctor_by_single,
  update_doctor,
  post_leave_request_save,
  change_password_save,
  save_ethi_doctor_feedback,
} from "../../ServiceConnection/serviceconnection.js";

import {
  storeData,
  retrieveData,
  removeData,
} from "../../LocalConnection/LocalConnection.js";

import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  make_date_format,
  handleIaphabetnumberChange,
  handleAphabetsChange,
  handleNumbersChange,
} from "../../CommonJquery/CommonJquery.js";

import { options_leave } from "../../CommonJquery/Commondata.js";
import countries from "countries-list";

function DoctorGeneralProfile() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retriveDoctorName, setretriveDoctorName] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [DoctorData, setDoctorData] = useState(null); // 👈 important: will be set later
  const [LeaveData, setLeaveData] = useState([]);
  const [retriveDoctorProfession, setRetriveDoctorProfession] = useState("");
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [alertMsg2, setAlertMsg2] = useState(false);
  const [isGeneralActive, setIsGeneralActive] = useState(true);
  const [isLeaveActive, setIsLeaveActive] = useState(false);
  const [isAppliedLeave, setIsAppliedLeave] = useState(false);
  const [isAdminFeedback, setIsAdminFeedback] = useState(false);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordFormatValid, setPasswordFormatValid] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentpassword: false,
    newpassword: false,
    confirmNewPassword: false,
  });

  const [leaveType1, setLeaveType1] = useState("");
  const [leaveFrom1, setLeaveFrom1] = useState("");
  const [leaveTo1, setLeaveTo1] = useState("");
  const [Reason1, setReason1] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [whatWentWell, setWhatWentWell] = useState("");
  const [isTextareaEmpty, setIsTextareaEmpty] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDate1 = new Date().toISOString().split("T")[0];

  const openDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const closeDeleteAccountModal = () => setShowDeleteAccountModal(false);

  const handleDeleteAccount = () => {
    // TODO: add delete account logic
    closeDeleteAccountModal();
  };

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    setretriveDoctorName(retrieveData("doctor_name"));
    setRetriveDoctorImage(retrieveData("doctor_image"));
    setRetriveDoctorProfession(retrieveData("doctor_profession"));

    if (!retrievedDoctorId) {
      // agar login data hi nahi mila to login page
      navigate("/login");
      return;
    }

    master_data_feeds(retrievedDoctorId);
  }, [navigate]);

  const countryOptions = (selectedCountry) =>
    Object.keys(countries.countries).map((code) => (
      <option key={code} value={code} selected={selectedCountry === code}>
        {countries.countries[code].name}
      </option>
    ));

  const master_data_feeds = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);

    await server_post_data(get_doctor_by_single, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          const doctor = Response.data.message.data_doctor[0];
          setDoctorData(doctor);
          setLeaveData(Response.data.message.data_leave || []);

          storeData("doctor_email", doctor.user_email);
          storeData("doctor_name", doctor.doctor_name);
          storeData(
            "doctor_image",
            APL_LINK +
              Response.data.message.data_doctor_image +
              doctor.doctor_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
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

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("doctor_name", retriveDoctorName);

      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            if (Reason1.length !== 0) {
              alert("Leave Applied");
              setLeaveType1("");
              setLeaveFrom1("");
              setLeaveTo1("");
              setReason1("");
            }

            empty_form(form_data);
            master_data_feeds(retriveDoctorId);
          }
        })
        .catch((error) => {
          console.log(error);
          setShowLoader(false);
        });
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const logoutpopup = () => {
    setShowModal(false);
    removeData();
    navigate("/login");
  };

  const handleGeneralClick = () => {
    setIsGeneralActive(true);
    setIsLeaveActive(false);
    setIsAppliedLeave(false);
    setIsAdminFeedback(false);
  };

  const handleLeaveClick = () => {
    setIsGeneralActive(false);
    setIsLeaveActive(true);
    setIsAppliedLeave(false);
    setIsAdminFeedback(false);
  };

  const handleRequestClick = () => {
    setIsGeneralActive(false);
    setIsLeaveActive(false);
    setIsAppliedLeave(true);
    setIsAdminFeedback(false);
  };

  const handleAdminFeedbackClick = () => {
    setIsGeneralActive(false);
    setIsLeaveActive(false);
    setIsAppliedLeave(false);
    setIsAdminFeedback(true);
  };

  function validateDateRange() {
    var fromDateInput = document.getElementById("leave_from");
    var toDateInput = document.getElementById("leave_to");

    var fromDate = new Date(fromDateInput.value);
    var toDate = new Date(toDateInput.value);

    if (fromDate > toDate) {
      toDateInput.value = fromDateInput.value;
    }

    toDateInput.min = fromDateInput.value;
  }

  const handleUpdate = () => {
    if (passwordsMatch && passwordFormatValid) {
      handleSaveChangesdynamic("form_save_password", change_password_save);
    }
  };

  const handlePasswordChange = () => {
    const newPassword = document.getElementById("newpassword").value;
    const confirmNewPassword =
      document.getElementById("confirmNewPassword").value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordRegex.test(newPassword)) {
      setPasswordFormatValid(true);
    } else {
      setPasswordFormatValid(false);
    }

    if (newPassword === confirmNewPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleCancel1 = () => {
    setLeaveType1("");
    setLeaveFrom1("");
    setLeaveTo1("");
    setReason1("");
  };

  const handleIaphabetnumberChangeLocal = (e) => {
    const value = e.target.value;
    setWhatWentWell(value);
    setIsTextareaEmpty(value.trim() === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTextareaEmpty) {
      console.log("What went well:", whatWentWell);
    } else {
      alert("Fill the textarea before submitting.");
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [field]: !prevVisibility[field],
    }));
  };

  const handleCopyPaste = (e) => {
    e.preventDefault();
  };

  // safe leave balance
  const leaveBalance =
    DoctorData && DoctorData.doctor_leave_allow != null
      ? Number(DoctorData.doctor_leave_allow || 0) -
        Number(DoctorData.doctor_leave_used || 0)
      : 0;

  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <DoctorHeader />
      </div>

      <div className="create_diet_plan_dash general_profile_dash">
        <div className="my_patients_dash_head general_profile_dash_head">
          <div className="my_patients_dash_head_container general_profile_dash_head_container">
            <div className="back_btn_heading">
              <span>
                <div className="back_btn" onClick={() => navigate(-1)}>
                  <img src={ArrowLeft} alt="icon" />
                </div>
              </span>
              <h4 className="sp"> My Profile</h4>
            </div>
          </div>
        </div>

        <div className="create_diet_plan_dash_container general_profile_dash_container p-3">
          <div className="row create_diet_plan_dash_container_row">
            {/* LEFT SIDE FORM SECTION */}
            <div className="col-lg-8">
              <div className="patients_diet_plan_wrapper create_diet_plan_container general_profile_container">
                <div className="patients_diet_plan_container">
                  <div className="patients_diet_plan_head">
                    <div className="general_leave_upload_tabs">
                      <div
                        className={`general_tab ${
                          isGeneralActive ? "general_profile_active_tab" : ""
                        }`}
                        onClick={handleGeneralClick}
                      >
                        <div className="general_tab_img">
                          {!isGeneralActive && (
                            <img src={GeneralSvg} alt="General " />
                          )}
                          {isGeneralActive && (
                            <img src={General1Svg} alt="General " />
                          )}
                        </div>
                        <h6 className="sps">General</h6>
                      </div>

                      <div
                        className={`leave_tab ${
                          isLeaveActive ? "general_profile_active_tab" : ""
                        }`}
                        onClick={handleLeaveClick}
                      >
                        <div className="general_tab_img">
                          {isLeaveActive && (
                            <img src={Leave1Svg} alt="Leave " />
                          )}
                          {!isLeaveActive && (
                            <img src={LeaveSvg} alt="Leave " />
                          )}
                        </div>
                        <h6 className="sps">Apply Leave</h6>
                      </div>

                      <div
                        className={`upload_tab ${
                          isAppliedLeave ? "general_profile_active_tab" : ""
                        }`}
                        onClick={handleRequestClick}
                      >
                        <div className="general_tab_img">
                          {isAppliedLeave && (
                            <img src={Upload1Svg} alt="Leave" />
                          )}
                          {!isAppliedLeave && (
                            <img src={UploadSvg} alt="adminFeedback " />
                          )}
                        </div>
                        <h6 className="sps">Applied Leaves</h6>
                      </div>

                      <div
                        className={`upload_tab ${
                          isAdminFeedback ? "general_profile_active_tab" : ""
                        }`}
                        onClick={handleAdminFeedbackClick}
                      >
                        <div className="general_tab_img">
                          {isAdminFeedback && (
                            <img src={adminFeedbackSvg} alt="adminFeedback " />
                          )}
                          {!isAdminFeedback && (
                            <img
                              src={adminFeedbackInactive}
                              alt="admin inactive"
                            />
                          )}
                        </div>
                        <h6 className="sps">Admin Feedback</h6>
                      </div>
                    </div>
                  </div>

                  {/* GENERAL TAB */}
                  {isGeneralActive && (
                    <div className="general_profile_form_wrapper">
                      <div className="general_profile_form_container">
                        <form id="form_data_profile">
                          <div className="general_profile_form_input_div">
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Full Name</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_name || ""
                                  }
                                  placeholder="Enter Your Name"
                                  className="trio_mendate trio_name"
                                  id="doctor_name_single"
                                  name="doctor_name_single"
                                  maxLength={70}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Mobile No</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_mobile_no || ""
                                  }
                                  placeholder="Enter Your Mobile No"
                                  className="trio_mendate trio_no"
                                  id="doctor_mobile_no"
                                  name="doctor_mobile_no"
                                  maxLength={10}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">City</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_city || ""
                                  }
                                  placeholder="Enter Your City"
                                  className="trio_mendate"
                                  id="doctor_city"
                                  name="doctor_city"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="sps">State</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_state || ""
                                  }
                                  placeholder="Enter Your State"
                                  className="trio_mendate"
                                  id="doctor_state"
                                  name="doctor_state"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Zipcode</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_zipcode || ""
                                  }
                                  placeholder="Enter Your City Zipcode"
                                  className="trio_mendate"
                                  id="doctor_zipcode"
                                  name="doctor_zipcode"
                                  maxLength={8}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Country</label>
                                <select
                                  id="doctor_country"
                                  name="doctor_country"
                                >
                                  <option value="">Select a country</option>
                                  {DoctorData &&
                                    DoctorData.doctor_country &&
                                    countryOptions(DoctorData.doctor_country)}
                                </select>
                              </div>
                            </div>

                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Education</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_education || ""
                                  }
                                  placeholder="Enter Your Highest Education"
                                  className="trio_mendate"
                                  id="doctor_education"
                                  name="doctor_education"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>

                              <div className="input_box_general_profile col-5">
                                <label className="sps">
                                  Years of Experience
                                </label>
                                <input
                                  type="text"
                                  step="0.5"
                                  min="0"
                                  defaultValue={
                                    DoctorData?.doctor_exp_years || ""
                                  }
                                  placeholder="Enter Year"
                                  id="doctor_exp_years"
                                  name="doctor_exp_years"
                                  maxLength={5}
                                  onInput={(e) => {
                                    const years = e.target.value.trim();
                                    if (years === "") return;
                                    if (!/^[0-9]+(\.[0-9]*)?$/.test(years))
                                      return;
                                    if (parseFloat(years) < 0) return;
                                  }}
                                />
                              </div>

                              <div className="input_box_general_profile col-5 hidden">
                                <label>Password</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData?.doctor_password || ""
                                  }
                                  placeholder="Enter Doctor_Password"
                                  className="trio_mendate"
                                  id="doctor_password"
                                  name="doctor_password"
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="uploadImg_label sps">
                                  Upload Image
                                </label>
                                <input
                                  type="hidden"
                                  defaultValue={
                                    DoctorData?.doctor_image || ""
                                  }
                                  id="doctor_image_old"
                                  name="doctor_image_old"
                                />
                                <input
                                  className="image_input_profile "
                                  type="file"
                                  accept="image/*"
                                  id="doctor_image"
                                  name="doctor_image"
                                  onChange={handleFileChangedynamic(
                                    "doctor_image",
                                    "image"
                                  )}
                                />
                              </div>
                              <div className="input_box_general_profile col-5 border-0 bg-transparent"></div>
                            </div>
                          </div>

                          <div className="general_profile_form_button_div col-12 m-auto">
                            <Link to={`/doctor_admin_general_profile`}>
                              <button
                                type="button"
                                className="general_profile_cancel_btn sps"
                              >
                                CANCEL
                              </button>
                            </Link>
                            <button
                              type="button"
                              className="general_profile_save_btn sps"
                              onClick={() =>
                                handleSaveChangesdynamic(
                                  "form_data_profile",
                                  update_doctor
                                )
                              }
                            >
                              SAVE PROFILE
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* APPLY LEAVE TAB */}
                  {isLeaveActive && (
                    <div className="general_profile_apply_leave_wrapper">
                      <div className="apply_leave_container">
                        <form id="form_data_leave">
                          <div className="general_profile_form_input_div">
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">Leave Type</label>
                                <select
                                  className="trio_mendate"
                                  id="leave_type"
                                  name="leave_type"
                                  value={leaveType1}
                                  onChange={(e) =>
                                    setLeaveType1(e.target.value)
                                  }
                                >
                                  <option value="" className="sps">
                                    Select An Option
                                  </option>
                                  {options_leave.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="leave_balance_div input_box_general_profile col-5">
                                <label className="sps">Leave Balance</label>
                                <p>{leaveBalance}</p>
                              </div>
                            </div>

                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="sps">From Date</label>
                                <input
                                  type="date"
                                  className="trio_mendate"
                                  id="leave_from"
                                  name="leave_from"
                                  onChange={(e) =>
                                    setLeaveFrom1(e.target.value)
                                  }
                                  value={leaveFrom1}
                                  min={currentDate}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>To Date</label>
                                <input
                                  type="date"
                                  className="trio_mendate"
                                  id="leave_to"
                                  name="leave_to"
                                  onChange={(e) => setLeaveTo1(e.target.value)}
                                  value={leaveTo1}
                                  min={leaveFrom1 || currentDate}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="leave_reason_text m-auto p-0">
                            <div className="leave_reason_label">
                              <label>Reason</label>
                            </div>
                            <textarea
                              className="trio_mendate"
                              id="reason"
                              name="reason"
                              maxLength={300}
                              onInput={handleIaphabetnumberChangeLocal}
                              onChange={(e) => setReason1(e.target.value)}
                              value={Reason1}
                            ></textarea>
                          </div>

                          <div className="general_profile_form_button_div col-12 m-auto">
                            <button
                              type="button"
                              className="general_profile_cancel_btn fntNunitto"
                              onClick={handleCancel1}
                            >
                              CANCEL
                            </button>
                            <button
                              type="button"
                              className="general_profile_save_btn fntNunitto"
                              onClick={() =>
                                handleSaveChangesdynamic(
                                  "form_data_leave",
                                  post_leave_request_save
                                )
                              }
                            >
                              APPLY LEAVE
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* APPLIED LEAVES TAB */}
                  {isAppliedLeave && (
                    <div className="general_profile_uplaod_wrapper">
                      <div className="uplaod_container">
                        <h5 className="sps">Applied Leaves List</h5>
                        <form>
                          <div className="upload_list_wrapper">
                            <div className="leave_list_table table-responsive rounded">
                              <table className="table rounded">
                                <thead className="thead_bg rounded">
                                  <tr className="rounded sps">
                                    <th scope="col fntNunitto">S No.</th>
                                    <th scope="col fntNunitto">
                                      Applied Date
                                    </th>
                                    <th scope="col fntNunitto">
                                      Reason & Duration
                                    </th>
                                    <th scope="col fntNunitto ">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="rounded-bottom appliedLeaveListBox">
                                  {LeaveData.map((data, index) => (
                                    <tr key={index}>
                                      <td scope="row">{index + 1}</td>
                                      <td>
                                        {make_date_format(
                                          data.entry_date,
                                          ""
                                        )}
                                      </td>
                                      <td>
                                        <button
                                          type="button"
                                          data-toggle="modal"
                                          onClick={() =>
                                            setSelectedLeaveData(data)
                                          }
                                          data-target="#leaveDetailsModal"
                                        >
                                          View Details
                                        </button>
                                      </td>
                                      <td>
                                        <p
                                          className={
                                            data.status_for === "2"
                                              ? "leaveRjct"
                                              : data.status_for === "1"
                                              ? "leaveApr"
                                              : "leavePnd"
                                          }
                                        >
                                          {data.status_for === "2"
                                            ? "Rejected"
                                            : data.status_for === "1"
                                            ? "Approved"
                                            : "Pending"}
                                        </p>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* ADMIN FEEDBACK TAB */}
                  {isAdminFeedback && (
                    <div className="general_profile_uplaod_wrapper">
                      <div className="adminFeedback_container">
                        <form id="form_data_leave_form">
                          <div className="upload_list_wrapper">
                            <textarea
                              className={`feedBackContainer trio_mendate ${
                                isTextareaEmpty ? "empty-textarea" : ""
                              }`}
                              id="what_went_well"
                              name="what_went_well"
                              maxLength={300}
                              onInput={handleIaphabetnumberChangeLocal}
                              placeholder="What went well?"
                            ></textarea>

                            <div>
                              <textarea
                                className="feedBackContainer trio_mendate"
                                id="what_could_we_improve_on"
                                name="what_could_we_improve_on"
                                maxLength={300}
                                onInput={handleIaphabetnumberChangeLocal}
                                placeholder="What could we improve on?"
                              ></textarea>
                            </div>

                            <div>
                              <textarea
                                className="feedBackContainer trio_mendate"
                                id="any_additional_comments"
                                name="any_additional_comments"
                                maxLength={300}
                                placeholder="Any additional comments"
                              ></textarea>
                            </div>

                            <div className="general_profile_form_button_div col-12 m-auto">
                              <button
                                type="button"
                                className="general_profile_cancel_btn fntNunitto"
                                onClick={handleCancel1}
                              >
                                CANCEL
                              </button>
                              <button
                                type="button"
                                className="general_profile_save_btn fntNunitto"
                                onClick={() =>
                                  handleSaveChangesdynamic(
                                    "form_data_leave_form",
                                    save_ethi_doctor_feedback
                                  )
                                }
                              >
                                SEND
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE PROFILE CARD */}
            <div className="col-lg-4 ">
              <div className="create_diet_patient_wrapper general_profile_details_wrapper">
                <div className="create_diet_patient_details_div">
                  <div className="create_diet_patient_img_div">
                    <img
                      src={retriveDoctorImage}
                      onError={(e) => {
                        e.target.src = ProfileImgSample;
                      }}
                      alt="Patient"
                    />
                  </div>
                  <div className="create_diet_patient_details general_profile_nutritionist">
                    <div className="patient_details">
                      <h3 className="fntNunitto">{retriveDoctorName}</h3>
                      <p className="fntNunitto">{retriveDoctorProfession}</p>
                    </div>
                  </div>
                </div>

                <div className="patient_medical_wrapper">
                  {DoctorData && (
                    <div className="saved_profile_details_wrapper">
                      <div className="saved_email saved_profile_detail">
                        <img src={EmailSvg} alt="icon" />
                        <p className="fntNunitto">
                          {DoctorData.doctor_email || DoctorData.user_email}
                        </p>
                      </div>

                      <div className="saved_address saved_profile_detail">
                        <img src={MapPinSvg} alt="icon" />
                        <p className="fntNunitto">
                          {DoctorData.doctor_zipcode || ""},{" "}
                          {DoctorData.doctor_city || ""},{" "}
                          {DoctorData.doctor_state || ""},{" "}
                          {DoctorData.doctor_country || ""}
                        </p>
                      </div>

                      <div className="saved_address saved_profile_detail">
                        <img src={CalendarSvg} alt="icon" />
                        <p className="fntNunitto">
                          {DoctorData.doctor_join_date || ""}
                        </p>
                      </div>

                      <div className="saved_education saved_profile_detail">
                        <img src={DegreeSvg} alt="icon" />
                        <p className="fntNunitto">
                          {DoctorData.doctor_education || ""}
                        </p>
                      </div>

                      <div className="saved_experience saved_profile_detail">
                        <img src={BriefcaseSvg} alt="icon" />
                        <p className="fntNunitto">
                          {DoctorData.doctor_exp_years || 0} Years
                        </p>
                      </div>

                      <div
                        className="saved_experience saved_profile_detail passIcon"
                        data-toggle="modal"
                        data-target="#changePassword"
                      >
                        <img src={passwordIcon} alt="icon" />
                        <p className="fntNunitto">Change Password</p>
                      </div>

                      <div className="logout_dlt_btn_wrapper">
                        <div
                          className="logout_profile saved_profile_detail"
                          onClick={() => openModal()}
                        >
                          <img src={SignOutSvg} alt="icon" />
                          <p className="fntNunitto">Logout</p>
                        </div>
                      </div>

                      {/* Delete Account (optional UI) */}
                      {/* <div className="logout_dlt_btn_wrapper">
                        <div
                          className="saved_experience saved_profile_detail mt-3"
                          onClick={openDeleteAccountModal}
                        >
                          <img src={delIcon} alt="icon" />
                          <p className="deleteIconText">Delete Account</p>
                        </div>
                      </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LEAVE DETAILS MODAL */}
      <div
        className="modal fade"
        id="leaveDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="leaveDetailsModalTitle"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog ${
            selectedLeaveData && selectedLeaveData.remarks
              ? "modal-xl"
              : "modal-dialog-centered"
          }`}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header modal_header_leaveDetails">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Leave Details
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

            {selectedLeaveData && (
              <div className="modal-body">
                <div className="modal-dialog">
                  <div className="row m-1">
                    <div
                      className={`${
                        selectedLeaveData && selectedLeaveData.remarks
                          ? "col-md-6"
                          : "text-left"
                      }`}
                    >
                      <div className="leave_details_container">
                        <p>
                          Leave Type : &nbsp;
                          <span>{selectedLeaveData.leave_type}</span>
                        </p>
                        <div>
                          <p>
                            Leave Duration : &nbsp;
                            <span>{selectedLeaveData.leave_duration} days</span>
                          </p>
                          <div className="leaveDatesDiv">
                            <p>
                              From : &nbsp;
                              <span>
                                {make_date_format(
                                  selectedLeaveData.leave_from,
                                  "yyyy-MM-dd"
                                )}
                              </span>
                            </p>
                            <p>
                              To : &nbsp;
                              <span>
                                {make_date_format(
                                  selectedLeaveData.leave_to,
                                  "yyyy-MM-dd"
                                )}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <p>Reason :</p>
                          <p>
                            <span>{selectedLeaveData.reason}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`col-md-6 leave_details_container ${
                        selectedLeaveData && selectedLeaveData.remarks
                          ? ""
                          : "d-none"
                      }`}
                    >
                      <div>
                        <p>Remarks :</p>
                        <p>
                          <span>{selectedLeaveData.remarks}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      <Modal show={showModal} onHide={closeModal} centered backdrop="static">
        <Modal.Body className="modal_body">
          <p>Are you sure you want to Logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="logoutYesBtn" onClick={logoutpopup}>
            Yes
          </Button>
          <Button className="logoutNoBtn" onClick={closeModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE ACCOUNT MODAL */}
      <Modal
        show={showDeleteAccountModal}
        onHide={closeDeleteAccountModal}
        centered
        backdrop="static"
      >
        <Modal.Body className="modal_body">
          <p>Are you sure you want to Delete account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="dltAccCloseBtn dltPopupBtn"
            onClick={closeDeleteAccountModal}
          >
            Close
          </Button>
          <Button
            className="dltAccConfirmBtn dltPopupBtn"
            onClick={handleDeleteAccount}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CHANGE PASSWORD MODAL */}
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
              <h5 className="modal-title fntNunitto" id="changePassword">
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
                  <label htmlFor="currentPassword fntNunitto">
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
                      id="currentpassword password"
                      tabIndex={2}
                      value={password}
                      onCopy={handleCopyPaste}
                      onPaste={handleCopyPaste}
                      onChange={(e) => setPassword(e.target.value)}
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

                  <label htmlFor="newPassword fntNunitto">
                    Enter New Password
                  </label>
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
                      onCopy={handleCopyPaste}
                      onPaste={handleCopyPaste}
                    />
                    <i
                      className={`fa ${
                        passwordVisibility.newpassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                      aria-hidden="true"
                      tabIndex={5}
                      onClick={() => togglePasswordVisibility("newpassword")}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("newpassword");
                        }
                      }}
                    ></i>
                  </div>

                  {!passwordFormatValid && (
                    <p
                      className="m-0 notMatchWarning"
                      style={{ fontSize: "13px" }}
                    >
                      Password must contain at least one uppercase letter, one
                      lowercase letter, one digit, one special character, be at
                      least 8 characters long, and should not contain spaces.
                    </p>
                  )}

                  <label htmlFor="confirmNewPassword fntNunitto">
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
                      onCopy={handleCopyPaste}
                      onPaste={handleCopyPaste}
                    />
                    <i
                      className={`fa ${
                        passwordVisibility.confirmNewPassword
                          ? "fa-eye-slash"
                          : "fa-eye"
                      }`}
                      aria-hidden="true"
                      tabIndex={7}
                      onClick={() =>
                        togglePasswordVisibility("confirmNewPassword")
                      }
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          togglePasswordVisibility("confirmNewPassword");
                        }
                      }}
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
                className="modalAddBtn"
                onClick={handleUpdate}
                tabIndex={8}
                style={{ border: "none" }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Change Password */}
    </div>
  );
}

export default DoctorGeneralProfile;
