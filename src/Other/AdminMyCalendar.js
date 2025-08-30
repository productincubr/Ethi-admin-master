import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/AdminMyCalendar2.css'
import Header from './Header';
import ArrowLeft from '../Assests/images/arrow_left.svg'
import LeftBtn from '../Assests/images/left_btn.svg'
import RightBtn from '../Assests/images/right_btn.svg'
import ClockSvg from '../Assests/images/clock_svg.svg'
import PatientImg from '../Assests/images/patient_img.svg'
import CalenderSvg from '../Assests/images/calender.svg'
import Clock2Svg from '../Assests/images/clock_2.svg'
import DatePicker from "../../node_modules/react-horizontal-strip-datepicker/dist/index";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";

function AdminMyCalendar() {

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
    const [isBusySelected, setIsBusySelected] = useState(true);

    const handleAppointmentClick = (index) => {
        if (isBusySelected) {
            const updatedAppointmentData = appointmentData.map((appointment, i) => {
                if (i === index && appointment.status === 'available') {
                    return { ...appointment, status: 'disabled' };
                }
                return appointment;
            });

            setAppointmentData(updatedAppointmentData);
        } else {
            const updatedAppointmentData = appointmentData.map((appointment, i) => {
                if (i === index && appointment.status === 'disabled') {
                    return { ...appointment, status: 'available' };
                }
                return appointment;
            });

            setAppointmentData(updatedAppointmentData);
        }
    };

    const handleBusyClick = () => {
        setIsBusySelected(true);
    };

    const handleAvailableClick = () => {
        setIsBusySelected(false);
    };

    const [appointmentData, setAppointmentData] = useState([
        { name: 'Thor', status: 'disabled', time: '12:00 - 13:00' },
        { name: 'Ironman', status: 'cancelled', time: '12:00 - 13:00' },
        { name: 'Hulk', status: 'align', time: '12:00 - 13:00' },
        { name: 'Captain America', status: 'pending', time: '12:00 - 13:00' },
        { name: 'Sweta Pancholi', status: 'available', time: '12:00 - 13:00' }
    ]);

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
                                            <h4>November 20, 2022</h4>
                                        </div>
                                        <div className='appointment_busy_avail_btns'>
                                            <button
                                                className={`busy_btn appointemntBtn ${isBusySelected ? 'appointemntBtntSelected' : 'appointemntBtnNotSelected'}`}
                                                onClick={handleBusyClick}
                                            >
                                                Mark As Busy Slot
                                            </button>
                                            <button
                                                className={`available_btn appointemntBtn ${isBusySelected ? 'appointemntBtnNotSelected' : 'appointemntBtntSelected'}`}
                                                onClick={handleAvailableClick}
                                            >
                                                Mark As Available Slot
                                            </button>
                                        </div>
                                    </div>
                                    {/* Start */}
                                    <div className='appointment_list_head_body'>
                                        <div className="row appointment_list">
                                            {appointmentData.map((appointment, index) => (
                                                <div
                                                    className="appointment_list_item col-lg-3 col-md-4 xol-sm-5"
                                                    key={index}
                                                    onClick={() => handleAppointmentClick(index)}
                                                >
                                                    <div
                                                        className={`appointment_list_item_content ${appointment.status === 'align' ? 'appointment_allign' :
                                                            appointment.status === 'cancelled' ? 'appointment_cancelled' :
                                                                appointment.status === 'pending' ? 'appointment_pending' :
                                                                    appointment.status === 'available' ? 'appointment_available' :
                                                                        'appointment_disabled'
                                                            }`}
                                                    >
                                                        <p>{appointment.name}</p>
                                                        <div className="time_status_div">
                                                            <div className="time_slot">
                                                                <img src={ClockSvg} alt="icon" />
                                                                <p>{appointment.time}</p>
                                                            </div>
                                                            <p>
                                                                {appointment.status === 'cancelled' ? 'Cancelled' :
                                                                    appointment.status === 'align' ? 'Align' :
                                                                        appointment.status === 'pending' ? 'Pending' :
                                                                            appointment.status === 'available' ? '' :
                                                                                ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* End */}
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <div className='appointment_call_wrapper'>
                                    <div className='appointment_call_head'>
                                        <h4>Appointment</h4>

                                        {/* -----------------Appointment Call number Hidden--------------------  */}
                                        {/* <div className='appointment_call_number_wrapper'>
                                            <div className='appointment_call_number_div appointment_call_number_div_disabled'>
                                                <div className='appointment_call_number'>
                                                    <p>1</p>
                                                </div>
                                                <div className='red_dot'></div>
                                            </div>
                                            <div className='appointment_call_number_div appointment_call_number_div_disabled'>
                                                <div className='appointment_call_number'>
                                                    <p>2</p>
                                                </div>
                                                <div className='red_dot'></div>
                                            </div>
                                            <div className='appointment_call_number_div'>
                                                <div className='appointment_call_number appointment_call_number_selected'>
                                                    <p>3</p>
                                                </div>
                                                <div className='red_dot dot_visible'></div>
                                            </div>
                                            <div className='appointment_call_number_div'>
                                                <div className='appointment_call_number appointment_call_number_upcoming'>
                                                    <p>4</p>
                                                </div>
                                                <div className='red_dot'></div>
                                            </div>
                                            <div className='appointment_call_number_div'>
                                                <div className='appointment_call_number appointment_call_number_upcoming'>
                                                    <p>5</p>
                                                </div>
                                                <div className='red_dot'></div>
                                            </div>
                                        </div> */}

                                    </div>
                                    <div className='appointment_call_body'>
                                        <div className='appointment_call_body_container'>
                                            <div className='appointment_patient_img'>
                                                <img src={PatientImg} alt='Patient' />
                                            </div>
                                            <h5>Ishika Mehta</h5>
                                            <div className='appointment_call_time_date'>
                                                <div className='appointment_call_date'>
                                                    <img src={CalenderSvg} alt='icon' />
                                                    <p>Thu, 16 Feb</p>
                                                </div>
                                                <div className='appointment_call_date'>
                                                    <img src={Clock2Svg} alt='icon' />
                                                    <p>9:30 AM</p>
                                                </div>
                                            </div>
                                            <div className='patient_appointment_call_cancel_btns'>
                                                <button className='appointment_call_btn'>CALL</button>
                                                <button className='appointment_cancel_btn'>CANCEL</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminMyCalendar;