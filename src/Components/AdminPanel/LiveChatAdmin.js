import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/LiveChatAdmin.css";
import AdminHeader from "./AdminHeader";
import ArrowLeft from "../../Assests/images/arrow_left.svg";
import threeDot from "../../Assests/images/threeDot.svg";
import sendChatBtn from "../../Assests/images/sendChatBtn.svg";
import searchIcon from "../../Assests/images/searchIcon.svg";
import funnelIcon from "../../Assests/images/funnelIcon.svg";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import addBtn from "../../Assests/images/add_svg.svg";
import {
  my_patients_full_details_doctor,
  post_customer_sms,
  server_post_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import { make_image_from_letter } from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { firebaseService } from "./../../FirebaseConnection/FirebaseService"; // Adjust the path as needed
import { handleIaphabetnumberChange } from "../../CommonJquery/CommonJquery.js";
import { orderBy, onSnapshot, query } from "firebase/firestore";
function LiveChatAdmin() {
  // Back button
  const navigate = useNavigate();

  // const [retriveDoctorId, setRetriveDoctorId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [upcomingAppointImage, setUpcomingAppointImage] = useState();
  const [patients, setPatients] = useState([]);

  const [retrivecustomerId, setCustomerId] = useState("");
  const [messages12, setMessages12] = useState([]);
  const [selectedimage, setselectedimage] = useState(null);
  const [selectedname, setselectedname] = useState(null);
  const [selectedtime, setselectedtime] = useState(null);
  const [selectedItem, setselectedItem] = useState(null);
  const [retriveDoctorImage, setRetriveDoctorImage] = useState("");
  const [retriveDoctorProfession, setRetriveDoctorProfession] = useState("");
  /*shubham jain codeing */

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    const retrievedDoctorImage = retrieveData("admin_image");
    const retrievedDoctorProfession = retrieveData("admin_profession");
    setRetriveDoctorImage(retrievedDoctorImage);
    setRetriveDoctorProfession(retrievedDoctorProfession);
    // setRetriveDoctorId(retrievedDoctorId);
    master_data_get(retrievedDoctorId);
  }, []);
  const master_data_get = async (retrievedDoctorId) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    await server_post_data(my_patients_full_details_doctor, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setPatients(Response.data.message.data_customer_data);
          console.log(Response.data.message.data_customer_data);
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

  const handleAddPeople = () => {
    navigate("/ViewAdminPatient");
  };

  const post_recevier = async (message) => {
    const fd = new FormData();
    fd.append("customer_id", retrivecustomerId);
    fd.append("last_msg_send", message);
    await server_post_data(post_customer_sms, fd);
  };

  const sendUserMessage = () => {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (message.trim() !== "") {
      firebaseService
        .createMessage({
          message: message,
          uid: retrivecustomerId,
          message_by_user: "admin",
          message_by_admin: "Admin",
          admin_img: retriveDoctorImage,
          profession_name: retriveDoctorProfession,
        })
        .then(function (e) {
          call_data(
            selectedItem,
            selectedimage,
            selectedtime,
            selectedname,
            retrivecustomerId
          );
          post_recevier(message);
          userInput.value = "";
        });
    }
  };

  const call_data = (index, image, time, name, customer_id_call) => {
    try {
      setCustomerId(customer_id_call);
      setselectedimage(image);
      setselectedtime(time);
      setselectedname(name);
      setselectedItem(index);

      const messageCollectionRef = firebaseService.messageRef({
        customer_id: customer_id_call,
      });
      const orderedQuery = query(
        messageCollectionRef,
        orderBy("actual_time_date", "asc") // Use "asc" for oldest messages at the top
      );

      const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
        // Handle snapshot updates, e.g., update state
        const messagesArray = [];
        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          const timeOnly = data.actual_time_date
            .toDate()
            .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

          messagesArray.push({
            user_id: data.user_id,
            message: data.message,
            message_by: data.message_by,
            created_at: data.created_at,
            img_from: data.img_from,
            admin_profession: data.admin_profession,
            actual_time_date: timeOnly,
          });
        });

        // Update the state with all messages, ensuring new messages are at the end
        setMessages12(messagesArray);

        setTimeout(() => {
          const msgDiv = document.querySelector(".chatsHistory");
          msgDiv.scrollTo({
            top: msgDiv.scrollHeight,
            behavior: "smooth",
          });
        }, 10);
      });

      return () => {
        unsubscribe(); // Unsubscribe when the component unmounts or when the effect re-runs
      };
    } catch (error) {
      // Handle errors
    }
  };

  const userInputRef = useRef(null);

  /*shubham jain codeing */

  const [patientSearchValue, setPatientTabSearchValue] = useState("");
  const [searchedPatients, setSearchedPatients] = useState([]);

  const handleCurrentTabSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setPatientTabSearchValue(searchInput);

    // Filter patients for "Current Patients" tab based on the search input value
    if (searchInput.trim() !== "" && patients) {
      const filtered = patients.filter((patient) => {
        return patient.customer_name.toLowerCase().includes(searchInput);
      });
      setSearchedPatients(filtered);
    } else {
      setSearchedPatients([]);
    }
  };

  const getMessageHeaderClasses = (message) => {
    if (
      message.message_by === "doctor"
      // message.message_from === "Doctor"
    ) {
      return "doctorChatHeader";
    }
    if (
      message.message_by === "admin"
      // message.message_from === "Admin"
    ) {
      return "adminChatHeader";
    }
    if (message.message_by === "user") {
      return "userChatHeader";
    } else {
      return ""; // Default class or no class when conditions don't match
    }
  };

  const getMessageTextClasses = (message) => {
    if (
      message.message_by === "doctor"
      // message.message_from === "Doctor"
    ) {
      return "doctorChatText";
    }
    if (
      message.message_by === "admin"
      // message.message_from === "Admin"
    ) {
      return "adminChatText";
    }
    if (message.message_by === "user") {
      return "userChatText";
    } else {
      return ""; // Default class or no class when conditions don't match
    }
  };

  const getMessageTimeClasses = (message) => {
    if (
      message.message_by === "doctor"
      // message.message_from === "Doctor"
    ) {
      return "doctorchatTime";
    }
    if (
      message.message_by === "admin"
      // message.message_from === "Admin"
    ) {
      return "adminchatTime";
    }
    if (message.message_by === "user") {
      return "userchatTime";
    } else {
      return ""; // Default class or no class when conditions don't match
    }
  };

  return (
    <>
      <div className="container-xl create_diet_plan my-5">
        <div className={showLoader ? "loading" : ""}></div>
        <div>
          <AdminHeader />
        </div>
        <div className="create_diet_plan_dash">
          <div className="my_patients_dash_head my-4">
            <div className="my_patients_dash_head_container my_chat_add_patient_btn">
              <div className="back_btn_heading">
                {/* <span className="backBtnWrap">
                  <div className="back_btn" onClick={() => navigate(-1)}>
                    <img src={ArrowLeft} alt="icon" />
                  </div>
                </span> */}
                <h3 className="fntNanitu mrgbtmZero">Chats</h3>
              </div>
              <div className="my_chat_add_patient_btn">
                <button
                  className="my_chat_add_patient_btn22"
                  data-target="#addPatientModal"
                  data-toggle="modal"
                  onClick={handleAddPeople}
                >
                  <img className="my_chat_add_patient_IMG hds" src={addBtn} />
                  ADD PEOPLE
                </button>
              </div>
            </div>
          </div>
          <div className="create_diet_plan_dash_container p-3">
            <div className="row create_diet_plan_dash_container_row">
              {/* Long bar */}
              <div className="col-lg-8">
                {selectedItem != null ? (
                  <div>
                    <div className="chatsWrapper p-3">
                      <div className="chatHeader">
                        <img
                          src={selectedimage}
                          onError={(e) => {
                            e.target.src = ProfileImgSample; // Provide the path to your fallback image
                          }}
                          alt="User"
                        />
                        <div>
                          <h4>{selectedname}</h4>
                          {/* <p>
                            {selectedtime ? "Last Msg :- " + selectedtime : ""}{" "}
                          </p> */}
                        </div>
                      </div>
                      {/* <div className="iconsWrapper">
                        <img src={threeDot} alt="ThreeDot" />
                      </div> */}
                    </div>
                    <div className="chatHistoryWrapper pb-3">
                      <div className="chatsHistory pt-5 pb-3 pe-3">
                        <div>
                          {messages12.map((item, index) => {
                            const message = item; // Assuming item is a Firestore document snapshot
                            return (
                              <div key={index}>
                                <div className="chat_box_">
                                  <img
                                    className={`messenger_img ${
                                      message.message_by === "doctor" ||
                                      message.message_by === "user"
                                        ? ""
                                        : "hidden_messenger_img"
                                    }`}
                                    src={message.img_from}
                                    onError={(e) => {
                                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                    }}
                                  />
                                  <div style={{ width: "100%" }}>
                                    <div
                                      className={`${getMessageHeaderClasses(
                                        message
                                      )} pr-3`}
                                    >
                                      {message.message && (
                                        <p
                                          className={`${getMessageTextClasses(
                                            message
                                          )} `}
                                        >
                                          {message.message_by === "user" ? (
                                            <p
                                              className={`profession_text ${
                                                message.message_by === "user"
                                                  ? ""
                                                  : "hidden_messenger_img"
                                              }`}
                                            >
                                              ~ Patient
                                            </p>
                                          ) : (
                                            <p
                                              className={`profession_text ${
                                                message.message_by ===
                                                  "doctor" ||
                                                message.message_by === "user"
                                                  ? ""
                                                  : "hidden_messenger_img"
                                              }`}
                                            >
                                              ~ {message.admin_profession}
                                            </p>
                                          )}
                                          <p className="message_text">
                                            {message.message}
                                          </p>
                                        </p>
                                      )}
                                    </div>
                                    <p
                                      className={`${getMessageTimeClasses(
                                        message
                                      )} pr-4`}
                                    >
                                      {message.created_at}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="inputSendWrapper mx-5 p-2 mt-3 userInputWrite">
                        <input
                          id="userInput"
                          placeholder="Type a Message"
                          ref={userInputRef}
                          maxLength={500}
                          // onInput={handleIaphabetnumberChange}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Prevent the Enter key from adding a newline
                              sendUserMessage();
                            }
                          }}
                        />
                        <img
                          className="sendChatBtn"
                          src={sendChatBtn}
                          alt="Send Chat"
                          onClick={sendUserMessage}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no_chat_found">
                    <p className="fntNanitu">Your Chat History Appears Here.</p>
                  </div>
                )}
              </div>
              {/* <div className='col-lg-1'></div> */}
              {/* short bar */}
              <div className="col-lg-4 smallContainer">
                <div>
                  <h4 className="py-3 hds Chd">Chats</h4>
                  <div className="searchTools">
                    <div className="searchInputWrapper p-2">
                      <img src={searchIcon} alt="Search" />
                      <input
                        placeholder="Search"
                        value={patientSearchValue}
                        onChange={handleCurrentTabSearchInputChange}
                      />
                    </div>
                    <img className="d-none" src={funnelIcon} alt="Funnel" />
                  </div>

                  <div className="chatPeopleWrapper">
                    {patientSearchValue.trim() !== "" ? (
                      <>
                        {searchedPatients.length > 0 ? (
                          searchedPatients.map((user, index) => {
                            let show_time = "";
                            if (user.last_msg_time) {
                              const parts = user.last_msg_time.split(/[\s,]+/);
                              if (parts.length !== 1) {
                                show_time = parts[1] + " " + parts[2]; // Extracting time;
                              }
                            }
                            return (
                              <div
                                key={index}
                                className={`chatUserWrapper my-2 ${
                                  selectedItem === index ? "chatSelected" : ""
                                }`}
                                onClick={() =>
                                  call_data(
                                    index,
                                    upcomingAppointImage + user.customer_image,
                                    user.last_msg_send,
                                    user.customer_name,
                                    user._id
                                  )
                                }
                              >
                                <div className="d-flex">
                                  <img
                                    src={
                                      user.customer_image === "user_image.png"
                                        ? make_image_from_letter(
                                            user.customer_name
                                          ) // If condition is true
                                        : upcomingAppointImage +
                                          user.customer_image // If condition is false
                                    }
                                    onError={(e) => {
                                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                    }}
                                    alt={`User ${index + 1}`}
                                  />
                                  <div className="userContainer">
                                    <h3 className="userName hds fntNanitu">
                                      {user.customer_name}
                                    </h3>
                                    <p className="lastMessage fntNanitu">
                                      {user.last_msg_send}
                                    </p>
                                  </div>
                                </div>
                                <div className="logsContainer">
                                  <p className="chatTiming">{show_time}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="m-4">
                            <p className="empty_text">No Chats Found</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {patients &&
                          patients.map((user, index) => {
                            let show_time = "";
                            if (user.last_msg_time) {
                              const parts = user.last_msg_time.split(/[\s,]+/);
                              if (parts.length !== 1) {
                                show_time = parts[1] + " " + parts[2]; // Extracting time;
                              }
                            }

                            return (
                              <div
                                key={index}
                                className={`chatUserWrapper my-2 ${
                                  selectedItem === index ? "chatSelected" : ""
                                }`}
                                onClick={() =>
                                  call_data(
                                    index,
                                    upcomingAppointImage + user.customer_image,
                                    user.last_msg_send,
                                    user.customer_name,
                                    user._id
                                  )
                                }
                              >
                                <div className="d-flex">
                                  <img
                                    src={
                                      user.customer_image === "user_image.png"
                                        ? make_image_from_letter(
                                            user.customer_name
                                          ) // If condition is true
                                        : upcomingAppointImage +
                                          user.customer_image // If condition is false
                                    }
                                    onError={(e) => {
                                      e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                    }}
                                    alt={`User ${index + 1}`}
                                  />
                                  <div className="userContainer">
                                    <h3 className="userName ">
                                      {user.customer_name}
                                    </h3>
                                    <p className="lastMessage">
                                      {user.last_msg_send}
                                    </p>
                                  </div>
                                </div>
                                <div className="logsContainer">
                                  <p className="chatTiming">{show_time}</p>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveChatAdmin;
