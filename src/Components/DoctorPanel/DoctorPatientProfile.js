import React, { useState, useEffect } from "react";
import "../../Css/MyPatients.css";
import jsPDF from "jspdf";
import "../../Css/PatientProfile.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import $ from "jquery";
import leftArrow from "../../Assests/images/arrow_left.svg";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import PatientsProgessUpdate from "./PatientsProgessUpdate";
import DoctorpatientsForm from "./DoctorpatientsForm";
import {
  send_pdf_diet_by_customer,
  my_patients_data_single,
  diet_form_patients_save,
  update_patient_by_doctor,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import desginImg from "../../Assests/images/createDietPlanDesign.svg.svg";
import telephone from "../../Assests/images/telephone_black.svg";
import DeleteSvg from "../../Assests/images/delete_svg.svg";
import SearchIcon from "../../Assests/images/search_icon.svg";
import WhatsappWhite from "../../Assests/images/whatsapp_white.svg";
import EmailWhite from "../../Assests/images/download.svg";
import VideoCall from "../../Assests/images/video_call_svg.svg";
import addBtn from "../../Assests/images/add_svg.svg";
import rprt from "../../Assests/images/rprt.png";
import CreatableSelect from "react-select/creatable";
import {
  combiled_form_data,
  handleAphabetsChange,
} from "../../CommonJquery/CommonJquery.js";
import AddSvg2 from "../../Assests/images/add_svg2.svg";
import { useParams } from "react-router-dom";
import { ca } from "date-fns/locale";
import DoctorHeader from "./DoctorHeader.js";

export default function DoctorMyPatients() {
  const [retriveCustomerId, setRetriveCustomerId] = useState("");
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [isCreateNewPlan, setIsCreateNewPlan] = useState(false);
  const [pointsToRememberData, setPointsToRememberData] = useState([]);
  const [supplementsData, setSupplementsData] = useState([]);

  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [UpcomingAppointDocs, setUpcomingAppointDocs] = useState();
  const [retrivePackageId, setRetrivePackageId] = useState("");
  const [patients, setPatients] = useState([]);
  const [patientsold, setPatientsold] = useState([]);
  const [dietplandata, setdietplandata] = useState([]);
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [selectedPatient, setSelectedPatient] = useState();
  const [remembermasterdata, setremembermasterdata] = useState([]);
  const [customergoal, setcustomergoal] = useState([]);
  const [doctor_name_show, setdoctor_name_show] = useState(null);
  const [showProfile, setshowProfile] = useState(false);
  const [showdietplan, setshowdietplan] = useState(false);
  const [userNumber, setUserNumber] = useState("");
  const [matchingassessments, setmatchingassessments] = useState([]);
  const [subscriptionId, setsubscriptionId] = useState();
  const [selectedOption, setSelectedOption] = useState("select_data");
  const [supplementdata, setsupplementdata] = useState([]);
  const [setdatebook, setsetdatebook] = useState("");
  const [lastseuance_id, setlastseuance_id] = useState(0);
  const [rows, setRows] = useState([]);
  const { action } = useParams();

  /*shubham jain codeing */

  const master_data_get = async (retrievedDoctorId, retriveCustomerId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", "000000000000000000000000");
    fd.append("customer_id", retriveCustomerId);
    fd.append("extra_flag", "2");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log("pdf", Response.data.message);
          // console.log("qwwqwqwq", Response.data.message.ethi_customers_data[0]);
          setPointsToRememberData(
            Response.data.message.ethi_points_to_remember_data
          );

          setSupplementsData(Response.data.message.ethi_supplements_data);
          setPatients(Response.data.message.ethi_customers_data[0]);
          setUserNumber(
            Response.data.message.ethi_customers_data[0].customer_mobile_no
          );
          /// pdf
          setUpcomingAppointDocs(
            APL_LINK + Response.data.message.data_document_image
          );
          // ///

          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
          console.log(
            "aa",
            Response.data.message.customers_ethi_subscription_plan
          );
          if (
            Response.data.message.customers_ethi_subscription_plan.length > 0
          ) {
            setsubscriptionId(
              Response.data.message.customers_ethi_subscription_plan[0]._id
            );
            setdoctor_name_show(
              Response.data.message.customers_ethi_subscription_plan[0]
                .doctor_name
            );
          }
          setRetrivePackageId(
            Response.data.message.ethi_customers_data[0].package_id
          );

          const sortedDietData = Response.data.message.ethi_doctor_diet_data
            .slice()
            .sort((a, b) => a.sequence_id - b.sequence_id);

          setdietplandata(sortedDietData);

          let totaldiet_plan =
            Response.data.message.ethi_doctor_diet_data.length;
          if (totaldiet_plan > 0) {
            let totaldiet_plan_date =
              Response.data.message.ethi_doctor_diet_data[
                totaldiet_plan - 1
              ].entry_date.split(" ");
            setsetdatebook(totaldiet_plan_date[0]);
            setlastseuance_id(
              Response.data.message.ethi_doctor_diet_data[totaldiet_plan - 1]
                .sequence_id
            );
          }
          const foodOptions1 =
            Response.data.message.ethi_supplement_master_data.map((food) => ({
              value: food.supplement_name, // You can modify this to suit your needs
              label: food.supplement_name, // Capitalize the first letter
            }));

          setsupplementdata(foodOptions1);

          const foodOptions2 =
            Response.data.message.ethi_remember_master_data.map((food) => ({
              value: food.remember_name, // You can modify this to suit your needs
              label: food.remember_name, // Capitalize the first letter
            }));

          setremembermasterdata(foodOptions2);

          setmatchingassessments(
            Response.data.message.ethi_customers_assesment_master[0]
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const send_to_whatapp = async (
    customer_id,
    pdf_image_name,
    customer_number,
    customer_name
  ) => {
    setShowLoader(true);
    const fd = new FormData();
    console.log(customer_number);
    fd.append("customer_id", customer_id);
    fd.append("customer_number", customer_number);
    fd.append("pdf_image_name", pdf_image_name);
    fd.append("customer_name", customer_name);
    await server_post_data(send_pdf_diet_by_customer, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          alert(Response.data.message);
          window.location.reload();
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  const pdfUrl = "path-to-your-email-white-icon";

  const handleButtonClick = (pdf_link) => {
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = UpcomingAppointDocs + pdf_link;
    downloadLink.target = "_blank"; // Open in a new tab/window if needed
    downloadLink.download = "diet plan pdf.pdf";

    // Append the link to the document and trigger the click event
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up the temporary elements
    document.body.removeChild(downloadLink);
  };
  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");

    setRetriveDoctorId(retrievedDoctorId);
    setRetriveCustomerId(action);
    master_data_get(retrievedDoctorId, action);
  }, [action]);

  // currentCustomerData();

  // const selectedObject = patients.find((obj) => obj._id == retriveCustomerId);

  function calculateAge(birthDateString) {
    // Check if the birth date string is provided
    if (!birthDateString) {
      return "Birth date is not provided";
    }

    // Split the birth date string into day, month, and year components
    var birthDateParts = birthDateString.split("-");
    // Ensure the birth date has three parts (day, month, year)
    if (birthDateParts.length !== 3) {
      return "Invalid birth date format";
    }

    var birthDay = parseInt(birthDateParts[0], 10);
    var birthMonth = parseInt(birthDateParts[1], 10);
    var birthYear = parseInt(birthDateParts[2], 10);

    // Get today's date
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1; // Month is zero-based, so we add 1
    var currentDay = today.getDate();

    // Calculate the age
    var age = currentYear - birthYear;
    // If the current month and day are before the birth month and day,
    // subtract one from the age
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }
    return age;
  }
  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    if (rows.length > 0 || form_data === "createNewPatientupdate") {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("customer_id", retriveCustomerId);
      fd_from.append("subscription_id", subscriptionId);
      fd_from.append("package_id", retrivePackageId);
      fd_from.append("user_number", userNumber);
      fd_from.append("total_count", rows.length);
      console.log(subscriptionId);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            const closeButton = document.querySelector(
              "#" + form_data + ' [data-dismiss="modal"]'
            );

            if (closeButton) {
              closeButton.click();
            } else {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const navigate = useNavigate();
  const handleCreateOption = (inputValue, input_data) => {
    let value_show = inputValue
      .map((food, index) => {
        if (index === 0) {
          return food.value;
        } else {
          return " , " + food.value;
        }
      })
      .join("");
    $("#" + input_data).val(value_show);
  };

  const [checkboxes, setCheckboxes] = useState({
    all: false,
    completed: false,
    pending: false,
    cancelled: false,
  });

  const addRow = () => {
    setRows([...rows, {}]);
  };
  const createNewPlanHandler = () => {
    setIsCreateNewPlan(true);
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

  // useEffect(() => {
  //   const retrievedDoctorId = retrieveData("doctor_id");

  //   setRetriveDoctorId(retrievedDoctorId);

  //   // Get the current URL
  //   const url = window.location.href;

  //   // Split the URL by '/'
  //   const parts = url.split("/");

  //   // Extract the last part which is the id
  //   const id = parts[parts.length - 1];
  //   setRetriveCustomerId(id);
  // }, []);

  /*shubham jain codeing */

  // Function to handle the patient click
  // const handlePatientClick = (patient, index, click_by) => {
  //   setshowdietplan(click_by);
  //   call_single_data(patient._id, index);
  //   setSelectedPatient({ ...patient, keyIndex: index });
  // };

  // OLd

  // Change the tab
  const [acivePatientsTab, setacivePatientsTab] = useState("current_tab");

  const handleTabClick = (tab) => {
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
  // Diet time and meal data
  // const dietPlanData = [
  //   {
  //     time: "08:00 AM",
  //     meal: "On Waking Up",
  //     food_items: ["4 soaked & peeled almonds", "4 soaked manaka"],
  //   },
  //   {
  //     time: "10:00 AM",
  //     meal: "Breakfast",
  //     food_items: [
  //       "1 bowl veg quinoa",
  //       "or 1 Dal cheela",
  //       "or 1 bowl chia seeds pudding",
  //     ],
  //   },
  //   {
  //     time: "11:30 AM",
  //     meal: "Midmorning",
  //     food_items: [
  //       "1 glass nariyal pani + 1 tsp soaked chia seeds",
  //       "or 1 bowl papaya",
  //     ],
  //   },
  //   {
  //     time: "02:00 PM",
  //     meal: "Lunch",
  //     food_items: [
  //       "1 cup chamomile/spearmint tea ",
  //       "katori roasted makhana/2 prunes",
  //     ],
  //   },
  //   {
  //     time: "05:00 PM",
  //     meal: "Evening Snacks",
  //     food_items: [
  //       "1 katori dal + sabzi + 1 beetroot/spinach chapati ",
  //       "or 1 katori dal + veggies + 1 katori rice",
  //     ],
  //   },
  //   {
  //     time: "08:00 PM",
  //     meal: "Dinner",
  //     food_items: [
  //       "1 glass nariyal pani + 1 tsp soaked chia seeds",
  //       "or 1 bowl papaya",
  //     ],
  //   },
  //   {
  //     time: "11:00 PM",
  //     meal: "Bedtime",
  //     food_items: ["1 tsp Ashwagandha + 4 soaked cashews"],
  //   },
  // ];

  //upload btn
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    setSelectedFile(file);

    // You can perform additional actions with the file if needed
    // For example, you can upload the file to a server or display its information
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "blue" : "white", // Background color when option is selected
      color: state.isSelected ? "white" : "black", // Text color when option is selected
      "&:hover": {
        backgroundColor: "#34B883", // Background color on hover
      },
    }),
  };
  const [selectedMeal, setSelectedMeal] = useState("");

  // Function to handle meal selection
  const handleMealSelect = (meal) => {
    setSelectedMeal(meal);
  };
  ///
  useEffect(() => {
    // Function to generate meal options with a 30-minute difference
    const generateMealOptions = () => {
      const startTime = new Date(2024, 1, 1, 6, 0); // Starting from 6:00 AM
      const endTime = new Date(2024, 1, 1, 23, 30); // Ending at 11:30 PM
      const options = [];

      let currentTime = new Date(startTime);

      while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        options.push({
          value: formattedTime,
          label: formattedTime,
        });

        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }

      return options;
    };

    // Set the generated meal options
    setMealOptions(generateMealOptions());
  }, []); // Run this effect only once during component mount

  const [mealOptions, setMealOptions] = useState([]);

  return (
    <>
      <div className="container-lg my_patients">
        <div className={showLoader ? "loading" : ""}></div>
        <div>
          <DoctorHeader />
        </div>
      </div>
      <div className="my_patients_dash_container container-sm">
        <div className="my_patient_header row mb-4">
          <span className="w-auto">
            <a
              className="back_btn"
              onClick={() => (isCreateNewPlan ? navigate(0) : navigate(-1))}
            >
              <img src={leftArrow} alt="icon" />
            </a>
          </span>
          <h2 className="col-md-4 my-2 hds">My Patients</h2>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="create_diet_patient_wrapper mgin">
              <div className="create_diet_patient_details_div">
                <div className="create_diet_patient_img_div">
                  <img
                    src={
                      patients.customer_image === "user_image.png"
                        ? make_image_from_letter(patients.customer_name) // If condition is true
                        : upcomingAppointImage + patients.customer_image // If condition is false
                    }
                    onError={(e) => {
                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                    }}
                    alt="Patient"
                  />
                </div>
                <div className="create_diet_patient_details">
                  <div className="patient_details">
                    <div>
                      <h3>{patients.customer_name}</h3>

                      <img
                        data-target="#patientinfo"
                        data-toggle="modal"
                        className="rprt"
                        src={rprt}
                      />
                    </div>
                    <p className="pb-3">Patient</p>

                    <div className="assesment_form_btn_div">
                      <button
                        className="btn assesment_form_btn sps"
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        style={{ color: "#34B883" }}
                      >
                        ASSESSMENT FORM
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient_medical_wrapper">
                <div className="w-100">
                  <div className="health_concerns_div">
                    <h4>Health Concerns</h4>
                    <div className="health_concerns_selected">
                      {matchingassessments &&
                      matchingassessments.med_condition_name ? (
                        matchingassessments.med_condition_name
                          .split(", ")
                          .map((condition, index) => (
                            <p key={index}>{condition}</p>
                          ))
                      ) : (
                        <p>No medical conditions</p>
                      )}
                    </div>
                  </div>
                  <div className="signs_symptoms_div health_concerns_div">
                    <h4>Signs & Symptoms</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.signs_name ? (
                            matchingassessments.signs_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Signs & Symptoms </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="Allergies_div signs_symptoms_div health_concerns_div">
                    <h4>Allergies</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.allergy_name ? (
                            matchingassessments.allergy_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Allergies </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="Allergies_div signs_symptoms_div health_concerns_div">
                    <h4>Supplements</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.supplements_name ? (
                            matchingassessments.supplements_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Supplements </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Allergies_div signs_symptoms_div health_concerns_div">
                    <h4>Diseases</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        {console.log("shubham", matchingassessments)}
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.med_condition_name ? (
                            matchingassessments.med_condition_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Diseases </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Allergies_div signs_symptoms_div health_concerns_div">
                    <h4>Cuisines</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.cuisines_name ? (
                            matchingassessments.cuisines_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Cuisines </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="Allergies_div signs_symptoms_div health_concerns_div">
                    <h4>Cravings</h4>
                    <div className="signs_symptoms_selected_div">
                      <div className="row">
                        <div className="signs_symptoms_selected col-12">
                          {matchingassessments &&
                          matchingassessments.cravings_name ? (
                            matchingassessments.cravings_name
                              .split(", ")
                              .map((condition, index) => (
                                <p key={index}>{condition}</p>
                              ))
                          ) : (
                            <p>No Cuisines </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" row patient_appointment_call_cancel_btns patient_appointment_call_cancel_btns2"></div>
              </div>
            </div>
          </div>
          {/* ############################## */}
          {isCreateNewPlan && (
            <div className="create_diet_plan_container col-lg-8 my-3 ">
              <div className="create_diet_plan_head">
                <div className="previous_diets_div">
                  <div className="d-flex justify-content-center flex-column  ">
                    <h4 className="create_diet_plan_head_left ">
                      Create Diet Plan
                    </h4>
                    <div className="createDietPlanHeaderContainer  ">
                      <div className="col-md-4 ">
                        {/* <p>Please Enter Age</p>
                        <span>
                          {patients.date_of_birth
                            ? calculateAge(patients.date_of_birth)
                            : ""}
                        </span> */}
                      </div>
                      <div className="col-md-4 genderBox px-4">
                        {/* <p>Gender</p>
                        <div className="d-flex justify-content-start  gap-2">
                          <span className="mb-0 ">
                            {patients.gender ? patients.gender : ""}
                          </span>
                        </div> */}
                      </div>
                      <div className="col-md-4">
                        <div className="crtDIET">
                          <select
                            className="select_previous_diets "
                            name="Previous Diet Plans"
                            id="prvious_diets"
                            value={selectedOption}
                            onChange={handleOptionChange}
                          >
                            <option value="select_data">
                              Previous Diet Plans
                            </option>
                            {(() => {
                              let old_sequanve = -1;
                              return dietplandata.map((row, index) => {
                                if (row.sequence_id !== old_sequanve) {
                                  old_sequanve = row.sequence_id;
                                  return (
                                    <option key={index} value={row.sequence_id}>
                                      Previous Diet Plans {row.sequence_id}
                                    </option>
                                  );
                                }
                                return null; // Return null for elements you don't want to render
                              });
                            })()}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {selectedOption === "select_data" ? (
                <div className="create_diet_plan_wrapper ms-0 ">
                  <form id="form_patinents_diet_form_diet">
                    <div className="create_diet_plan_body">
                      {rows.map((row, index) => (
                        <div
                          className="create_diet_plan_body_items"
                          key={index}
                        >
                          <div className="diet_time">
                            {/* <p>Meal Time</p>
                            <input
                              type="time"
                              className="trio_mendate"
                              id={`meal_time${index}`}
                              name={`meal_time${index}`}
                              style={{ height: "25px" }}
                            /> */}

                            <div className="mealss">
                              <p>Meal Time</p>
                              <select
                                id={`meal_time${index}`}
                                name={`meal_time${index}`}
                                className="appearance_off"
                              >
                                {mealOptions.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="diet_time">
                            <div className="mealss">
                              <p>Select Meal:</p>
                              <select
                                id={`meal_time_name${index}`}
                                name={`meal_time_name${index}`}
                                className="appearance_off"
                              >
                                <option value="Early morning">
                                  Early morning
                                </option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Midmorning">Midmorning</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Evening">Evening</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Bedtime">Bedtime</option>
                              </select>
                            </div>
                          </div>
                          <div className="select_inputDietPlan diet_items">
                            <p>What to eat</p>

                            <CreatableSelect
                              isMulti
                              options={supplementdata}
                              styles={customStyles}
                              className=" height_input2"
                              id={`supplements_dataz${index}`}
                              name="supplements_dataz[]"
                              onChange={(inputValue) =>
                                handleCreateOption(
                                  inputValue,
                                  `supplements_data${index}`
                                )
                              }
                              maxLength={100}
                            />

                            <input
                              className="trio_mendate  height_input2 hidden"
                              type="text"
                              id={`supplements_data${index}`}
                              name={`supplements_data${index}`}
                              style={{ height: "25px" }}
                            ></input>
                          </div>
                          <div
                            className="delete_diet"
                            onClick={() => deleteRow(index)}
                          >
                            <img src={DeleteSvg} alt="icon" />
                          </div>
                        </div>
                      ))}
                      <input
                        className="trio_mendate trio_count height_input2"
                        type="hidden"
                        id="supplements_data_count"
                        name="supplements_data_count"
                        value={rows.length}
                      ></input>
                      <button
                        className="btn add_diet_row_btn"
                        type="button"
                        onClick={addRow}
                      >
                        <img src={AddSvg2} alt="icon" />
                        <p>Add Row</p>
                      </button>

                      {/* <input
                        value={pdfDiet}
                        id="dietPlanPdf"
                        name="dietPlanPdf"
                        hidden
                      /> */}
                      <div className="pointsSupplymenttsSleect">
                        <div className="row m-0">
                          <div
                            className="col-md-6"
                            style={{ paddingLeft: "0" }}
                          >
                            <div className="pointsSelect">
                              <div className="select_inputDietPlan diet_items">
                                <p className="newInputFields">
                                  Points to Remember
                                </p>

                                <CreatableSelect
                                  isMulti
                                  options={remembermasterdata}
                                  className=" height_input2"
                                  id={`points_to_remember`}
                                  name="points_to_remember"
                                  onChange={(inputValue) =>
                                    handleCreateOption(
                                      inputValue,
                                      `points_to_remember`
                                    )
                                  }
                                  maxLength={100}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 p-0">
                            <div className="supplymentsSelect">
                              <div className="select_inputDietPlan diet_items">
                                <p className="newInputFields">Supplements</p>

                                <CreatableSelect
                                  isMulti
                                  options={supplementdata}
                                  className=" height_input2"
                                  id={`supplements_remember`}
                                  name="supplements_remember"
                                  onChange={(inputValue) =>
                                    handleCreateOption(
                                      inputValue,
                                      `suppluments_remember`
                                    )
                                  }
                                  maxLength={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="send_diet_div">
                        <div className="send_diet_btn_div">
                          <button
                            type="button"
                            className="btn send_diet_btn"
                            onClick={() =>
                              handleSaveChangesdynamic(
                                "form_patinents_diet_form_diet",
                                diet_form_patients_save
                              )
                            }
                          >
                            Send Diet to Patient
                          </button>
                        </div>
                        {/* <div className="send_diet_options_div">
                          <p>Send Diet on</p>
                          <div className="send_diet_options">
                            <div
                              className="send_option"
                              style={{ cursor: "pointer" }}
                            >
                              <img src={WhatsappWhite} alt="icon" />
                            </div>
                            <div
                              className="send_option"
                              style={{ cursor: "pointer" }}
                            >
                              <img src={EmailWhite} alt="icon" />
                            </div>
                          </div>
                        </div> */}
                        {/* <div>
                            <button type="button" className="saveDraft">
                              Save Draft
                            </button>
                          </div> */}
                      </div>
                      <div className="designImg">
                        <img src={desginImg} />
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="patients_diet_plan_wrapper create_diet_plan_container">
                  <div className="patients_diet_plan_body">
                    <div className="diet_time_and_meal_container">
                      <div className="tableHeight" id="style-1">
                        <table className="table table-striped dietTable">
                          <thead>
                            <tr>
                              <th>S No.</th>
                              <th>Time</th>
                              <th>Diet</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              let i = 0;
                              return dietplandata.map((meal, index) => {
                                if (
                                  Number(selectedOption) ===
                                  Number(meal.sequence_id)
                                ) {
                                  i++;
                                  return (
                                    <tr key={index}>
                                      <td>{i}</td>
                                      <td>{meal.diet_time}</td>
                                      <td>{meal.diet_detail}</td>
                                    </tr>
                                  );
                                }
                                return null; // If the condition is not met, return null
                              });
                            })()}
                          </tbody>
                        </table>
                        <p
                          className="newInputFields pointToRemember margin_top_11px "
                          style={{
                            backgroundColor: "#34b883",
                          }}
                        >
                          Points to Remember
                        </p>
                        {pointsToRememberData.map((meal, index) => {
                          if (
                            Number(selectedOption) === Number(meal.sequence_id)
                          ) {
                            return (
                              <ul
                                style={{
                                  listStyle: "none",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                {meal.points_to_remember
                                  .split(",")
                                  .map((item, index) => (
                                    <li
                                      key={index}
                                      style={{
                                        color: "black",
                                        marginLeft: "5%",
                                        paddingTop: "10px",
                                      }}
                                    >
                                      {item.trim()}
                                    </li>
                                  ))}
                              </ul>
                            );
                          }
                          return null; // If the condition is not met, return null
                        })}
                        <p
                          className="newInputFields pointToRemember margin_top_11px"
                          style={{
                            backgroundColor: "#34b883",
                          }}
                        >
                          Suppliments
                        </p>
                        {supplementsData.map((meal, index) => {
                          if (
                            Number(selectedOption) === Number(meal.sequence_id)
                          ) {
                            return (
                              <ul
                                style={{
                                  listStyle: "none",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                {meal.supplements_remember
                                  .split(",")
                                  .map((item, index) => (
                                    <li
                                      key={index}
                                      style={{
                                        color: "black",
                                        marginLeft: "5%",
                                        paddingTop: "10px",
                                      }}
                                    >
                                      {item.trim()}
                                    </li>
                                  ))}
                              </ul>
                            );
                          }
                          return null; // If the condition is not met, return null
                        })}
                      </div>
                    </div>{" "}
                  </div>
                </div>
              )}

              <PatientsProgessUpdate />
            </div>
          )}
          {/* ##############################  patient diet plan ###########*/}
          {!isCreateNewPlan && (
            <div className="col-lg-8">
              <div className="DietWeek">
                <div className="DietplanWeeks">
                  <div className="HEads d-flex">
                    <div>
                      {/* <h5 className="hds HEads2">
                        Diet Plan | Week 1 - 20/11/2023
                      </h5> */}
                    </div>
                    <div>
                      <div className="add_new_patient_btn crtNewPln ">
                        <button
                          className="btn crtNEWplan"
                          name="Add New Post"
                          onClick={createNewPlanHandler}
                        >
                          <img src={addBtn} />
                          CREATE NEW PLAN
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row pb-3">
                    <div className="col-md-6">
                      <h6 className="mb-3 nutritionistName">
                        Nutritionist: {doctor_name_show}
                      </h6>
                      {/* <div className="d-flex">
                        <div className="">
                          <span className="sml">Age</span>
                          <div className="sml1">
                            {calculateAge(patients.date_of_birth)}
                          </div>
                        </div>
                        <div className="Jainder">
                          <span className="sml">Gender</span>
                          <div className="sml1">{patients.gender}</div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>

              {dietplandata.length > 0 && (
                <div className="DietWeek2 mb-3">
                  <div className="patients_diet_plan_body">
                    <h3 className="center_last pt-2">Diet Plan</h3>
                    <div className="diet_time_and_meal_container  ">
                      {/* Render only the last/latest item */}
                      <div className="diet_time_and_meal my-2">
                        <div className="diet_time dietTm">
                          {(() => {
                            let last_id_get =
                              dietplandata[dietplandata.length - 1].sequence_id;
                            return dietplandata.map((meal, index) => {
                              if (
                                Number(last_id_get) === Number(meal.sequence_id)
                              ) {
                                return (
                                  <>
                                    <h6>{meal.diet_time}</h6>
                                    <p className="text-black mb-2">
                                      {meal.diet_detail}
                                    </p>
                                  </>
                                );
                              }
                              return null; // If the condition is not met, return null
                            });
                          })()}
                        </div>

                        <div className="send_diet_div whIcon">
                          <div className="send_diet_options_div">
                            <div className="send_diet_options">
                              <button
                                className="send_option"
                                style={{ cursor: "pointer" }}
                                data-target="#whatsappconfrm"
                                data-toggle="modal"
                              >
                                <img src={WhatsappWhite} alt="icon" />
                              </button>
                              <button
                                className="send_option"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  let pdf_link =
                                    dietplandata[dietplandata.length - 1]
                                      .pdf_image;
                                  handleButtonClick(pdf_link);
                                }}
                              >
                                <img src={EmailWhite} alt="icon" />
                              </button>
                            </div>
                          </div>
                          {/* <div>
                            <button type="button" className="saveDraft">
                              Save Draft
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pointToRememberBox">
                {pointsToRememberData.length > 0 && (
                  <div className="ptrBox">
                    <h3>Points to Remember</h3>

                    {(() => {
                      let last_id_get =
                        pointsToRememberData[pointsToRememberData.length - 1]
                          .sequence_id;
                      return pointsToRememberData.map((meal, index) => {
                        if (Number(last_id_get) === Number(meal.sequence_id)) {
                          return (
                            <>
                              <p key={index} className="mb-0">
                                {meal.points_to_remember}
                              </p>
                            </>
                          );
                        }
                        return null; // If the condition is not met, return null
                      });
                    })()}
                  </div>
                )}
                {pointsToRememberData.length > 0 && (
                  <div className="supBox">
                    <h3>Supplements</h3>

                    {(() => {
                      let last_id_get =
                        supplementsData[supplementsData.length - 1].sequence_id;
                      return supplementsData.map((meal, index) => {
                        if (Number(last_id_get) === Number(meal.sequence_id)) {
                          return (
                            <>
                              <p key={index} className="mb-0">
                                {meal.supplements_remember}
                              </p>
                            </>
                          );
                        }
                        return null; // If the condition is not met, return null
                      });
                    })()}
                  </div>
                )}
              </div>
              {matchingassessments && (
                <div className="DietWeek2">
                  <div className="patients_diet_plan_body">
                    <h3 className="center_last pt-2">Assessment</h3>
                    <div className="diet_time_and_meal_container  ">
                      {/* Render only the last/latest item */}

                      <div className="diet_time_and_meal my-2">
                        <div className="asmntForm_body">
                          <div className="asmnt_ques_list_div">
                            {matchingassessments !== undefined ? (
                              <ol className="asmnt_ques_list">
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Medical Condition</p>
                                    <h6>
                                      {matchingassessments.med_condition_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Signs & Symptoms</p>
                                    <h6>{matchingassessments.signs_name}</h6>
                                    <h6>
                                      {matchingassessments.signs_name_other}
                                    </h6>
                                  </div>
                                </li>

                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Medications</p>
                                    <h6>
                                      {matchingassessments.medicines_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Supplements</p>
                                    <h6>
                                      {matchingassessments.supplements_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Food allergy/intolerance</p>
                                    <h6>{matchingassessments.allergy_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Diseases</p>
                                    <h6>
                                      {matchingassessments.med_condition_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Blood Group</p>
                                    <h6>
                                      {matchingassessments.bloodgroup_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Height & Weight</p>
                                    <h6>
                                      Height: {matchingassessments.height_name}{" "}
                                      cm, Weight:{" "}
                                      {matchingassessments.weight_number} kg
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Food Preference</p>
                                    <h6>{matchingassessments.foodpre_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Cuisines You Enjoy</p>
                                    <h6>{matchingassessments.cuisines_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Food Cravings</p>
                                    <h6>{matchingassessments.cravings_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Food Frequency</p>
                                    <ul>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Alcohol :
                                          </span>{" "}
                                          {
                                            matchingassessments.food_alcohol_name
                                          }
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Biscuits/Cakes/Pastries :
                                          </span>{" "}
                                          {
                                            matchingassessments.food_biscuit_name
                                          }
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Diet Sodas :
                                          </span>{" "}
                                          {
                                            matchingassessments.food_diet_soda_name
                                          }
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Coffee :
                                          </span>{" "}
                                          {matchingassessments.food_coffee_name}
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Tea :
                                          </span>{" "}
                                          {matchingassessments.food_tea_name}
                                        </h6>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>What triggers you to eat ?</p>
                                    <h6>{matchingassessments.triggers_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Eating haabits you are proud of</p>
                                    <h6>
                                      {matchingassessments.eathabits_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Sleep time</p>
                                    <h6>
                                      Sleep time :{" "}
                                      {matchingassessments.sleeptime_name}
                                    </h6>
                                    <h6>
                                      Wake up time :{" "}
                                      {matchingassessments.waketime_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Most Hungry</p>
                                    <h6>{matchingassessments.hungry_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Stress Level</p>
                                    <h6>
                                      {matchingassessments.stress_level_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Water Consumption</p>
                                    <h6>{matchingassessments.water_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Smoking</p>
                                    <h6>{matchingassessments.smoke_name}</h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Menstrual cycle</p>
                                    <h6>
                                      {matchingassessments.menstrual_name}
                                    </h6>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Activity</p>
                                    <ul>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Endurance :
                                          </span>{" "}
                                          {matchingassessments.endurance_name}
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Strength Training :
                                          </span>{" "}
                                          {
                                            matchingassessments.strength_training_name
                                          }
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Yoga :
                                          </span>{" "}
                                          {matchingassessments.yoga_name}
                                        </h6>
                                      </li>
                                      <li>
                                        <h6>
                                          <span style={{ color: "#8a92a6" }}>
                                            Flexibility/Balance :
                                          </span>{" "}
                                          {
                                            matchingassessments.flexibility_balance_name
                                          }
                                        </h6>
                                      </li>
                                      <li>
                                        <p>Others :</p>
                                        <h6>
                                          {
                                            matchingassessments.other_details_name
                                          }
                                        </h6>
                                      </li>
                                    </ul>
                                  </div>
                                </li>
                                <li className="asmnt_ques_listItems">
                                  <div>
                                    <p>Motivation Needed</p>
                                    <h6>
                                      {matchingassessments.other_option_name}
                                    </h6>
                                  </div>
                                </li>
                              </ol>
                            ) : (
                              <div className="text-center m-5">
                                <h5>No Data Found</h5>
                                <p>Please Fill The Assessment Form.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <PatientsProgessUpdate
                  weightNumber={patients ? patients.weight_kg : 0}
                  SleepNumber={patients ? patients.sleep_hour : 0}
                  GlassNumber={patients ? patients.hours_water : 0}
                  GenderNumber={patients ? patients.gender : ""}
                  StepcountNumber={patients ? patients.step_count : ""}
                  HeartbeatNumber={patients ? patients.heart_rate : "0"}
                  customer_id={retriveCustomerId}
                  doctor_id={retriveDoctorId}
                  subscription_id={subscriptionId}
                  patients_name={patients.customer_name}
                  start_date={patients.period_start_date}
                />
              </div>
            </div>
          )}
        </div>
        {/* Details PopUp modal */}
        <div className="modal" id="whatsappconfrm" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modalContentBox ">
              <div className="modal-header">
                <h5 className="modal-title hd">
                  Are you sure want to send diet plan in Patient number !
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
                <form id="createNewPatientupdate">
                  <div className="form-group">
                    <label htmlFor="patientName" className="hd">
                      Patient Name
                    </label>

                    <p className="sps">{patients.customer_name}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNo" className="sps">
                      Patient number
                    </label>
                    <div className="d-flex w-100 hd">{userNumber}</div>
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
                  onClick={() => {
                    console.log(patients);
                    let pdf_link =
                      dietplandata[dietplandata.length - 1].pdf_image;
                    send_to_whatapp(
                      patients._id,
                      pdf_link,
                      patients.customer_mobile_no,
                      patients.customer_name
                    );
                  }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal" id="patientinfo" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modalContentBox ">
              <div className="modal-header">
                <h5 className="modal-title">Patient Information</h5>
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
                <form id="createNewPatientupdate">
                  <div className="form-group">
                    <label htmlFor="patientName">Patient Name</label>
                    <input
                      type="text"
                      name="customer_name"
                      className="form-control trio_mendate"
                      id="patientName"
                      maxLength={30}
                      defaultValue={patients.customer_name}
                      onInput={handleAphabetsChange}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactNo">Patient contact number</label>
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn modalAddBtn"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "createNewPatientupdate",
                      update_patient_by_doctor
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
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalLong"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <DoctorpatientsForm
              customer_id={retriveCustomerId}
              doctor_id={retriveDoctorId}
              subscription_id={subscriptionId}
              matching_assessment={matchingassessments}
            />
          </div>{" "}
        </div>
      </div>
    </>
  );
}
