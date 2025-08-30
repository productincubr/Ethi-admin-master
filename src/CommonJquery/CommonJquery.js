import $ from "jquery";
import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale"; // Import the English (US) locale
const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const validateName = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

const validateMobile = (mobile) => {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile);
};

const validateZip = (zip) => {
  const mobileRegex = /^\d{5}(?:-\d{4})?$/;
  return mobileRegex.test(zip);
};

const check_vaild_save = (class_name) => {
  var isValid = true;

  $("#" + class_name + " .trio_mendate").each(function () {
    let trioEmailElement = $(this).attr("class").includes("trio_email");
    let trioMobnolElement = $(this).attr("class").includes("trio_no");
    let triopasswordlElement = $(this).attr("class").includes("trio_password");
    let triocountlElement = $(this).attr("class").includes("trio_count");
    let trioNamelElement = $(this).attr("class").includes("trio_name");
    let trioZiplElement = $(this).attr("class").includes("trio_zip");
    let minlength = $(this).attr("minlength");
    $(this).css({
      border: "",
      background: "",
    });

    if ($("#" + class_name).hasClass("login_condition")) {
      let emailid = $(".trio_email").val();
      let pass_no = $(".trio_password").val();

      if (emailid === "" && pass_no === "") {
        $(".trio_password").css({
          border: "1px solid red",
          width: "50px !important",
        });
        $(".trio_email").css({
          border: "1px solid red",
          width: "50px !important",
        });
        isValid = false;
        $(".invalid_data").html(
          "Username and Password can't be empty. Please enter valid credentials!"
        );
        $(".invalid_data").show();
      } else if (!validateEmail(emailid)) {
        $(".trio_email").css({
          border: "1px solid red",
          width: "50px !important",
        });
        isValid = false;
        $(".invalid_data").html(
          "Username is Invaild. Please enter valid username!"
        );
        $(".invalid_data").show();
      } else if (pass_no.length === Number(0)) {
        $(".trio_password").css({
          border: "1px solid red",
          width: "50px !important",
        });
        isValid = false;
        $(".invalid_data").html(
          "Password can't be empty. Please enter valid password!"
        );
        $(".invalid_data").show();
      } else if (pass_no.length < Number(8)) {
        $(".trio_password").css({
          border: "1px solid red",
          width: "50px !important",
        });
        isValid = false;
        $(".invalid_data").html(
          "Password is Invalid. Please enter valid password!"
        );
        $(".invalid_data").show();
      }
    }

    let minlength_data = 2;
    if (minlength) {
      minlength_data = minlength;
    }
    if ($(this).is("select")) {
      minlength_data = 1;
    }

    if ($(this).attr("type") == "radio") {
      minlength_data = 1;
    }

    let value_show = $(this).val();

    if (
      value_show === "" ||
      value_show === null ||
      value_show.length < minlength_data
    ) {
      console.log($(this).attr("name"), $(this).val(), class_name);
      console.log($(this));
      isValid = false;
      $(this).css({
        borderBottom: "1px solid red",
        width: "50px !important",
      });
    } else {
      if (trioEmailElement) {
        let emailid = $(this).val();
        if (!validateEmail(emailid)) {
          $(this).css({
            borderBottom: "1px solid red",
            width: "50px !important",
          });
          isValid = false;
        }
      }
      if (trioZiplElement) {
        let zipcode = $(this).val();
        if (!validateZip(zipcode)) {
          $(this).css({
            border: "1px solid red",
            width: "50px !important",
          });
          isValid = false;
        }
      }
      if (trioNamelElement) {
        let name = $(this).val();
        if (!validateName(name)) {
          isValid = false;
          $(this).css({
            borderBottom: "1px solid red",
            width: "50px !important",
          });
        }
      }
      if (trioMobnolElement) {
        let mob_no = $(this).val();
        if (!validateMobile(mob_no)) {
          isValid = false;
          $(this).css({
            borderBottom: "1px solid red",
            width: "50px !important",
          });
        }
      }
      if (triopasswordlElement) {
        let pass_no = $(this).val();

        if (pass_no.length < Number(8)) {
          $(this).css({
            border: "1px solid red",
            width: "50px !important",
          });
        }
      }
      if (triocountlElement) {
        let count_no = $(this).val();

        if (Number(count_no) === 0) {
          alert("Please Add Items");
        }
      }
    }
  });

  return isValid;
};

