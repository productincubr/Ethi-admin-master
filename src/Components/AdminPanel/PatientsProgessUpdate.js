import React, { useEffect, useState } from "react";
import "../../Css/PatientsProgessUpdate.css";
import EditSvg from "../../Assests/images/edit_svg.svg";
import ViewSvg from "../../Assests/images/view_svg.svg";
import WeightSvg from "../../Assests/images/weight_svg.svg";
import WaterSvg from "../../Assests/images/water_svg.svg";
import SleepHrs from "../../Assests/images/sleep_hrs.svg";
import BloodSvg from "../../Assests/images/blood_svg.svg";
import heartRate from "../../Assests/images/heart_svg.svg";
import stepsCount from "../../Assests/images/steps_svg.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import {
  check_vaild_save,
  combiled_form_data,
  handleNumbersChange,
} from "../../CommonJquery/CommonJquery.js";
import {
  update_water_sleep,
  update_period,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
import { useLocation } from "react-router-dom";

function PatientsProgessUpdate(props) {
  console.log(props);
  const { pathname } = useLocation();
  const stringToHideDiv = "/Admin_my_patients_show_diet_plan/";
  const [showLoader, setShowLoader] = useState(false);
  const {
    weightNumber,
    SleepNumber,
    GlassNumber,
    GenderNumber,
    StepcountNumber,
    HeartbeatNumber,
    customer_id,
    doctor_id,
    subscription_id,
    patients_name,
    start_date,
    over_start_date,
  } = props;

  useEffect(() => {
    async function fetchDaysRemaining() {
      const result = await show_period_days(start_date, over_start_date);
      setDaysRemaining(result);
    }

    fetchDaysRemaining();
  }, []);

  const [daysRemaining, setDaysRemaining] = useState(0);
  // Period Trakcer
  const [value, onChange] = useState(new Date());
  const [cycle, cycleValue] = useState("28");

  const date = value;
  const cycleLength = parseInt(cycle);

  const nextPeriodElement = document.getElementById("next_period");
  const approximatePeriodElement =
    document.getElementById("approximate_period");
  const selectElement = document.getElementById("period_cycle");
  const calendarElement = document.getElementById("period_date");
  let nextPeriodDate = null;
  let approximateOvulationDate = null;
  if (nextPeriodElement) {
    nextPeriodDate = nextPeriodElement.textContent;
  }
  if (approximatePeriodElement) {
    approximateOvulationDate = approximatePeriodElement.textContent;
  }
  if (selectElement) {
    //selectValue = selectElement.textContent;
  }

  const moment = require("moment");
  nextPeriodDate = moment(nextPeriodDate, "Do MMMM YYYY");
  approximateOvulationDate = moment(approximateOvulationDate, "Do MMMM YYYY");

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("doctor_id", doctor_id);
      fd_from.append("customer_id", customer_id);
      fd_from.append("subscription_id", subscription_id);
      fd_from.append("period_start_date", nextPeriodDate);
      fd_from.append("period_end_date", approximateOvulationDate);
      await server_post_data(url_for_save, fd_from)
        .then(async (Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            await show_period_days(nextPeriodDate, approximateOvulationDate);
            const closeButton = document.querySelector(
              "#" + form_data + ' [data-dismiss="modal"]'
            );
            //handleReloadClick();
            if (closeButton) {
              closeButton.click();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const show_period_days = async (period_start_date, period_end_date) => {
    let daysRemaining_sss = 0;
    const currentDate = moment();
    const nextPeriodDate = moment(period_start_date);
    const timeDifference = nextPeriodDate - currentDate;
    const daysRemaining_con = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    if (daysRemaining_con < 0) {
      const nextPeriodDate1 = moment(period_end_date);
      const timeDifference1 = nextPeriodDate1 - currentDate;
      const daysRemaining_con1 = Math.ceil(
        timeDifference1 / (1000 * 60 * 60 * 24)
      );
      daysRemaining_sss = daysRemaining_con1;
    } else {
      daysRemaining_sss = daysRemaining_con;
    }
    return daysRemaining_sss;
  };

  return (
    <div className="patients_progress">
      <div className={showLoader ? "loading" : ""}></div>
      <div className="patients_progress_wrapper">
        <div className="patients_progress_head">
          <h3>Patient progress update</h3>
        </div>
        <div className="progres_cards_container row gap-2 flex-nowrap scroll-container">
          <div
            className={` card col-md-4 ${
              pathname.includes(stringToHideDiv) ? "cardWidht" : " "
            }`}
          >
            <img src={heartRate} alt="Card" style={{ width: "2rem" }} />
            <div className="card-body">
              <p className="card-text">Heart Rate</p>
              <h5 className="card-title mt-4">{HeartbeatNumber} Bps</h5>
            </div>
            {/* <div className="view_edit_div">
              <div
                className="view_btn"
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={ViewSvg} alt="icon" />
                <p>View</p>
              </div>
              <div
                className={` edit_btn ${
                  pathname.includes(stringToHideDiv)
                    ? "hiddenProgressEdit"
                    : " "
                }`}
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={EditSvg} alt="icon" />
                <p>Edit</p>
              </div>
            </div> */}
          </div>
          <div
            className={` card col-md-4 ${
              pathname.includes(stringToHideDiv) ? "cardWidht" : " "
            }`}
          >
            <img src={stepsCount} alt="Card" style={{ width: "2rem" }} />
            <div className="card-body">
              <p className="card-text">Steps Count</p>
              <h5 className="card-title mt-4">{StepcountNumber} Steps</h5>
            </div>
            {/* <div className="view_edit_div">
              <div
                className="view_btn"
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={ViewSvg} alt="icon" />
                <p>View</p>
              </div>
              <div
                className={` edit_btn ${
                  pathname.includes(stringToHideDiv)
                    ? "hiddenProgressEdit"
                    : " "
                }`}
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={EditSvg} alt="icon" />
                <p>Edit</p>
              </div>
            </div> */}
          </div>
          <div
            className={` card col-md-4 ${
              pathname.includes(stringToHideDiv) ? "cardWidht" : " "
            }`}
          >
            <img src={WeightSvg} alt="Card" style={{ width: "2rem" }} />
            <div className="card-body">
              <p className="card-text">Weight</p>
              <h5 className="card-title mt-4">{weightNumber} kg</h5>
            </div>
            {/* <div className="view_edit_div">
              <div
                className="view_btn"
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={ViewSvg} alt="icon" />
                <p>View</p>
              </div>
              <div
                className={` edit_btn ${
                  pathname.includes(stringToHideDiv)
                    ? "hiddenProgressEdit"
                    : " "
                }`}
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={EditSvg} alt="icon" />
                <p>Edit</p>
              </div>
            </div> */}
          </div>
          <div
            className={` card col-md-4 ${
              pathname.includes(stringToHideDiv) ? "cardWidht" : " "
            }`}
          >
            <img src={WaterSvg} alt="Card" style={{ width: "2rem" }} />
            <div className="card-body">
              <p className="card-text">Water Intake</p>
              <h5 className="card-title mt-4">{GlassNumber} Glasses</h5>
            </div>
            {/* <div className="view_edit_div">
              <div
                className="view_btn"
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={ViewSvg} alt="icon" />
                <p>View</p>
              </div>
              <div
                className={` edit_btn ${
                  pathname.includes(stringToHideDiv)
                    ? "hiddenProgressEdit"
                    : " "
                }`}
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={EditSvg} alt="icon" />
                <p>Edit</p>
              </div>
            </div> */}
          </div>

          <div
            className={` card col-md-4 ${
              pathname.includes(stringToHideDiv) ? "cardWidht" : " "
            }`}
          >
            <img src={SleepHrs} alt="Card" style={{ width: "2rem" }} />
            <div className="card-body">
              <p className="card-text">Sleep Hours</p>
              <h5 className="card-title mt-4">{SleepNumber} Hours</h5>
            </div>
            {/* <div className="view_edit_div">
              <div className="view_btn">
                <img src={ViewSvg} alt="icon" />
                <p>View</p>
              </div>
              <div
                className={` edit_btn ${
                  pathname.includes(stringToHideDiv)
                    ? "hiddenProgressEdit"
                    : " "
                }`}
                data-toggle="modal"
                data-target="#progressModalLong"
              >
                <img src={EditSvg} alt="icon" />
                <p>Edit</p>
              </div>
            </div> */}
          </div>

          {GenderNumber === "Female" && (
            <div className="card col-sm-3">
              <img src={BloodSvg} alt="Card" style={{ width: "2rem" }} />
              <div className="card-body">
                <p className="card-text">Period</p>
                <h5 className="card-title">{daysRemaining} Days</h5>
              </div>
              <div className="view_edit_div">
                <div
                  className="view_btn"
                  data-toggle="modal"
                  data-target="#progressModalPeriod"
                >
                  <img src={ViewSvg} alt="icon" />
                  <p>View</p>
                </div>
                <div
                  className="edit_btn"
                  data-toggle="modal"
                  data-target="#progressModalPeriod"
                >
                  <img src={EditSvg} alt="icon" />
                  <p>Edit</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Progress Modal */}
      <div className="progress_modal_edits">
        <div
          className="modal fade"
          id="progressModalLong"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="progressModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <form id="sleepWaterForm">
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
                <div className="col-11 m-auto">
                  <h4 className="modal-title" id="progressModalLabel">
                    Edit Health Parameters
                  </h4>
                  <p>Ishika Mehta’ Progress Update</p>
                </div>
                <div className="modal-body patients_progress_wrapper p-2 pb-5">
                  <div className="progres_cards_container row  accordion ">
                    <div className="card col-sm-3 m-auto healthCard">
                      <img
                        src={heartRate}
                        alt="Card cap"
                        style={{ width: "2rem" }}
                      />
                      <div className="card-body">
                        <p className="card-text">Heart Rate</p>
                        <h5 className="card-title">7 Bps</h5>
                      </div>
                    </div>
                    <div className="card col-sm-3 m-auto healthCard">
                      <img
                        src={stepsCount}
                        alt="Card cap"
                        style={{ width: "2rem" }}
                      />
                      <div className="card-body">
                        <p className="card-text">Steps Count</p>
                        <h5 className="card-title">{11213} Steps</h5>
                      </div>
                    </div>
                    <div className="card col-sm-3 m-auto healthCard">
                      <img
                        src={SleepHrs}
                        alt="Card cap"
                        style={{ width: "2rem" }}
                      />
                      <div className="card-body">
                        <p className="card-text">Sleep Hours</p>
                        <h5 className="card-title">
                          <input
                            type="text"
                            defaultValue={SleepNumber || ""}
                            className={` trio_no  ${
                              pathname.includes(stringToHideDiv)
                                ? "disableInputs"
                                : " "
                            }`}
                            id="sleep_no"
                            name="sleep_no"
                            maxLength={2}
                            onInput={handleNumbersChange}
                          />{" "}
                          Hrs
                        </h5>
                      </div>
                    </div>

                    <div className="card col-sm-3 m-auto healthCard">
                      <img
                        src={WeightSvg}
                        alt="Card cap"
                        style={{ width: "2rem" }}
                      />
                      <div className="card-body">
                        <p className="card-text">Weight</p>
                        <h5 className="card-title">
                          <input
                            type="text"
                            defaultValue={weightNumber || ""}
                            className={` trio_no ${
                              pathname.includes(stringToHideDiv)
                                ? "disableInputs"
                                : " "
                            }`}
                            id="weight_kg"
                            name="weight_kg"
                            maxLength={3}
                            onInput={handleNumbersChange}
                          />{" "}
                          kg
                        </h5>
                      </div>
                    </div>

                    <div className="card col-sm-3 m-auto healthCard">
                      <img
                        src={WaterSvg}
                        alt="Card cap"
                        style={{ width: "2rem" }}
                      />
                      <div className="card-body">
                        <p className="card-text">Water Intake</p>
                        <h5 className="card-title">
                          <input
                            type="text"
                            defaultValue={GlassNumber || ""}
                            maxLength={2}
                            className={` trio_no ${
                              pathname.includes(stringToHideDiv)
                                ? "disableInputs"
                                : " "
                            }`}
                            id="glass_no"
                            name="glass_no"
                            onInput={handleNumbersChange}
                          />{" "}
                          Glasses
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={` modal-footer modal_foot_form ${
                    pathname.includes(stringToHideDiv)
                      ? "hiddenProgressEdit"
                      : " "
                  }`}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleSaveChangesdynamic(
                        "sleepWaterForm",
                        update_water_sleep
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          className="modal fade"
          id="progressModalPeriod"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="progressModalLongTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <form id="sleepWaterForm_per">
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
                <div className="col-11 m-auto">
                  <h4 className="modal-title" id="progressModalLabel">
                    Edit Health Parameters
                  </h4>
                  <p>{patients_name}’s Progress Update</p>
                </div>
                <div className="modal-body patients_progress_wrapper p-2 pb-2">
                  <div className="text-center">
                    <nav className="navbar navbar-light bg-light">
                      <div className="container-fluid text-center tracker_container">
                        <img
                          src={BloodSvg}
                          alt=""
                          width="30"
                          height="30"
                          className="d-inline-block"
                        />
                        <h5>Calculate Next Period, Ovulation Day </h5>
                      </div>
                    </nav>
                    <label htmlFor="cycle" className="cycle">
                      Select your Cycle Length :{" "}
                    </label>
                    <select
                      onChange={(e) => cycleValue(e.target.value)}
                      defaultValue={cycle}
                      className="m-2 cycle_dropdown"
                      id="period_cycle"
                      name="period_cycle"
                    >
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                    </select>
                  </div>

                  <p className="text-center cycle">
                    Select Your Last Period Start Date from the Calendar
                  </p>

                  <div className="d-flex justify-content-center ">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      id="period_date"
                      name="period_date"
                      className="calendar col-lg-5 col-md-9 col-11 mt-0"
                    />
                  </div>

                  <div className="text-center p-2">
                    <div className="row">
                      <div className="d-flex justify-content-center">
                        <div className="col-lg-5 col-md-5 col-sm-5 m-3 box period_date">
                          <p>Next Period Date</p>
                          <Moment
                            format="Do MMMM YYYY"
                            add={{ days: cycleLength - 1 }}
                            id="next_period"
                          >
                            {date}
                          </Moment>
                        </div>
                        <div className="col-lg-5 col-md-5 col-sm-5 m-3 box period_date">
                          <p> Approximate Ovulation Day</p>
                          <Moment
                            format="Do MMMM YYYY"
                            add={{ days: cycleLength - 1 - 14 }}
                            id="approximate_period"
                          >
                            {date}
                          </Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer modal_foot_form">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleSaveChangesdynamic(
                        "sleepWaterForm_per",
                        update_period
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsProgessUpdate;
