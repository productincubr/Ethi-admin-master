import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Css/AdminMyStaffProfile.css'
import Header from './Header'
import ArrowLeft from '../Assests/images/arrow_left.svg'
import Avatar1 from '../Assests/images/avatar1.png'
import Avatar2 from '../Assests/images/avatar2.png'
import Avatar3 from '../Assests/images/avatar3.png'
import EmailSvg from '../Assests/images/email.svg'
import MapPinSvg from '../Assests/images/map-pin.svg'
import DegreeSvg from '../Assests/images/degree.svg'
import BriefcaseSvg from '../Assests/images/briefcase .svg'
import SignOutSvg from '../Assests/images/sign-out.svg'
import TrashSvg from '../Assests/images/trash.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import $ from 'jquery';

function AdminMyStaffProfile() {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        // const date = e.target.value
        setSelectedDate(date);
   
    };

    const [showAll, setShowAll] = useState(false);
    const initialItemsToShow = 2;

    const toggleItems = () => {
        setShowAll(!showAll);
    };

    const employees = [
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar1
        },
        {
            name: 'Ava Dolton',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar2
        },
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar3
        },
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar1
        },
        {
            name: 'Ava Dolton',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar2
        },
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar3
        },
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar1
        },
        {
            name: 'Ava Dolton',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar2
        },
        {
            name: 'Elena Osborne',
            time: '25/07/23 | 10:00AM-10:30AM',
            avatar: Avatar3
        },
    ];

    const filteredEmployees = showAll ? employees : employees.slice(0, initialItemsToShow);

    const [selectedDays, setSelectedDays] = useState([]);
    const handleSelection = () => {
        const workdays = $('.day_name.weekday_selected').map(function () {
            return $(this).attr('value');
        }).get();
        setSelectedDays(workdays)
    }

    $(document).ready(function () {
        $('.day_name').on('click', function () {
            $(this).addClass('weekday_selected');
            handleSelection();
        });

        $('.weekdays_save_btn').on('click', function () {
            console.log(selectedDays);
            $('.day_name').removeClass('weekday_selected');
            setSelectedDays([]);
        });
    });

    // Back button
    const navigate = useNavigate();

    return (
        <div className='container-xl create_diet_plan general_profile'>
            <div>
                <Header />
            </div>
            <div className='create_diet_plan_dash general_profile_dash'>
                <div className='my_patients_dash_head general_profile_dash_head'>
                    <div className='my_patients_dash_head_container general_profile_dash_head_container'>
                        <div className='back_btn_heading'>
                            <span>
                                <div className='back_btn' onClick={() => navigate(-1)}><img src={ArrowLeft} alt='icon' /></div>
                            </span>
                            <h4>My Profile</h4>
                        </div>
                    </div>
                </div>
                <div className='create_diet_plan_dash_container general_profile_dash_container p-3'>
                    <div className='row create_diet_plan_dash_container_row'>
                        <div className='col-lg-8'>
                            <div className='my_staff_dash_wrapper'>
                                <div className='my_staff_dash_container'>
                                    <div className='leave_request_div'>
                                        <div className='leave_request_head'>
                                            <h5>Leave Requests: {employees.length}</h5>
                                            {!showAll && employees.length > initialItemsToShow && (
                                                <p onClick={toggleItems}>View all</p>
                                            )}
                                            {showAll && (
                                                <p onClick={toggleItems}>View less</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className='my_staff_list my_patientslist_items'>
                                        <ul>
                                            {filteredEmployees.map((employee, index) => (
                                                <li key={index}>
                                                    <div className='my_patients_item'>
                                                        <div className='my_patients_item_left'>
                                                            <div className='my_patients_item_img'>
                                                                <img src={employee.avatar} alt='Patient' />
                                                            </div>
                                                            <div className='my_patients_item_text'>
                                                                <h5>{employee.name}</h5>
                                                                <p>{employee.time}</p>
                                                            </div>
                                                        </div>
                                                        <div className='my_patients_item_right'>
                                                            {!showAll && <span className='btn my_staff_approve_btn my_patients_call_btn'>APPROVE</span>}
                                                            {showAll && <span className='btn my_staff_cancel_btn my_patients_cancel_btn'>Cancel</span>}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='change_shift_wrapper'>
                                        <div className='change_shift_container'>
                                            <h5>Change shift and days</h5>
                                            <div className='shift_date_time_container'>
                                                <div className='row'>
                                                    <div className='shift_date_wrapper col-lg-5 mx-auto'>
                                                        <div className='shift_date_container'>
                                                            <h5>Select Date</h5>
                                                            <div className='calender_shift_date'>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DateCalendar
                                                                        // name='date'
                                                                        value={selectedDate}
                                                                        onChange={handleDateChange} />
                                                                </LocalizationProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='shift_time_wrapper col-lg-5 mx-auto'>
                                                        <div className='shift_time_container'>
                                                            <h5>Select Time</h5>
                                                            <div className='time_shift_date'>
                                                                <div className='time_shift_date_inputs'>
                                                                    <div className='start_time_input'>
                                                                        <p>Sleep Time</p>
                                                                        <input type='time' />
                                                                    </div>
                                                                    <div className='end_time_input'>
                                                                        <p>Sleep Time</p>
                                                                        <input type='time' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='shift_week_days_container'>
                                                    <div className='week_days_wrapper'>
                                                        <ul>
                                                            <li>
                                                                <div className='day_name' value='Sunday'>
                                                                    <h6>Sun</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Monday'>
                                                                    <h6>Mon</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Tuesday'>
                                                                    <h6>Tue</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Wednesday'>
                                                                    <h6>Wed</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Thursday'>
                                                                    <h6>Thu</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Friday'>
                                                                    <h6>Fri</h6>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className='day_name' value='Saturda'>
                                                                    <h6>Sat</h6>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className='weekdays_svae_cancel_btns'>
                                                        <button className='weekdays_cancel_btn'>CANCEL</button>
                                                        <button className='weekdays_save_btn'>SAVE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='create_diet_patient_wrapper general_profile_details_wrapper'>
                                <div className='create_diet_patient_details_div'>
                                    <div className='create_diet_patient_img_div'>
                                        <img src={Avatar3} alt='Patient' />
                                    </div>
                                    <div className='create_diet_patient_details general_profile_nutritionist'>
                                        <div className='patient_details'>
                                            <h3>Dr. Emma Scotts</h3>
                                            <p>Nutritionist</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='doctors_ratings_eranings'>
                                    <div className='doctors_patient_count'>
                                        <h4>55</h4>
                                        <h6>Patient</h6>
                                    </div>
                                    <div className='doctors_earnings_count'>
                                        <h4>55k</h4>
                                        <h6>Earnings</h6>
                                    </div>
                                    <div className='doctors_ratings_count'>
                                        <h4>4.7</h4>
                                        <h6>Rating</h6>
                                    </div>
                                </div>
                                <div className='patient_medical_wrapper'>
                                    <div className='saved_profile_details_wrapper'>
                                        <div className='saved_email saved_profile_detail'>
                                            <img src={EmailSvg} alt='icon' />
                                            <p>emma.scotts@gmail.com</p>
                                        </div>
                                        <div className='saved_address saved_profile_detail'>
                                            <img src={MapPinSvg} alt='icon' />
                                            <p>Boston , Massachusetts 10004 USA</p>
                                        </div>
                                        <div className='saved_education saved_profile_detail'>
                                            <img src={DegreeSvg} alt='icon' />
                                            <p>MBBS</p>
                                        </div>
                                        <div className='saved_experience saved_profile_detail'>
                                            <img src={BriefcaseSvg} alt='icon' />
                                            <p>10 Years</p>
                                        </div>
                                    </div>
                                    <div className='logout_dlt_btn_wrapper'>
                                        <div className='logout_profile saved_profile_detail'>
                                            <img src={SignOutSvg} alt='icon' />
                                            <p>Log Out</p>
                                        </div>
                                        <div className='delete_profile saved_profile_detail'>
                                            <img src={TrashSvg} alt='icon' />
                                            <p>Delete Account</p>
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

export default AdminMyStaffProfile