const combiled_form_data = (form_name, dynaicimage) => {
  const fd = new FormData(document.getElementById(form_name));
  for (const [key, value] of fd.entries()) {
    if (value.type && dynaicimage != null) {
      fd.append(key + "_new", dynaicimage[key]);
    }
  }
  return fd;
};

const handleLinkClick = (link, blank = "") => {
  // Reload the page when the link is clicked
  if (blank === "") {
    window.location.href = link;
  } else {
    window.open(link, blank);
  }
};

const empty_form = (class_name) => {
  if (class_name !== "form_data_profile" && class_name.indexOf(".") === -1) {
    $("#" + class_name + " .trio_mendate").each(function () {
      $(this).val("");
      $(this).css({
        border: "",
        background: "",
      });
    });
  }
};

const make_date_format = (inputDateTime, time_present) => {
  // Define the possible input formats

  const inputFormats = [
    "dd/MM/yyyy hh:mm:ss a", // Note: "a" format is for AM/PM
    time_present,
    "EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)", // Format for the input date̥
    // Add more formats as needed
  ];

  let parsedDate = null;
  let isValidDate = false;
  for (const formatStr of inputFormats) {
    try {
      if (formatStr !== "") {
        parsedDate = parse(inputDateTime, formatStr, new Date(), {
          locale: enUS,
        });

        isValidDate = !isNaN(parsedDate.getTime());
        if (isValidDate) {
          break;
        }
      }
    } catch (error) {}
  }

  let formattedDate = "";
  isValidDate = !isNaN(parsedDate.getTime());
  if (isValidDate) {
    formattedDate = format(parsedDate, "dd MMM yyyy");
  }

  return formattedDate;
};

const getDateOnly = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

const handleReloadClick = () => {
  window.location.reload(); // Reload the page when the button is clicked
};

const handleIaphabetnumberChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9.,\s]/g, "");
};
const handleEmailChange = (e) => {
  e.target.style.borderBottom = "";
  // if (!/^[a-zA-Z0-9@.]*$/.test(e.target.value)) {
  //   e.target.value = ""; // Clear the input if it contains any other character
  // }
  if (
    e.target.value.split("@").length > 2 ||
    e.target.value.split(".").length > 2
  ) {
    // Clear the input if it violates the condition
    e.target.value = "";
  } else if (!/^[a-zA-Z0-9@.]*$/.test(e.target.value)) {
    // If the input contains any other invalid character, clear the input
    e.target.value = "";
  }
};
const handleAphabetsChange = (e) => {
  e.target.style.borderBottom = "";
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
};

const handleAphabetsChange1 = (e) => {
  e.target.style.borderBottom = "";
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
};

const handleNumbersChange = (e) => {
  e.target.style.borderBottom = "";
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const handleNumbersDecimalChange = (e) => {
  e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only digits and decimal point
  e.target.value = e.target.value.replace(/(\d{0,2}(?:\.\d{0,2})?).*$/g, "$1"); // Limit to 3 digits before the decimal and 2 digits after
};
const handleURLChange = (e) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  e.target.value = e.target.value.match(urlRegex) ? e.target.value : "";
};

const handleAlphanumericquestionChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9\s.?]/g, "");
};
const handleIaphabetnumberdotChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9.\s]/g, "");
};

const validatePassword = (e) => {
  // Minimum length requirement
  const password = e.target.value;
  const minLength = 6;

  // Regular expressions for additional criteria
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Check if the password meets all criteria
  if (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  ) {
    return true; // Password is valid
  } else {
    return false; // Password is not valid
  }
};

const computeTodayDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  return maxDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const computeFutureDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate() + 1
  );
  return maxDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const make_image_from_letter = (name) => {
  if (name == null) return;
  name = getInitials(name);
  const size = 50;
  const color = "#34b883";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};


export {
  validateName,
  validateMobile,
  validateEmail,
  make_date_format,
  empty_form,
  check_vaild_save,
  combiled_form_data,
  handleIaphabetnumberChange,
  handleEmailChange,
  handleAphabetsChange,
  handleNumbersChange,
  handleNumbersDecimalChange,
  handleURLChange,
  handleAlphanumericquestionChange,
  handleIaphabetnumberdotChange,
  handleReloadClick,
  validatePassword,
  getDateOnly,
  handleLinkClick,
  computeTodayDate,
  computeFutureDate,
  make_image_from_letter,
};
