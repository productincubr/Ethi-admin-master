import React, { useState, useEffect } from "react";
import {
  medicalConditions,
  symptoms,
  diseases,
  bloodGroup,
  foodPre,
  cuisines,
  cravings,
  radioOptionTitle,
  triggers,
  hungryTime,
  activityOptionTitle,
  stressLevel,
} from "../../CommonJquery/Commondata.js";
import {
  check_vaild_save,
  combiled_form_data,
  handleIaphabetnumberdotChange,
  handleNumbersChange,
} from "../../CommonJquery/CommonJquery.js";
import {
  assesment_form_patients_save,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
function DoctorpatientsForm(customer_id) {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  const handleReloadClick = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };

  // Set matching_assessment_data directly from customer_id.matching_assessment
  const [matching_assessment_data, setMatchingAssessmentData] = useState(
    customer_id.matching_assessment
  );

  useEffect(() => {
    // Update matching_assessment_data when customer_id.matching_assessment changes
    setMatchingAssessmentData(customer_id.matching_assessment);
    if (
      customer_id.matching_assessment &&
      customer_id.matching_assessment.stress_level_name
    ) {
      setSelectedNumber(
        parseInt(customer_id.matching_assessment.stress_level_name)
      );
    }
  }, [customer_id.matching_assessment]); // Only trigger effect when customer_id.matching_assessment changes

  console.log(matching_assessment_data);
  const handleRadioChange = (event, id, option) => {
    // Check if id already exists in matching_assessment_data
    setMatchingAssessmentData((prevState) => ({
      ...prevState,
      [id]: option, // Update existing option
    }));
  };

  const handleCheckboxChange = (event, id_name, option) => {
    const isChecked = event.target.checked;
    let updatedTriggers;
    try {
      updatedTriggers = [...matching_assessment_data[id_name]]; // Copy the existing array
      if (isChecked) {
        // Add the selected option to the array if checked
        updatedTriggers.push(option);
      } else {
        // Remove the selected option from the array if unchecked
        updatedTriggers = updatedTriggers.filter(
          (trigger) => trigger !== option
        );
      }
    } catch (err) {
      updatedTriggers = option;
    }

    setMatchingAssessmentData((prevState) => ({
      ...prevState,
      [id_name]: updatedTriggers, // Update existing option
    }));
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("doctor_id", customer_id.doctor_id);
      fd_from.append("customer_id", customer_id.customer_id);
      fd_from.append("subscription_id", customer_id.subscription_id);
      fd_from.append("stress_level", selectedNumber);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            const closeButton = document.querySelector(
              "#" + form_data + ' [data-dismiss="modal"]'
            );
            handleReloadClick();
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

  function handleNumbersChange1(event) {
    // Get the input value
    const inputValue = event.target.value;

    // Check if the input is a valid number
    const age = parseInt(inputValue);

    // Check if the age is greater than 125
    if (age > 125) {
      // If greater than 125, set the input value to 125
      event.target.value = "125";
    }
  }

  const handleNumbersChange = (e) => {
    // Get the entered value as a number
    const enteredValue = parseInt(e.target.value, 10);

    // Check if the entered value is greater than 300
    if (enteredValue > 300) {
      // If it is, set the value to 300
      e.target.value = "300";
    }
    // You can add further logic or state updates if needed
  };

  const [isChecked, setChecked] = useState(false);

  const [selectedUnit, setSelectedUnit] = useState("cm");

  // Function to handle unit change
  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <div className="modal-content">
      <div className={showLoader ? "loading" : ""}></div>
      <form id="form_patinents_form">
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
        <div className="modal-body p-5 pb-0">
          <h3 className="modal-title" id="exampleModalLabel">
            <b>Assessment form</b>
          </h3>
          <div className="circleDiv">
            <p>Health Goals</p>
            <div className="circleDot" />
            <p>Lifestyle</p>
            <div className="circleDot" />
            <p>Eating Habits</p>
          </div>
          <div className="my-5">
            <div className="my-5">
              <h4>
                <b>Q1 Signs & symptoms</b>
              </h4>
              <h5>
                Select all signs and symptoms you are facing in day to day Life
              </h5>

              <div className="inputSymptoms row">
                {symptoms.map((item, index) => (
                  <div className="col-md-4 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`signs${index}`}
                      name="signs[]"
                      value={item.value}
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.signs_name &&
                        matching_assessment_data.signs_name.includes(item.value)
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "signs_name", item.value)
                      }
                      className="trio_mendate"
                    />
                    <label htmlFor="signs">{item.name}</label>
                  </div>
                ))}
                <div className="col-xs-6 my-1 d-flex  ">
                  <input
                    type="checkbox"
                    name="signs[]"
                    className="trio_mendate othersAreaInput mt-1"
                    checked={isChecked}
                    onChange={() => setChecked(!isChecked)}
                  />
                  <label htmlFor="signs">Others</label>
                  {isChecked && (
                    <div className="othersArea">
                      <input
                        className="trio_mendate othersAreaaa pb-1"
                        type="text"
                        onInput={handleIaphabetnumberdotChange}
                        name="signs_name_other"
                        defaultValue={
                          matching_assessment_data &&
                          matching_assessment_data.signs_name_other
                            ? matching_assessment_data.signs_name_other
                            : ""
                        }
                        minLength={3}
                        placeholder="Type your Signs and symptoms"
                        maxlength="50"
                      ></input>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="textBox">
              <h4 className="mt-1 mb-3">Q3 Age</h4>
              <div className="textareaBox" style={{ width: "fit-content" }}>
                <div className="d-flex">
                  <div className="heightOption">
                    <label>
                      {" "}
                      <p>Mention your age</p>
                    </label>{" "}
                    <br />
                    <input
                      className="trio_mendate height_input"
                      id="ageNum"
                      name="ageNum"
                      type="text"
                      defaultValue={
                        matching_assessment_data &&
                        matching_assessment_data.age_no_name
                          ? matching_assessment_data.age_no_name
                          : ""
                     }
                      maxLength={3}
                      minLength={2}
                      onInput={handleNumbersChange}
                      onChange={handleNumbersChange1}
                    ></input>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="textBox">
              <h4 className="mt-1 mb-3">
                <b>Q2 Medications</b>
              </h4>
              <div className="textareaBox">
                <p>Mention all medicines taken by you</p>
                <textarea
                  className="trio_mendate"
                  id="medicines"
                  name="medicines"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.medicines_name
                      ? matching_assessment_data.medicines_name
                      : ""
                  }
                  placeholder="Type your answer here"
                  maxLength={200}
                  onInput={handleIaphabetnumberdotChange}
                />
              </div>
            </div>

            <div className="textBox">
              <h4 className="mt-1 mb-3">
                <b>Q3 Supplements</b>
              </h4>
              <div className="textareaBox">
                <p>Mention all supplements taken by you</p>
                <textarea
                  className="trio_mendate"
                  id="supplements"
                  name="supplements"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.supplements_name
                      ? matching_assessment_data.supplements_name
                      : ""
                  }
                  placeholder="Type your answer here"
                  maxLength={200}
                  onInput={handleIaphabetnumberdotChange}
                />
              </div>
            </div>

            <div className="textBox">
              <h4 className="mt-1 mb-3">
                <b>Q4 Food allergy/ intolerance</b>
              </h4>
              <div className="textareaBox">
                <p>Mention all allergy/intolerance you have</p>
                <textarea
                  className="trio_mendate"
                  id="allergy"
                  name="allergy"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.allergy_name
                      ? matching_assessment_data.allergy_name
                      : ""
                  }
                  placeholder="Type your answer here"
                  maxLength={200}
                  onInput={handleIaphabetnumberdotChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <h4>
                <b>Q5 Diseases</b>
              </h4>

              <h5>Select all Medical condition you are facing</h5>

              <div className="inputSymptoms row">
                {medicalConditions.map((item, index) => (
                  <div className="col-md-4 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`medCondition${index}`}
                      name="medCondition[]"
                      value={item.value}
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.med_condition_name &&
                        matching_assessment_data.med_condition_name.includes(
                          item.value
                        )
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(
                          event,
                          "med_condition_name",
                          item.value
                        )
                      }
                      className="trio_mendate"
                    />
                    <label htmlFor="item1">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bloodGroup">
              <h4 className="mt-1 mb-3">
                <b>Q6 Blood Group</b>
              </h4>

              <h5>Select Your Blood Group</h5>

              <div className="inputSymptoms row">
                {bloodGroup.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-3 d-flex foodFrequencyList"
                  >
                    <div className="">
                      <input
                        type="radio"
                        id={`bloodGroup${index}`}
                        name="bloodGroup"
                        checked={
                          matching_assessment_data &&
                          matching_assessment_data.bloodgroup_name &&
                          matching_assessment_data.bloodgroup_name.includes(
                            item.value
                          )
                            ? true
                            : false
                        }
                        onChange={(event) =>
                          handleRadioChange(
                            event,
                            "bloodgroup_name",
                            item.value
                          )
                        }
                        className="trio_mendate "
                        value={item.value}
                      />
                    </div>
                    <div>
                      <label>{item.name}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="heightBox">
              <h4 className="mt-1 mb-3">
                <b>Q7 Height & Weight</b>
              </h4>

              <h5>Enter Your Height and Weight here</h5>

              <div className="d-flex">
                <div className="d-flex">
                  <div className="heightOption">
                    <label>
                      Height{"  "}
                      <select
                        id="unitDropdown"
                        value={selectedUnit}
                        onChange={handleUnitChange}
                      >
                        <option value="cm">Centimeter</option>
                        <option value="ft">Feet </option>
                      </select>
                    </label>{" "}
                    <br />
                    <input
                      className="trio_mendate height_input"
                      type="text"
                      id="hignt_number"
                      name="hignt_number"
                      defaultValue={
                        matching_assessment_data &&
                        matching_assessment_data.height_name
                          ? matching_assessment_data.height_name
                          : ""
                      }
                      minLength={2}
                      maxLength={3}
                      onInput={handleNumbersChange}
                    ></input>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="heightOption">
                    <label>Weight (in kg)</label> <br />
                    <input
                      className="trio_mendate height_input"
                      type="text"
                      id="weight_number"
                      name="weight_number"
                      defaultValue={
                        matching_assessment_data &&
                        matching_assessment_data.weight_number
                          ? matching_assessment_data.weight_number
                          : ""
                      }
                      minLength={2}
                      maxLength={3}
                      onInput={handleNumbersChange}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="foodPre">
              <h4 className="mt-1 mb-3">
                <b>Q8 Food Preference</b>
              </h4>

              <h5>Select your food preference</h5>

              <div className="inputSymptoms row ">
                {foodPre.map((item, index) => (
                  <div
                    key={index}
                    className="col-md-3 d-flex foodFrequencyList"
                  >
                    <div>
                      <input
                        type="radio"
                        id={`foodPre${index}`}
                        name="foodPre"
                        checked={
                          matching_assessment_data &&
                          matching_assessment_data.foodpre_name &&
                          matching_assessment_data.foodpre_name.includes(
                            item.value
                          )
                            ? true
                            : false
                        }
                        onChange={(event) =>
                          handleRadioChange(event, "foodpre_name", item.value)
                        }
                        className="trio_mendate"
                        value={item.value}
                      />
                    </div>
                    {console.log("fds", foodPre)}
                    <div>
                      {" "}
                      <label>{item.name}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cuisines mt-5">
              <h4 className="mt-1 mb-3">
                <b>Q9 Cuisines You Enjoy</b>
              </h4>

              <h5>Select all cuisines you enjoy</h5>

              <div className="inputSymptoms row">
                {cuisines.map((item, index) => (
                  <div className="col-md-6 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`cuisines${index}`}
                      name="cuisines[]"
                      value={item.value}
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.cuisines_name &&
                        matching_assessment_data.cuisines_name.includes(
                          item.value
                        )
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "cuisines_name", item.value)
                      }
                      className="trio_mendate"
                    />
                    <label htmlFor="cuisines">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="cravings">
              <h4 className="mt-1 mb-3">
                <b>Q10 Food Cravings</b>
              </h4>

              <h5>What kind of food you crave for</h5>

              <div className="inputSymptoms row">
                {cravings.map((item, index) => (
                  <div className="col-md-6 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`cravings${index}`}
                      name="cravings[]"
                      value={item.value}
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.cravings_name &&
                        matching_assessment_data.cravings_name.includes(
                          item.value
                        )
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "cravings_name", item.value)
                      }
                      className="trio_mendate"
                    />
                    <label htmlFor="cravings">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="foodFrequency">
              <h4 className="mt-1 mb-3">
                <b>Q11 Food Frequency</b>
              </h4>
              <h5>How many times do you consume these items ?</h5>
              {radioOptionTitle.map((item, index) => (
                <div key={index} className="foodFrequencyList">
                  <h6 className="my-3">{item.title}</h6>
                  <div className="row">
                    {[
                      "Daily",
                      "2-3 Times a week",
                      "2-3 Times a month",
                      "Never",
                    ].map((option, optionIndex) => (
                      <div key={optionIndex} className="col-md-3">
                        <input
                          type="radio"
                          id={`foodTimes${index}`}
                          checked={
                            matching_assessment_data &&
                            matching_assessment_data[item.id_Call] &&
                            matching_assessment_data[item.id_Call].includes(
                              option
                            )
                              ? true
                              : false
                          }
                          onChange={(event) =>
                            handleRadioChange(event, item.id_Call, option)
                          }
                          name={`foodTimes${index}`}
                          value={option}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="triggers">
              <h4 className="mt-1 mb-3">
                <b>Q12 What triggers you to eat ?</b>
              </h4>

              <h5>Select all triggers you to eat</h5>

              <div className="inputSymptoms row">
                {triggers.map((item, index) => (
                  <div className="col-md-6 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`triggers${index}`}
                      name="triggers[]"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.triggers_name &&
                        matching_assessment_data.triggers_name.includes(
                          item.value
                        )
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "triggers_name", item.value)
                      }
                      value={item.value}
                      className="trio_mendate"
                    />
                    <label htmlFor="triggers">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="textBox">
              <h4 className="mt-1 mb-3">
                <b>Q13 Eating habits you are proud of</b>
              </h4>
              <div className="textareaBox">
                <p>Mention Those eating habits that make you feel good</p>
                <textarea
                  id="eatHabits"
                  name="eatHabits"
                  className="trio_mendate"
                  placeholder="Type your answer here"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.eathabits_name
                      ? matching_assessment_data.eathabits_name
                      : ""
                  }
                  maxLength={200}
                  onInput={handleIaphabetnumberdotChange}
                />
              </div>
            </div>

            <div className="textBox">
              <h4 className="mt-1 mb-3">
                <b>Q14 Sleep Time</b>
              </h4>
              <div className="timeBox">
                <div className="d-flex">
                  <div className="timeOptions">
                    <label>Sleep Time</label> <br />
                    <input
                      className="trio_mendate"
                      id="sleepTime"
                      name="sleepTime"
                      defaultValue={
                        matching_assessment_data &&
                        matching_assessment_data.sleeptime_name
                          ? matching_assessment_data.sleeptime_name
                          : ""
                      }
                      type="time"
                    />
                  </div>

                  <div className="timeOptions">
                    <label>Wake up Time</label> <br />
                    <input
                      className="trio_mendate"
                      id="wakeTime"
                      name="wakeTime"
                      defaultValue={
                        matching_assessment_data &&
                        matching_assessment_data.waketime_name
                          ? matching_assessment_data.waketime_name
                          : ""
                      }
                      type="time"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="triggers">
              <h4 className="mt-1 mb-3">
                <b>Q15 Most Hungry</b>
              </h4>

              <h5>When you are most hungry ?</h5>

              <div className="inputSymptoms row">
                {hungryTime.map((item, index) => (
                  <div className="col-md-6 col-xs-6 my-1" key={index}>
                    <input
                      type="checkbox"
                      id={`hungry${index}`}
                      name="hungry[]"
                      value={item.value}
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.hungry_name &&
                        matching_assessment_data.hungry_name.includes(
                          item.value
                        )
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleCheckboxChange(event, "hungry_name", item.value)
                      }
                      className="trio_mendate"
                    />
                    <label htmlFor="hungry">{item.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="stressLevel">
              <h4 className="mt-1 mb-3">
                <b>Q16 Stress Level</b>
              </h4>

              <h5>Rate your stress level</h5>

              <div className="stressLevelBox">
                <p className="rangeStress">Low</p>
                <div className="d-flex">
                  {stressLevel.map((item, index) => (
                    <p
                      className={`numberBox ${
                        selectedNumber >= index + 1 ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handleNumberClick(index + 1)}
                    >
                      {item.input}
                    </p>
                  ))}
                </div>
                <p className="rangeStress">High</p>
              </div>
            </div>

            <div className="foodFrequency">
              <h4 className="mt-1 mb-3">
                <b>Q17 Water Consumption</b>
              </h4>
              <h5>How much water do you consume on a day ?</h5>
              <div className="foodFrequencyList">
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="waterOp"
                      name="waterOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.water_name === "1L"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.water_name,
                          "1L"
                        )
                      }
                      value="1L"
                    />
                    <label>{"> "}1 lts</label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="waterOp"
                      name="waterOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.water_name === "1-2L"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.water_name,
                          "1-2L"
                        )
                      }
                      value="1-2L"
                    />
                    <label>1-2 lts</label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="waterOp"
                      name="waterOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.water_name === "2-3L"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.water_name,
                          "2-3L"
                        )
                      }
                      value="2-3L"
                    />
                    <label>2-3 lts </label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="waterOp"
                      name="waterOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.water_name === "3-4L"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.water_name,
                          "3-4L"
                        )
                      }
                      value="3-4L"
                    />
                    <label>3-4 lts</label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="waterOp"
                      name="waterOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.water_name === "4L"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.water_name,
                          "4L"
                        )
                      }
                      value="4L"
                    />
                    <label>{">"} 4 lts</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="foodFrequency">
              <h4 className="mt-1 mb-3">
                <b>Q18 Smoking</b>
              </h4>
              <h5>Do you smoke ?</h5>
              <div className="foodFrequencyList">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="smokeOpNo"
                      name="smokeOp"
                      value="No"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.smoke_name === "No"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.smoke_name,
                          "No"
                        )
                      }
                    />
                    <label htmlFor="smokeOpNo">No</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="smokeOpYes"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.smoke_name === "Yes"
                          ? true
                          : false
                      }
                      name="smokeOp"
                      value="Yes"
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          matching_assessment_data.smoke_name,
                          "Yes"
                        )
                      }
                    />
                    <label htmlFor="smokeOpYes">Yes</label>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="textBox">
              <h4 className="mt-1 mb-3">Q20 Menstrual cycle</h4>
              <div className="textareaBox">
                <p>Periods (Regular/How long/Painful)</p>
                <textarea
                  className="trio_mendate"
                  id="menstrual"
                  name="menstrual"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.menstrual_name
                      ? matching_assessment_data.menstrual_name
                      : ""
                  }
                  placeholder="Type your answer here"
                  maxLength={200}
                  onInput={handleIaphabetnumberdotChange}
                />
              </div>
            </div> */}

            <div className="foodFrequency">
              <h4 className="mt-1 mb-3">
                <b>Q19 Activity</b>
              </h4>
              <h5>How much of the following activity you perform ?</h5>
              {activityOptionTitle.map((item, index) => (
                <div key={index} className="foodFrequencyList">
                  <h6 className="my-3">{item.title}</h6>
                  <div className="row">
                    {[
                      "Daily",
                      "3-4 times a week",
                      "  4-5 times a month     ",
                      "Never",
                    ].map((option, optionIndex) => (
                      <div key={optionIndex} className="col-md-3">
                        <input
                          className="trio_mendate"
                          id={`activity${index}`}
                          type="radio"
                          checked={
                            matching_assessment_data &&
                            matching_assessment_data[item.id_Call] &&
                            matching_assessment_data[item.id_Call].includes(
                              option
                            )
                              ? true
                              : false
                          }
                          onChange={(event) =>
                            handleRadioChange(event, item.id_Call, option)
                          }
                          name={`activity${index}`}
                          value={option}
                        />
                        <label>{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="textBox">
              <h4 className="mt-1 mb-3">Other</h4>
              <div className="textareaBox">
                <p>Any other activity of you perform</p>
                <textarea
                  id="otherSup"
                  name="otherSup"
                  defaultValue={
                    matching_assessment_data &&
                    matching_assessment_data.other_details_name
                      ? matching_assessment_data.other_details_name
                      : ""
                  }
                  placeholder="Type your answer here"
                />
              </div>
            </div>

            <div className="foodFrequency">
              <h4 className="mt-1 mb-3">
                <b>Q20 Motivation Needed</b>
              </h4>

              <h6>Motivation needed to start your fitness journey</h6>

              <div className="foodFrequencyList">
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="otherOpDaily"
                      name="otherOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.other_option_name === "Daily"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(event, "other_option_name", "Daily")
                      }
                      value="Daily"
                    />
                    <label>Daily</label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="otherOp"
                      name="otherOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.other_option_name ===
                          "1 Time a week"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          "other_option_name",
                          "1 Time a week"
                        )
                      }
                      value="1 Time a week"
                    />
                    <label>Once a week</label>
                  </div>
                  <div className="col-md-3">
                    <input
                      type="radio"
                      className="trio_mendate"
                      id="otherOp"
                      name="otherOp"
                      checked={
                        matching_assessment_data &&
                        matching_assessment_data.other_option_name ===
                          "2-3 Times a week"
                          ? true
                          : false
                      }
                      onChange={(event) =>
                        handleRadioChange(
                          event,
                          "other_option_name",
                          "2-3 Times a week"
                        )
                      }
                      value="2-3 Times a week"
                    />
                    <label>2-3 Times a week</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Ends Here */}
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
                "form_patinents_form",
                assesment_form_patients_save
              )
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default DoctorpatientsForm;
