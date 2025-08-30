import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/AdminMyCalendar2.css";
import DoctorHeader from "./DoctorHeader";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import LeftBtn from "../../Assests/images/left_btn.svg";
import RightBtn from "../../Assests/images/right_btn.svg";
import ClockSvg from "../../Assests/images/clock_svg.svg";
import CalenderSvg from "../../Assests/images/calender.svg";
import Clock2Svg from "../../Assests/images/clock_2.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
// import DatePicker from "../../../node_modules/react-horizontal-strip-datepicker/dist/index.modern.js";
import DatePicker from "react-horizontal-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import {
  get_appointment_by_doctor,
  server_post_data,
  APL_LINK,
  cancel_appointment_by_doctor,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import { monthNames, months } from "../../CommonJquery/Commondata.js";
import { make_date_format } from "../../CommonJquery/CommonJquery.js";
function DoctorMyCalendar() {
  // Back button
  const navigate = useNavigate();

  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [selectedAppoint, setSelectedAppoint] = useState([]);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [showdatefor_current, setShowdateforCurrent] = useState("");
  const [monthName, setmonthName] = useState("");
  const [currentMonth, setcurrentMonth] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [selecteddate, setselecteddate] = useState("");

  /*shubham jain codeing */

  const master_data_get = async (retrievedDoctorId, date_for_data) => {
    setShowLoader(true);
    setSelectedAppoint(null);
    setShowdateforCurrent(make_date_format(date_for_data, "yyyy-MM-dd"));
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("present_date", date_for_data);
    await server_post_data(get_appointment_by_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setUpcomingAppoint(Response.data.message.data_appointment);
          setUpcomingAppointImage(
            APL_LINK + Response.data.message.data_user_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    const currentDate = new Date();
    const retrievedDoctorId = retrieveData("doctor_id");
    setRetriveDoctorId(retrievedDoctorId);
    setcurrentMonth(currentDate.getMonth());
    setmonthName(currentDate.getMonth());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    master_data_get(retrievedDoctorId, formattedDate);
  }, [retriveDoctorId]);

  /*shubham jain codeing */

  const onSelectedDay = (selectedDate) => {
    setcurrentMonth(selectedDate.getMonth());
    setmonthName(selectedDate.getMonth());
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setselecteddate(formattedDate);
    master_data_get(retriveDoctorId, formattedDate);
  };

  const handleAppointmentClick = (index) => {
    setSelectedAppoint(upcomingAppoint[index]);
  };

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async () => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("appointment_id", selectedGoalId);
    fd.append("doctor_id", retriveDoctorId);
    await server_post_data(cancel_appointment_by_doctor, fd)
      .then((Response) => {
        setShowLoader(false);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          master_data_get(retriveDoctorId, selecteddate);
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const closepopup = () => {
    if (selectedGoalId !== null) {
      setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
    }
  };
  // Function to handle the delete icon click
  const handleDeleteIconClick = (goalId) => {
    setSelectedGoalId(goalId);
  };

  const handlecallgo = (customer_id) => {
    //click on chart
    navigate("/doctor_video_call/" + customer_id);
  };

  const [isBusySelected, setIsBusySelected] = useState(false);

  const handleBusyClick = () => {
    setIsBusySelected(true);
  };

  const handleAvailableClick = () => {
    setIsBusySelected(false);
  };

  const rightBtnHandler = () => {
    if (monthName !== 11) {
      setmonthName(monthName + 1);
    } else {
      setmonthName(0);
    }
  };

  const leftBtnHandler = () => {
    if (monthName !== 0) {
      setmonthName(monthName - 1);
    } else {
      setmonthName(11);
    }
  };

  return (
    <div className="container-lg my_calendar">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <DoctorHeader />
      </div>
      <br />
      <div className="my_calendar_wrapper">
        <div className="my_calendar_container">
          <div className="page_head_container">
            <div className="heading_btn_div d-flex align-items-center">
              <div className="back_button">
                <div className="back_btn" onClick={() => navigate(-1)}>
                  <img src={ArrowLeft} alt="icon" />
                </div>
              </div>
              <div className="page_heading">
                <h3 className="hds">My Calendar</h3>
              </div>
            </div>
            <div className="month_name">
              <div className="left_btn">
                {/* <img src={LeftBtn} onClick={leftBtnHandler} alt="button" /> */}
              </div>

              <h5 className="hd">{monthNames[monthName]}</h5>
              <div className="right_btn">
                {/* <img src={RightBtn} onClick={rightBtnHandler} alt="button" /> */}
              </div>
            </div>
          </div>
          <br />
          <div className="calendar">
            <div className="calendar_wrapper">
              <div className="months_div">
                <div className="months_flex">
                  {months.map((month, index) => (
                    <div
                      key={index}
                      className="month d-flex flex-column align-items-center"
                    >
                      <p className="sps">{month}</p>
                      <div style={{ height: "20px", marginTop: "0.3rem" }}>
                        {index === currentMonth && <div className="dot"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DatePicker
                enableScroll={true}
                enableDaysBefore={1}
                enableDays={366}
                getSelectedDay={onSelectedDay}
                selectedDay={onSelectedDay}
                monthsShown={12}
              />
            </div>
          </div>
        </div>

        <div className="appointment_wrapper">
          <div className="appointment_container">
            <div className="row appointment_container_row">
              <div className="col-lg-8">
                <div className="appointment_list_container">
                  <div className="appointment_list_head">
                    <div className="appointment_list_date">
                      <h4 className="sps">{showdatefor_current}</h4>
                    </div>
                    <div className="appointment_busy_avail_btns" hidden>
                      <button
                        className={`busy_btn appointemntBtn ${
                          isBusySelected
                            ? "appointemntBtntSelected"
                            : "appointemntBtnNotSelected"
                        }`}
                        onClick={handleBusyClick}
                      >
                        Mark as busy slot
                      </button>
                      <button
                        className={`available_btn appointemntBtn ${
                          isBusySelected
                            ? "appointemntBtnNotSelected"
                            : "appointemntBtntSelected"
                        }`}
                        onClick={handleAvailableClick}
                      >
                        Mark as available slot
                      </button>
                    </div>
                  </div>
                  {/* Start */}
                  <div className="appointment_list_head_body">
                    <div className="row appointment_list">
                      {upcomingAppoint.map((appointment, index) => (
                        <div
                          className="appointment_list_item col-xl-3 col-md-4 col-sm-6"
                          key={index}
                          onClick={() => handleAppointmentClick(index)}
                        >
                          <div
                            className={`appointment_list_item_content ${
                              appointment.status_for_complete === "2"
                                ? "appointment_cancelled"
                                : appointment.status_for_complete === "0"
                                ? "appointment_pending"
                                : appointment.status_for_complete === "1"
                                ? "appointment_allign"
                                : "appointment_disabled"
                            }`}
                          >
                            <p>{appointment.customer_name}</p>
                            <div className="time_status_div">
                              <div className="time_slot">
                                <img src={ClockSvg} alt="icon" />
                                <p>
                                  {appointment.booking_start_time}-
                                  {appointment.booking_end_time}
                                </p>
                              </div>
                              <p>
                                {appointment.status_for_complete === "2"
                                  ? "Cancelled"
                                  : appointment.status_for_complete === "0"
                                  ? "Pending"
                                  : appointment.status_for_complete === "1"
                                  ? "Upcomming"
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* End */}
                </div>
              </div>
              <div className="col-lg-4">
                {selectedAppoint && (
                  <div className="appointment_call_wrapper">
                    <div className="appointment_call_head">
                      <h4 className="sps">Appointment</h4>
                    </div>

                    <div className="appointment_call_body">
                      <div className="appointment_call_body_container">
                        <div className="appointment_patient_img">
                          {selectedAppoint.customer_image ? (
                            <img
                              src={
                                selectedAppoint.customer_image ===
                                "user_image.png"
                                  ? make_image_from_letter(
                                      selectedAppoint.customer_name
                                    ) // If condition is true
                                  : upcomingAppointImage +
                                    selectedAppoint.customer_image // If condition is false
                              }
                              onError={(e) => {
                                e.target.src = ProfileImgSample; // Provide the path to your fallback image
                              }}
                              alt="Patient"
                            />
                          ) : null}
                        </div>
                        <h5 className="sps">{selectedAppoint.customer_name}</h5>
                        <div className="appointment_call_time_date">
                          <div className="appointment_call_date">
                            <img src={CalenderSvg} alt="icon" />
                            <p>
                              {make_date_format(
                                selectedAppoint.booking_date,
                                "yyyy-MM-dd"
                              )}
                            </p>
                          </div>
                          <div className="appointment_call_date">
                            <img src={Clock2Svg} alt="icon" />
                            <p>
                              {selectedAppoint.booking_start_time}-
                              {selectedAppoint.booking_end_time}
                            </p>
                          </div>
                        </div>
                        <div className="patient_appointment_call_cancel_btns">
                          <button
                            className="appointment_call_btn"
                            onClick={() => handlecallgo(selectedAppoint._id)}
                          >
                            CALL
                          </button>
                          <button
                            className="appointment_cancel_btn"
                            data-toggle="modal"
                            data-target="#deleteGoalPopup"
                            onClick={() =>
                              handleDeleteIconClick(selectedAppoint._id)
                            }
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Goals Popup by Arsalan @27-07-2023 */}
      <div
        className="modal fade"
        id="deleteGoalPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGoalPopupTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure, you want to Cancel this Appointment?
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closepopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirmed}
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Delete Goals Popup by Arsalan @27-07-2023 */}
    </div>
  );
}

export default DoctorMyCalendar;
