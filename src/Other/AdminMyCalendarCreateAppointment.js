import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/AdminMyCalendarCreateAppointment.css'
import Header from './Header';
import ArrowLeft from '../Assests/images/arrow_left.svg'
import LeftBtn from '../Assests/images/left_btn.svg'
import RightBtn from '../Assests/images/right_btn.svg'
import ClockSvg from '../Assests/images/clock_svg.svg'
// import PatientImg from '../Assests/images/patient_img.svg'
// import CalenderSvg from '../Assests/images/calender.svg'
// import Clock2Svg from '../Assests/images/clock_2.svg'
import DatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";

function AdminMyCalendarCreateAppointment() {

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];

    const onSelectedDay = (selectedDate) => {
        console.log(selectedDate);
    };

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthName = monthNames[currentMonth];

    const [isBusySelected, setIsBusySelected] = useState(false);

    const handleBusyClick = () => {
        setIsBusySelected(true);
    };

    const handleAvailableClick = () => {
        setIsBusySelected(false);
    };

    // Back button
    const navigate = useNavigate();

    return (
        <div className='container-lg my_calendar'>
            <div>
                <Header />
            </div>
            <br />
            <div className='my_calendar_wrapper'>
                <div className='my_calendar_container'>
                    <div className='page_head_container'>
                        <div className='heading_btn_div d-flex align-items-center'>
                            <div className='back_button'>
                                <div className='back_btn' onClick={() => navigate(-1)}><img src={ArrowLeft} alt='icon' /></div>
                            </div>
                            <div className='page_heading'>
                                <h3>My Calendar</h3>
                            </div>
                        </div>
                        <div className='month_name'>
                            <div className='left_btn'>
                                <img src={LeftBtn} alt='button' />
                            </div>
                            {/* <h5>November</h5> */}
                            <h5>{monthName}</h5>
                            <div className='right_btn'>
                                <img src={RightBtn} alt='button' />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='calendar'>
                        <div className='calendar_wrapper'>
                            <div className='months_div'>
                                <div className="months_flex">
                                    {months.map((month, index) => (
                                        <div key={index} className="month d-flex flex-column align-items-center">
                                            <p>{month}</p>
                                            <div style={{ height: '20px', marginTop: '0.3rem' }}>{index === currentMonth && <div className="dot"></div>}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <DatePicker
                                enableScroll={true}
                                enableDaysBefore={1}
                                enableDays={366}
                                selectedDay={onSelectedDay}
                                monthsShown={12}
                            />
                        </div>
                    </div>
                </div>
                <div className='appointment_wrapper'>
                    <div className='appointment_container'>
                        <div className='row appointment_container_row'>
                            <div className='col-lg-8'>
                                <div className='appointment_list_container'>
                                    <div className='appointment_list_head'>
                                        <div className='appointment_list_date'>
                                            <h4>November 20,2022</h4>
                                        </div>
                                        <div className='appointment_busy_avail_btns'>
                                            <button
                                                className={`busy_btn appointemntBtn ${isBusySelected ? 'appointemntBtntSelected' : 'appointemntBtnNotSelected'}`}
                                                onClick={handleBusyClick}
                                            >
                                                Mark as busy slot
                                            </button>
                                            <button
                                                className={`available_btn appointemntBtn ${isBusySelected ? 'appointemntBtnNotSelected' : 'appointemntBtntSelected'}`}
                                                onClick={handleAvailableClick}
                                            >
                                                Mark as available slot
                                            </button>
                                            <button className='create_appointment_btn_super'>Create appointment</button>
                                        </div>
                                    </div>
                                    <div className='appointment_list_head_body'>
                                        <div className='row appointment_list'>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_disabled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_disabled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6 '>
                                                <div className='appointment_list_item_content appointment_disabled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6 '>
                                                <div className='appointment_list_item_content appointment_disabled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6 '>
                                                <div className='appointment_list_item_content appointment_disabled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_allign'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Align</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_allign'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Align</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_pending'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Pending</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_pending'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Pending</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_pending'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Pending</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_cancelled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Cancelled</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content appointment_cancelled'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p>Cancelled</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='appointment_list_item col-lg-3 col-md-4 col-sm-5 col-6'>
                                                <div className='appointment_list_item_content'>
                                                    <p>Sweta Pancholi</p>
                                                    <div className='time_status_div'>
                                                        <div className='time_slot'>
                                                            <img src={ClockSvg} alt='icon' />
                                                            <p>12:00 - 13:00 </p>
                                                        </div>
                                                        <p></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment_call_wrapper'>
                                    <div className='appointment_call_head'>
                                        <h4>Book Appointment</h4>
                                    </div>
                                    <div className='appointment_call_body'>
                                        <div className='appointment_call_body_container'>
                                            <form>
                                                <div className='appointment_call_time_date'>
                                                    <div className='appointment_call_date'>
                                                        {/* <img id='appointment_date' src={CalenderSvg} alt='icon' /> */}
                                                        {/* <p>Thu, 16 Feb</p> */}
                                                        <input type='date' id='appointment_date_input' />
                                                    </div>
                                                    <div className='appointment_call_date'>
                                                        {/* <img src={Clock2Svg} alt='icon' /> */}
                                                        {/* <p>9:30 AM</p> */}
                                                        <input type='time' />
                                                    </div>
                                                </div>
                                                <div className='create_appointment_input_div'>
                                                    <div className='create_appointment_input'>
                                                        <label>New Patient</label>
                                                        <input type='text' />
                                                    </div>
                                                    <div className='create_appointment_input'>
                                                        <label>Mo. Number</label>
                                                        <input type='number' />
                                                    </div>
                                                </div>
                                                <div className='patient_appointment_call_cancel_btns'>
                                                    <button className='appointment_call_btn' >CREATE</button>
                                                    <button className='appointment_cancel_btn' >CANCEL</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMyCalendarCreateAppointment