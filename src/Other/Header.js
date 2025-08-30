import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../Css/Header.css";
import DoctorImg from "../Assests/images/doctor_img.png";
import StopWatch from "../Assests/images/stopwatch_svg.svg";
import HomeSvgActive from "../Assests/images/home_svg.svg";
import HomeSvg from "../Assests/images/home_black.svg";
import FeedSvg from "../Assests/images/feed_svg.svg";
import UsersSvg from "../Assests/images/users_svg.svg";
import ChatSvg from "../Assests/images/chat_svg.svg";
import NotificationsSvg from "../Assests/images/notifications_svg.svg";
import ProfileSvg from "../Assests/images/profile_svg.svg";
import CalendarSvg from "../Assests/images/calendar_svg.svg";
import PrimaryButtonButton from "./RepeatingComponents/PrimaryButton";
import MyStaffSvg from "../Assests/images/mystaff_svg.svg";
import MyStaffActive from "../Assests/images/mystaff_active.svg";
import CalendarSvgActive from "../Assests/images/calender_active.svg";
import FeedSvgActive from "../Assests/images/feeds_active.svg";
import UsersSvgActive from "../Assests/images/my_patients_active.svg";
import ChatSvgActive from "../Assests/images/chats_active.svg";
import NotificationsSvgActive from "../Assests/images/notifications_active.svg";
import ProfileSvgActive from "../Assests/images/my_profile_active.svg";
import settingIcon from "../Assests/images/settingIcon.png";

function Header({ leftTimeProp }) {
  const location = useLocation();

  return (
    <div className="header">
      <div className="header_wrapper">
        <div className="header_container d-flex justify-content-between flex-wrap">
          <div className="img_name_div d-flex align-items-center">
            <div className="img_div">
              <img src={DoctorImg} alt="Nutritionist" />
            </div>
            <div className="name_div">
              <h5 className="m-0">Dr. Emma Scotts</h5>
              <p className="m-0">Nutritionist</p>
            </div>
          </div>
          <div className="time_appointment_div d-flex align-items-center">
            <div className="time_div text-center">
              <p className="m-0 font-weight-bold text-black">
                Next appointmnet in
              </p>
              <div>
                <img src={StopWatch} alt="StopWatch" />
                <span className="text-black">
                  <span className="time_span">&nbsp;{leftTimeProp}</span>
                </span>
                {/* <span className='text-black'><span className='time_span'>&nbsp;{leftTimeProp}</span>&nbsp;mins</span> */}
              </div>
            </div>
            <PrimaryButtonButton name="CREATE APPOINTMENT" />
          </div>
        </div>

        <div className="menu_bar">
          <div className="menu_bar_wrapper">
            <div className="menu_bar_container d-flex justify-content-around">
              <Link to="/Welcomepage">
                <div
                  className={`card text-center ${
                    location.pathname === "/Welcomepage" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-4 ">
                    {location.pathname === "/Welcomepage" ? (
                      <img src={HomeSvgActive} alt="icon" />
                    ) : (
                      <img src={HomeSvg} alt="icon" />
                    )}
                    <p className="card-text">Home</p>
                  </div>
                </div>
              </Link>

              <Link to="/my_calendar">
                <div
                  className={`card text-center ${
                    location.pathname === "/my_calendar" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/my_calendar" ? (
                      <img src={CalendarSvgActive} alt="icon" />
                    ) : (
                      <img src={CalendarSvg} alt="icon" />
                    )}
                    <p className="card-text">Calender</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin_feeds_and_post">
                <div
                  className={`card text-center ${
                    location.pathname === "/admin_feeds_and_post"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/admin_feeds_and_post" ? (
                      <img src={FeedSvgActive} alt="icon" />
                    ) : (
                      <img src={FeedSvg} alt="icon" />
                    )}
                    <p className="card-text">Feeds</p>
                  </div>
                </div>
              </Link>

              <Link to="/superadmin_my_staff_profile" hidden>
                <div
                  className={`card text-center ${
                    location.pathname === "/superadmin_my_staff_profile"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/superadmin_my_staff_profile" ? (
                      <img src={MyStaffActive} alt="icon" />
                    ) : (
                      <img src={MyStaffSvg} alt="icon" />
                    )}
                    <p className="card-text">My Staff</p>
                  </div>
                </div>
              </Link>

              <Link to="/my_patients">
                <div
                  className={`card text-center ${
                    location.pathname === "/my_patients" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/my_patients" ? (
                      <img src={UsersSvgActive} alt="icon" />
                    ) : (
                      <img src={UsersSvg} alt="icon" />
                    )}
                    <p className="card-text">My Patients</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin_chats">
                <div
                  className={`card text-center ${
                    location.pathname === "/admin_chats" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/admin_chats" ? (
                      <img src={ChatSvgActive} alt="icon" />
                    ) : (
                      <img src={ChatSvg} alt="icon" />
                    )}
                    <p className="card-text">Chats</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin_notifications">
                <div
                  className={`card text-center ${
                    location.pathname === "/admin_notifications"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/admin_notifications" ? (
                      <img src={NotificationsSvgActive} alt="icon" />
                    ) : (
                      <img src={NotificationsSvg} alt="icon" />
                    )}
                    <p className="card-text">Notifications</p>
                  </div>
                </div>
              </Link>

              <Link to="/admin_general_profile">
                <div
                  className={`card text-center d-flex align-items-end ${
                    location.pathname === "/admin_general_profile"
                      ? "active_menu"
                      : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/admin_general_profile" ? (
                      <img src={ProfileSvgActive} alt="icon" />
                    ) : (
                      <img src={ProfileSvg} alt="icon" />
                    )}
                    <p className="card-text">My Profile</p>
                  </div>
                </div>
              </Link>
              <Link to="/AdminSettings">
                <div
                  className={`card text-center d-flex align-items-end ${
                    location.pathname === "/AdminSettings" ? "active_menu" : ""
                  }`}
                >
                  <div className="card-body px-1 py-4">
                    {location.pathname === "/admin_general_profile" ? (
                      <img src={settingIcon} alt="icon" />
                    ) : (
                      <img src={settingIcon} alt="icon" />
                    )}
                    <p className="card-text">Settings</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
