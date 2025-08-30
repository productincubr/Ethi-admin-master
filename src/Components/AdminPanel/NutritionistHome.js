import React, { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import "../../Css/NutritionistHome.css";
import {
  welcome_page,
  server_post_data,
  delete_master_data,
} from "../../ServiceConnection/serviceconnection.js";
import { Link } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
let flag_for = "0";
let for_status_final = "0";
export default function NutritionistHome() {
  const [showLoader, setShowLoader] = useState(false);
  const [doctorNames, setDoctorData] = useState([]);
  const [cardDetails, setcardDetails] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [toggleStates, setToggleStates] = useState({});
  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("admin_id");
    master_data_get(retrievedDoctorId);
  }, []);

  const master_data_get = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedDoctorId);
    await server_post_data(welcome_page, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setDoctorData(Response.data.message.data_doctor);
          setcardDetails([
            {
              title: "Total Doctors",
              totalNo: Response.data.message.count_doctor,
              Links: "/AddDoctorProfile",
            },
            {
              title: "Total Patients",
              totalNo: Response.data.message.count_patient,
              Links: "/ViewAdminPatient",
            },
            {
              title: "Total Appointments",
              totalNo: Response.data.message.count_apponiment,
              Links: "/AdminCalendar",
            },
            {
              title: "Total Revenue (₹)",
              totalNo: Response.data.message.sumOfAmount_revence,
              Links: "#",
            },
            {
              title: "Total Registered Users",
              totalNo: Response.data.message.count_customer,
              Links: "/ViewAdminPatient",
            },
            {
              title: "Pending Leaves",
              totalNo: Response.data.message.count_leaves,
              Links: "/LeaveRequest",
            },
          ]);
          const initialLikesplues = Response.data.message.data_doctor.map(
            (item) => {
              return item.allow_access === "1";
            }
          );
          setToggleStates(initialLikesplues);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  /*shubham jain codeing */

  const handleToggleChange = (packageId, index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    flag_for = 13;
    setSelectedGoalId(packageId);
    if (toggleStates[index]) {
      for_status_final = 0;
    } else {
      for_status_final = 1;
    }
    handleDeleteConfirmed(packageId);
  };

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async (packageId) => {
    if (flag_for !== 0) {
      setShowLoader(true);
      const fd = new FormData();
      if (packageId === 0) {
        fd.append("id_for_delete", selectedGoalId);
      } else {
        fd.append("id_for_delete", packageId);
      }

      fd.append("flag_for", flag_for);
      fd.append("for_status_final", for_status_final);
      await server_post_data(delete_master_data, fd)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup

            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };
  return (
    <div className="container-lg nutritionist_home">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>

      {/* Card Details */}

      <div className="container-lg">
        <div className="cardDetails container-fluid mb-5">
          <div className="row m-0">
            {cardDetails.map((item, index) => (
              <div key={index} className="col-md-4 m-auto">
                <div className="adminCardsDashs">
                  <Link to={`${item.Links}`}>
                    <div>
                      <h4 className="home_card_heading hds">{item.title}</h4>
                      <p className="home_card_number hds">{item.totalNo}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container-fluid mb-5">
          <h4 className="hds" style={{ fontSize: "32px" }}>
            Doctors List
          </h4>

          <table className="table table-striped table-bordered text-center DoctLst">
            <thead>
              <th className="hds">S. No</th>
              <th className="hds">Name</th>
              <th className="hds">Type</th>
              <th className="hds">Education</th>
              <th className="hds">Experience</th>
              <th className="hds">Action</th>
            </thead>
            <tbody className="doctorListTbody">
              {doctorNames.map((doctor, index) => (
                <tr key={index}>
                  <td className="hd">{index + 1}</td>
                  <td className="hd">{doctor.doctor_name}</td>
                  <td className="hd">{doctor.doctor_profession}</td>
                  <td className="hd">{doctor.doctor_education}</td>
                  <td className="hd">{doctor.doctor_exp_years} Years</td>
                  <td className="activeTd">
                    <div className="activeContainer mt-2">
                      <input
                        className="doctorTableInput"
                        type="checkbox"
                        id={`switch-${index}`}
                        checked={toggleStates[index]}
                        onChange={() => handleToggleChange(doctor._id, index)}
                      />
                      <label
                        className="doctorTable"
                        id={`switch${doctor._id}`}
                        checked={toggleStates[index]}
                        onClick={() => handleToggleChange(doctor._id, index)}
                      >
                        Toggle
                      </label>
                    </div>
                    <p className="my-1">
                      {doctor.allow_access === "1" ? "Active" : "Not Active"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* End Card Details */}
    </div>
  );
}
