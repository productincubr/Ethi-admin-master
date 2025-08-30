import React, { useState, useRef, useEffect } from "react";
import "../../Css/AdminGeneralProfile.css";
import EmailSvg from "../../Assests/images/email.svg";
import MapPinSvg from "../../Assests/images/map-pin.svg";
import DegreeSvg from "../../Assests/images/degree.svg";
import countries from "countries-list";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import AdminHeader from "./AdminHeader";
import AddBtn from "../../Assests/images/add_svg.svg";

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
import { Link } from "react-router-dom";
let flag_for = 0;
let for_status_final = 0;
function AddDoctorProfile() {
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

  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="create_diet_plan_dash general_profile_dash">
        <div className="create_diet_plan_dash_container general_profile_dash_container p-3">
          <div className="row create_diet_plan_dash_container_row justify-content-center">
            <div className="btnAddStaffNew px-4">
              <div className="titleStaff">
                <h3>Total Staff: {notificationdata.length}</h3>
                <button
                  className="btn addStaffButton ml-auto"
                  data-toggle="modal"
                  data-target="#addStaff1"
                >
                  <div className=" d-flex align-items-center justify-content-center">
                    <img src={AddBtn} />
                    <p className="m-0 ms-1 fs-6 fw-semibold">Add Staff</p>
                  </div>
                </button>
              </div>
            </div>
            {/* Here */}
            <div className="row m-0">
              {notificationdata.map((item, index) => (
                <div
                  className={`col-lg-4 col-md-6 mb-5  ${
                    toggleStates[index] ? "activeStaff" : "notActiveStaff"
                  }`}
                >
                  <div
                    className="create_diet_patient_wrapper general_profile_details_wrapper"
                    key={item._id}
                  >
                    <div className="create_diet_patient_details_div">
                      <div className="create_diet_patient_img_div">
                        <img
                          src={data_front_image + item.admin_image}
                          onError={(e) => {
                            e.target.src = ProfileImgSample; // Provide the path to your fallback image
                          }}
                          alt="Patient"
                        />
                      </div>
                      <div className="create_diet_patient_details general_profile_nutritionist">
                        <div className="patient_details">
                          <h3 className="fntNanitu">{item.admin_name}</h3>
                          <p className="fntNanitu">{item.admin_type}</p>
                          <p>
                            {" "}
                            {toggleStates[index] ? (
                              <p className="fntNanitu">Active</p>
                            ) : (
                              <p className="fntNanitu">Not Active</p>
                            )}
                          </p>
                        </div>

                        <div className="activeContainer">
                          <input
                            className="doctorTableInput"
                            type="checkbox"
                            id={`switch${item._id}`}
                            checked={toggleStates[index]}
                            onClick={() => handleToggleChange(item._id, index)}
                          />
                          <label
                            className="doctorTable"
                            htmlFor={`switch${item._id}`}
                          >
                            Toggle
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="patient_medical_wrapper">
                      <div className="saved_profile_details_wrapper">
                        <div className="saved_email saved_profile_detail">
                          <img src={EmailSvg} alt="icon" />
                          <p>{item.admin_email}</p>
                        </div>
                        <div className="saved_address saved_profile_detail">
                          <img src={MapPinSvg} alt="icon" />
                          <p>
                            {item.admin_city} , {item.admin_state}{" "}
                            {item.admin_country}
                          </p>
                        </div>
                        <div className="saved_education saved_profile_detail">
                          <img src={DegreeSvg} alt="icon" />
                          <p>{item.admin_education}</p>
                        </div>
                      </div>
                      <div className="edit_profile_button">
                        <button
                          data-toggle="modal"
                          data-target="#editStaffProfile"
                          onClick={() => handleGetId(index)}
                        >
                          Edit Profile
                        </button>

                        <Link to={"/AdminStaffProfile"}>
                          {" "}
                          <button>View Profile</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* here */}

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="addStaff1"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addStaffLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content modalHeight">
                  <form id="addStaffProfile">
                    <div className="modal-header">
                      <h5 className="modal-title" id="addStaffLabel">
                        Add Staff
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
                    <div className="modal-body">
                      <div className="">
                        <div className="patients_diet_plan_wrapper create_diet_plan_container general_profile_container">
                          <div className="patients_diet_plan_container">
                            <div className="general_profile_form_wrapper">
                              <div className="general_profile_form_container">
                                <div className="general_profile_form_input_div">
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>Full Name</label>
                                      <input
                                        type="name"
                                        placeholder="Enter Your Name"
                                        className="trio_mendate"
                                        id="admin_name"
                                        name="admin_name"
                                        maxLength={70}
                                        onInput={handleAphabetsChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>Email Address</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Your Email"
                                        className="trio_mendate trio_email"
                                        id="admin_email"
                                        name="admin_email"
                                        maxLength={65}
                                        onInput={handleEmailChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>City</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Your City"
                                        className="trio_mendate"
                                        id="admin_city"
                                        name="admin_city"
                                        maxLength={45}
                                        onInput={handleAphabetsChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>State</label>
                                      <input
                                        type="text"
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
                                      <label>Zipcode</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Your City Zipcode"
                                        className="trio_mendate"
                                        id="admin_zipcode"
                                        name="admin_zipcode"
                                        maxLength={8}
                                        onInput={handleNumbersChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>Country</label>
                                      <select name="admin_country">
                                        <option value="">
                                          Select a Country
                                        </option>
                                        {countryOptions("0")}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>Education</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Your Highest Education"
                                        className="trio_mendate"
                                        id="admin_education"
                                        name="admin_education"
                                        maxLength={45}
                                        onInput={handleIaphabetnumberChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label className="uploadImg_label">
                                        Joining Date
                                      </label>
                                      <input
                                        type="date"
                                        className="trio_mendate"
                                        id="join_date"
                                        name="admin_join_date"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label className="uploadImg_label">
                                        Upload Image
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        ref={imageInputRef}
                                        className="image_input_profile trio_mendate"
                                        id="admin_image"
                                        name="admin_image"
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label htmlFor="adminTypeDropdown">
                                        Admin Type
                                      </label>

                                      <select
                                        id="adminTypeDropdown"
                                        name="admin_type"
                                        value={adminType}
                                        onChange={handleDropdownChange}
                                      >
                                        <option value="" disabled>
                                          Select Admin Type
                                        </option>
                                        <option value="type1">Admin</option>
                                        <option value="type2">
                                          Superadmin
                                        </option>
                                        {/* Add more options as needed */}
                                      </select>
                                    </div>
                                    {/* <div className="input_box_general_profile col-5 border-0 bg-transparent"></div> */}
                                  </div>

                                  {/* here */}
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>Password</label>
                                      <div className="inputWithEye">
                                        <input
                                          type={
                                            passwordVisible
                                              ? "text"
                                              : "password"
                                          }
                                          className="trio_mendate passInput"
                                          id="password"
                                          name="admin_password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={handlePasswordChange}
                                          min={8} // Minimum limit of 6 characters
                                        />
                                        <i
                                          className={`fa ${
                                            passwordVisible
                                              ? "fa-eye-slash"
                                              : "fa-eye"
                                          }`}
                                          onClick={togglePasswordVisibility}
                                        />
                                      </div>
                                      {showMinimumLengthMessage && (
                                        <p className="m-0 smallText">
                                          8 characters or longer.
                                          <br />
                                          (A-Z,a-z,0-9,or symbol like @,$*%-^)
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn  modalCancelBtn"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn modalAddBtn"
                      onClick={() =>
                        handleSaveChangesdynamic("addStaffProfile", add_staff)
                      }
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editStaffProfile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editStaffProfileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content modalHeight">
            <form id="updateStaffProfile">
              <div className="modal-header">
                <h5 className="modal-title" id="editStaffProfileLabel">
                  Update Profile
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
              <div className="modal-body">
                <div className="">
                  <div className="patients_diet_plan_wrapper create_diet_plan_container general_profile_container">
                    <div className="patients_diet_plan_container">
                      <div className="general_profile_form_wrapper">
                        <div className="general_profile_form_container">
                          <div className="general_profile_form_input_div">
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>Full name</label>
                                <input
                                  type="name"
                                  placeholder="Enter Your Name"
                                  defaultValue={selecteddata.admin_name || ""}
                                  className="trio_mendate"
                                  id="admin_name"
                                  name="admin_name"
                                  maxLength={100}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Email address</label>
                                <input
                                  type="email"
                                  defaultValue={selecteddata.admin_email || ""}
                                  placeholder="Enter Your Email"
                                  className="trio_mendate trio_email"
                                  id="admin_email"
                                  name="admin_email"
                                  maxLength={100}
                                  onInput={handleEmailChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>City</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your City"
                                  defaultValue={selecteddata.admin_city || ""}
                                  className="trio_mendate"
                                  id="admin_city"
                                  name="admin_city"
                                  maxLength={80}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>State</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your State"
                                  defaultValue={selecteddata.admin_state || ""}
                                  className="trio_mendate"
                                  id="admin_state"
                                  name="admin_state"
                                  maxLength={80}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>Zipcode</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your City Zipcode"
                                  defaultValue={
                                    selecteddata.admin_zipcode || ""
                                  }
                                  className="trio_mendate"
                                  id="admin_zipcode"
                                  name="admin_zipcode"
                                  maxLength={10}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Country</label>
                                <select name="admin_country" id="admin_country">
                                  <option value="">Select a country</option>
                                  {countryOptions(selecteddata.admin_country)}
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>Education</label>Update Profile
                                <input
                                  type="text"
                                  placeholder="Enter Your Highest Education"
                                  defaultValue={
                                    selecteddata.admin_education || ""
                                  }
                                  className="trio_mendate"
                                  id="admin_education"
                                  name="admin_education"
                                  maxLength={100}
                                  onInput={handleIaphabetnumberChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label className="uploadImg_label">
                                  Joining Date
                                </label>
                                <input
                                  type="date"
                                  className="trio_mendate"
                                  id="admin_join_date"
                                  name="admin_join_date"
                                  defaultValue={
                                    selecteddata.admin_join_date || ""
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label className="uploadImg_label">
                                  Upload Image
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={imageInputRef}
                                  onChange={handleFileChangedynamic(
                                    "admin_image"
                                  )}
                                  className="image_input_profile "
                                  id="admin_image"
                                  name="admin_image"
                                  defaultValue={selecteddata.admin_image || ""}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Admin Type</label>
                                <div>
                                  <input
                                    type="text"
                                    className="trio_mendate"
                                    id="admin_type"
                                    name="admin_type"
                                    placeholder="Nutritionist Type"
                                    defaultValue={selecteddata.admin_type || ""}
                                    maxLength={80}
                                    onInput={handleIaphabetnumberChange}
                                  />
                                </div>
                              </div>
                              <div
                                className="input_box_general_profile col-5"
                                hidden
                              >
                                <label>Admin Id</label>
                                <div>
                                  <input
                                    type="text"
                                    className="trio_mendate"
                                    id="admin_id"
                                    name="admin_id"
                                    placeholder="Nutritionist Type"
                                    defaultValue={selecteddata._id || ""}
                                  />
                                </div>
                              </div>
                              <div
                                className="input_box_general_profile col-5"
                                hidden
                              >
                                <label>Admin Image</label>
                                <div>
                                  <input
                                    type="text"
                                    id="admin_old_image"
                                    name="admin_old_image"
                                    placeholder="Nutritionist Type"
                                    defaultValue={
                                      selecteddata.admin_image || ""
                                    }
                                  />
                                </div>
                              </div>
                              {/* <div className="input_box_general_profile col-5 border-0 bg-transparent"></div> */}
                            </div>

                            {/* here */}
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>Password</label>
                                <div className="inputWithEye">
                                  <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="trio_mendate passInput"
                                    id="password"
                                    name="admin_password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    minLength={6} // Minimum limit of 6 characters
                                  />
                                  <i
                                    className={`fa ${
                                      passwordVisible
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                    }`}
                                    onClick={togglePasswordVisibility}
                                  />
                                </div>
                                {showMinimumLengthMessage && (
                                  <p className="m-0 smallText">
                                    8 characters or longer.
                                    <br />
                                    (A-Z,a-z,0-9,or symbol like @,$*%-^)
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn  modalCancelBtn"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn modalAddBtn"
                onClick={() =>
                  handleSaveChangesdynamic("updateStaffProfile", update_staff)
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDoctorProfile;
