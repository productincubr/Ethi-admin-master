import React, { useState, useEffect } from "react";
import "../../Css/MyPatients.css";
import searchIcon from "../../Assests/images/searchIcon.svg";
import funnelIcon from "../../Assests/images/funnelIcon.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import AdminHeader from "./AdminHeader";
import {
  my_patients_full_details_doctor,
  my_patients_data_single,
  server_post_data,
  delete_master_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
export default function ViewAdminPatient() {
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [retrievedDoctorId, setretrievedDoctorId] = useState();
  const [documentImage, setDocumentImage] = useState();
  const [patients, setPatients] = useState([]);
  const [doctorNames, setDoctorData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();

  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retrivePackageId, setRetrivePackageId] = useState("");
  const [subscriptionId, setsubscriptionId] = useState();
  const [dietplandata, setdietplandata] = useState([]);
  const [matchingassessments, setmatchingassessments] = useState([]);
  const [appointmentdata, setappointmentdata] = useState([]);
  const [packagedata, setpackagedata] = useState([]);
  const [customergoal, setcustomergoal] = useState([]);
  const [customersdocuments, setcustomersdocuments] = useState([]);
  const [subscriptionplan, setsubscriptionplan] = useState([]);
  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    master_data_get(retrievedDoctorId);
  }, []);

  const master_data_get = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(my_patients_full_details_doctor, fd)
      .then((Response) => {
        console.log(Response);
        setPatients(Response.data.data_customers);
        setUpcomingAppointImage(APL_LINK + Response.data.data_user_image);
        setDoctorData(Response.data.data_doctor_data);
        setDocumentImage(APL_LINK + Response.data.data_document_image);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  /*shubham jain codeing */

  // Function to handle the patient click
  const handlePatientClick = (patient, index) => {
    call_single_data(patient._id)
    setSelectedPatient({ ...patient, keyIndex: index });
   
  };

  const [patientSearchValue, setPatientTabSearchValue] = useState("");
  const [searchedPatients, setSearchedPatients] = useState([]);

  const handleCurrentTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setPatientTabSearchValue(searchInput);

    // Filter patients for "Current Patients" tab based on the search input value
    if (searchInput.trim() !== "") {
      const filtered = patients.filter((patient) => {
        return patient.customer_name.toLowerCase().includes(searchInput);
      });
      setSearchedPatients(filtered);
    } else {
      setSearchedPatients([]);
    }
  };

  const call_single_data = async (customer_id) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("customer_id", customer_id);
    fd.append("doctor_id", retriveDoctorId);
    fd.append("extra_flag", "1");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        setsubscriptionId(
          Response.data.ethi_customers_data[0].last_subscription_id
        );
        setdietplandata(Response.data.ethi_doctor_diet_data);
        if(Response.data.ethi_customers_assesment_master[0]){
          setmatchingassessments(
            Response.data.ethi_customers_assesment_master[0]
          );
        }
        setpackagedata(Response.data.ethi_package_data);
        setappointmentdata(
          Response.data.customers_ethi_appointment_with_doctors
        );
        setcustomersdocuments(Response.data.customers_ethi_customers_documents);

        setsubscriptionplan(Response.data.customers_ethi_subscription_plan);

        setcustomergoal(Response.data.customers_goals);
        setRetrivePackageId(Response.data.ethi_customers_data[0].package_id);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [selectedOption, setSelectedOption] = useState("1"); // Default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleUpdateDoctor = async () => {
    if (selectedDoctor !== "0") {
      setShowLoader(true);
      const fd = new FormData();
      fd.append("id_for_delete", selectedPatient._id);
      fd.append("flag_for", "8");
      fd.append("for_status_final", selectedDoctor);
      await server_post_data(delete_master_data, fd)
        .then((Response) => {
          setShowLoader(false);
          call_single_data(selectedPatient._id)
         // master_data_get(retrievedDoctorId);
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const handleDownload = (downloadLink) => {
    if (downloadLink) {
      const anchor = document.createElement("a");
      anchor.style.display = "none";
      anchor.href = downloadLink;
      anchor.target = "_blank";
      anchor.download = "document.pdf"; // Change to the desired filename

      document.body.appendChild(anchor);
      anchor.click();

      document.body.removeChild(anchor);
    }
  };

  const doctor_id_name = (doctor_id) => {
    let doctor_name = "";
    doctorNames.forEach((item) => {
      if (doctor_id === item._id) {
        doctor_name = item.doctor_name;
      }
    });
    return doctor_name;
  };


  return (
    <div>
      <div className={showLoader ? "loading" : ""}></div>
      <div className="container">
        <AdminHeader />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="listStciky">
              <h4 className="text-center">Patients</h4>
              <div className="searchTools">
                <div className="searchInputWrapper p-2">
                  <img src={searchIcon} alt="Search" />
                  <input
                    placeholder="Search"
                    value={patientSearchValue}
                    onChange={handleCurrentTabSearchInputChange}
                  />
                </div>
                <img src={funnelIcon} alt="Funnel" />
              </div>
              <div className="my-3 pHeadWrapper" id="style-1">
                {patientSearchValue.trim() !== "" ? (
                  <>
                    {searchedPatients.length > 0 ? (
                      searchedPatients.map((item, index) => (
                        <div
                          className={`d-flex imgPListWrapper ${
                            selectedPatient &&
                            selectedPatient.keyIndex === index
                              ? "imgPListWrapperSelected"
                              : ""
                          }`}
                          key={index}
                          onClick={() => handlePatientClick(item, index)}
                        >
                          <img
                            className="mr-3 imgPList"
                            src={upcomingAppointImage + item.customer_image}
                            onError={(e) => {
                              e.target.src = ProfileImgSample; // Provide the path to your fallback image
                            }}
                            alt="user"
                          />
                          <h5 className="pHead">{item.customer_name}</h5>
                        </div>
                      ))
                    ) : (
                      <div className="m-4">
                        <p className="empty_text">No chats found</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {patients.map((item, index) => (
                      <div
                        className={`d-flex imgPListWrapper ${
                          selectedPatient && selectedPatient.keyIndex === index
                            ? "imgPListWrapperSelected"
                            : ""
                        }`}
                        key={index}
                        onClick={() => handlePatientClick(item, index)}
                      >
                        <img
                          className="mr-3 imgPList"
                          src={upcomingAppointImage + item.customer_image}
                          onError={(e) => {
                            e.target.src = ProfileImgSample; // Provide the path to your fallback image
                          }}
                          alt="user"
                        />
                        <h5 className="pHead">{item.customer_name}</h5>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9 mb-5">
            {selectedPatient ? (
              <div id="style-1">
                <h4 className="text-center">Patients Details</h4>
                <div className="assesment_form_btn_div assmntBtn flexAppointDr">
                  <button
                    className="btn assesment_form_btn btnDet"
                    data-toggle="modal"
                    data-target="#exampleModalLong"
                  >
                    Assessment Details
                  </button>
                  <div>
                    <h6>Select Doctor for {selectedPatient.name}</h6>
                    <div className="flexAppointDr">
                      <select
                        id="doctorSelect"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                      >
                        <option value="0">Select Doctor</option>
                        {doctorNames.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.doctor_name}
                          </option>
                        ))}
                      </select>

                      <button
                        className="btn btn-primary mx-3"
                        onClick={handleUpdateDoctor}
                      >
                        Update Doctor
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pDetailWrapper my-3 px-3 py-5">
                  <div className="d-flex col-md-12 detailHeader">
                    <div className="imgDiet">
                      <img
                        className="userImgP"
                        src={
                          upcomingAppointImage + selectedPatient.customer_image
                        }
                        alt="user"
                      />
                      <br />
                      <button
                        className="btn btn-primary btnDet"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        Diet Plan
                      </button>
                    </div>
                    <div>
                      <p>
                        <b> Name:</b>&nbsp; {selectedPatient.customer_name}
                      </p>
                      <p>
                        <b> Mobile:</b>&nbsp;{" "}
                        {selectedPatient.customer_mobile_no}
                      </p>
                      <p>
                        <b> Email:</b>&nbsp; {selectedPatient.customer_email}
                      </p>
                      <p>
                        <b> Date of Birth:</b>&nbsp;{" "}
                        {selectedPatient.date_of_birth}
                      </p>
                      <p>
                        <b> Gender:</b>&nbsp; {selectedPatient.gender}
                      </p>
                      <p>
                        <b> Address:</b>&nbsp; {selectedPatient.address}
                      </p>
                      <p>
                        <b> City:</b>&nbsp; {selectedPatient.city}
                      </p>
                      <p>
                        <b> State:</b>&nbsp; {selectedPatient.state}
                      </p>
                      <p>
                        <b> Country:</b>&nbsp; {selectedPatient.country}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b> Doctor Name:</b>&nbsp;{" "}
                        {doctor_id_name(selectedPatient.last_doctor_id)}
                      </p>
                      <p>
                        <b> Height:</b>&nbsp; {selectedPatient.height_cm} CM
                      </p>
                      <p>
                        <b> Weight:</b>&nbsp; {selectedPatient.weight_kg} KG
                      </p>
                      <p>
                        <b> Blood Group:</b>&nbsp; {selectedPatient.blood_group}
                      </p>
                      {packagedata.length > 0 ? (
                        <p>
                          <b> Package:</b>&nbsp; {packagedata[0].package_name}
                        </p>
                      ) : null}
                      {subscriptionplan.length > 0 ? (
                        <p>
                          <b> Package End:</b>&nbsp;{" "}
                          {subscriptionplan[0].package_end_date}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p>
                      <b>Goals:</b>&nbsp;&nbsp;
                      {customergoal.map((item_select, index) => (
                        <span key={index}>
                          {index !== 0 && ", "}
                          <span>{item_select.customer_goal_name}</span>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                <div className="my-3 wrapperDet">
                  <div className="col-md-5 py-3 pDetailWrapper">
                    <h4 className="text-center">Uploaded Documents</h4>
                    {customersdocuments.map((item_select, index) => (
                      <div className="docsUpload" key={index}>
                        <div className="docsHead">
                          <p className="mb-0">Report {index + 1}</p>
                          <p>{item_select.entry_date}</p>
                        </div>
                        <button
                          className="btn btn-primary btnDet"
                          onClick={() =>
                            handleDownload(
                              documentImage + item_select.document_data
                            )
                          }
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="col-md-6 py-3 pDetailWrapper">
                    <h4 className="text-center">Activity</h4>
                    <div>
                      {subscriptionplan.length > 0 ? (
                        <p>
                          <b> Appointment:</b>&nbsp;{" "}
                          {subscriptionplan[0].no_of_calling}/
                          {subscriptionplan[0].complete_calling} Left
                        </p>
                      ) : null}

                      {appointmentdata.map((item_select, index) => (
                        <div key={index}>
                          <p>
                            <b>Appointment Dates {index + 1}:</b>&nbsp;{" "}
                            {item_select.booking_date}&nbsp;{" "}
                            <span
                              style={{
                                color:
                                  item_select.status_for_complete === "0"
                                    ? "red"
                                    : "blue",
                              }}
                            >
                              {item_select.status_for_complete === "0"
                                ? "Incomplete"
                                : "Complete"}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pDetailWrapper col-md-5 my-3 p-5">
                  <div>
                    <h4>Payment Details</h4>
                    {subscriptionplan.length > 0 ? (
                      <span>
                        <p>
                          <b> Date:</b>&nbsp; {subscriptionplan[0].entry_date}
                        </p>

                        <p>
                          <b> Payment Mode:</b>&nbsp;{" "}
                          {subscriptionplan[0].payment_mode}
                        </p>
                      </span>
                    ) : null}
                    {packagedata.length > 0 ? (
                      <p>
                        <b> Plan Type:</b>&nbsp; {packagedata[0].package_name}
                      </p>
                    ) : null}
                  </div>
                </div>
                {/* diet plan popup by Arsalan @04/08/1998 */}
                {dietplandata.length !== 0 ? (
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Diet Plan
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
                              return selectedPatient.diet_plans.map(
                                (row, index) => {
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
                                }
                              );
                            })()}
                          </select>
                        </div>
                        <div className="modal-body tableHeight" id="style-1">
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
                                return selectedPatient.diet_plans.map(
                                  (meal, index) => {
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
                                  }
                                );
                              })()}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* End diet plan popup by Arsalan @04/08/1998 */}
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
                      <div className="modal-header form_popup_header">
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body px-5 py-2 pb-0">
                        <form className="form_popup">
                          <h3 className="modal-title" id="exampleModalLabel">
                            Assesment form
                          </h3>
                          <div className="circleDiv">
                            <p>Health Goals</p>
                            <div className="circleDot" />
                            <p>Lifestyle</p>
                            <div className="circleDot" />
                            <p>Eating Habits</p>
                          </div>
                          <div className="asmntForm_data_container">
                            <div className="asmntForm_data">
                              <div className="asmntForm_body">
                                <div className="asmnt_ques_list_div">
                                  {matchingassessments.length >
                                  0 ? (
                                    <ol className="asmnt_ques_list">
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Medical condition</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .med_condition_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Signs & Symptoms</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments.signs_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Age</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .age_no_name
                                            }{" "}
                                            years
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Medications</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .medicines_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Supplements</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .supplements_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Food allergy/intolerance</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .allergy_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Diseases</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .diseases_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Blood Group</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .bloodgroup_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Height & Weight</p>
                                          <h6>
                                            Height:{" "}
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .height_name
                                            }{" "}
                                            cm, Weight:{" "}
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .weight_number
                                            }{" "}
                                            kg
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Food Preference</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .foodpre_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Cuisines You Enjoy</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .cuisines_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Food Cravings</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .cravings_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Food Frequency</p>
                                          <ul>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Alcohol :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .food_alcohol_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Biscuits/Cakes/Pastries :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .food_biscuit_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Diet Sodas :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .food_diet_soda_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Coffee :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .food_coffee_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Tea :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .food_tea_name
                                                }
                                              </h6>
                                            </li>
                                          </ul>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>What triggers you to eat ?</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .triggers_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Eating haabits you are proud of</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .eathabits_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Sleep time</p>
                                          <h6>
                                            Sleep time :{" "}
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .sleeptime_name
                                            }
                                          </h6>
                                          <h6>
                                            Wake up time :{" "}
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .waketime_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Most Hungry</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .hungry_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Stress Level</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .stress_level_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Water Consumption</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments.water_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Smoking</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments.smoke_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Menstrual cycle</p>
                                          <h6>
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .menstrual_name
                                            }
                                          </h6>
                                        </div>
                                      </li>
                                      <li className="asmnt_ques_listItems">
                                        <div>
                                          <p>Activity</p>
                                          <ul>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Endurance :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .endurance_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Strength Training :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .strength_training_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Yoga :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .yoga_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <h6>
                                                <span
                                                  style={{ color: "#8a92a6" }}
                                                >
                                                  Flexibility/Balance :
                                                </span>{" "}
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .flexibility_balance_name
                                                }
                                              </h6>
                                            </li>
                                            <li>
                                              <p>Others :</p>
                                              <h6>
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .other_details_name
                                                }
                                              </h6>
                                              <h6>
                                                {
                                                  selectedPatient
                                                    .matching_assessments
                                                    .other_option_name
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
                                            {
                                              selectedPatient
                                                .matching_assessments[0]
                                                .motivation_name
                                            }
                                          </h6>
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
