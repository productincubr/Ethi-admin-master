import React, { useState, useRef, useEffect } from "react";
import "../../Css/AdminGeneralProfile.css";
import EmailSvg from "../../Assests/images/email.svg";
import MapPinSvg from "../../Assests/images/map-pin.svg";
import DegreeSvg from "../../Assests/images/degree.svg";
import countries from "countries-list";
import AdminHeader from "./AdminHeader";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import AddBtn from "../../Assests/images/add_svg.svg";

import Select from "react-select";
import {
  delete_master_data,
  get_all_doctor,
  server_post_data,
  add_doctor,
  APL_LINK,
  update_doctor,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleIaphabetnumberChange,
  handleEmailChange,
  handleAphabetsChange,
  handleNumbersChange,
} from "../../CommonJquery/CommonJquery.js";
let flag_for = 0;
let for_status_final = 0;
function StaffProfiles() {
  const [toggleStates, setToggleStates] = useState({});

  //   Create Profile
  const imageInputRef = useRef(null);
  const countryOptions = (selectedCountry) =>
    Object.keys(countries.countries).map((code) => (
      <option key={code} value={code} selected={selectedCountry === code}>
        {countries.countries[code].name}
      </option>
    ));

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [notificationdata, setNotificationdata] = useState([]);
  const [notificationgoaldata, setNotificationgaoldata] = useState([]);
  const [data_front_image, setdata_front_image] = useState([]);
  const [allgoaldoctors, setallgoaldoctors] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

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
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            console.log("123231", Response.data.message);
            master_data_get();
            let form_data2 = "addStaff";
            const closeButton = document.querySelector(
              "#" + form_data2 + ' [data-dismiss="modal"]'
            );
            let form_data3 = "updateDoctorProfile";
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
          console.log(error);
          setShowLoader(false);
        });
    }
  };

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(get_all_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message);
          console.log(
            Response.data.message.data_goal.filter(
              (e) => selectedGoalId == e._id
            )
          );
          // console.log(Response.data.message.map((q)=>).data_goal.map((i)=> i.goal_name))
          setNotificationdata(Response.data.message.data_doctor);

          setdata_front_image(
            APL_LINK + Response.data.message.data_doctor_image
          );
          const initialLikesplues = Response.data.message.data_doctor.map(
            (item) => {
              return item.allow_access === "1";
            }
          );

          const goalList = Response.data.message.data_goal.map((goal) => ({
            value:
              goal._id +
              "~@~" +
              goal.goal_name +
              "~@~" +
              goal.goal_detail +
              "~@~" +
              goal.goal_image,
            label: goal.goal_name,
          }));
          const goalList_dddd = Response.data.message.data_doctor_goals.map(
            (goal) => ({
              value:
                goal.doctor_id +
                "~@~" +
                goal.goal_id +
                "~@~" +
                goal.doctor_goal_name +
                "~@~" +
                goal.doctor_goal_detail +
                "~@~" +
                goal.doctor_goal_image,
              label: goal.doctor_goal_name,
            })
          );
          setallgoaldoctors(goalList_dddd);
          setNotificationgaoldata(goalList);
          setToggleStates(initialLikesplues);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  const [selecteddata, setselecteddataa] = useState([]);
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
    flag_for = 13;
    setSelectedGoalId(packageId);
    if (toggleStates[index]) {
      for_status_final = 0;
    } else {
      for_status_final = 1;
    }
    handleDeleteConfirmed(packageId);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const showMinimumLengthMessage = password.length === 0 || password.length < 6;

  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  console.log(selecteddata.doctor_about_us);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white", // Change 'blue' to your desired background color
      color: state.isSelected ? "white" : "black", // Change 'white' to your desired text color
      "&:hover": {
        backgroundColor: "#34B883", // Change 'lightgray' to your desired hover background color
      },
    }),
  };

  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="create_diet_plan_dash general_profile_dash">
        <div className="create_diet_plan_dash_container general_profile_dash_container p-3">
          <div className="row create_diet_plan_dash_container_row">
            <div className="btnAddStaffNew">
              <div className="titleStaff">
                <h3 className="fntNanitu">
                  Total Nutritionist: {notificationdata.length}
                </h3>
                <button
                  className="btn AddNutritionistBtn ml-auto "
                  data-toggle="modal"
                  data-target="#addDoctor"
                >
                  <div className="d-flex align-items-center">
                    <img src={AddBtn} />
                    <p className="m-0 ms-1  fs-6 fw-semibold">
                      Add Nutritionist
                    </p>
                  </div>
                </button>
              </div>
            </div>
            {/* Here */}
            <div className="row">
              {notificationdata.map((item, index) => (
                <div
                  className={`col-lg-4 mb-5 ${
                    toggleStates[index] ? "activeStaff" : "notActiveStaff"
                  }`}
                >
                  <div className="create_diet_patient_wrapper general_profile_details_wrapper">
                    <div className="create_diet_patient_details_div">
                      <div className="create_diet_patient_img_div">
                        <img
                          src={data_front_image + item.doctor_image}
                          onError={(e) => {
                            e.target.src = ProfileImgSample; // Provide the path to your fallback image
                          }}
                          alt="Patient"
                        />
                      </div>
                      <div className="create_diet_patient_details general_profile_nutritionist">
                        <div className="patient_details">
                          <h3 className="fntNanitu">Dr. {item.doctor_name}</h3>
                          {/* <p>{item.doctor_profession}</p> */}
                          <p>
                            {" "}
                            {toggleStates[index] ? (
                              <p>Active</p>
                            ) : (
                              <p>Not Active</p>
                            )}
                          </p>
                        </div>
                        <div className="activeContainer">
                          <input
                            className="doctorTableInput"
                            type="checkbox"
                            id={`switch${item._id}`}
                            checked={toggleStates[index]}
                            tabIndex={0}
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
                          <p>{item.doctor_email}</p>
                        </div>
                        <div className="saved_address saved_profile_detail">
                          <img src={MapPinSvg} alt="icon" />
                          <p>
                            {item.doctor_city}, {item.doctor_state}{" "}
                            {item.doctor_zipcode}, {item.doctor_country}
                          </p>
                        </div>
                        <div className="saved_education saved_profile_detail">
                          <img src={DegreeSvg} alt="icon" />
                          <p>{item.doctor_education}</p>
                        </div>
                      </div>
                      <div className="edit_profile_button">
                        <button
                          data-toggle="modal"
                          data-target="#editStaffProfile"
                          tabIndex={0}
                          onClick={() => handleGetId(index)}
                        >
                          Edit Profile
                        </button>
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
              id="addDoctor"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addDoctorLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-lg over modalHeight"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="addDoctorLabel"
                      tabIndex={0}
                    >
                      <div className=" d-flex align-items-center">
                        <img src={AddBtn} />
                        <p className="m-0 ms-1">Nutritionist</p>
                      </div>
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
                              <form id="addNewDoctorProfile">
                                <div className="general_profile_form_input_div">
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>Full Name</label>
                                      <input
                                        type="name"
                                        placeholder="Enter Your Name"
                                        className="trio_mendate"
                                        id="doctor_name"
                                        name="doctor_name"
                                        maxLength={30}
                                        onInput={handleAphabetsChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>Email Address</label>
                                      <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="trio_mendate trio_email"
                                        id="doctor_email"
                                        name="doctor_email"
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
                                        className="trio_mendate"
                                        id="doctor_city"
                                        name="doctor_city"
                                        maxLength={30}
                                        onInput={handleAphabetsChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>State</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Your State"
                                        className="trio_mendate"
                                        id="doctor_state"
                                        name="doctor_state"
                                        maxLength={30}
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
                                        id="doctor_zipcode"
                                        name="doctor_zipcode"
                                        maxLength={10}
                                        onInput={handleNumbersChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>Country</label>
                                      <select
                                        name="doctor_country"
                                        id="doctor_country"
                                        // className="trio_mendate"
                                      >
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
                                        id="doctor_education"
                                        name="doctor_education"
                                        maxLength={100}
                                        onInput={handleIaphabetnumberChange}
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>Years of Experience</label>
                                      <input
                                        type="text"
                                        placeholder="Enter Year"
                                        // className="trio_mendate"
                                        id="doctor_exp_years"
                                        name="doctor_exp_years"
                                        maxLength={2}
                                        onInput={handleNumbersChange}
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
                                        onChange={handleFileChangedynamic(
                                          "doctor_image"
                                        )}
                                        className="image_input_profile trio_mendate"
                                        id="doctor_image"
                                        name="doctor_image"
                                      />
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label>
                                        Password{" "}
                                        <span>
                                          {showMinimumLengthMessage && (
                                            <span className="m-0 smallText">
                                              8 characters or longer.
                                              <br />
                                              (A-Z,a-z,0-9,or symbol like
                                              @,$*%-^)
                                            </span>
                                          )}
                                        </span>
                                      </label>
                                      <div className="inputWithEye">
                                        <input
                                          type={
                                            passwordVisible
                                              ? "text"
                                              : "password"
                                          }
                                          className="trio_mendate passInput"
                                          id="doctor_password"
                                          name="doctor_password"
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
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label className="uploadImg_label">
                                        Joining Date
                                      </label>
                                      <input
                                        type="date"
                                        className="trio_mendate"
                                        id="doctor_join_date_ss"
                                        name="doctor_join_date_ss"
                                      ></input>
                                    </div>
                                    <div className="input_box_general_profile col-5">
                                      <label className="uploadImg_label">
                                        Leave Balance
                                      </label>
                                      <input
                                        type="text"
                                        // className="trio_mendate"
                                        id="doctor_leave_allow"
                                        name="doctor_leave_allow"
                                        maxLength={2}
                                        onInput={handleNumbersChange}
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-5">
                                      <label>Profession</label>
                                      <div>
                                        <input
                                          type="text"
                                          className="trio_mendate trio_name"
                                          id="doctor_profession"
                                          name="doctor_profession"
                                          placeholder="Profession Type"
                                          maxLength={70}
                                          onInput={handleAphabetsChange}
                                        />
                                      </div>
                                    </div>
                                    <div className="input_box_general_profile select2inpt col-5 ">
                                      <label>Specialization</label>
                                      <Select
                                        classNames="select_input_diet slect2InptDiet "
                                        // defaultValue={[options[2], options[3]]}
                                        isMulti
                                        name="doctor_goals"
                                        id="doctor_goals"
                                        styles={customStyles}
                                        options={notificationgoaldata}
                                        defaultValue={selectedOptions}
                                        onChange={handleSelectChange}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="input_box_general_profile col-11">
                                      <label className="uploadImg_label">
                                        About Us
                                      </label>
                                      <textarea
                                        style={{
                                          padding: "0.5rem",
                                          outline: "none",
                                          border: "none",
                                        }}
                                        rows="4"
                                        cols="50"
                                        className="trio_mendate"
                                        id="about_us"
                                        name="about_us"
                                        maxLength={200}
                                        onInput={handleIaphabetnumberChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="modalCancelBtn"
                      data-dismiss="modal"
                      tabIndex={0}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="modalAddBtn"
                      tabIndex={0}
                      onClick={() =>
                        handleSaveChangesdynamic(
                          "addNewDoctorProfile",
                          add_doctor
                        )
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
            <form id="updateDoctorProfile">
              <div className="modal-header">
                <h5
                  className="modal-title"
                  id="editStaffProfileLabel"
                  tabIndex={0}
                >
                  Update Nutritionist
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
                                  defaultValue={selecteddata.doctor_name || ""}
                                  className="trio_mendate"
                                  id="doctor_name"
                                  name="doctor_name"
                                  maxLength={50}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Email Address</label>
                                <input
                                  type="email"
                                  defaultValue={selecteddata.doctor_email || ""}
                                  placeholder="Enter Your Email"
                                  className="trio_mendate trio_email"
                                  id="doctor_email"
                                  name="doctor_email"
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
                                  defaultValue={selecteddata.doctor_city || ""}
                                  className="trio_mendate"
                                  id="doctor_city"
                                  name="doctor_city"
                                  maxLength={50}
                                  onInput={handleAphabetsChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>State</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your State"
                                  defaultValue={selecteddata.doctor_state || ""}
                                  // className="trio_mendate"
                                  id="doctor_state"
                                  name="doctor_state"
                                  maxLength={50}
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
                                    selecteddata.doctor_zipcode || ""
                                  }
                                  className="trio_mendate"
                                  id="doctor_zipcode"
                                  name="doctor_zipcode"
                                  maxLength={10}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Country</label>
                                <select
                                  id="doctor_country"
                                  name="doctor_country"
                                  // className="trio_mendate"
                                >
                                  <option value="">Select a country</option>
                                  {countryOptions(selecteddata.doctor_country)}
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>Education</label>
                                <input
                                  type="text"
                                  placeholder="Enter Your Highest Education"
                                  defaultValue={
                                    selecteddata.doctor_education || ""
                                  }
                                  className="trio_mendate"
                                  id="doctor_education"
                                  name="doctor_education"
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
                                  id="doctor_join_date"
                                  name="doctor_join_date"
                                  defaultValue={
                                    selecteddata.doctor_join_date || ""
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
                                    "doctor_image"
                                  )}
                                  className="image_input_profile "
                                  id="doctor_image"
                                  name="doctor_image"
                                  defaultValue={selecteddata.doctor_image || ""}
                                />
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Leave Balance</label>
                                <div>
                                  <input
                                    type="text"
                                    id="doctor_leave_allow"
                                    name="doctor_leave_allow"
                                    defaultValue={
                                      selecteddata.doctor_leave_allow || ""
                                    }
                                    maxLength={2}
                                    onInput={handleNumbersChange}
                                  ></input>
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
                                    id="doctor_id"
                                    name="doctor_id"
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
                                    id="doctor_old_image"
                                    name="doctor_old_image"
                                    placeholder="Nutritionist Type"
                                    defaultValue={
                                      selecteddata.doctor_image || ""
                                    }
                                  />
                                </div>
                              </div>
                              {/* <div className="input_box_general_profile col-5 border-0 bg-transparent"></div> */}
                            </div>

                            {/* here */}
                            <div className="row">
                              <div className="input_box_general_profile col-5">
                                <label>
                                  Password{" "}
                                  <span>
                                    {showMinimumLengthMessage && (
                                      <span className="m-0 smallText">
                                        8 characters or longer.
                                        <br />
                                        (A-Z,a-z,0-9,or symbol like @,$*%-^)
                                      </span>
                                    )}
                                  </span>
                                </label>
                                <div className="inputWithEye">
                                  <input
                                    type={passwordVisible ? "text" : "password"}
                                    className="trio_mendate passInput"
                                    id="doctor_password"
                                    name="doctor_password"
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
                              </div>
                              <div className="input_box_general_profile col-5">
                                <label>Profession</label>
                                <div>
                                  <input
                                    type="text"
                                    className="trio_mendate"
                                    id="doctor_profession"
                                    name="doctor_profession"
                                    placeholder="Profession Type"
                                    defaultValue={
                                      selecteddata.doctor_profession || ""
                                    }
                                    maxLength={100}
                                    onInput={handleAphabetsChange}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="input_box_general_profile select2inpt col-5 ">
                              <label>Specialization</label>
                              <Select
                                classNames="select_input_diet slect2InptDiet"
                                // defaultValue={[options[2], options[3]]}
                                isMulti
                                name="doctor_goals"
                                id="doctor_goals"
                                options={notificationgoaldata}
                                styles={customStyles}
                                onChange={handleSelectChange}
                                className="basic-multi-select "
                                classNamePrefix="select"
                                defaultValue={selecteddata.doctor_goals || ""}
                              />
                            </div>
                            <div className="row">
                              <div className="input_box_general_profile col-11">
                                <label className="uploadImg_label">
                                  About Us
                                </label>
                                <textarea
                                  style={{
                                    padding: "0.5rem",
                                    outline: "none",
                                    border: "none",
                                  }}
                                  defaultValue={
                                    selecteddata.doctor_about_us || ""
                                  }
                                  rows="4"
                                  cols="50"
                                  // className="trio_mendate"
                                  id="about_us"
                                  name="about_us"
                                  maxLength={200}
                                  onInput={handleIaphabetnumberChange}
                                />
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
                className="modalCancelBtn"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="modalAddBtn"
                style={{ border: "none" }}
                tabIndex={0}
                onClick={() =>
                  handleSaveChangesdynamic("updateDoctorProfile", update_doctor)
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

export default StaffProfiles;
