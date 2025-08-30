import React, { useState } from "react";
import Header from "./Header";
import "../../Css/MyPatients.css";

import Avatar1 from "../../Assests/images/avatar1.png";
import Avatar2 from "../../Assests/images/avatar2.png";
import Avatar3 from "../../Assests/images/avatar3.png";
import VideoCall from "../../Assests/images/video_call_svg.svg";

export default function ViewPatient() {
  const myPatients = [
    {
      image: Avatar1,
      name: "Abhaya",
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
                    <img className="mr-3 imgPList" src={item.image} />
                    <h5 className="pHead">{item.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-9 mb-5" id="style-1">
            <h4 className="text-center">Patients Details</h4>
            <p className="userIdP btnDet p-2">
              {/* <b> User ID:</b>&nbsp; {selectedPatient.userIdP} */}
            </p>
            <div className="pDetailWrapper my-3 p-5">
              <div className="d-flex col-md-12 detailHeader">
                <div className="imgDiet">
                  <img className="userImgP" src={selectedPatient.image} />
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
    </div>
  );
}
