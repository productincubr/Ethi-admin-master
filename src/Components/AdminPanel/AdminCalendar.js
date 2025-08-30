import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/AdminMyCalendar2.css";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import LeftBtn from "../../Assests/images/left_btn.svg";
import RightBtn from "../../Assests/images/right_btn.svg";
import ClockSvg from "../../Assests/images/clock_svg.svg";
import DatePicker from "react-horizontal-datepicker";
import CalenderSvg from "../../Assests/images/calender.svg";
import Clock2Svg from "../../Assests/images/clock_2.svg";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import AdminHeader from "./AdminHeader";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import {
  APL_LINK,
  get_appointment_by_doctor,
  create_appointments_by_admin,
  cancel_appointment_by_doctor,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
import { monthNames, months } from "../../CommonJquery/Commondata.js";
import {
  check_vaild_save,
  combiled_form_data,
  make_date_format,
  empty_form,
  handleAphabetsChange,
  handleNumbersChange,
  make_image_from_letter,
} from "../../CommonJquery/CommonJquery.js";
function AdminCalendar() {
  // Back button
  const navigate = useNavigate();
  const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showdatefor_current, setShowdateforCurrent] = useState("");
  const [monthName, setmonthName] = useState("");
  const [currentMonth, setcurrentMonth] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [selecteddate, setselecteddate] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  /*shubham jain codeing */

  const master_data_get = async (retrievedDoctorId, date_for_data) => {
    setShowLoader(true);

    setShowdateforCurrent(make_date_format(date_for_data, "yyyy-MM-dd"));
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("present_date", date_for_data);
    await server_post_data(get_appointment_by_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message.data_appointment);
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

  const handleDeleteIconClick = (goalId) => {
    setSelectedGoalId(goalId);
  };

  const handlecallgo = (customer_id) => {
    //click on chart
    navigate("/admin_video_call/" + customer_id);
  };

  const closepopup = () => {
    if (selectedGoalId !== null) {
      setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
    }
  };
  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async () => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("appointment_id", selectedGoalId);
    fd.append("doctor_id", retriveDoctorId);
    await server_post_data(cancel_appointment_by_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setShowLoader(false);
          master_data_get(retriveDoctorId, selecteddate);
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    const currentDate2 = new Date();
    const retrievedDoctorId = "0";
    setRetriveDoctorId(retrievedDoctorId);
    setcurrentMonth(currentDate2.getMonth());
    setmonthName(currentDate2.getMonth());
    const year = currentDate2.getFullYear();
    const month = String(currentDate2.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(currentDate2.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setselecteddate(formattedDate);
    master_data_get(retrievedDoctorId, formattedDate);
  }, []);

  /*shubham jain codeing */

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            master_data_get();
            empty_form(form_data);
          }
        })
        .catch((error) => {
          setShowLoader(false);
          console.log(error);
        });
    }
    setIsClicked(true);
  };

  const onSelectedDay = (selectedDate) => {
    setcurrentMonth(selectedDate.getMonth());
    setmonthName(selectedDate.getMonth());
    setShowdateforCurrent(selectedDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    master_data_get(retriveDoctorId, formattedDate);
  };

  const [isBusySelected, setIsBusySelected] = useState(false);

  const handleBusyClick = () => {
    setIsBusySelected(true);
  };

  const handleAvailableClick = () => {
    setIsBusySelected(false);
  };

  const [createAppoint, setCreateAppoint] = useState(false);
  const [selectedAppoint, setSelectedAppoint] = useState([]);
  const [showSelectedAppoint, setShowSelectedAppoint] = useState(false);

  const handleAppointmentClick = (index) => {
    setCreateAppoint(false);
    //setShowSelectedAppoint(true);
    setSelectedAppoint(upcomingAppoint[index]);
  };

  const handleAppointClick = () => {
    setIsClicked(true);
    setCreateAppoint(true);
    setShowSelectedAppoint(false);
  };

  return (
    <div className="container-lg my_calendar">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <br />
      <div className="my_calendar_wrapper">
        <div className="my_calendar_container">
          <div className="page_head_container">
            <div className="heading_btn_div d-flex align-items-center">
              {/* <div className="back_button">
                <div className="back_btn" onClick={() => navigate(-1)}>
                  <img src={ArrowLeft} alt="icon" />
                </div>
              </div> */}
              <div className="page_heading">
                <h3 className="fntNanitu">My Calendar</h3>
              </div>
            </div>
            <div className="month_name">
              <div className="left_btn">
                {/* <img src={LeftBtn} alt="button" /> */}
              </div>
              <h5>{monthNames[monthName]}</h5>
              <div className="right_btn">
                {/* <img src={RightBtn} alt="button" /> */}
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
                      <p className="fntNanitu">{month}</p>
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
                      <h4 className="fntNanitu">{showdatefor_current}</h4>
                    </div>
                    <div className="appointment_busy_avail_btns">
                      <button
                        className={`busy_btn appointemntBtn ${
                          isBusySelected
                            ? "appointemntBtntSelected"
                            : "appointemntBtnNotSelected"
                        }`}
                        onClick={handleBusyClick}
                        style={{ opacity: "0" }}
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
                        style={{ opacity: "0" }}
                      >
                        Mark as available slot
                      </button>
                      {/* <button
                        className={`create_appointment_btn_super fntNanitu ${
                          isClicked ? "d-none" : ""
                        }`}
                        onClick={handleAppointClick}
                      >
                        Create Appointment
                      </button> */}
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
                            } h-100`}
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
                            <p className="margin_top_10px">
                              Dr. {appointment.doctor_name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* End */}
                </div>
              </div>
              <div className="col-lg-4">
                {createAppoint && (
                  <div className="appointment_call_wrapper ">
                    <div className="appointment_call_head">
                      <h4>Book Appointment</h4>
                    </div>
                    <div className="appointment_call_body ">
                      <div className="appointment_call_body_container ">
                        <form id="updateDoctorProfile" className="mt-2">
                          <div className="appointment_call_time_date">
                            <div className="appointment_call_date">
                              <input
                                type="date"
                                id="selected_date"
                                name="selected_date"
                                className="trio_mendate"
                                defaultValue={
                                  new Date().toISOString().split("T")[0]
                                }
                                min={new Date().toISOString().split("T")[0]}
                                max={
                                  new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() + 1
                                    )
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                }
                              />
                            </div>
                            <div className="appointment_call_date">
                              <input
                                type="time"
                                id="selected_time"
                                name="selected_time"
                                className="trio_mendate"
                              />
                            </div>
                          </div>
                          <div className="create_appointment_input_div">
                            <div className="create_appointment_input">
                              <label>New Patient</label>
                              <input
                                type="text"
                                id="user_customer_mobile_name"
                                name="user_customer_mobile_name"
                                maxLength={70}
                                onInput={handleAphabetsChange}
                                className="trio_mendate"
                              />
                            </div>
                            <div className="create_appointment_input">
                              <label>Phone No.</label>
                              <input
                                type="text"
                                maxLength={10}
                                onInput={handleNumbersChange}
                                className="trio_mendate"
                                id="user_customer_mobile_no"
                                name="user_customer_mobile_no"
                              />
                            </div>
                          </div>
                          <div className="patient_appointment_call_cancel_btns">
                            <button
                              className="appointment_call_btn"
                              type="button"
                              onClick={() =>
                                handleSaveChangesdynamic(
                                  "updateDoctorProfile",
                                  create_appointments_by_admin
                                )
                              }
                            >
                              CREATE
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
                {showSelectedAppoint && (
                  <div className="appointment_call_wrapper">
                    <div className="appointment_call_head">
                      <h4>Appointment</h4>
                    </div>

                    <div className="appointment_call_body">
                      <div className="appointment_call_body_container">
                        <div className="appointment_patient_img">
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
                        </div>
                        <h5>{selectedAppoint.customer_name}</h5>
                        <div className="appointment_call_time_date ">
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

export default AdminCalendar;
