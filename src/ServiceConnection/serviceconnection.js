import axios from "axios";

const appauth_key = "cjR4Y3hGTHlpLzcwQ2pjUG9CNWFNUT09";
const publishableKey =
  "pk_test_51Nk04xSDhczxvMVA5WZg1tcIbzSgsgjOLZ4fmUl9bolkZxuop0CJDyk1QKoLwb3W3EtHQcOTnfGDuHk16alppuEE00J4EimJkA";

let APL_LINK = "http://192.168.1.11:8080";
APL_LINK = "https://ethi-backend-master-1.onrender.com";
let local_server_link_react = APL_LINK + "/api/admin_link/";
let local_server_web_react = APL_LINK + "/api/web_link/";

let local_server_link_doctor_react = APL_LINK + "/api/doctor_link/";

/**New doctor panel */

const create_appointments_by_doctor =
  local_server_link_doctor_react + "create_appointments_by_doctor";

const create_patient_by_doctor =
  local_server_link_doctor_react + "create_patient_by_doctor";
const login_to_doctor = local_server_link_doctor_react + "login_to_doctor";
const web_contact_form = local_server_web_react + "customer_web_contact_form";
const web_subscribe_email =
  local_server_web_react + "customer_web_subscribe_email";
const welcome_doctor = local_server_link_doctor_react + "welcome_doctor";
const cancel_appointment_by_doctor =
  local_server_link_doctor_react + "cancel_appointment_by_doctor";
const my_patients_doctor =
  local_server_link_doctor_react + "my_patients_doctor";
const post_doctor_get = local_server_link_doctor_react + "post_doctor_get";
const post_doctor_save = local_server_link_doctor_react + "post_doctor_save";
const my_patients_full_details_doctor =
  local_server_link_doctor_react + "my_patients_full_details_doctor";

const post_customer_sms = local_server_link_doctor_react + "post_customer_sms";
const get_booking_data = local_server_link_doctor_react + "get_booking_data";
const get_booking_data_by_customer =
  local_server_link_doctor_react + "get_booking_data_by_customer";
const get_appointment_by_doctor =
  local_server_link_doctor_react + "get_appointment_by_doctor";
const diet_form_patients_save =
  local_server_link_doctor_react + "diet_form_patients_save";
const get_doctor_by_single =
  local_server_link_doctor_react + "get_doctor_by_single";
//check unwanted data
const my_patients_data_single =
  local_server_link_doctor_react + "my_patients_data_single";
const get_last_appointment =
  local_server_link_doctor_react + "get_last_appointment";
const assesment_form_patients_save =
  local_server_link_doctor_react + "assesment_form_patients_save";
const post_leave_request_save =
  local_server_link_doctor_react + "post_leave_request_save";
const change_password_save =
  local_server_link_doctor_react + "change_password_save";
const update_water_sleep =
  local_server_link_doctor_react + "update_water_sleep";

const update_period = local_server_link_doctor_react + "update_period";
const save_ethi_doctor_feedback =
  local_server_link_doctor_react + "save_ethi_doctor_feedback";
const submit_pre_payment_call_website =
  local_server_link_doctor_react + "submit_pre_payment_call_website";
const get_package_data = local_server_link_doctor_react + "get_package_data";
const send_pdf_diet_by_customer =
  local_server_link_doctor_react + "send_pdf_diet_by_customer";
const update_patient_by_doctor =
  local_server_link_doctor_react + "update_patient_by_doctor";
/**New doctor panel */

/**New admin panel */
const login_to_superadmin = local_server_link_react + "login_to_superadmin";
const welcome_page = local_server_link_react + "welcome_page";
const delete_master_data = local_server_link_react + "delete_master_data";

const create_appointments_by_admin =
  local_server_link_react + "create_appointments_by_admin";
const setting_page_save = local_server_link_react + "setting_page_master";
const goal_master_save = local_server_link_react + "goal_master_save";
const ethi_front_master_save = local_server_link_react + "ethi_front_master";

const ethi_testmonial_master_save =
  local_server_link_react + "ethi_testmonial_master";
const ethi_faq_master_save = local_server_link_react + "ethi_faq_master";
const ethi_package_master_save =
  local_server_link_react + "ethi_package_master";
const update_admin_master_save =
  local_server_link_react + "update_admin_master";
const ethi_help_center_master =
  local_server_link_react + "ethi_help_center_master";
const ethi_quote_master_post =
  local_server_link_react + "ethi_quote_master_post"; // quearies
const post_video_libery = local_server_link_react + "post_video_libery";
const upload_supplements = local_server_link_react + "upload_supplements";
const get_all_notification = local_server_link_react + "get_all_notification";
const post_notification = local_server_link_react + "post_notification";
const get_all_admin = local_server_link_react + "get_all_admin";
const add_staff = local_server_link_react + "add_staff";
const update_staff = local_server_link_react + "update_staff";
const get_leaves = local_server_link_react + "get_leaves";
const update_leaves = local_server_link_react + "update_leaves"; // leave accept/reject
const ethi_query_master_get = local_server_link_react + "ethi_query_master_get";
const get_quote = local_server_link_react + "get_quote";
const get_all_doctor = local_server_link_react + "get_all_staff";
const add_doctor = local_server_link_react + "add_doctor";
const update_doctor = local_server_link_react + "update_doctor";
const change_password_admin_save =
  local_server_link_react + "change_password_admin_save";
const get_admin_by_single = local_server_link_react + "get_admin_by_single";
const ethi_customer_update_call_flag =
  local_server_link_react + "ethi_customer_update_call_flag";
/**New admin panel */

// Retrieving data
const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };
  if (form_data == null) {
    form_data = new FormData();
  }
  form_data.append("appauth_key", appauth_key);
  return axios.post(url_for, form_data);
};

export {
  APL_LINK,
  appauth_key,
  server_post_data,
  web_contact_form,
  web_subscribe_email,
  create_appointments_by_doctor,

  /*Admin api */
  welcome_page,
  login_to_superadmin,
  goal_master_save,
  ethi_front_master_save,
  setting_page_save,
  delete_master_data,
  ethi_testmonial_master_save,
  ethi_faq_master_save,
  ethi_package_master_save,
  update_admin_master_save,
  get_all_notification,
  post_notification,
  ethi_help_center_master,
  ethi_quote_master_post,
  post_video_libery,
  change_password_admin_save,
  ethi_query_master_get,
  add_staff,
  add_doctor,
  get_all_doctor,
  get_all_admin,
  update_staff,
  update_doctor,
  get_quote,
  get_leaves,
  update_leaves,
  upload_supplements,
  create_appointments_by_admin,
  get_admin_by_single,
  ethi_customer_update_call_flag,
  /*Admin api */

  /*doctor api */
  login_to_doctor,
  welcome_doctor,
  create_patient_by_doctor,
  my_patients_doctor,
  post_doctor_save,
  post_doctor_get,
  my_patients_full_details_doctor,
  my_patients_data_single,
  assesment_form_patients_save,
  diet_form_patients_save,
  get_doctor_by_single,
  post_leave_request_save,
  change_password_save,
  get_appointment_by_doctor,
  cancel_appointment_by_doctor,
  get_last_appointment,
  get_booking_data,
  update_water_sleep,
  post_customer_sms,
  update_period,
  save_ethi_doctor_feedback,
  get_booking_data_by_customer,
  submit_pre_payment_call_website,
  get_package_data,
  send_pdf_diet_by_customer,
  update_patient_by_doctor,
  /*doctor api */
  publishableKey,
};
