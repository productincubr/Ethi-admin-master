import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../../Css/CreateDietPlan.css";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import DeleteSvg from "../../Assests/images/delete_svg.svg";
import AddSvg2 from "../../Assests/images/add_svg2.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import WhatsappWhite from "../../Assests/images/whatsapp_white.svg";
import EmailWhite from "../../Assests/images/email_white.svg";
import DoctorHeader from "./DoctorHeader";
import DoctorpatientsForm from "./DoctorpatientsForm";
import PatientsProgessUpdate from "./PatientsProgessUpdate";
import { useParams } from "react-router-dom";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import {
  my_patients_data_single,
  diet_form_patients_save,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { combiled_form_data } from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import CreatableSelect from "react-select/creatable";

function DoctorCreateDietPlan() {
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
  const [foodmasterdata, setfoodmasterdata] = useState([]);
  const [remembermasterdata, setremembermasterdata] = useState([]);

  //
  const [supplementsData, setSupplementsData] = useState([]);
  const [pointsToRememberData, setPointsToRememberData] = useState([]);

  const master_data_get = async (retrievedDoctorId, retriveCustomerIdid) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("customer_id", retriveCustomerIdid);
    fd.append("extra_flag", "2");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message);
          setPointsToRememberData(
            Response.data.message.ethi_points_to_remember_data
          );
          setSupplementsData(Response.data.message.ethi_supplements_data);

          setPatients(Response.data.message.ethi_customers_data[0]);
          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
          setsubscriptionId(
            Response.data.message.ethi_customers_data[0].last_subscription_id
          );
          setdietplandata(Response.data.message.ethi_doctor_diet_data);

          const foodOptions = Response.data.message.ethi_food_master_data.map(
            (food) => ({
              value: food.food_name, // You can modify this to suit your needs
              label: food.food_name, // Capitalize the first letter
            })
          );

          setfoodmasterdata(foodOptions);
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

          setRetrivePackageId(
            Response.data.message.ethi_customers_data[0].package_id
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
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
  /**
   * appointmentwithdoctors
   */

  /*shubham jain codeing */

  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    if (rows.length > 0) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("doctor_id", retriveDoctorId);
      fd_from.append("customer_id", retriveCustomerId);
      fd_from.append("subscription_id", subscriptionId);
      fd_from.append("package_id", retrivePackageId);
      fd_from.append("total_count", rows.length);
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

  const [selectedOption, setSelectedOption] = useState("select_data"); // Default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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

  console.log(dietplandata);
  console.log(pointsToRememberData);
  console.log(supplementsData);

  return (
    <>
      <div className="container-xl create_diet_plan">
        <div className={showLoader ? "loading" : ""}></div>
        <div>
          <DoctorHeader />
        </div>

        <div className="container " id="pdfContent" hidden>
          <div className="container-1 " id="pdfContent-1">
            <div className="div">
              <div className="div-2">
                <div className="div-3">
                  <div className="div-4">
                    <div className="div-5">
                      <div className="div-6">
                        <div className="div-7">“</div>
                        <div className="div-8">
                          <img src={AddSvg2} />
                          <div className="div-9">
                            Every Thing Health Inspired
                          </div>
                        </div>
                      </div>
                      <div className="div-10" />
                    </div>
                    <div className="div-11">
                      <div className="div-12">
                        <div className="div-13">Nivesh bhalla</div>
                        <div className="div-14"> 03/10/2023</div>
                      </div>
                    </div>
                  </div>
                  <div className="div-15" />
                  <div className="div-16" />
                </div>
              </div>
            </div>
          </div>
          <div className="container-2" id="pdfContent-2">
            <div className="div-17">
              <div className="div-18">
                <div className="div-19">
                  <div className="div-20"></div>
                </div>
                <div className="div-21">Diet Plan</div>
                <div className="div-22"></div>
              </div>
              <div className="div-23">
                <div className="div-24">
                  <div className="div-25">On Waking Up</div>
                  <div className="div-26">
                    1 cup jeera water, 1 tsp. boiled
                    <br />5 soaked almonds
                  </div>
                </div>
                <div className="div-27">
                  <div className="div-28">Breakfast</div>
                  <div className="div-29">
                    1 katori sprouts + sabzi + 1roti(1/2 wheat+1/2 amarnath)
                  </div>
                </div>
                <div className="div-30">
                  <div className="div-31">12:30 PM</div>
                  <div className="div-32">
                    1 Katori dal/chana/rajma + sabzi + 1 roti(1/2 wheat + 1/2
                    amarnath)
                  </div>
                </div>
                <div className="div-33">
                  <div className="div-34">04:00 PM</div>
                  <div className="div-35">1 Bowl anaar</div>
                </div>
                <div className="div-36">
                  <div className="div-37">06:00 PM</div>
                  <div className="div-38">1 cup water + 1 scoop Nack</div>
                </div>
                <div className="div-39">
                  <div className="div-40">Breakfast</div>
                  <div className="div-41">
                    100g tofu + 1 avacado toast + veggies or
                    <br />
                    1 bowl sabzi + 1 dal cheela or
                    <br />
                    1 bowl ver red lentil pasta = avacado or
                    <br />1 bowl veg quinoa + avacado
                  </div>
                </div>
                <div className="div-42">
                  <div className="div-43">Bedtime</div>
                  <div className="div-44">1 tsp. triphala + warm water</div>
                </div>
              </div>
              <div className="div-45"></div>
              <div className="div-46"></div>
            </div>
          </div>
          <div className="container-3" id="pdfContent-3">
            <div className="div-47">
              <div className="div-48">
                <div className="div-49">
                  <div className="div-50"></div>
                  <img src={AddSvg2} />
                </div>
                <div className="div-51">
                  <div className="div-52">lorem ipsum</div>
                  <div className="div-53"></div>
                </div>
              </div>
              <div className="div-54">
                <div className="div-55">
                  <div className="div-56">Points to Remember</div>
                  <div className="div-57">Water : 3 ltrs/Day</div>
                  <div className="div-58">
                    Veggies are free food except potato, peas & corn
                  </div>
                  <div className="div-59">
                    Oils : Cow milk ghee, coconut oil, peanut & <br /> mustard
                    oil
                  </div>
                  <div className="div-60">
                    Raw Sugar/Honey/Jaggery max 2 tsp/day
                  </div>
                  <div className="div-61">Max 2 decafs a day</div>
                  <div className="div-62">No Tea</div>
                </div>
                <div className="div-63"></div>
              </div>
            </div>
          </div>
        </div>

        <div>{/* <ReportTemplate/> */}</div>
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
                        <p className="pb-3">Patient</p>

                        <div className="assesment_form_btn_div">
                          <button
                            className="btn assesment_form_btn"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            Assessment Form
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

              <div className="col-lg-8">
                <div className="create_diet_plan_container">
                  <div className="create_diet_plan_head">
                    <div className="previous_diets_div">
                      <div className="d-flex justify-content-center flex-column">
                        <h4 className="create_diet_plan_head_left">
                          Create Diet Plan
                        </h4>
                      </div>
                      <select
                        className="select_previous_diets "
                        name="Previous Diet Plans"
                        id="prvious_diets"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option value="select_data">Add New Diet Plan</option>
                        {(() => {
                          let old_sequanve = -1;
                          return dietplandata.map((row, index) => {
                            console.log(row.sequence_id);
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
                  {selectedOption === "select_data" ? (
                    <div className="create_diet_plan_wrapper">
                      <form id="form_patinents_diet_form_diet">
                        <div className="create_diet_plan_body">
                          {rows.map((row, index) => (
                            <div
                              className="create_diet_plan_body_items"
                              key={index}
                            >
                              <div className="diet_time">
                                <p>Meal Time</p>
                                <input
                                  type="time"
                                  className="trio_mendate"
                                  id={`meal_time${index}`}
                                  name={`meal_time${index}`}
                                  style={{ height: "25px" }}
                                />
                              </div>
                              <div className="select_inputDietPlan diet_items">
                                <p>Food Items</p>

                                <CreatableSelect
                                  isMulti
                                  options={supplementdata}
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

                          {/* <input value={pdfDiet} id="dietPlanPdf" name="dietPlanPdf" hidden /> */}
                          <div className="pointsSupplymenttsSleect">
                            <div className="row m-0">
                              <div
                                className="col-md-6"
                                style={{ paddingLeft: "0" }}
                              >
                                <div className="pointsSelect">
                                  <div className="select_inputDietPlan diet_items">
                                    <p className="newInputFields">
                                      Points To Remember
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
                                    <p className="newInputFields">
                                      Supplements
                                    </p>

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
                                Send Diet To Patient
                              </button>
                            </div>
                            <div className="send_diet_options_div">
                              <p>Send Diet On</p>
                              <div className="send_diet_options">
                                <div className="send_option">
                                  <img src={WhatsappWhite} alt="icon" />
                                </div>
                                <div className="send_option">
                                  <img src={EmailWhite} alt="icon" />
                                </div>
                              </div>
                            </div>
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
                            <p className="newInputFields pointToRemember margin_top_11px">
                              Points To Remember
                            </p>
                            {pointsToRememberData.map((meal, index) => {
                              if (
                                Number(selectedOption) ===
                                Number(meal.sequence_id)
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
                            <p className="newInputFields pointToRemember margin_top_11px">
                              Suppliments
                            </p>
                            {supplementsData.map((meal, index) => {
                              if (
                                Number(selectedOption) ===
                                Number(meal.sequence_id)
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
                </div>

                {/* Assesment Form data */}
                <div className="asmntForm_data_container">
                  <div className="asmntForm_data">
                    <div className="asmntForm_head">
                      <h3 className="modal-title" id="exampleModalLabel">
                        Assessment Form Details
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
                                <h6>
                                  {matchingassessments.med_condition_name}
                                </h6>
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
                                {/* <h6>{matchingassessments.age_no_name} years</h6> */}
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
                                <h6>{matchingassessments.eathabits_name}</h6>
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
                                      {matchingassessments.other_details_name}
                                    </h6>
                                    <h6>
                                      {matchingassessments.other_option_name}
                                    </h6>
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
                            <h5>No Data Found</h5>
                            <p>Please Fill The Assessment Form.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <PatientsProgessUpdate
                      weightNumber={patients ? patients.weight_kg : 0}
                      SleepNumber={patients ? patients.sleep_hour : 0}
                      GlassNumber={patients ? patients.hours_water : 0}
                      GenderNumber={patients ? patients.gender : ""}
                      customer_id={retriveCustomerId}
                      doctor_id={retriveDoctorId}
                      subscription_id={subscriptionId}
                      patients_name={patients.customer_name}
                      start_date={patients.period_start_date}
                    />
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
          <DoctorpatientsForm
            customer_id={retriveCustomerId}
            doctor_id={retriveDoctorId}
            subscription_id={subscriptionId}
          />
        </div>
      </div>

      {/* Modal End */}
    </>
  );
}

export default DoctorCreateDietPlan;
