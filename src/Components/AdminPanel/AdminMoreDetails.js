import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "../../Css/CreateDietPlan.css";
import "../../Css/MyPatients.css";
import Avatar1 from "../../Assests/images/avatar1.png";
import Avatar2 from "../../Assests/images/avatar2.png";
import Avatar3 from "../../Assests/images/avatar3.png";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import downloadIcon from "../../Assests/images/download-square-svgrepo-com.svg";
import DeleteSvg from "../../Assests/images/delete_svg.svg";
import AddSvg2 from "../../Assests/images/add_svg2.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import WhatsappWhite from "../../Assests/images/whatsapp_white.svg";
import EmailWhite from "../../Assests/images/email_white.svg";
// import DoctorHeader from "./DoctorHeader";
import DoctorpatientsForm from "../DoctorPanel/DoctorpatientsForm";
// import PatientsProgessUpdate from "./PatientsProgessUpdate";
import AdminHeader from "./AdminHeader";
import { useParams } from "react-router-dom";
import {
  my_patients_data_single,
  diet_form_patients_save,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import CreatableSelect from "react-select/creatable";
function AdminMoreDetails() {
  // Back button
  const navigate = useNavigate();
  const { action } = useParams();

  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [retriveCustomerId, setRetriveCustomerId] = useState("");
  const [retrivePackageId, setRetrivePackageId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [subscriptionId, setsubscriptionId] = useState();
  const [subscriptiondetails, setsubscriptiondetails] = useState();
  const [patients, setPatients] = useState([]);
  const [patientDocument, setPatientDocument] = useState([]);

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");

    setRetriveDoctorId(retrievedDoctorId);
    setRetriveCustomerId(action);
    master_data_get(retrievedDoctorId, action);
  }, [action]);

  const master_data_get = async (retrievedDoctorId, retriveCustomerIdid) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("customer_id", retriveCustomerIdid);
    fd.append("extra_flag", "2");
    await server_post_data(my_patients_data_single, fd)
      .then((Response) => {
        console.log(Response.data.message);
        console.log(Response.data.message.customers_ethi_subscription_plan[0]);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setPatientDocument(
            Response.data.message.customers_ethi_customers_documents
          );
          console.log(Response.data.message.customers_ethi_customers_documents);
          setPatients(Response.data.message.ethi_customers_data[0]);
          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
          setsubscriptionId(
            Response.data.message.ethi_customers_data[0].last_subscription_id
          );
          setsubscriptiondetails(
            Response.data.message.customers_ethi_subscription_plan[0]
          );
          console.log(Response.data.message);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  if (!subscriptiondetails || !subscriptiondetails.entry_date) {
    return (
      <div>
        <p>Invalid subscription details</p>
      </div>
    );
  }
  const entryDate = new Date(subscriptiondetails.entry_date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  // Extract date and time components
  const formattedDate = entryDate.toLocaleDateString("en-GB", options);
  const formattedTime = entryDate.toLocaleTimeString();

  const entryStartDate = new Date(patients.package_start_date);
  const entryEndDate = new Date(patients.package_end_date);
  const startDateFormat = { day: "2-digit", month: "2-digit", year: "numeric" };
  const endDateFormat = { day: "2-digit", month: "2-digit", year: "numeric" };

  // Formatting package_start_date
  const formattedStartDate = entryStartDate.toLocaleDateString(
    "en-GB",
    startDateFormat
  );

  // Formatting package_end_date
  const formattedEndDate = entryEndDate.toLocaleDateString(
    "en-GB",
    endDateFormat
  );
  const autoDownloadFile = (imageName) => {
    const link = document.createElement("a");
    link.href = APL_LINK + "/ethi_user_document/" + imageName;
    console.log(link.href);
    link.download = imageName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="container-xl create_diet_plan">
        <div className={showLoader ? "loading" : ""}></div>
        <div>
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
                <div id="style-1">
                  <h4 className="text-center">Patient's Details</h4>
                  <p className="userIdP btnDet p-2">
                    <b> User ID:</b>&nbsp; {patients._id}
                  </p>
                  <div className="pDetailWrapper my-3 p-5">
                    <div className="d-flex col-md-12 detailHeader">
                      <div className="DTl">
                        <p>
                          <b> Name:</b>&nbsp; {patients.customer_name}
                        </p>
                        <p>
                          <b> Phone/Contact:</b>&nbsp;{" "}
                          {patients.customer_mobile_no}
                        </p>
                        <p>
                          <b> Email ID:</b>&nbsp; {patients.customer_email}
                        </p>
                        <p>
                          <b> Date of Birth:</b>&nbsp; {patients.date_of_birth}
                        </p>
                        <p>
                          <b> Gender:</b>&nbsp; {patients.gender}
                        </p>
                        <p>
                          <b> Address:</b>&nbsp; {patients.address}
                        </p>
                        <p>
                          <b> City:</b>&nbsp; {patients.city}
                        </p>
                        <p>
                          <b> State:</b>&nbsp; {patients.state}
                        </p>
                        <p>
                          <b> Country:</b>&nbsp; {patients.country}
                        </p>
                      </div>
                      <div>
                        <p>
                          <b> Height:</b>&nbsp; {patients.height_cm} Cm
                        </p>
                        <p>
                          <b> Weight:</b>&nbsp; {patients.weight_kg} Kg
                        </p>
                        <p>
                          <b> Blood Group:</b>&nbsp; {patients.bloodGroup}
                        </p>
                        {/* <p>
                          <b> Health Concerns:</b>&nbsp;{" "}
                          {patients.healthConcerns}
                        </p> */}
                        {/* <p>
                          <b> Package:</b>&nbsp; {patients.packagePlan}
                        </p> */}
                        <p>
                          <b> Package Start Date:</b>&nbsp; {formattedStartDate}
                        </p>
                        <p>
                          <b> Package End Date:</b>&nbsp; {formattedEndDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  {subscriptiondetails && (
                    <div className="my-3 wrapperDet">
                      <div className="pDetailWrapper col-md-5 my-3 p-5 ">
                        {/* <div className=" col-md-5 my-3 p-5"> */}
                        <div>
                          <h4>Payment Details</h4>
                          <p>
                            <b> Transaction ID:</b>&nbsp;{" "}
                            {subscriptiondetails.payment_id}
                          </p>
                          <p>
                            <b> Date:</b>&nbsp; {formattedDate}
                          </p>
                          <p>
                            <b> Time:</b>&nbsp; {formattedTime}
                          </p>
                          <p>
                            <b> Payment Mode:</b>&nbsp;{" "}
                            {subscriptiondetails.payment_mode}
                          </p>
                          {/* <p>
                          <b> Plan Type:</b>&nbsp; {subscriptiondetails.TxnPlan}
                        </p> */}
                          {/* </div> */}
                        </div>
                      </div>
                      <div className="pDetailWrapper col-md-5 my-3 p-5 ">
                        {/* <div className=" col-md-5 my-3 p-5"> */}
                        <div>
                          <h4>Patient's Documents</h4>
                          {patientDocument.map((i, index) => {
                            return (
                              <p
                                key={index}
                                className="my-2 d-flex justify-content-between align-items-center "
                              >
                                <b> Report {index + 1}:</b>&nbsp;{" "}
                                <img
                                  src={downloadIcon}
                                  alt="Download Icon"
                                  onClick={() =>
                                    autoDownloadFile(i.document_data)
                                  }
                                />
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assesment Form data */}
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
                        {/* <div className="assesment_form_btn_div">
                          <button
                            className="btn assesment_form_btn"
                            data-toggle="modal"
                            data-target="#exampleModalLong"
                          >
                            Assessment form
                          </button>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="patient_medical_wrapper">
                    <div className="">
                      <div className="pDetailWrapper">
                        <h4 className="text-cente r">Activity</h4>
                        <div>
                          <p>
                            <b> Appointment:</b>&nbsp;{" "}
                            {subscriptiondetails.complete_calling}
                          </p>
                          <p>
                            <b> Upcoming Appointment:</b>&nbsp;{" "}
                            {patients.UpAppointment}
                          </p>
                          <p>
                            <b> Last Appointment:</b>&nbsp;{" "}
                            {patients.LstAppointment}
                          </p>
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

export default AdminMoreDetails;
