import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/AdminNotifications.css";
// import { Collapse, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import ArrowLeft from "../Assests/images/arrow_left.svg";
// import SearchIcon from "../Assests/images/search_icon.svg";
import Avatar1 from "../Assests/images/avatar1.png";
import Avatar2 from "../Assests/images/avatar2.png";
import Avatar3 from "../Assests/images/avatar3.png";

function AdminNotifications() {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggleCollapse = () => {
  //   setIsOpen(!isOpen);
  // };

  // Back button
  const navigate = useNavigate();

  // dropdown
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="container-lg my_patients notifications">
      <div>
        <Header />
      </div>
      <div className="my_patients_dash notifications_dash">
        <div className="my_patients_dash_head notifications_dash_head">
          <div className="my_patients_dash_head_container notifications_dash_container">
            <div className="back_btn_heading d-flex addNotf">
              <div className="d-flex">
                <span className="mr-3">
                  <div className="back_btn" onClick={() => navigate(-1)}>
                    <img src={ArrowLeft} alt="icon" />
                  </div>
                </span>
                <h4>Notifications</h4>
              </div>
              <div className="">
                <button
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Add Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my_patients_dash_container notifications_dash_container mt-4">
          <div className="row">
            <div className="col-lg-8">
              <div className="my_patients_list_wrapper notifications_list_wrapper">
                <div className="notifications_list">
                  <ul>
                    <li>
                      <div className="notifications_item">
                        <div className="my_patients_item_left notifications_item_left">
                          <div className="my_patients_item_img notifications_item_img">
                            <img src={Avatar1} alt="Petient" />
                          </div>
                        </div>
                        <div className="notifications_item_right">
                          <div className="my_patients_item_text notifications_item_text">
                            <h5>Elena Osborne</h5>
                            <p>10:30AM</p>
                          </div>
                          <p className="notification_text_long">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five
                            centuries,....
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="notifications_item">
                        <div className="my_patients_item_left notifications_item_left">
                          <div className="my_patients_item_img notifications_item_img">
                            <img src={Avatar2} alt="Petient" />
                          </div>
                        </div>
                        <div className="notifications_item_right">
                          <div className="my_patients_item_text notifications_item_text">
                            <h5>Elena Osborne</h5>
                            <p>10:30AM</p>
                          </div>
                          <p className="notification_text_long">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five
                            centuries,....
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="notifications_item">
                        <div className="my_patients_item_left notifications_item_left">
                          <div className="my_patients_item_img notifications_item_img">
                            <img src={Avatar3} alt="Petient" />
                          </div>
                        </div>
                        <div className="notifications_item_right">
                          <div className="my_patients_item_text notifications_item_text">
                            <h5>Elena Osborne</h5>
                            <p>10:30AM</p>
                          </div>
                          <p className="notification_text_long">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five
                            centuries,....
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="notifications_item">
                        <div className="my_patients_item_left notifications_item_left">
                          <div className="my_patients_item_img notifications_item_img">
                            <img src={Avatar1} alt="Petient" />
                          </div>
                        </div>
                        <div className="notifications_item_right">
                          <div className="my_patients_item_text notifications_item_text">
                            <h5>Elena Osborne</h5>
                            <p>10:30AM</p>
                          </div>
                          <p className="notification_text_long">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five
                            centuries,....
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="my_patients_filter_container">
                {/* <h3>Filter</h3>
                <div className="my_patients_filter_wrapper">
                  <div className="my_patients_filter_head">
                    <h4>Category</h4>
                    <div className="serach_bar_collapse_div">
                      <Button
                        onClick={toggleCollapse}
                        className="filter_search_btn"
                      >
                        <img src={SearchIcon} alt="icon" />
                      </Button>
                      <Collapse in={isOpen}>
                        <div className="my_patients_search_bar m-auto">
                          <input
                            className="serach_bar border"
                            type="text"
                            placeholder="Search..."
                          />
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
                <div className="my_patients_filter_options">
                  <div className="filter_options_container">
                    <div className="filter_option_div_01">
                      <input
                        type="checkbox"
                        id="option1"
                        name="option1"
                        value="All"
                      />
                      <label htmlFor="option1">All</label>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option3"
                          name="option3"
                          value="Complited"
                        />
                        <label htmlFor="option3">Complited</label>
                      </div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option4"
                          name="option4"
                          value="Upcoming"
                        />
                        <label htmlFor="option4">Upcoming</label>
                      </div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option5"
                          name="option5"
                          value="Pending"
                        />
                        <label htmlFor="option5">Pending</label>
                      </div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option6"
                          name="option6"
                          value="Cancel"
                        />
                        <label htmlFor="option6">Cancel</label>
                      </div>
                    </div>
                    <div className="filter_option_div_01">
                      <input
                        type="checkbox"
                        id="option2"
                        name="option2"
                        value="My Patients"
                      />
                      <label htmlFor="option2">Delete</label>
                    </div>
                    <div className="filter_option_div_01">
                      <input
                        type="checkbox"
                        id="option2"
                        name="option2"
                        value="My Patients"
                      />
                      <label htmlFor="option2">Hide</label>
                    </div>
                  </div>
                </div> */}

                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Add Notifications
                  </h5>
                </div>
                <div className="modal-body">
                  <div>
                    <form className="addNotForm">
                      <div className="addNotiInput">
                        <label>Image</label> <br />
                        <input type="file" />
                      </div>
                      <div className="addNotiInput">
                        <label>Title</label> <br />
                        <input placeholder="Title" type="text" />
                      </div>
                      <div className="addNotiInput">
                        <label>Select Role</label>
                        <br />
                        <select
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="doctor">Doctor</option>
                          <option value="patient">Patient</option>
                          <option value="patient">All</option>
                        </select>
                      </div>
                      <div className="addNotiInput">
                        <label>Message</label> <br />
                        <textarea
                          className="formTextarea"
                          type="text"
                          placeholder="Message"
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary sendNotBtn">
                    Send Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;
