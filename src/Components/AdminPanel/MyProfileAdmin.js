import React, { useEffect, useState } from "react";
import "../../Css/AdminGeneralProfile.css";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";

import GeneralSvg from "../../Assests//images/general_profile.svg";
import General1Svg from "../../Assests//images/general_profile_white.svg";
import LeaveSvg from "../../Assests//images/leave_general.svg";
import Leave1Svg from "../../Assests//images/leave_general_white.svg";
import EmailSvg from "../../Assests//images/email.svg";
import MapPinSvg from "../../Assests/images/map-pin.svg";
import DegreeSvg from "../../Assests//images/degree.svg";
import SignOutSvg from "../../Assests//images/sign-out.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import { Modal, Button } from "react-bootstrap";
import {
  storeData,
  retrieveData,
  removeData,
} from "../../LocalConnection/LocalConnection.js";
import {
  APL_LINK,
  get_admin_by_single,
  update_staff,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleNumbersChange,
} from "../../CommonJquery/CommonJquery.js";
import countries from "countries-list";
import deleteIcon from "../../Assests/images/dLT.png";
function CorporateDetalis() {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retriveDoctorName, setretriveDoctorName] = useState("");
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [DoctorData, setDoctorData] = useState([]);
  const [LeaveData, setLeaveData] = useState([]);
  const [retriveDoctorProfession, setRetriveDoctorProfession] = useState("");
  const [dynaicimage, setDynaicimage] = useState(null);
  const [isGeneralActive, setIsGeneralActive] = useState(true);
  const [isLeaveActive, setIsLeaveActive] = useState(false);

  /*shubham jain codeing */

  const handleGeneralClick = () => {
    setIsGeneralActive(!isGeneralActive);
    setIsLeaveActive(false);
  };

  const handleLeaveClick = () => {
    setIsLeaveActive(!isLeaveActive);
    setIsGeneralActive(false);
  };

  useEffect(() => {
    const retrievedDoctorId = retrieveData("admin_id");
    setRetriveDoctorId(retrievedDoctorId);
    setretriveDoctorName(retrieveData("admin_name"));
    setRetriveDoctorImage(retrieveData("admin_image"));
    setRetriveDoctorProfession(retrieveData("admin_profession"));
    master_data_feeds(retrievedDoctorId);
  }, []);

  const countryOptions = (selectedCountry) =>
    Object.keys(countries.countries).map((code) => (
      <option key={code} value={code} selected={selectedCountry === code}>
        {countries.countries[code].name}
      </option>
    ));

  const master_data_feeds = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedDoctorId);
    await server_post_data(get_admin_by_single, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setDoctorData(Response.data.message.data_admin[0]);
          setLeaveData(Response.data.message.data_feedback);
          storeData(
            "admin_email",
            Response.data.message.data_admin[0].admin_email
          );
          storeData(
            "admin_name",
            Response.data.message.data_admin[0].admin_name
          );
          setRetriveDoctorImage(
            APL_LINK +
              Response.data.message.data_doctor_image +
              Response.data.message.data_admin[0].admin_image
          );
          storeData(
            "admin_image",
            APL_LINK +
              Response.data.message.data_doctor_image +
              Response.data.message.data_admin[0].admin_image
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

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("admin_id", retriveDoctorId);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            alert(Response.data.message);
            empty_form(form_data);
            master_data_feeds(retriveDoctorId);
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const RectangularCard = ({ title, description }) => (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const openDeleteAccountModal = () => setShowDeleteAccountModal(true);
  const closeDeleteAccountModal = () => setShowDeleteAccountModal(false);



  const handleDeleteAccount = () => {
    // Add your delete account logic here
    closeDeleteAccountModal();
  };
  const logoutpopup = () => {
    setShowLogoutModal(false);
    removeData();
    navigate("/login");
  };
  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>

      <div>
        <div className="general_profile_uplaod_wrapper">
          <div className="create_diet_plan_dash general_profile_dash">
            <div className="my_patients_dash_head general_profile_dash_head">
              <div className="my_patients_dash_head_container general_profile_dash_head_container">
                <div className="back_btn_heading">
                  <h3 className="hd" style={{ fontSize: "32px" }}>
                    My Profile
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create_diet_plan_dash_container general_profile_dash_container p-3">
          <div className="row create_diet_plan_dash_container_row">
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
                          {isLeaveActive && (
                            <img src={GeneralSvg} alt="General " />
                          )}
                          {isGeneralActive && (
                            <img src={General1Svg} alt="General " />
                          )}
                        </div>
                        <h6 className="fntNanitu">General</h6>
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
                          {isGeneralActive && (
                            <img src={LeaveSvg} alt="Leave " />
                          )}
                        </div>
                        <h6 className="fntNanitu">My Feedbacks</h6>
                      </div>
                    </div>
                  </div>
                  {isGeneralActive && (
                    <div className="general_profile_form_wrapper">
                      <div className="general_profile_form_container">
                        <form id="form_data_profile">
                          <div className="general_profile_form_input_div">
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">Full Name</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_name
                                      ? DoctorData.admin_name
                                      : ""
                                  }
                                  placeholder="Enter Your Name"
                                  className="trio_mendate trio_name fntNanitu"
                                  id="admin_name"
                                  name="admin_name"
                                  maxLength={70}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">Mobile No</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_mobile_no
                                      ? DoctorData.admin_mobile_no
                                      : ""
                                  }
                                  placeholder="Enter Your Mobile No"
                                  className="trio_mendate trio_no"
                                  id="admin_mobile_no"
                                  name="admin_mobile_no"
                                  maxLength={10}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">City</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_city
                                      ? DoctorData.admin_city
                                      : ""
                                  }
                                  placeholder="Enter Your City"
                                  className="trio_mendate"
                                  id="admin_city"
                                  name="admin_city"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">State</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_state
                                      ? DoctorData.admin_state
                                      : ""
                                  }
                                  placeholder="Enter Your State"
                                  className="trio_mendate"
                                  id="admin_state"
                                  name="admin_state"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">Zipcode</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_zipcode
                                      ? DoctorData.admin_zipcode
                                      : ""
                                  }
                                  placeholder="Enter Your City Zipcode"
                                  className="trio_mendate"
                                  id="admin_zipcode"
                                  name="admin_zipcode"
                                  maxLength={8}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">Country</label>
                                <select
                                  className="trio_mendate"
                                  id="admin_country"
                                  name="admin_country"
                                >
                                  <option value="">Select a country</option>
                                  {DoctorData &&
                                    DoctorData.admin_country &&
                                    countryOptions(DoctorData.admin_country)}
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="fntNanitu">Education</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_education
                                      ? DoctorData.admin_education
                                      : ""
                                  }
                                  placeholder="Enter Your Highest Education"
                                  className="trio_mendate"
                                  id="admin_education"
                                  name="admin_education"
                                  maxLength={45}
                                  onInput={handleAphabetsChange}
                                />
                              </div>

                              <div className="input_box_general_profile col-5 hidden">
                                <label className="fntNanitu">Password</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_password
                                      ? DoctorData.admin_password
                                      : ""
                                  }
                                  placeholder="Enter admin_password"
                                  className="trio_mendate"
                                  id="admin_password"
                                  name="admin_password"
                                />
                              </div>
                              <div className="input_box_general_profile col-5 hidden">
                                <label className="fntNanitu">Join Date</label>
                                <input
                                  type="text"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_join_date
                                      ? DoctorData.admin_join_date
                                      : ""
                                  }
                                  placeholder="Enter admin_join_date"
                                  className="trio_mendate"
                                  id="admin_join_date"
                                  name="admin_join_date"
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="uploadImg_label fntNanitu">
                                  Upload Image
                                </label>
                                <input
                                  type="hidden"
                                  defaultValue={
                                    DoctorData && DoctorData.admin_image
                                      ? DoctorData.admin_image
                                      : ""
                                  }
                                  id="admin_old_image"
                                  name="admin_old_image"
                                />
                                <input
                                  className="image_input_profile fntNanitu"
                                  type="file"
                                  accept="image/*"
                                  id="admin_image"
                                  name="admin_image"
                                  onChange={handleFileChangedynamic(
                                    "admin_image",
                                    "image"
                                  )}
                                />
                              </div>
                              <div className="input_box_general_profile col-5 border-0 bg-transparent"></div>
                            </div>
                            <div className="row"></div>
                          </div>
                          <div className="general_profile_form_button_div col-12 m-auto">
                            <button
                              type="button"
                              className="general_profile_cancel_btn fntNanitu"
                            >
                              CANCEL
                            </button>
                            <button
                              type="button"
                              className="general_profile_save_btn fntNanitu"
                              onClick={() =>
                                handleSaveChangesdynamic(
                                  "form_data_profile",
                                  update_staff
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
                  {isLeaveActive && (
                    <div className="general_profile_apply_leave_wrapper">
                      <div className="apply_leave_container">
                        <div className="mt-5">
                          <div className="row">
                            {LeaveData.map((user, index) => {
                              return (
                                <div className="CRDtittl col-sm-4" key={index}>
                                  <RectangularCard
                                    style={{ fontSize: "20px" }}
                                    title={user.doctor_name}
                                    description={user.what_went_well}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="">
                <div className="create_diet_patient_wrapper general_profile_details_wrapper">
                  <div className="create_diet_patient_details_div">
                    <div className="create_diet_patient_img_div">
                      <img
                        src={retriveDoctorImage}
                        onError={(e) => {
                          e.target.src = ProfileImgSample; // Provide the path to your fallback image
                        }}
                        alt="Patient"
                      />
                    </div>
                    <div className="create_diet_patient_details general_profile_nutritionist">
                      <div className="patient_details">
                        <b className="hds hds1 fntNanitu">
                          {retriveDoctorName}
                        </b>
                        <p className="fntNanitu">{retriveDoctorProfession}</p>
                      </div>
                    </div>
                  </div>

                  <div className="patient_medical_wrapper">
                    <div className="saved_profile_details_wrapper leFTPad">
                      <div className="saved_email saved_profile_detail">
                        <img src={EmailSvg} alt="icon" />
                        <p className="fntNanitu">{DoctorData.admin_email}</p>
                      </div>
                      <div className="saved_address saved_profile_detail">
                        <img src={MapPinSvg} alt="icon" />
                        <p className="fntNanitu">{DoctorData.admin_city}</p>
                      </div>

                      <div className="saved_education saved_profile_detail">
                        <img src={DegreeSvg} alt="icon" />
                        <p className="fntNanitu">
                          {DoctorData.admin_education}
                        </p>
                      </div>

                      <div className="saved_experience saved_profile_detail mb-1">
                        <div
                          className="logout_profile saved_profile_detail mb-0 fntNanitu"
                          onClick={openLogoutModal}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={SignOutSvg} alt="icon" />
                          <p className="fntNanitu">Log Out</p>
                        </div>
                      </div>
                      <div
                        className="saved_experience saved_profile_detail mt-3 fntNanitu"
                        onClick={openDeleteAccountModal}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={deleteIcon} alt="icon" />
                        Delete Account
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showLogoutModal}
        onHide={closeLogoutModal}
        centered
        backdrop="static"
      >
        <Modal.Body className="modal_body">
          <div className="success_img d-flex justify-content-center">
            {/* ... Modal content goes here ... */}
          </div>
          <p>Are you sure you want to Logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={closeLogoutModal}
            className="modalCancelBtn bRDClose"
          >
            Close
          </Button>
          <Button onClick={logoutpopup} className="modalAddBtn bRDClose ">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        show={showDeleteAccountModal}
        onHide={closeDeleteAccountModal}
        centered
        backdrop="static"
      >
        <Modal.Body className="modal_body">
          <div className="success_img d-flex justify-content-center"></div>
          <p>Are you sure you want to Delete account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={closeDeleteAccountModal}
            className="modalCancelBtn bRDClose"
          >
            Close
          </Button>
          <Button onClick={handleDeleteAccount} className="modalAddBtn">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CorporateDetalis;
