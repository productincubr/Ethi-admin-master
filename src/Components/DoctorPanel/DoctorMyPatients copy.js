import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import "../../Css/MyPatients.css";
import PrimaryButtonButton from "../RepeatingComponents/PrimaryButton";
import { Link } from "react-router-dom";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import searchIcon from "../../Assests/images/searchIcon.svg";
import funnelIcon from "../../Assests/images/funnelIcon.svg";
import {
  my_patients_full_details_doctor,
  my_patients_data_single,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";

export default function DoctorMyPatients() {
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [documentImage, setDocumentImage] = useState();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState();
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
        setPatients(Response.data.data_customers);
        setUpcomingAppointImage(APL_LINK + Response.data.data_user_image);
        setDocumentImage(APL_LINK + Response.data.data_document_image);

        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
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
        console.log(Response.data.ethi_doctor_diet_data)
        if (Response.data.ethi_customers_assesment_master[0]) {
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

  /*shubham jain codeing */

  // Function to handle the patient click
  const handlePatientClick = (patient, index) => {
    call_single_data(patient._id);
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

  const [selectedOption, setSelectedOption] = useState("1"); // Default selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
  return (
    <div className="container-lg my_patients">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <DoctorHeader />
      </div>
      <div className="my_patients_dash">
        <div className="row">
          <div className="col-md-3">
            <div className="listStciky">
              <h4 className="text-center">Patients</h4>
              {/* <div className="searchTools">
                <div className="searchInputWrapper p-2">
                  <img src={searchIcon} alt="Search" />
                  <input
                    placeholder="Search"
                    value={patientSearchValue}
                    onChange={handleCurrentTabSearchInputChange}
                  />
                </div>
                <img src={funnelIcon} alt="Funnel" />
              </div> */}
              {/* <div className="my-3 pHeadWrapper" id="style-1">
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
                        <p className="empty_text">No Patients Found</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {patients.map((item, index) => {
                      return (
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
                      );
                    })}
                  </>
                )}
              </div> */}
            </div>
          </div>
          <div className="col-md-9 mb-5">
            {selectedPatient ? (
              <div id="style-1">
                <h4 className="text-center">Patients Details</h4>
                <div className="d-flex justify-content-end">
                  <Link
                    to={`/doctor_my_patients_create_diet_plan/${selectedPatient._id}`}
                  >
                    <PrimaryButtonButton name="Create diet plan" />
                  </Link>
                </div>
                <div className="pDetailWrapper my-3 px-3 py-5">
                  <div className="d-flex col-md-12 detailHeader">
                    <div className="imgDiet">
                      <img
                        className="userImgP"
                        src={
                          upcomingAppointImage + selectedPatient.customer_image
                        }
                        onError={(e) => {
                          e.target.src = ProfileImgSample; // Provide the path to your fallback image
                        }}
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
                  {customersdocuments.length > 0 ? (
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
                  ) : (
                    <div className="col-md-5 py-3 pDetailWrapper">
                      {" "}
                      <h4 className="text-center">Uploaded Documents</h4>
                      <span className="text-center">No Data Found</span>
                    </div>
                  )}

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
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {/* End diet plan popup by Arsalan @04/08/1998 */}
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
