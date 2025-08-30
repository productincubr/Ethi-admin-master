import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/CreateDietPlan.css";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import AdminHeader from "./AdminHeader";
import PatientsProgessUpdate from "../DoctorPanel/PatientsProgessUpdate";
import { useParams } from "react-router-dom";
import {
  my_patients_data_single,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function AdminShowDietPlan() {
  // Back button
  const navigate = useNavigate();
  const { action } = useParams();

  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retriveCustomerId, setRetriveCustomerId] = useState("");
  const [retrivePackageId, setRetrivePackageId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [subscriptionId, setsubscriptionId] = useState();
  const [patients, setPatients] = useState([]);
  const [dietplandata, setdietplandata] = useState([]);
  const [matchingassessments, setmatchingassessments] = useState([]);
  const [supplementdata, setsupplementdata] = useState([]);
  const [appointmentwithdoctors, setappointmentwithdoctors] = useState([]);
  const [foodmasterdata, setfoodmasterdata] = useState([]);
  const [remembermasterdata, setremembermasterdata] = useState([]);
  const [diet_plan_status, setdiet_plan_status] = useState("1");
  const [assesment_form_status, setassesment_form_status] = useState("1");

  console.log(action);

  /*shubham jain codeing */

  const master_data_get = async (retrievedDoctorId, retriveCustomerIdid) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("customer_id", retriveCustomerIdid);
    fd.append("extra_flag", "2");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setPatients(Response.data.message.ethi_customers_data[0]);
          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
          setsubscriptionId(
            Response.data.message.ethi_customers_data[0].last_subscription_id
          );
          const sortedDietData = Response.data.message.ethi_doctor_diet_data
            .slice()
            .sort((a, b) => a.sequence_id - b.sequence_id);
          setdietplandata(sortedDietData);

          const foodMasterData = Response.data.message.ethi_food_master_data;
          const foodOptions = foodMasterData.map((food) => ({
            value: food.food_name.toLowerCase(), // You can modify this to suit your needs
            label:
              food.food_name.charAt(0).toUpperCase() + food.food_name.slice(1), // Capitalize the first letter
          }));

          setfoodmasterdata(foodOptions);

          const foodMasterData1 =
            Response.data.message.ethi_supplement_master_data;
          const foodOptions1 = foodMasterData1.map((food) => ({
            value: food.supplement_name.toLowerCase(), // You can modify this to suit your needs
            label:
              food.supplement_name.charAt(0).toUpperCase() +
              food.supplement_name.slice(1), // Capitalize the first letter
          }));

          setsupplementdata(foodOptions1);

          const foodMasterData2 =
            Response.data.message.ethi_remember_master_data;
          const foodOptions2 = foodMasterData2.map((food) => ({
            value: food.remember_name.toLowerCase(), // You can modify this to suit your needs
            label:
              food.remember_name.charAt(0).toUpperCase() +
              food.remember_name.slice(1), // Capitalize the first letter
          }));

          setremembermasterdata(foodOptions2);

          setmatchingassessments(
            Response.data.message.ethi_customers_assesment_master[0]
          );

          if (
            Response.data.message.customers_ethi_appointment_with_doctors[0]
          ) {
            setappointmentwithdoctors(
              Response.data.message.customers_ethi_appointment_with_doctors[0]
            );
            setdiet_plan_status(
              Response.data.message.customers_ethi_appointment_with_doctors[0]
                .diet_plan_status
            );
            setassesment_form_status(
              Response.data.message.customers_ethi_appointment_with_doctors[0]
                .assesment_form_status
            );
          }

          setRetrivePackageId(
            Response.data.message.ethi_customers_data[0].package_id
          );
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
    setRetriveCustomerId(action);
    master_data_get(retrievedDoctorId, action);
  }, [action]);
  //0  deit update 1 means disabled

  /*shubham jain codeing */

  const [selectedOption, setSelectedOption] = useState("select_data"); // Default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="container-xl create_diet_plan">
        <div className={showLoader ? "loading" : ""}></div>
        <div className="container">
          <AdminHeader />
        </div>
        <div className="create_diet_plan_dash">
          <div className="my_patients_dash_head">
            <div className="my_patients_dash_head_container">
              <div className="back_btn_heading">
                <span>
                  <div className="back_btn" onClick={() => navigate(-1)}>
                    <img src={ArrowLeft} alt="icon" />
                  </div>
                </span>
                <h4>My Patients</h4>
              </div>
            </div>
          </div>
          <div className="create_diet_plan_dash_container p-3">
            <div className="row create_diet_plan_dash_container_row">
              <div className="col-lg-8">
                <div className="patients_diet_plan_wrapper create_diet_plan_container">
                  <div className="patients_diet_plan_container">
                    {/* <h4 className="patients_diet_plan_heading">
                      Diet Plan | Week - 20/11/2023
                    </h4> */}
                    <div className="patients_diet_plan_head">
                      <div className="patients_diet_plan_head_left">
                        {matchingassessments &&
                        matchingassessments.length > 0 ? (
                          <div className="enter_age_div">
                            {" "}
                            <p>Age</p>
                            <h5>
                              {matchingassessments.age_no_name}
                              yrs
                            </h5>
                          </div>
                        ) : null}
                        {patients.gender != "" ? (
                          <div className="enter_gender_div">
                            <p>Gender</p>
                            <h5>{patients.gender}</h5>
                          </div>
                        ) : null}
                      </div>
                      {dietplandata.length > 0 ? (
                        <div className="patients_diet_plan_head_right">
                          <div className="previous_diets_div">
                            <select
                              className="select_previous_diets"
                              name="Previous Diet Plans"
                              id="prvious_diets"
                              value={selectedOption}
                              onChange={handleOptionChange}
                            >
                              {(() => {
                                let old_sequanve = 0;
                                return dietplandata.map((row, index) => {
                                  if (row.sequence_id !== old_sequanve) {
                                    old_sequanve = row.sequence_id;
                                    return (
                                      <option
                                        key={index}
                                        value={row.sequence_id}
                                      >
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
                      ) : null}
                    </div>
                    <div className="patients_diet_plan_body">
                      <div className="diet_time_and_meal_container">
                        {dietplandata.map((meal, index) => (
                          <div className="diet_time_and_meal" key={index}>
                            <div className="diet_time">
                              <h6>
                                {new Date(
                                  `01/01/2023 ${meal.diet_time}`
                                ).toLocaleString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </h6>
                            </div>
                            <ul>
                              {/* {meal.diet_detail.map((item_select, index) => (
                                <span key={index}>
                                  {index !== 0 && ", "} */}
                              <span>{meal.diet_detail}</span>
                              {/* </span> */}
                              {/* ))} */}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <PatientsProgessUpdate
                    weightNumber={patients ? patients.weight_kg : 0}
                    SleepNumber={patients ? patients.sleep_hour : 0}
                    GlassNumber={patients ? patients.hours_water : 0}
                    GenderNumber={patients ? patients.gender : "a"}
                    customer_id={retriveCustomerId}
                    doctor_id={retriveDoctorId}
                    subscription_id={subscriptionId}
                    patients_name={patients.customer_name}
                    start_date={patients.period_start_date}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="create_diet_patient_wrapper">
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
                        <h3>{patients.customer_name}</h3>
                        <p className="pb-3">Patients</p>
                        <div className="assesment_form_btn_div">
                          <button
                            className="btn assesment_form_btn"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            Assessment form
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
                      <div className="Allergies_div signs_symptoms_div health_concerns_div">
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
                      </div>
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
                            <div className="signs_symptoms_selected col-12">
                              {matchingassessments &&
                              matchingassessments.diseases_name ? (
                                matchingassessments.diseases_name
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div > */}

      {/* Modal Start */}
      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div
              className="modal-header form_popup_header"
              style={{ alignItems: "baseline" }}
            >
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-5 pb-0">
              <div className="asmntForm_head">
                <h3 className="modal-title" id="exampleModalLabel">
                  Assesment form Details
                </h3>
                <div className="circleDiv">
                  <p>Health Goals</p>
                  <div className="circleDot" />
                  <p>Lifestyle</p>
                  <div className="circleDot" />
                  <p>Eating Habits</p>
                </div>
              </div>
              <div className="asmntForm_body">
                <div className="asmnt_ques_list_div">
                  {matchingassessments !== undefined ? (
                    <ol className="asmnt_ques_list">
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Medical Condition</p>
                          <h6>{matchingassessments.med_condition_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Signs & Symptoms</p>
                          <h6>{matchingassessments.signs_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Age</p>
                          <h6>{matchingassessments.age_no_name} years</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Medications</p>
                          <h6>{matchingassessments.medicines_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Supplements</p>
                          <h6>{matchingassessments.supplements_name}</h6>
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
                          <h6>{matchingassessments.diseases_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Blood Group</p>
                          <h6>{matchingassessments.bloodgroup_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Height & Weight</p>
                          <h6>
                            Height: {matchingassessments.height_name} cm,
                            Weight: {matchingassessments.weight_number} kg
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
                                {matchingassessments.food_alcohol_name}
                              </h6>
                            </li>
                            <li>
                              <h6>
                                <span style={{ color: "#8a92a6" }}>
                                  Biscuits/Cakes/Pastries :
                                </span>{" "}
                                {matchingassessments.food_biscuit_name}
                              </h6>
                            </li>
                            <li>
                              <h6>
                                <span style={{ color: "#8a92a6" }}>
                                  Diet Sodas :
                                </span>{" "}
                                {matchingassessments.food_diet_soda_name}
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
                                <span style={{ color: "#8a92a6" }}>Tea :</span>{" "}
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
                          <h6>{matchingassessments.eathabits_name}</h6>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Sleep time</p>
                          <h6>
                            Sleep time : {matchingassessments.sleeptime_name}
                          </h6>
                          <h6>
                            Wake up time : {matchingassessments.waketime_name}
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
                          <h6>{matchingassessments.stress_level_name}</h6>
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
                          <h6>{matchingassessments.menstrual_name}</h6>
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
                                {matchingassessments.strength_training_name}
                              </h6>
                            </li>
                            <li>
                              <h6>
                                <span style={{ color: "#8a92a6" }}>Yoga :</span>{" "}
                                {matchingassessments.yoga_name}
                              </h6>
                            </li>
                            <li>
                              <h6>
                                <span style={{ color: "#8a92a6" }}>
                                  Flexibility/Balance :
                                </span>{" "}
                                {matchingassessments.flexibility_balance_name}
                              </h6>
                            </li>
                            <li>
                              <p>Others :</p>
                              <h6>{matchingassessments.other_details_name}</h6>
                              <h6>{matchingassessments.other_option_name}</h6>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="asmnt_ques_listItems">
                        <div>
                          <p>Motivation Needed</p>
                          <h6>{matchingassessments.motivation_name}</h6>
                        </div>
                      </li>
                    </ol>
                  ) : (
                    <div className="text-center m-5">
                      <h5>No Data found</h5>
                      <p>Please fill the assesment form.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal End */}
    </>
  );
}

export default AdminShowDietPlan;
