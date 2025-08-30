import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/AdminNotifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import deleteIcon from "../../Assests/images/delete.png";
import AdminHeader from "./AdminHeader";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import {
  server_post_data,
  post_notification,
  get_all_notification,
  APL_LINK,
  delete_master_data,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  handleIaphabetnumberChange,
} from "../../CommonJquery/CommonJquery.js";
let flag_for = 0;
let for_status_final = 0;
function NotificationsAdmin() {
  const [dynaicimage, setDynaicimage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [notificationdata, setNotificationdata] = useState([]);
  const [data_front_image, setdata_front_image] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const navigate = useNavigate();

  const [alertMsg, setAlertMsg] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    image: null,
    title: "",
    message: "",
  });
  const [isTouched, setIsTouched] = useState(false);

  const handleAlertMsg = (e) => {
    const newChange = e.target.value;

    setAlertMsg(false);
    setIsTouched(true);
    // Assuming you want to update the corresponding property in contactDetails
    setNotificationDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: newChange,
      };
    });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (
      notificationDetails.image ||
      notificationDetails.title == "" ||
      notificationDetails.message == "" ||
      isTouched
    ) {
      setAlertMsg(true);
    } else {
      setAlertMsg(false); // Hide the alert if there's input
    }

    if (vaild_data) {
      setAlertMsg(false);
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }

    setNotificationDetails({ image: null, title: "", message: "" });
    setDynaicimage("");
  };

  // Function to handle the delete icon click
  const handleDeleteIconClick = (goalId, for_set, for_status) => {
    flag_for = for_set;
    for_status_final = for_status;
    setSelectedGoalId(goalId);
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
            if (packageId === 0) {
              master_data_get();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  // Function to handle the delete operation for the selected goal
  const closepopup = () => {
    if (selectedGoalId !== null) {
      setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
    }
  };

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(get_all_notification, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message);
          setNotificationdata(Response.data.message.data_notification);
          setdata_front_image(
            APL_LINK + Response.data.message.data_notification_image
          );
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleFileChangedynamic = (keyname) => (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["jpg", "jpeg", "png"];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Please select a valid image file (jpg, jpeg, png).");
        return; // Don't proceed if the selected file is not an image
      }
    }

    let new_file_name = keyname + "_show";

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDynaicimage((prevImages) => ({
        ...prevImages,
        [keyname]: null,
        [new_file_name]: null,
      }));
    }
  };

  const formatTime = (inputDateTime) => {
    let parts = inputDateTime.split(" "); // Split date and time
    let dateParts = parts[0].split("/"); // Split date into day, month, year
    let timeParts = parts[1].toLowerCase().split(":"); // Split time into hours, minutes, and period

    let year = parseInt(dateParts[2]);
    let month = parseInt(dateParts[1]) - 1; // Months in JavaScript are zero-indexed
    let day = parseInt(dateParts[0]);

    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    if (timeParts[2] === "pm" && hours !== 12) {
      // Convert PM hours to 24-hour format
      hours += 12;
    } else if (timeParts[2] === "am" && hours === 12) {
      // Convert 12 AM to 0 hours
      hours = 0;
    }

    // Create a Date object using the parsed parts
    const parsedDate = new Date(year, month, day, hours, minutes);

    // Format the time
    const formattedTime = parsedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedTime;
  };

  console.log(notificationdata);

  const [checkboxes, setCheckboxes] = useState({
    all: false,
    completed: false,
    pending: false,
    cancelled: false,
  });

  const handleCheckboxChange = (key) => {
    if (key == "all") {
      const updatedCheckboxes = { ...checkboxes };
      for (const checkboxKey in updatedCheckboxes) {
        updatedCheckboxes[checkboxKey] = !checkboxes.all;
      }
      setCheckboxes(updatedCheckboxes);
    } else {
      setCheckboxes((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    }
  };

  return (
    <div className="container-lg my_patients notifications">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="my_patients_dash notifications_dash">
        <div className="my_patients_dash_head notifications_dash_head">
          <div className="my_patients_dash_head_container notifications_dash_container">
            <div className="back_btn_heading d-flex addNotf">
              <div className="d-flex">
                {/* <span className="mr-3">
                  <div className="back_btn" onClick={() => navigate(-1)}>
                    <img src={ArrowLeft} alt="icon" />
                  </div>
                </span> */}
                <h3 className="ms-2 hd" style={{ fontSize: "32px" }}>
                  Notifications
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="my_patients_dash_container notifications_dash_container mt-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="aaa">
                <div className="my_patients_list_wrapper notifications_list_wrapper">
                  <div className="NEW"></div>
                  <div className="notifications_list">
                    <ul>
                      {notificationdata.map((item) => (
                        <li key={item._id}>
                          <div className="notifications_item">
                            <div className="my_patients_item_left notifications_item_left">
                              <div className="my_patients_item_img notifications_item_img">
                                <img
                                  src={
                                    data_front_image + item.notification_image
                                  }
                                  onError={(e) => {
                                    e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                  }}
                                  alt="Petient"
                                />
                              </div>
                            </div>
                            <div className="notifications_item_right">
                              <div className="notifications_item_right_1">
                                <div className="my_patients_item_text notifications_item_text">
                                  <h5 className="hd">
                                    dfgdsfgdffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                                  </h5>

                                  <p className="mr-1">
                                    {formatTime(item.entry_date)}
                                  </p>
                                </div>
                                <p className="notification_text_long">
                                  {item.notification_details}
                                </p>
                              </div>
                              <div className="text-right">
                                <img
                                  className="deleteIcon"
                                  src={deleteIcon}
                                  alt="delete"
                                  data-toggle="modal"
                                  data-target="#deleteGoalPopup"
                                  style={{ height: "38px" }}
                                  onClick={() =>
                                    handleDeleteIconClick(item._id, 14, 0)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="my_patients_filter_container">
                {/* <div className="modal-header">
                  <h5 className="modal-title hd" id="exampleModalLongTitle">
                    Add Notifications
                  </h5>
                </div> */}
                <div className="modal-body">
                  <div>
                    <form className="addNotForm" id="addnotiform">
                      <div className="addNotiInput">
                        <label className="hd">Image</label> <br />
                        <input
                          type="file"
                          name="image_for_noti"
                          onChange={handleFileChangedynamic("image_for_noti")}
                          onInput={handleAlertMsg}
                          className="trio_mendate"
                          accept=".jpg,.jpeg,.png"
                          defaultValue={notificationDetails.image}
                        />
                        {dynaicimage && dynaicimage.image_for_noti_show && (
                          <img
                            src={dynaicimage.image_for_noti_show}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "200px",
                              borderRadius: "8px",
                              marginTop: "10px",
                            }}
                          />
                        )}
                      </div>
                      <div className="addNotiInput">
                        <label className="hd">Title</label> <br />
                        <input
                          placeholder="Title"
                          type="text"
                          className="trio_mendate "
                          id="notification_name"
                          name="notification_name"
                          maxLength={100}
                          onChange={handleAlertMsg}
                          onInput={handleIaphabetnumberChange}
                        />
                      </div>
                      <div className="addNotiInput">
                        <label className="hd">Message</label> <br />
                        <textarea
                          className="formTextarea trio_mendate "
                          type="text"
                          placeholder="Message"
                          id="notification_details"
                          name="notification_details"
                          maxLength={300}
                          onInput={handleIaphabetnumberChange}
                          onChange={handleAlertMsg}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <p
                  className={`${
                    alertMsg ? "" : "d-none"
                  } fs-6 text-danger fw-bold ms-3`}
                >
                  Please Fill the Mandatory Fields!
                </p>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary sendNotBtn fntNanitu"
                    onClick={() =>
                      handleSaveChangesdynamic("addnotiform", post_notification)
                    }
                  >
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                Are you sure to delete this Record?
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
                className="btn btn-secondary modalCancelBtn "
                data-dismiss="modal"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirmed(0)}
                className="btn btn-primary modalAddBtn"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsAdmin;
