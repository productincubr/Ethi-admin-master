import React from "react";
import "../RepeatingComponents/PrimaryButton.css";
import AddBtn from "../../Assests/images/add_svg.svg";

const PrimaryButtonButton = ({ name, onClick }) => {
  return (
    <div className="appointment_btn">
      <button className="btn" onClick={onClick}>
        <img src={AddBtn} alt="AddBtn" />
        <span className="fs-6">{name}</span>
      </button>
    </div>
  );
};

export default PrimaryButtonButton;
