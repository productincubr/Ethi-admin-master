import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../../Css/CreateDietPlan.css";
import "../../Css/ChatpageDiet.css";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import DeleteSvg from "../../Assests/images/delete_svg.svg";
import AddSvg2 from "../../Assests/images/add_svg2.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import WhatsappWhite from "../../Assests/images/whatsapp_white.svg";
import EmailWhite from "../../Assests/images/email_white.svg";

import DoctorHeader from "../DoctorPanel/DoctorHeader.js";
import DoctorpatientsForm from "../DoctorPanel/DoctorpatientsForm";
import PatientsProgessUpdate from "../DoctorPanel/PatientsProgessUpdate";
import { useParams } from "react-router-dom";
import {
  my_patients_data_single,
  diet_form_patients_save,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { combiled_form_data } from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import CreatableSelect from "react-select/creatable";

function Dietpage() {
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
    // Set initial state with 5 rows
    setRows(Array.from({ length: 1 }, () => ({})));
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
        <div>{/* <DoctorHeader />  render here the header*/}</div>

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
                <h4>AI tool</h4>
              </div>
            </div>
          </div>

          <div className="create_diet_plan_dash_container p-3">
            <div className="row create_diet_plan_dash_container_row wholcntt">
              <div className="col-lg-8">
                <div className="create_diet_plan_container">
                  <div className="chatbtns">
                    <button className="dietbtn">Diet</button>
                    <button className="aichatbtn">Ai Chats</button>
                  </div>
                  <div className="d-flex" style={{ color: "red" }}></div>
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
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="patients_diet_plan_wrapper create_diet_plan_container"></div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="create_diet_patient_wrapper frm">
                  <div className="inputDetailsSidebar">
                    <div className="d-flex flex-column">
                      <div className="age">
                        <span className="sml">Age</span>
                        <div className="sml1">28 Yrs</div>
                      </div>
                      <div className="Gender">
                        <span className="sml">Gender</span>
                        <div className="sml1">Female</div>
                      </div>
                      <div className="Allergies">
                        <span className="sml">Allergies</span>
                        <div className="sml1">NA</div>
                      </div>
                      <div className="Diet_Preference">
                        <span className="sml">Diet Preference</span>
                        <div className="sml1">Vegetarian</div>
                      </div>
                      <div className="Addtional">
                        <span className="sml">Addtional</span>
                        <div className="sml1">NA</div>
                      </div>
                      <div className="regeneratebtn-btns">
                        <button className="regeneratebtn">Regenerate</button>
                        <button className="editplanbtn">Edit plan</button>
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
          <DoctorpatientsForm
            customer_id={retriveCustomerId}
            doctor_id={retriveDoctorId}
            subscription_id={subscriptionId}
          />
        </div>{" "}
      </div>

      {/* Modal End */}
    </>
  );
}

export default Dietpage;
