import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Css/MyPatients.css";
import { Collapse, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import PrimaryButtonButton from "./RepeatingComponents/PrimaryButton";
import ArrowLeft from "../Assests/images/arrow_left.svg";
import SearchIcon from "../Assests/images/search_icon.svg";
import Avatar1 from "../Assests/images/avatar1.png";
import Avatar2 from "../Assests/images/avatar2.png";
import Avatar3 from "../Assests/images/avatar3.png";
import VideoCall from "../Assests/images/video_call_svg.svg";


function MyPatients() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const [myPatients, setMyPatients] = useState([
    {
      image: Avatar1,
      name: "Elena Osborne",
      date: "2023-07-30",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      status: "Completed",
      statusColor: "green",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      date: "2023-08-05",
      startTime: "2:30 PM",
      endTime: "4:30 PM",
      status: "Pending",
      statusColor: "yellow",
    },
    {
      image: Avatar3,
      name: "Jessy K",
      date: "2023-08-12",
      startTime: "9:00 AM",
      endTime: "11:30 AM",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      date: "2023-07-30",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      status: "Upcoming",
      statusColor: "blue",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      date: "2023-08-05",
      startTime: "2:30 PM",
      endTime: "4:30 PM",
      status: "Pending",
      statusColor: "yellow",
    },
    {
      image: Avatar3,
      name: "Jessy K",
      date: "2023-08-12",
      startTime: "9:00 AM",
      endTime: "11:30 AM",
      status: "Cancelled",
      statusColor: "red",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      date: "2023-07-30",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      status: "Completed",
      statusColor: "green",
    },
    {
      image: Avatar2,
      name: "Ava Dolton",
      date: "2023-08-05",
      startTime: "2:30 PM",
      endTime: "4:30 PM",
      status: "Completed",
      statusColor: "green",
    },
    {
      image: Avatar3,
      name: "Jessy K",
      date: "2023-08-12",
      startTime: "9:00 AM",
      endTime: "11:30 AM",
      status: "Completed",
      statusColor: "green",
    },
    {
      image: Avatar1,
      name: "Elena Osborne",
      date: "2023-07-30",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      status: "Upcoming",
      statusColor: "blue",
    },
  ]);

  // Cancel Appointment
  const [showModal, setShowModal] = useState(false);
  const [clickedAppointIndex, setClickedAppointIndex] = useState(null);

  const openModal = (index) => {
    setClickedAppointIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancelAppointment = (index) => {
    // Update the state to set the status to "Cancelled" and the status color to "red"
    if (clickedAppointIndex !== null) {
      const updatedPatients = [...myPatients];
      updatedPatients[clickedAppointIndex].status = "Cancelled";
      updatedPatients[clickedAppointIndex].statusColor = "red";
      setMyPatients(updatedPatients);
      setClickedAppointIndex(null);
      closeModal();
    }
  };

  // Change the tab
  const [acivePatientsTab, setacivePatientsTab] = useState("current_tab");

  const handleTabClick = (tab) => {
    setacivePatientsTab(tab);
  };

  const completedAppoints = myPatients.filter(
    (appoint) => appoint.status === "Completed"
  );

  // Seacrh Bar filter
  const [currentTabSearchValue, setCurrentTabSearchValue] = useState("");
  const [pastTabSearchValue, setPastTabSearchValue] = useState("");
  const [filteredCurrentPatients, setFilteredCurrentPatients] = useState([]);
  const [filteredPastPatients, setFilteredPastPatients] = useState([]);

  const handleCurrentTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setCurrentTabSearchValue(searchInput);

    // Filter patients for "Current Patients" tab based on the search input value
    if (searchInput.trim() !== "") {
      const filtered = myPatients.filter((patient) => {
        return (
          patient.name.toLowerCase().includes(searchInput) ||
          patient.date.toLowerCase().includes(searchInput) ||
          patient.startTime.toLowerCase().includes(searchInput) ||
          patient.endTime.toLowerCase().includes(searchInput)
        );
      });
      setFilteredCurrentPatients(filtered);
    } else {
      setFilteredCurrentPatients([]);
    }
  };

  const handlePastTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setPastTabSearchValue(searchInput);

    // Filter patients for "Past Patients" tab based on the search input value
    if (searchInput.trim() !== "") {
      const filtered = completedAppoints.filter((patient) => {
        return (
          patient.name.toLowerCase().includes(searchInput) ||
          patient.date.toLowerCase().includes(searchInput) ||
          patient.startTime.toLowerCase().includes(searchInput) ||
          patient.endTime.toLowerCase().includes(searchInput)
        );
      });
      setFilteredPastPatients(filtered);
    } else {
      setFilteredPastPatients([]);
    }
  };

  // Catagory Search
  const [selectedStatuses, setSelectedStatuses] = useState(["All"]);
  const [searchText, setSearchText] = useState("");
  const categories = [
    {
      id: "option1",
      value: "All",
      label: "All",
      class: "filter_option_div_01",
      outerClass: "",
      statusColor: "",
    },
    {
      id: "option2",
      value: "My Patients",
      label: "My Patients",
      class: "filter_option_div_01",
      outerClass: "",
      statusColor: "",
    },
    {
      id: "option3",
      value: "Completed",
      label: "Completed",
      class: "filter_option_div_02",
      outerClass: "filter_option_div",
      statusColor: "green",
    },
    {
      id: "option4",
      value: "Upcoming",
      label: "Upcoming",
      class: "filter_option_div_02",
      outerClass: "filter_option_div",
      statusColor: "blue",
    },
    {
      id: "option5",
      value: "Pending",
      label: "Pending",
      class: "filter_option_div_02",
      outerClass: "filter_option_div",
      statusColor: "yellow",
    },
    {
      id: "option6",
      value: "Cancelled",
      label: "Cancelled",
      class: "filter_option_div_02",
      outerClass: "filter_option_div",
      statusColor: "red",
    },
  ];

  const handleCategorySelection = (category) => {
    setSearchText("");
    if (category === "All") {
      setacivePatientsTab("current_tab");
      setSelectedStatuses(["All"]);
    } else {
      const updatedStatuses = selectedStatuses.includes("All")
        ? selectedStatuses.filter((status) => status !== "All")
        : [...selectedStatuses];
      if (updatedStatuses.includes(category)) {
        setSelectedStatuses(
          updatedStatuses.filter((status) => status !== category)
        );
      } else {
        setSelectedStatuses([...updatedStatuses, category]);
      }
    }
  };

  const getFilteredCategories = () => {
    return categories.filter((category) =>
      category.label.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="container-lg my_patients">
      <div>
        <Header />
      </div>
      <div className="my_patients_dash">
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
            <div className="d-flex">
              <div className="mx-2">
              <Link to='/ViewPatient'>
                <PrimaryButtonButton name="View Patients" />
                </Link> 
              </div>
              <div className="mx-2">
                <PrimaryButtonButton name="ADD NEW PATIENT" />
              </div>
            </div>
          </div>
        </div>
        <div className="my_patients_dash_container">
          <div className="row">
            <div className="col-lg-8">
              <div className="my_patients_list_container">
                <div className="my_patients_list_head">
                  <div className="current_past_tabs">
                    <div
                      onClick={() => handleTabClick("current_tab")}
                      className={
                        acivePatientsTab === "current_tab"
                          ? "current_tab active_patient_list_tab"
                          : "current_tab"
                      }
                    >
                      <h6>Current Patients</h6>
                    </div>
                    <div
                      onClick={() => handleTabClick("past_tab")}
                      className={
                        acivePatientsTab === "past_tab"
                          ? "past_tab past_patient_list_tab"
                          : "past_tab"
                      }
                    >
                      <h6>Past Patients</h6>
                    </div>
                  </div>
                  <div className="my_patients_search_bar">
                    {/* <input className='serach_bar' type='text' placeholder='Search...' /> */}
                    {/* For Current tab */}
                    {acivePatientsTab === "current_tab" && (
                      <input
                        className="serach_bar"
                        type="text"
                        placeholder="Search..."
                        value={currentTabSearchValue}
                        onChange={handleCurrentTabSearchInputChange}
                      />
                    )}
                    {/* For Past tab */}
                    {acivePatientsTab === "past_tab" && (
                      <input
                        className="serach_bar"
                        type="text"
                        placeholder="Search..."
                        value={pastTabSearchValue}
                        onChange={handlePastTabSearchInputChange}
                      />
                    )}
                    <img
                      className="search_bar_icon"
                      src={SearchIcon}
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div className="my_patients_list_wrapper" id="style-1">
                <h3>Patients List</h3>
                <div className="my_patientslist_items">
                  {acivePatientsTab === "current_tab" ? (
                    <ul>
                      {currentTabSearchValue.trim() !== "" ? (
                        filteredCurrentPatients.map((item, index) => (
                          <>
                            <li key={index}>
                              <div className="my_patients_item">
                                <div className="my_patients_item_left">
                                  <div className="my_patients_item_img">
                                    <img src={item.image} alt="Petient" />
                                  </div>
                                  <div className="my_patients_item_text">
                                    <h5>{item.name}</h5>
                                    <p>
                                      {item.date} | {item.startTime}-
                                      {item.endTime}
                                    </p>
                                  </div>
                                </div>
                                <div className="my_patients_item_right">
                                  <span className={item.statusColor}></span>
                                  {item.status === "Cancelled" ? (
                                    <span
                                      className="btn my_patients_cancel_btn mypatients_cancel_btn_disabled"
                                      disabled
                                    >
                                      Canceled
                                    </span>
                                  ) : (
                                    <span
                                      className="btn my_patients_cancel_btn"
                                      onClick={() => openModal(index)}
                                    >
                                      Cancel
                                    </span>
                                  )}
                                  {item.status === "Cancelled" ? (
                                    <span
                                      className="btn my_patients_call_btn my_patients_call_btn_disabled"
                                      disabled
                                      onClick={() =>
                                        console.log(
                                          `${item.name}'s call clicked`
                                        )
                                      }
                                    >
                                      <span className="my_patients_video_svg">
                                        <img src={VideoCall} alt="icon" />
                                      </span>
                                      Call
                                    </span>
                                  ) : (
                                    <span className="btn my_patients_call_btn">
                                      <span className="my_patients_video_svg">
                                        <img src={VideoCall} alt="icon" />
                                      </span>
                                      Call
                                    </span>
                                  )}
                                </div>
                              </div>
                            </li>
                            <hr className="border_top" />
                          </>
                        ))
                      ) : (
                        <>
                          {myPatients
                            .filter(
                              (item) =>
                                selectedStatuses.includes("All") ||
                                selectedStatuses.includes(item.status)
                            )
                            .map((item, index) => (
                              <>
                                <li key={index}>
                                  <div className="my_patients_item">
                                    <div className="my_patients_item_left">
                                      <div className="my_patients_item_img">
                                        <img src={item.image} alt="Petient" />
                                      </div>
                                      <div className="my_patients_item_text">
                                        <h5>{item.name}</h5>
                                        <p>
                                          {item.date} | {item.startTime}-
                                          {item.endTime}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="my_patients_item_right">
                                      <span className={item.statusColor}></span>
                                      {item.status === "Cancelled" ? (
                                        <span
                                          className="btn my_patients_cancel_btn mypatients_cancel_btn_disabled"
                                          disabled
                                        >
                                          Canceled
                                        </span>
                                      ) : (
                                        <span
                                          className="btn my_patients_cancel_btn"
                                          onClick={() => openModal(index)}
                                        >
                                          Cancel
                                        </span>
                                      )}
                                      {item.status === "Cancelled" ? (
                                        <span
                                          className="btn my_patients_call_btn my_patients_call_btn_disabled"
                                          disabled
                                          onClick={() =>
                                            console.log(
                                              `${item.name}'s call clicked`
                                            )
                                          }
                                        >
                                          <span className="my_patients_video_svg">
                                            <img src={VideoCall} alt="icon" />
                                          </span>
                                          Call
                                        </span>
                                      ) : (
                                        <span className="btn my_patients_call_btn">
                                          <span className="my_patients_video_svg">
                                            <img src={VideoCall} alt="icon" />
                                          </span>
                                          Call
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </li>
                                <hr className="border_top" />
                              </>
                            ))}
                        </>
                      )}
                    </ul>
                  ) : (
                    <ul>
                      {pastTabSearchValue.trim() !== "" ? (
                        filteredPastPatients.map((item, index) => (
                          <>
                            <li key={index}>
                              <div className="my_patients_item">
                                <div className="my_patients_item_left">
                                  <div className="my_patients_item_img">
                                    <img src={item.image} alt="Petient" />
                                  </div>
                                  <div className="my_patients_item_text">
                                    <h5>{item.name}</h5>
                                    <p>
                                      {item.date} | {item.startTime}-
                                      {item.endTime}
                                    </p>
                                  </div>
                                </div>
                                <div className="my_patients_item_right">
                                  <span className={item.statusColor}></span>
                                  <span
                                    className="btn my_patients_cancel_btn mypatients_cancel_btn_disabled2"
                                    disabled
                                  >
                                    Cancel
                                  </span>
                                  <span
                                    className="btn my_patients_call_btn my_patients_call_btn_disabled"
                                    disabled
                                    onClick={() =>
                                      console.log(`${item.name}'s call clicked`)
                                    }
                                  >
                                    <span className="my_patients_video_svg">
                                      <img src={VideoCall} alt="icon" />
                                    </span>
                                    Call
                                  </span>
                                </div>
                              </div>
                            </li>
                            <hr className="border_top" />
                          </>
                        ))
                      ) : (
                        <>
                          {completedAppoints.map((item, index) => (
                            <>
                              <li key={index}>
                                <div className="my_patients_item">
                                  <div className="my_patients_item_left">
                                    <div className="my_patients_item_img">
                                      <img src={item.image} alt="Petient" />
                                    </div>
                                    <div className="my_patients_item_text">
                                      <h5>{item.name}</h5>
                                      <p>
                                        {item.date} | {item.startTime}-
                                        {item.endTime}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="my_patients_item_right">
                                    <span className={item.statusColor}></span>
                                    <span
                                      className="btn my_patients_cancel_btn mypatients_cancel_btn_disabled2"
                                      disabled
                                    >
                                      Cancel
                                    </span>
                                    <span
                                      className="btn my_patients_call_btn my_patients_call_btn_disabled"
                                      disabled
                                      onClick={() =>
                                        console.log(
                                          `${item.name}'s call clicked`
                                        )
                                      }
                                    >
                                      <span className="my_patients_video_svg">
                                        <img src={VideoCall} alt="icon" />
                                      </span>
                                      Call
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <hr className="border_top" />
                            </>
                          ))}
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="my_patients_filter_container">
                <h3>Filter</h3>
                <div className="my_patients_filter_wrapper">
                  <div className="my_patients_filter_head_main">
                    <div className="my_patients_filter_head">
                      <h4>Category</h4>
                      <div className="serach_bar_collapse_div">
                        <Button
                          onClick={toggleCollapse}
                          className="filter_search_btn"
                        >
                          <img src={SearchIcon} alt="icon" />
                        </Button>
                      </div>
                    </div>
                    <Collapse in={isOpen}>
                      <div className="my_patients_search_bar m-auto">
                        <input
                          className="serach_bar"
                          type="text"
                          placeholder="Search..."
                          // value={searchedCategory}
                          // onChange={handleCategorySearch}
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </div>
                    </Collapse>
                  </div>
                </div>
                <div className="my_patients_filter_options">
                  <div className="filter_options_container">
                    {/* <div className="filter_option_div_01">
                      <input
                        type="checkbox"
                        id="option1"
                        name="option1"
                        value="All"
                        checked={selectedStatuses.includes("All")}
                        onChange={() => handleCategorySelection("All")}
                      />
                      <label htmlFor="option1">All</label>
                    </div>
                    <div className="filter_option_div_01">
                      <input
                        type="checkbox"
                        id="option2"
                        name="option2"
                        value="My Patients"
                        checked={selectedStatuses.includes("My Patients")}
                        onChange={() => handleCategorySelection("My Patients")}
                      />
                      <label htmlFor="option2">My Patients</label>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option3"
                          name="option3"
                          value="Completed"
                          checked={selectedStatuses.includes("Completed")}
                          onChange={() => handleCategorySelection("Completed")}
                        />
                        <label htmlFor="option3">Completed</label>
                      </div>
                      <div className="green"></div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option4"
                          name="option4"
                          value="Upcoming"
                          checked={selectedStatuses.includes("Upcoming")}
                          onChange={() => handleCategorySelection("Upcoming")}
                        />
                        <label htmlFor="option4">Upcoming</label>
                      </div>
                      <div className="blue"></div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option5"
                          name="option5"
                          value="Pending"
                          checked={selectedStatuses.includes("Pending")}
                          onChange={() => handleCategorySelection("Pending")}
                        />
                        <label htmlFor="option5">Pending</label>
                      </div>
                      <div className="yellow"></div>
                    </div>
                    <div className="filter_option_div">
                      <div className="filter_option_div_02">
                        <input
                          type="checkbox"
                          id="option6"
                          name="option6"
                          value="Cancelled"
                          checked={selectedStatuses.includes("Cancelled")}
                          onChange={() => handleCategorySelection("Cancelled")}
                        />
                        <label htmlFor="option6">Cancelled</label>
                      </div>
                      <div className="red"></div>
                    </div> */}

                    {filteredCategories.map((option) => (
                      <div className={option.outerClass} key={option.id}>
                        <div className={option.class}>
                          <input
                            type="checkbox"
                            id={option.id}
                            name={option.id}
                            value={option.value}
                            checked={selectedStatuses.includes(option.value)}
                            onChange={() =>
                              handleCategorySelection(option.value)
                            }
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                        <div className={option.statusColor}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={closeModal} centered backdrop="static">
        <Modal.Body className="modal_body">
          <div className="success_img d-flex justify-content-center">
            {/* ... Modal content goes here ... */}
          </div>
          <p>Are you sure you want to cancel this appointment?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelAppointment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyPatients;
