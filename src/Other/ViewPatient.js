import React, { useState } from "react";
import Header from "./Header";
import "../Css/MyPatients.css";

import Avatar1 from "../Assests/images/avatar1.png";
import Avatar2 from "../Assests/images/avatar2.png";
import Avatar3 from "../Assests/images/avatar3.png";
// import VideoCall from "../Assests/images/video_call_svg.svg";

export default function ViewPatient() {
  const myPatients = [
    {
      image: Avatar1,
      name: "Elena Osborne",
      userIdP: "abcd1234",
      email: "info@ethi.com",
      mobile: "9876543210",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar3,
      name: "Jessy K",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar3,
      name: "Jessy K",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
    {
      image: Avatar3,
      name: "Jessy K",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      email: "info@ethi.com",
      dateOfBirth: "01/01/2023",
      gender: "Male",
      address: "Meera Complex",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      height: "5.5",
      weight: "68",
      bloodGroup: "B+",
      healthConcerns: "Weight loss, Thyroid, Weight Loss",
      packagePlan: "Basic Plan",
      packageDate: "01/01/2023 - 12/12/2023",
    },
  ];

  const [selectedPatient, setSelectedPatient] = useState({
    ...myPatients[0],
    keyIndex: 0,
  });

  // Function to handle the patient click
  const handlePatientClick = (patient, index) => {
    setSelectedPatient({ ...patient, keyIndex: index });
  };

  const medicalConditions = [
    {
      name: "Diabetes Mellitus",
      value: "Diabetes Mellitus",
    },
    {
      name: "High Blood Pressure",
      value: "High Blood Pressure",
    },
    {
      name: "Cardiovascular Disease",
      value: "Cardiovascular Disease",
    },
    {
      name: "Thyroid",
      value: "Thyroid",
    },
    {
      name: "Liver Disease",
      value: "Liver Disease",
    },
    {
      name: "Osteoporosis",
      value: "Osteoporosis",
    },
    {
      name: "Cancer",
      value: "Cancer",
    },
    {
      name: "Kidney Disease",
      value: "Kidney Disease",
    },
    {
      name: "IBS",
      value: "IBS",
    },
    {
      name: "Autoimmune Disorder",
      value: "Autoimmune Disorder",
    },
    {
      name: "COPD",
      value: "COPD",
    },
    {
      name: "PCOD/PCOS",
      value: "PCOD/PCOS",
    },
    {
      name: "None",
      value: "None",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];

  const symptoms = [
    {
      name: "Nausea",
      value: "Nausea",
    },
    {
      name: "Vomiting",
      value: "Vomiting",
    },
    {
      name: "Diarrhea",
      value: "Diarrhea",
    },
    {
      name: "Constipation",
      value: "Constipation",
    },
    {
      name: "Bloating",
      value: "Bloating",
    },
    {
      name: "Belching (Passing Gas)",
      value: "Belching (Passing Gas)",
    },
    {
      name: "Heartburn",
      value: "Heartburn",
    },
    {
      name: "Fatigue",
      value: "Fatigue",
    },
    {
      name: "Restlessness",
      value: "Restlessness",
    },
    {
      name: "Poor Memory",
      value: "Poor Memory",
    },
    {
      name: "Mood Swings",
      value: "Mood Swings",
    },
    {
      name: "Anxiety",
      value: "Anxiety",
    },
    {
      name: "Depression",
      value: "Depression",
    },
    {
      name: "Insomnia",
      value: "Insomnia",
    },
    {
      name: "Shortness of Breath",
      value: "Shortness of Breath",
    },

    {
      name: "Dizziness",
      value: "Dizziness",
    },
    {
      name: "Hairloss",
      value: "Hairloss",
    },
    {
      name: "Acne",
      value: "Acne",
    },
    {
      name: "Discolored tongue",
      value: "Discolored tongue",
    },
    {
      name: "Joint Pain",
      value: "Joint Pain",
    },
    {
      name: "Muscle Aches",
      value: "Muscle Aches",
    },
  ];

  const diseases = [
    {
      name: "Diabetes Mellitus",
      value: "Diabetes Mellitus",
    },
    {
      name: "IBS",
      value: "IBS",
    },
    {
      name: "High Blood Pressure",
      value: "High Blood Pressure",
    },
    {
      name: "Autoimmune Disorder",
      value: "Autoimmune Disorder",
    },
    {
      name: "Cardio Vascular Disease",
      value: "Cardio Vascular Disease",
    },
    {
      name: "COPD",
      value: "COPD",
    },
    {
      name: "Liver Disease",
      value: "Liver Disease",
    },
    {
      name: "PCOD/PCOS",
      value: "PCOD/PCOS",
    },
    {
      name: "Osteoporosis",
      value: "Osteoporosis",
    },
    {
      name: "None",
      value: "None",
    },
    {
      name: "Cancer",
      value: "Cancer",
    },
    {
      name: "Others",
      value: "Others",
    },
    {
      name: "Kidney Disease",
      value: "Kidney Disease",
    },
  ];

  const bloodGroup = [
    {
      name: "O positive",
      value: "O positive",
    },
    {
      name: "O negative",
      value: "O negative",
    },
    {
      name: "A positive",
      value: "A positive",
    },
    {
      name: "A negative",
      value: "A negative",
    },
    {
      name: "B positive",
      value: "B positive",
    },
    {
      name: "B negative",
      value: "B negative",
    },
    {
      name: "AB positive",
      value: "AB positive",
    },
    {
      name: "AB negative:",
      value: "AB negative:",
    },
  ];

  const heightfeet = Array.from({ length: 10 }, (_, index) => ({
    input: (index + 1).toString(),
  }));
  const heightInch = Array.from({ length: 11 }, (_, index) => ({
    input: (index + 1).toString(),
  }));

  const foodPre = [
    {
      name: "Vegeterian",
      value: "Vegeterian",
    },
    {
      name: "Vegan",
      value: "Vegan",
    },
    {
      name: "Non Vegeterian",
      value: "Non Vegeterian",
    },
    {
      name: "All",
      value: "All",
    },
  ];

  const cuisines = [
    {
      name: "North Indian",
      value: "North Indian",
    },
    {
      name: "South Indian",
      value: "South Indian",
    },
    {
      name: "American",
      value: "American",
    },
    {
      name: "Italian",
      value: "Italian",
    },
    {
      name: "Vietnamese",
      value: "Vietnamese",
    },
    {
      name: "Thai",
      value: "Thai",
    },
    {
      name: "European",
      value: "European",
    },
    {
      name: "Mexican",
      value: "Mexican",
    },
    {
      name: "Japanese",
      value: "Japanese",
    },
    {
      name: "Indian Street Food",
      value: "Indian Street Food",
    },
    {
      name: "Mediterranean",
      value: "Mediterranean",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];

  const cravings = [
    {
      name: "Sweet",
      value: "Sweet",
    },
    {
      name: "Salty",
      value: "Salty",
    },
    {
      name: "Sour",
      value: "Sour",
    },
    {
      name: "Crunchy",
      value: "Crunchy",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];

  const radioOptionTitle = [
    {
      title: "Alcohol ",
    },
    {
      title: "Biscuits/Cakes/Pastries",
    },
    {
      title: "Diet Sodas",
    },
    {
      title: "Coffee ",
    },
    {
      title: "Tea ",
    },
  ];

  const triggers = [
    {
      name: "Time of The Day",
      value: "Time of The Day",
    },
    {
      name: "Seeing Food",
      value: "Seeing Food",
    },
    {
      name: "Hunger",
      value: "Hunger",
    },
    {
      name: "Boredom",
      value: "Boredom",
    },
    {
      name: "Others",
      value: "Others",
    },
  ];

  const hungryTime = [
    {
      name: "Morning",
      value: "Morning",
    },
    {
      name: "Dinner Time",
      value: "Dinner Time",
    },
    {
      name: "Evening",
      value: "Evening",
    },
    {
      name: "Other",
      value: "Other",
    },
    {
      name: "Lunch Time",
      value: "Lunch Time",
    },
  ];

  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  const stressLevel = Array.from({ length: 10 }, (_, index) => ({
    input: (index + 1).toString(),
  }));

  const activityOptionTitle = [
    {
      title: "Endurance  ",
    },
    {
      title: "Strength Training",
    },
    {
      title: "Yoga",
    },
    {
      title: "Flexibility/balance",
    },
  ];

  return (
    <div>
      <div className="container">
        <Header />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <div className="listStciky">
              <h4 className="text-center">Patients</h4>
              <div className="my-3 pHeadWrapper" id="style-1">
                {myPatients.map((item, index) => (
                  <div
                    className={`d-flex imgPListWrapper ${
                      selectedPatient.keyIndex === index
                        ? "imgPListWrapperSelected"
                        : ""
                    }`}
                    key={index}
                    onClick={() => handlePatientClick(item, index)}
                  >
                    <img className="mr-3 imgPList" src={item.image} alt="user" />
                    <h5 className="pHead">{item.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9 mb-5" id="style-1">
            <h4 className="text-center">Patients Details</h4>
            {/* <p className="userIdP btnDet p-2">
              <b> User ID:</b>&nbsp; {selectedPatient.userIdP}
            </p> */}
            <div className="assesment_form_btn_div">
              <button
                className="btn assesment_form_btn btnDet"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Assessment form
              </button>
            </div>
            <div className="pDetailWrapper my-3 p-5">
              <div className="d-flex col-md-12 detailHeader">
                <div className="imgDiet">
                  <img className="userImgP" src={selectedPatient.image} alt="user"/>
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
                    <b> Name:</b>&nbsp; {selectedPatient.name}
                  </p>
                  <p>
                    <b> Mobile:</b>&nbsp; {selectedPatient.mobile}
                  </p>
                  <p>
                    <b> Email:</b>&nbsp; {selectedPatient.email}
                  </p>
                  <p>
                    <b> Date of Birth:</b>&nbsp; {selectedPatient.dateOfBirth}
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
                    <b> Height:</b>&nbsp; {selectedPatient.height}
                  </p>
                  <p>
                    <b> Weight:</b>&nbsp; {selectedPatient.weight}
                  </p>
                  <p>
                    <b> Blood Group:</b>&nbsp; {selectedPatient.bloodGroup}
                  </p>
                  <p>
                    <b> Health Concerns:</b>&nbsp;{" "}
                    {selectedPatient.healthConcerns}
                  </p>
                  <p>
                    <b> Package:</b>&nbsp; {selectedPatient.packagePlan}
                  </p>
                  <p>
                    <b> Package Date:</b>&nbsp; {selectedPatient.packageDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="my-3 wrapperDet">
              <div className="col-md-5 py-3 pDetailWrapper">
                <h4 className="text-center">Uploaded Documents</h4>
                <div className="docsUpload">
                  <div className="docsHead">
                    <p className="mb-0">Health Report</p>
                    <p>01/01/2023</p>
                  </div>
                  <button className="btn btn-primary btnDet">Download</button>
                </div>
              </div>

              <div className="col-md-6 py-3 pDetailWrapper">
                <h4 className="text-center">Activity</h4>
                <div>
                  <p>
                    <b> Appointment:</b>&nbsp; 2/4 Left
                  </p>
                  <p>
                    <b> Upcoming Appointment:</b>&nbsp; 01/01/2023
                  </p>
                  <p>
                    <b> Last Appointment:</b>&nbsp; 01/01/2023
                  </p>
                </div>
              </div>
            </div>

            <div className="pDetailWrapper col-md-5 my-3 p-5">
              <div>
                <h4>Payment Details</h4>
                <p>
                  <b> Transaction ID:</b>&nbsp; abcdefgh123456
                </p>
                <p>
                  <b> Date:</b>&nbsp; 01/01/2023
                </p>
                <p>
                  <b> Time:</b>&nbsp; 01/01/2023
                </p>
                <p>
                  <b> Payment Mode:</b>&nbsp; UPI
                </p>
                <p>
                  <b> Plan Type:</b>&nbsp; abcdefgh123456
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* diet plan popup by Arsalan @04/08/1998 */}
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
            <div className="modal-body tableHeight" id="style-1">
              <table className="table table-striped dietTable">
                <thead>
                  <th>S No.</th>
                  <th>Time</th>
                  <th>Diet</th>
                  <th>Status</th>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>12:00 PM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Pending</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>02:00 PM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Skipped</td>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>

                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>10:00 AM</td>
                    <td>
                      <div>
                        <h6>Option 1: 1 katori rice</h6>
                      </div>
                      <div>
                        <h6>Option 2: Salad</h6>
                      </div>
                      <div>
                        <h6>Option 3: Milk</h6>
                      </div>
                    </td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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
            <div className="modal-body p-5 pb-0">
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
                <div className="my-5">
                  <div>
                    <h4>Q1 Medical condition?</h4>

                    <h5>Select all Medical condition? you are facing</h5>

                    <div className="inputSymptoms row">
                      {medicalConditions.map((item, index) => (
                        <div className="col-md-4 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="medCondition"
                            name="medCondition"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="item1">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="my-5">
                    <h4>Q2 Signs & symptoms</h4>

                    <h5>
                      Select all signs and symptoms you are facing in day to day
                      Life
                    </h5>

                    <div className="inputSymptoms row">
                      {symptoms.map((item, index) => (
                        <div className="col-md-4 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="signs"
                            name="signs"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="signs">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q3 Age</h4>
                    <div className="textareaBox">
                      <p>Mention your age</p>
                      <textarea
                        className="trio_mendate"
                        id="ageNum"
                        name="ageNum"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q4 Medications</h4>
                    <div className="textareaBox">
                      <p>Mention all medicines taken by you</p>
                      <textarea
                        className="trio_mendate"
                        id="medicines"
                        name="medicines"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q5 Supplements</h4>
                    <div className="textareaBox">
                      <p>Mention all supplements taken by you</p>
                      <textarea
                        className="trio_mendate"
                        id="supplements"
                        name="supplements"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q6 Food allergy/ intolerance</h4>
                    <div className="textareaBox">
                      <p>Mention all allergy/intolerance you have</p>
                      <textarea
                        className="trio_mendate"
                        id="allergy"
                        name="allergy"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="diseasesBox">
                    <h4 className="mt-5 mb-3">Q7 Diseases</h4>

                    <h5>Select all diseases</h5>

                    <div className="inputSymptoms row">
                      {diseases.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="diseases"
                            name="diseases"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="item1">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bloodGroup">
                    <h4 className="mt-5 mb-3">Q8 Blood Group</h4>

                    <h5>Select Your Blood Group</h5>

                    <div className="inputSymptoms row">
                      {bloodGroup.map((item, index) => (
                        <div className="col-md-4 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="bloodGroup"
                            name="bloodGroup"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="item1">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="heightBox">
                    <h4 className="mt-5 mb-3">Q9 Height</h4>

                    <h5>Select Your Height here</h5>

                    <div className="d-flex">
                      <div className="heightOption">
                        <label>feet</label> <br />
                        <select>
                          {heightfeet.map((item, index) => (
                            <option
                              className="trio_mendate"
                              id="feet"
                              name="feet"
                              key={index}
                            >
                              {item.input}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="heightOption">
                        <label>Inch</label> <br />
                        <select>
                          {heightInch.map((item, index) => (
                            <option
                              className="trio_mendate"
                              id="inch"
                              name="inch"
                              key={index}
                            >
                              {item.input}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="foodPre">
                    <h4 className="mt-5 mb-3">Q10 Food Preference</h4>

                    <h5>Select your food preference</h5>

                    <div className="inputSymptoms row">
                      {foodPre.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="foodPre"
                            name="foodPre"
                            className="trio_mendate"
                            value={item.value}
                          />
                          <label htmlFor="item1">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cuisines">
                    <h4 className="mt-5 mb-3">Q11 Cuisines You Enjoy</h4>

                    <h5>Select all cuisines you enjoy</h5>

                    <div className="inputSymptoms row">
                      {cuisines.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="cuisines"
                            name="cuisines"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="cuisines">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cravings">
                    <h4 className="mt-5 mb-3">Q12 Food Cravings</h4>

                    <h5>What kind of food you crave for</h5>

                    <div className="inputSymptoms row">
                      {cravings.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="cravings"
                            name="cravings"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="cravings">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="foodFrequency">
                    <h4 className="mt-5 mb-3">Q13 Food Frequency</h4>
                    <h5>How many times do you consume these items</h5>
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
                              <input type="radio" name={`foodTimes${index}`} />
                              <label>{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="triggers">
                    <h4 className="mt-5 mb-3">Q14 What triggers you to eat</h4>

                    <h5>Select all triggers you to eat</h5>

                    <div className="inputSymptoms row">
                      {triggers.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="triggers"
                            name="triggers"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="triggers">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">
                      Q15 Eating habits you are proud of
                    </h4>
                    <div className="textareaBox">
                      <p>Mention Those eating habits that make you feel good</p>
                      <textarea
                        id="eatHabits"
                        name="eatHabits"
                        className="trio_mendate"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q16 Sleep Time</h4>
                    <div className="timeBox">
                      <div className="d-flex">
                        <div className="timeOptions">
                          <label>Sleep Time</label> <br />
                          <input
                            className="trio_mendate"
                            id="sleepTime"
                            name="sleepTime"
                            type="time"
                          />
                        </div>
                        <div className="timeOptions">
                          <label>Wake up Time</label> <br />
                          <input
                            className="trio_mendate"
                            id="wakeTime"
                            name="wakeTime"
                            type="time"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="triggers">
                    <h4 className="mt-5 mb-3">Q17 Most Hungry</h4>

                    <h5>When you are most hungry</h5>

                    <div className="inputSymptoms row">
                      {hungryTime.map((item, index) => (
                        <div className="col-md-6 col-xs-6 my-1" key={index}>
                          <input
                            type="checkbox"
                            id="hungry"
                            name="hungry"
                            value={item.value}
                            className="trio_mendate"
                          />
                          <label htmlFor="hungry">{item.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="stressLevel">
                    <h4 className="mt-5 mb-3">Q18 Stress Level</h4>

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
                    <h4 className="mt-5 mb-3">Q19 Water Consumption</h4>
                    <h5>How much water do you consume on a day</h5>
                    <div className="foodFrequencyList">
                      <div className="row">
                        <div className="col-md-3">
                          <input
                            type="radio"
                            className="trio_mendate"
                            id="waterOp"
                            name="waterOp"
                          />
                          <label>1-2L</label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="radio"
                            className="trio_mendate"
                            id="waterOp"
                            name="waterOp"
                          />
                          <label>2-3L</label>
                        </div>
                        <div className="col-md-3">
                          <input
                            type="radio"
                            className="trio_mendate"
                            id="waterOp"
                            name="waterOp"
                          />
                          <label>3-4L</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="foodFrequency">
                    <h4 className="mt-5 mb-3">Q20 Smoking</h4>
                    <h5>Do you smoke </h5>
                    <div className="foodFrequencyList">
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="radio"
                            className="trio_mendate"
                            id="smokeOp"
                            name="smokeOp"
                          />
                          <label>No</label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="radio"
                            className="trio_mendate"
                            id="smokeOp"
                            name="smokeOp"
                          />
                          <label>Yes</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Q21 Menstrual cycle</h4>
                    <div className="textareaBox">
                      <p>Periods (Regular/How long/Painful)</p>
                      <textarea
                        className="trio_mendate"
                        id="menstrual"
                        name="menstrual"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="foodFrequency">
                    <h4 className="mt-5 mb-3">Q22 Activity</h4>
                    <h5>How much of the following activity you perform</h5>
                    {activityOptionTitle.map((item, index) => (
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
                                className="trio_mendate"
                                id={`activity${index}`}
                                type="radio"
                                name={`activity${index}`}
                              />
                              <label>{option}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="textBox">
                    <h4 className="mt-5 mb-3">Other</h4>
                    <div className="textareaBox">
                      <p>Mention all supplements taken by you</p>
                      <textarea
                        className="trio_mendate"
                        id="otherSup"
                        name="otherSup"
                        placeholder="Type your answer here"
                      />
                    </div>
                  </div>

                  <div className="foodFrequencyList my-5">
                    <div className="row">
                      <div className="col-md-3">
                        <input
                          type="radio"
                          className="trio_mendate"
                          id="otherOp"
                          name="otherOp"
                        />
                        <label>Daily</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="radio"
                          className="trio_mendate"
                          id="otherOp"
                          name="otherOp"
                        />
                        <label>1 Time a week</label>
                      </div>
                      <div className="col-md-3">
                        <input
                          type="radio"
                          className="trio_mendate"
                          id="otherOp"
                          name="otherOp"
                        />
                        <label>2-3 Times a week</label>
                      </div>
                    </div>
                  </div>

                  <div className="foodFrequency">
                    <h4 className="mt-5 mb-3">Q23 Motivation Needed</h4>
                    <h5>Motivation needed to start your fitness journey</h5>
                    <div className="foodFrequencyList">
                      <div className="row">
                        <div className="col-md-3">
                          <input type="radio" name="fitnessOp" />
                          <label>4</label>
                        </div>
                        <div className="col-md-3">
                          <input type="radio" name="fitnessOp" />
                          <label>Option</label>
                        </div>
                        <div className="col-md-3">
                          <input type="radio" name="fitnessOp" />
                          <label>Option</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ends Here */}
                </div>
              </form>
            </div>
            <div className="modal-footer modal_foot_form">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal End */}
    </div>
  );
}
