import React, { useState, useEffect, useRef } from "react";
import "../../Css/NutritionistHome.css";
import deleteIcon from "../../Assests/images/delete.png";
import ProfileImgSample from "../../Assests/images/profile_sample.jpg";
import PaperIcon from "../../Assests/images/paper_icon.svg";
import Dropzone from "react-dropzone";
import AddBtn from "../../Assests/images/add_svg.svg";
import {
  APL_LINK,
  goal_master_save,
  server_post_data,
  ethi_front_master_save,
  setting_page_save,
  delete_master_data,
  ethi_testmonial_master_save,
  ethi_faq_master_save,
  ethi_help_center_master,
  ethi_package_master_save,
  update_admin_master_save,
  ethi_quote_master_post,
  post_video_libery,
  upload_supplements,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  handleAphabetsChange,
  combiled_form_data,
  handleIaphabetnumberChange,
  handleNumbersChange,
  handleAlphanumericquestionChange,
  empty_form,
} from "../../CommonJquery/CommonJquery.js";
import AdminHeader from "./AdminHeader";

let flag_for = 0;
let for_status_final = 0;

export default function AdminPanelSettings() {
  const [showLoader, setShowLoader] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [goalsArray, setGoalsArray] = useState([]);
  const [select_image_goal, setSelectImageGoal] = useState([]);
  const [frontGoal, setFrontGoal] = useState([]);
  const [select_image_front, setSelectImageFront] = useState([]);
  const [testmonialGoal, setTestmonialGoal] = useState([]);
  const [faqgoal, setFaqGoal] = useState([]);
  const [helpcenterdata, setHelpcenterdata] = useState([]);
  const [quotedata, setQuotedata] = useState([]);
  const [videodata, setVideodata] = useState([]);
  const [select_image_testmonialGoal, setSelectImageTestmonialGoal] = useState(
    []
  );
  const [data_ethi_video_master_image, setdata_ethi_video_master_image] =
    useState([]);
  const [packagegoal, setPackageGoal] = useState([]);
  const [adminGoal, setAdminGoal] = useState([]);
  const [select_image_admin, setSelectImageAdmin] = useState([]);
  const [dynaicimage, setDynaicimage] = useState(null);
  const [featuresCount, setFeaturesCount] = useState(1);
  useEffect(() => {
    master_data_get();
  }, []);

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(setting_page_save, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setGoalsArray(Response.data.message.data_goal);
          setSelectImageGoal(APL_LINK + Response.data.message.data_goal_image);

          setFrontGoal(Response.data.message.data_front);
          setSelectImageFront(
            APL_LINK + Response.data.message.data_front_image
          );
          setTestmonialGoal(Response.data.message.data_testmonial);

          setHelpcenterdata(Response.data.message.data_ethi_help_center);
          setQuotedata(Response.data.message.data_ethi_quote);
          setVideodata(Response.data.message.data_video_libery);
          setdata_ethi_video_master_image(
            APL_LINK + Response.data.message.data_ethi_video_master_image
          );

          setSelectImageTestmonialGoal(
            APL_LINK + Response.data.message.data_testmonial_image
          );
          setFaqGoal(Response.data.message.data_faq);

          setPackageGoal(Response.data.message.data_package);
          setAdminGoal(Response.data.message.data_admin[0]);
          setSelectImageAdmin(
            APL_LINK + Response.data.message.data_admin_image
          );

          setDynaicimage((prevImages) => ({
            ...prevImages,
            doctor_image: select_image_admin + adminGoal.doctor_image,
            doctor_image_show: select_image_admin + adminGoal.doctor_image,
          }));
          setDynaicimage((prevImages) => ({
            ...prevImages,
            apple_image: select_image_admin + adminGoal.apple_image,
            apple_image_show: select_image_admin + adminGoal.apple_image,
          }));
          setDynaicimage((prevImages) => ({
            ...prevImages,
            front_video_link: select_image_admin + adminGoal.front_video_link,
            front_video_link_show:
              select_image_admin + adminGoal.front_video_link,
          }));
          setDynaicimage((prevImages) => ({
            ...prevImages,
            image_for_noti:
              data_ethi_video_master_image + adminGoal.video_image,
            image_for_noti_show: select_image_admin + adminGoal.video_image,
          }));
          const initialLikesplues = Response.data.message.data_package.map(
            (item) => {
              return item.status_for === "0";
            }
          );
          setToggleStates(initialLikesplues);

          const initialLikesplues1 =
            Response.data.message.data_ethi_help_center.map((item) => {
              return item.popular_type === "0";
            });
          setTogglePopulor(initialLikesplues1);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleFileChangedynamic = (keyname) => (event) => {
    const file = event.target.files[0];

    let new_file_name = keyname + "_show";

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDynaicimage((prevImages) => ({
        ...prevImages,
        [keyname]: null,
        [new_file_name]: null,
      }));
    }
  };

  // Function to handle the delete icon click
  const handleDeleteIconClick = (goalId, for_set, for_status) => {
    flag_for = for_set;
    for_status_final = for_status;
    setSelectedGoalId(goalId);
  };

  // Function to handle the delete operation for the selected goal
  const handleDeleteConfirmed = async (packageId) => {
    if (flag_for !== 0) {
      setShowLoader(true);
      const fd = new FormData();
      if (packageId === 0) {
        fd.append("id_for_delete", selectedGoalId);
      } else {
        fd.append("id_for_delete", packageId);
      }

      fd.append("flag_for", flag_for);
      fd.append("for_status_final", for_status_final);
      await server_post_data(delete_master_data, fd)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
            if (packageId === 0) {
              master_data_get();
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  // Function to handle the delete operation for the selected goal
  const closepopup = () => {
    if (selectedGoalId !== null) {
      setSelectedGoalId(null); // Clear the selectedGoalId to close the delete popup
    }
  };

  const [fileForFood, setFileForFood] = useState(null);
  const [fileForSupplement, setFileForSupplement] = useState(null);
  const [fileForRemember, setFileForRemember] = useState(null);

  // const onDrop = (acceptedFiles, keyname) => {
  //   let new_file_name = keyname + "_show";

  //   if (keyname === "image_for_food") {
  //     setFileForFood(acceptedFiles[0]);
  //   } else if (keyname === "image_for_supplement") {
  //     setFileForSupplement(acceptedFiles[0]);
  //   } else if (keyname === "image_for_remember") {
  //     setFileForRemember(acceptedFiles[0]);
  //   }

  //   setDynaicimage((prevImages) => ({
  //     ...prevImages,
  //     [keyname]: acceptedFiles[0],
  //     [new_file_name]: acceptedFiles[0],
  //   }));
  // };

  const onDrop = (acceptedFiles, keyname) => {
    let new_file_name = keyname + "_show";

    const file = acceptedFiles[0];

    // Check if there's at least one file
    if (file) {
      // Check if the file has a .csv extension
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension === "csv") {
        // Set state based on keyname
        if (keyname === "image_for_food") {
          setFileForFood(file);
        } else if (keyname === "image_for_supplement") {
          setFileForSupplement(file);
        } else if (keyname === "image_for_remember") {
          setFileForRemember(file);
        }

        // Set dynamic images in state
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: file,
        }));
      } else {
        alert("Please upload only CSV files.");
      }
    }
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("admin_id", "0");
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            empty_form(form_data);
            const closeButton = document.querySelector(
              "#" + form_data + ' [data-dismiss="modal"]'
            );

            if (closeButton) {
              closeButton.click();
            }
            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const featureInputs = [];
  for (let i = 2; i <= featuresCount; i++) {
    featureInputs.push(
      <input
        key={i}
        placeholder={`Feature ${i}`}
        name={`feature_${i}`}
        className="p-2 my-2 trio_mendate"
        maxLength={100}
        onInput={handleIaphabetnumberChange}
      />
    );
  }

  const handleAddFeatureClick = () => {
    if (featuresCount < 5) {
      setFeaturesCount(featuresCount + 1);
    }
  };

  const [toggleStates, setToggleStates] = useState({});
  const handleToggleChange = (packageId, index) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    flag_for = 6;
    setSelectedGoalId(packageId);
    if (toggleStates[index]) {
      for_status_final = 1;
    } else {
      for_status_final = 0;
    }
    handleDeleteConfirmed(packageId);
  };

  const [togglePopulor, setTogglePopulor] = useState({});
  const handleTogglePopulor = (packageId, index) => {
    setTogglePopulor((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    flag_for = 16;
    setSelectedGoalId(packageId);
    if (togglePopulor[index]) {
      for_status_final = 1;
    } else {
      for_status_final = 0;
    }
    handleDeleteConfirmed(packageId);
  };

  const handleTextareaChange = (keyname) => (event) => {
    // Update the state when the textarea content changes
    setAdminGoal({
      ...adminGoal,
      [keyname]: event.target.value,
    });
  };

  const handleDownloadCSV = (csvData, excel_name) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = excel_name + ".csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCancelClick = () => {
    setFileForFood(null);
    setFileForSupplement(null);
    setFileForRemember(null);
  };

  return (
    <div className="container-lg nutritionist_home">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>
      <div className="dashboard mt-4">
        <div className="dashboard_wrapper">
          <div className="dashboard_container row">
            <div className="col-lg-12 m-0">
              {/* tracking/Counts cards */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head csv_btns_div">
                        <h3 className="fntNanitu">Upload List</h3>
                        <div className="csv_bbtns">
                          <button
                            onClick={() =>
                              handleDownloadCSV("Food Name", "food_excel")
                            }
                            className="fntNanitu"
                          >
                            Food List
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadCSV(
                                "Supplements Name",
                                "Supplements_excel"
                              )
                            }
                            className="fntNanitu"
                          >
                            Supplements List
                          </button>
                          <button
                            onClick={() =>
                              handleDownloadCSV("Notes Name", "Notes_excel")
                            }
                            className="fntNanitu"
                          >
                            Notes List
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="general_profile_uplaod_wrapper">
                      <div className="uplaod_container">
                        <form id="form_data_document">
                          <div className="upload_list_wrapper">
                            <div className="row">
                              <div className="upload_list_container col-md-4 col-sm-11 m-auto">
                                <Dropzone
                                  onDrop={(acceptedFiles) =>
                                    onDrop(acceptedFiles, "image_for_food")
                                  }
                                >
                                  {({
                                    getRootProps,
                                    getInputProps,
                                    isDragActive,
                                  }) => (
                                    <div {...getRootProps()}>
                                      <h6 className="fntNanitu">
                                        Upload list of Food Items
                                      </h6>
                                      <label
                                        htmlFor="food_items_input"
                                        className={`upload_input_wrapper drag-and-drop-input ${
                                          isDragActive ? "dragging" : ""
                                        }`}
                                      >
                                        {isDragActive ? (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            <p>Drop the files here ...</p>
                                          </div>
                                        ) : (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            {fileForFood ? (
                                              <>
                                                <div className="file-name">
                                                  <p>{fileForFood.name}</p>
                                                </div>
                                              </>
                                            ) : (
                                              <p className="col-lg-10">
                                                Please select file or drag and
                                                drop here, upload only CSV file.
                                              </p>
                                            )}
                                          </div>
                                        )}
                                        <input
                                          type="file"
                                          accept=".csv"
                                          id="image_for_food"
                                          name="image_for_food"
                                          {...getInputProps()}
                                          hidden
                                        />
                                      </label>
                                    </div>
                                  )}
                                </Dropzone>
                              </div>

                              <div className="upload_list_container col-md-4 col-sm-11 m-auto">
                                <Dropzone
                                  onDrop={(acceptedFiles) =>
                                    onDrop(
                                      acceptedFiles,
                                      "image_for_supplement"
                                    )
                                  }
                                >
                                  {({
                                    getRootProps,
                                    getInputProps,
                                    isDragActive,
                                  }) => (
                                    <div {...getRootProps()}>
                                      <h6 className="fntNanitu">
                                        Upload list of Supplements
                                      </h6>
                                      <label
                                        htmlFor="food_items_input"
                                        className={`upload_input_wrapper drag-and-drop-input ${
                                          isDragActive ? "dragging" : ""
                                        }`}
                                      >
                                        {isDragActive ? (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            <p>Drop the files here ...</p>
                                          </div>
                                        ) : (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            {fileForSupplement ? (
                                              <>
                                                <div className="file-name">
                                                  <p>
                                                    {fileForSupplement.name}
                                                  </p>
                                                </div>
                                              </>
                                            ) : (
                                              <p className="col-lg-10">
                                                Please select file or drag and
                                                drop here, upload only CSV file.
                                              </p>
                                            )}
                                          </div>
                                        )}
                                        <input
                                          type="file"
                                          accept=".csv"
                                          id="image_for_supplement"
                                          name="image_for_supplement"
                                          {...getInputProps()}
                                          hidden
                                        />
                                      </label>
                                    </div>
                                  )}
                                </Dropzone>
                              </div>

                              <div className="upload_list_container col-md-4 col-sm-11 m-auto">
                                <Dropzone
                                  onDrop={(acceptedFiles) =>
                                    onDrop(acceptedFiles, "image_for_remember")
                                  }
                                >
                                  {({
                                    getRootProps,
                                    getInputProps,
                                    isDragActive,
                                  }) => (
                                    <div {...getRootProps()}>
                                      <h6 className="fntNanitu">
                                        Upload list of Points to Remember
                                      </h6>
                                      <label
                                        htmlFor="food_items_input"
                                        className={`upload_input_wrapper drag-and-drop-input ${
                                          isDragActive ? "dragging" : ""
                                        }`}
                                      >
                                        {isDragActive ? (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            <p>Drop the files here ...</p>
                                          </div>
                                        ) : (
                                          <div className="label_items">
                                            <img src={PaperIcon} alt="icon" />
                                            {fileForRemember ? (
                                              <>
                                                <div className="file-name">
                                                  <p>{fileForRemember.name}</p>
                                                </div>
                                              </>
                                            ) : (
                                              <p className="col-lg-10">
                                                Please select file or drag and
                                                drop here, upload only CSV file.
                                              </p>
                                            )}
                                          </div>
                                        )}
                                        <input
                                          type="file"
                                          accept=".csv"
                                          id="image_for_remember"
                                          name="image_for_remember"
                                          {...getInputProps()}
                                          hidden
                                        />
                                      </label>
                                    </div>
                                  )}
                                </Dropzone>
                              </div>
                            </div>
                            <div className="upload_btns_div col-12">
                              <button
                                type="button"
                                className="upload_list_upload_btn fntNanitu"
                                onClick={handleCancelClick}
                              >
                                CANCEL
                              </button>
                              <button
                                type="button"
                                className="upload_list_upload_btn fntNanitus"
                                onClick={() =>
                                  handleSaveChangesdynamic(
                                    "form_data_document",
                                    upload_supplements
                                  )
                                }
                              >
                                UPLOAD
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming appointments list */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Goals</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#addNewGoal"
                        >
                          <img src={AddBtn} />
                          <p className="m-0 ms-1 fntNanitu  ">Add Goals</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <ul>
                        {goalsArray.map((item, index) => (
                          <li
                            className="d-flex addedGoalsList my-3 "
                            key={index}
                          >
                            <div className="d-flex addedGoalsContainer ActiveGoal">
                              <img
                                className="goalsIimg"
                                src={select_image_goal + item.goal_image}
                                onError={(e) => {
                                  e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                }}
                                alt="goals"
                              />
                              <div className="ml-3">
                                <h4 className="goalTitleAdd fntNanitu">
                                  {item.goal_name}
                                </h4>
                                <p className="goalDesAdd m-0 fntNanitu">
                                  {item.goal_details}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <img
                                className="deleteIcon"
                                src={deleteIcon}
                                alt="delete"
                                data-toggle="modal"
                                data-target="#deleteGoalPopup"
                                onClick={() =>
                                  handleDeleteIconClick(item._id, 1, 0)
                                }
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Patients list */}
              {/* Upcoming appointments list */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">
                          What You will get from ETHI
                        </h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#getFromEthi"
                        >
                          <img src={AddBtn} />
                          <p className="m-0 ms-1 fntNanitu">Add</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <ul>
                        {frontGoal.map((item, index) => (
                          <li
                            className="d-flex addedGoalsList my-3"
                            key={index}
                          >
                            <div className="d-flex addedGoalsContainer ActiveGoal">
                              <img
                                className="goalsIimg"
                                src={select_image_front + item.front_image}
                                onError={(e) => {
                                  e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                }}
                                alt="goals"
                              />
                              <img
                                className="goalsIimg goalsIimg2"
                                src={select_image_front + item.front_icon_image}
                                onError={(e) => {
                                  e.target.src = ProfileImgSample; // Provide the path to your fallback image
                                }}
                                alt="goals"
                              />
                              <div className="ml-3">
                                <h4 className="goalTitleAdd fntNanitu">
                                  {item.front_name}
                                </h4>
                                <p className="goalDesAdd m-0">
                                  {item.front_detail}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <img
                                className="deleteIcon"
                                src={deleteIcon}
                                alt="delete"
                                data-toggle="modal"
                                data-target="#deleteGoalPopup"
                                onClick={() =>
                                  handleDeleteIconClick(item._id, 2, 0)
                                }
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Testimonials</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#testimonialsPopup"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="row testHeadContainer">
                        {testmonialGoal.map((testimonial, index) => (
                          <div
                            key={index}
                            className="col-md-3 text-center testContainer m-2 d-flex flex-column justify-content-between"
                          >
                            <div>
                              {testimonial.image_name && (
                                <img
                                  className="testImg"
                                  src={
                                    select_image_testmonialGoal +
                                    testimonial.image_name
                                  }
                                  alt="testimonials"
                                />
                              )}
                              <h4>{testimonial.title_name}</h4>
                              <p>{testimonial.full_detail}</p>
                              <p className="testAuthor">
                                {testimonial.author_name}
                              </p>
                            </div>
                            <div className="dlt_bg">
                              <img
                                className="deleteIcon"
                                src={deleteIcon}
                                alt="delete"
                                data-toggle="modal"
                                data-target="#deleteGoalPopup"
                                onClick={() =>
                                  handleDeleteIconClick(testimonial._id, 3, 0)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials Data */}

              {/* FAQ table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu"> FAQ's</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#faqAdd"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table">
                          <thead>
                            <tr>
                              <th
                                style={{ whiteSpace: "nowrap" }}
                                className="fntNanitu"
                              >
                                S No.
                              </th>
                              <th className="text-center">Question</th>
                              <th className="text-center">Answer</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {faqgoal.map((faq, index) => (
                              <tr key={faq._id}>
                                <td>{index + 1}</td>
                                <td>{faq.question_name}</td>
                                <td>{faq.answer_name}</td>
                                <td className="text-center">
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(faq._id, 4, 0)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ table Data */}
              {/* FAQ table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu"> Master</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#masterCardEdit"
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    {/* Modal Edit Master */}
                    <div
                      className="modal fade"
                      id="masterCardEdit"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="masterCardEditTitle"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="exampleModalLongTitle"
                            >
                              Edit Master
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <form id="form_data_admin">
                            <div className="modal-body">
                              <div className="borderBottomDiv mb-3">
                                <h6>First Card</h6>
                                <div>
                                  <div className="my-3 firstCardEdit">
                                    <p className="circleNo">1.</p>
                                    <div className="my-2 divEditFile">
                                      <input
                                        className="inputEditFile"
                                        type="file"
                                        name="doctor_image"
                                        onChange={handleFileChangedynamic(
                                          "doctor_image"
                                        )}
                                        accept=".jpg,.jpeg,.png"
                                      />
                                      <input
                                        className="inputEditFile trio_mendate"
                                        type="hidden"
                                        value={adminGoal.doctor_image}
                                        name="doctor_image_old"
                                      />
                                      <div className="previewEditBox">
                                        {dynaicimage &&
                                          dynaicimage.doctor_image_show && (
                                            <img
                                              src={
                                                dynaicimage.doctor_image_show
                                              }
                                              alt="Preview"
                                              className="imgEditMaster"
                                            />
                                          )}

                                        <p className="m-0">Preview</p>
                                      </div>
                                    </div>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.doctor_detail}
                                      type="text"
                                      name="doctor_detail"
                                      onChange={handleTextareaChange(
                                        "doctor_detail"
                                      )} // Listen to textarea changes
                                      maxLength={500}
                                      onInput={handleIaphabetnumberChange}
                                      placeholder="Enter Text"
                                      rows={2}
                                      cols={50}
                                    />
                                  </div>

                                  <div className="my-3 firstCardEdit">
                                    <p className="circleNo">2.</p>
                                    <div className="my-2 divEditFile">
                                      <input
                                        className="inputEditFile"
                                        type="file"
                                        name="apple_image"
                                        onChange={handleFileChangedynamic(
                                          "apple_image"
                                        )}
                                        accept=".jpg,.jpeg,.png"
                                      />
                                      <input
                                        className="inputEditFile trio_mendate"
                                        type="hidden"
                                        value={adminGoal.apple_image}
                                        name="apple_image_old"
                                      />
                                      <div className="previewEditBox">
                                        {dynaicimage &&
                                          dynaicimage.apple_image_show && (
                                            <img
                                              src={dynaicimage.apple_image_show}
                                              alt="Preview"
                                              className="imgEditMaster"
                                            />
                                          )}
                                        <p className="m-0">Preview</p>
                                      </div>
                                    </div>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.apple_detail}
                                      type="text"
                                      name="apple_detail"
                                      onChange={handleTextareaChange(
                                        "apple_detail"
                                      )} // Listen to textarea changes
                                      maxLength={500}
                                      onInput={handleIaphabetnumberChange}
                                      placeholder="Enter Text"
                                      readOnly={false} // This attribute can be omitted since it's true by default
                                      rows={2}
                                      cols={50}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="borderBottomDiv mb-3">
                                <h6>Second Card</h6>
                                <div className="row secondCardWrapper mx-2">
                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">1.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="text"
                                      name="front_first_card_per"
                                      onChange={handleTextareaChange(
                                        "front_first_card_per"
                                      )} // Listen to textarea changes
                                      maxLength={2}
                                      onInput={handleNumbersChange}
                                      value={adminGoal.front_first_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_first_card_detail}
                                      type="text"
                                      name="front_first_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_first_card_detail"
                                      )} // Listen to textarea changes
                                      maxLength={100}
                                      onInput={handleIaphabetnumberChange}
                                      placeholder="Enter Text"
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">2.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="text"
                                      name="front_sec_card_per"
                                      onChange={handleTextareaChange(
                                        "front_sec_card_per"
                                      )} // Listen to textarea changes
                                      maxLength={2}
                                      onInput={handleNumbersChange}
                                      value={adminGoal.front_sec_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_sec_card_detail}
                                      type="text"
                                      name="front_sec_card_detail"
                                      placeholder="Enter Text"
                                      onChange={handleTextareaChange(
                                        "front_sec_card_detail"
                                      )} // Listen to textarea changes
                                      maxLength={100}
                                      onInput={handleIaphabetnumberChange}
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">3.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="text"
                                      name="front_third_card_per"
                                      onChange={handleTextareaChange(
                                        "front_third_card_per"
                                      )} // Listen to textarea changes
                                      maxLength={2}
                                      onInput={handleNumbersChange}
                                      value={adminGoal.front_third_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1"
                                      value={adminGoal.front_third_card_detail}
                                      type="text"
                                      name="front_third_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_third_card_detail"
                                      )} // Listen to textarea changes
                                      maxLength={100}
                                      onInput={handleIaphabetnumberChange}
                                      placeholder="Enter Text trio_mendate"
                                      rows={2}
                                    />
                                  </div>

                                  <div className="my-3 secondCardEdit col-md-5">
                                    <p className="circleNo">4.</p>
                                    <input
                                      className="p-1 my-3 trio_mendate"
                                      type="text"
                                      name="front_four_card_per"
                                      onChange={handleTextareaChange(
                                        "front_four_card_per"
                                      )} // Listen to textarea changes
                                      maxLength={2}
                                      onInput={handleNumbersChange}
                                      value={adminGoal.front_four_card_per}
                                    />
                                    <span> &nbsp; in %</span>
                                    <textarea
                                      className="p-1 trio_mendate"
                                      value={adminGoal.front_four_card_detail}
                                      type="text"
                                      name="front_four_card_detail"
                                      onChange={handleTextareaChange(
                                        "front_four_card_detail"
                                      )} // Listen to textarea changes
                                      maxLength={100}
                                      onInput={handleIaphabetnumberChange}
                                      placeholder="Enter Text"
                                      rows={2}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="borderBottomDiv mb-3">
                                <h6>Video</h6>
                                <div className="row videoWrapper">
                                  <input
                                    className="col-md-6"
                                    type="file"
                                    name="front_video_link"
                                    onChange={handleFileChangedynamic(
                                      "front_video_link"
                                    )}
                                    accept=".mp4"
                                  />
                                  <input
                                    className="inputEditFile trio_mendate"
                                    type="hidden"
                                    value={adminGoal.front_video_link}
                                    name="front_video_link_old"
                                  />

                                  {dynaicimage &&
                                    dynaicimage.front_video_link_show && (
                                      <video
                                        className="col-md-6 my-3 videoPreview"
                                        controls
                                        src={dynaicimage.front_video_link_show}
                                      />
                                    )}
                                </div>
                                <textarea
                                  value={adminGoal.front_video_text}
                                  type="text"
                                  placeholder="Enter Text"
                                  rows={5}
                                  name="front_video_text"
                                  onChange={handleTextareaChange(
                                    "front_video_text"
                                  )} // Listen to textarea changes
                                  maxLength={300}
                                  onInput={handleIaphabetnumberChange}
                                  className="textVideoEdit p-1 mb-3 trio_mendate"
                                />
                              </div>
                              <div className="borderBottomDiv mb-3">
                                <h6>Front Why Us</h6>
                                <textarea
                                  className="p-1 mb-3 textVideoEdit trio_mendate"
                                  value={adminGoal.front_why_us}
                                  name="front_why_us"
                                  onChange={handleTextareaChange(
                                    "front_why_us"
                                  )} // Listen to textarea changes
                                  maxLength={300}
                                  onInput={handleIaphabetnumberChange}
                                  type="text"
                                  rows={3}
                                />
                              </div>
                              <div className="borderBottomDiv mb-3">
                                <h6>Front Calling Number</h6>
                                <input
                                  className="p-1 mb-3 trio_mendate"
                                  value={adminGoal.front_calling_no}
                                  name="front_calling_no"
                                  onChange={handleTextareaChange(
                                    "front_calling_no"
                                  )} // Listen to textarea changes
                                  type="text"
                                  maxLength={10}
                                  onInput={handleNumbersChange}
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSaveChangesdynamic(
                                    "form_data_admin",
                                    update_admin_master_save
                                  )
                                }
                                className="btn btnHoverClass fntNanitu"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* Modal Edit Master */}

                    <div className="list_items">
                      <div className="">
                        <div className="firstCard row my-3">
                          <h6 className="mx-2">First Card</h6>
                          <div className="col-md-4 mx-3 p-3">
                            <img
                              src={select_image_admin + adminGoal.doctor_image}
                              alt="user"
                              className="imgSet"
                            />
                            <p>{adminGoal.doctor_detail}</p>
                          </div>
                          <div className="col-md-4 mx-3 p-3">
                            <img
                              src={select_image_admin + adminGoal.apple_image}
                              alt="user"
                              className="imgSet"
                            />
                            <p>{adminGoal.apple_detail}</p>
                          </div>
                        </div>

                        <div className="secondCard row my-3">
                          <h6 className="mx-2">Second Card</h6>
                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_first_card_per}%
                            </p>
                            <p>{adminGoal.front_first_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_sec_card_per}%
                            </p>
                            <p>{adminGoal.front_sec_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_third_card_per}%
                            </p>
                            <p>{adminGoal.front_third_card_detail}</p>
                          </div>

                          <div className="percentageDiv mx-3 p-3">
                            <p className="percentageP">
                              {adminGoal.front_four_card_per}%
                            </p>
                            <p>{adminGoal.front_four_card_detail}</p>
                          </div>
                        </div>

                        <div className="thirdCard row my-3">
                          <h6 className="mx-2">Video</h6>
                          <div className="row textVideoWrapper">
                            <video
                              className="col-md-4 my-3"
                              controls
                              src={
                                select_image_admin + adminGoal.front_video_link
                              }
                            />
                            <div className="col-md-6">
                              <h6>Text Below Video</h6>
                              <p>{adminGoal.front_video_text}</p>
                            </div>
                          </div>
                        </div>

                        <div className="thirdCard row my-3">
                          <div className="col-md-8">
                            <h6 className="mx-2">Front Why Us</h6>
                            <div className="row textVideoWrapper">
                              <p className="mx-2">{adminGoal.front_why_us}</p>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <h6 className="mx-2">Front Calling Number</h6>
                            <div className="row textVideoWrapper">
                              <p className="mx-2">
                                {adminGoal.front_calling_no}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Master End */}

              {/* Price table Data */}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Package Price</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#priceAdd"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>

                    {/* Edit Package pla */}

                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table text-center priceTable">
                          <thead>
                            <tr>
                              <th className="text-center">S No.</th>
                              <th className="text-center">Name</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Month</th>
                              <th className="text-center">Days</th>
                              <th className="text-center">Consultations</th>
                              <th className="text-center">Features</th>
                              <th className="text-center">Status</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {packagegoal.map((package_ii, index) => (
                              <tr key={package_ii._id}>
                                <td>{index + 1}</td>
                                <td>{package_ii.package_name}</td>
                                <td>{package_ii.package_price}</td>
                                <td>{package_ii.package_month_plan}</td>
                                <td>{package_ii.package_days}</td>
                                <td>{package_ii.no_of_calling}</td>
                                <td>
                                  <ul>
                                    <li>{package_ii.first_facility}</li>
                                    <li>{package_ii.sec_facility}</li>
                                    <li>{package_ii.thrid_facility}</li>
                                    <li>{package_ii.four_facility}</li>
                                    <li>{package_ii.five_facility}</li>
                                  </ul>
                                </td>
                                <td>
                                  <input
                                    type="checkbox"
                                    id={`switch-${package_ii._id}`}
                                    checked={toggleStates[index]}
                                    onChange={() =>
                                      handleToggleChange(package_ii._id, index)
                                    }
                                  />
                                  <label htmlFor={`switch-${package_ii._id}`}>
                                    Toggle
                                  </label>
                                </td>
                                <td>
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(
                                        package_ii._id,
                                        5,
                                        0
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* End Price table Data */}

              {/* Help-center by Arsalan @23/08/2023 */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Help Center</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#helpcenter"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table priceTable">
                          <thead>
                            <tr>
                              <th style={{ whiteSpace: "nowrap" }}>S No.</th>
                              <th className="text-center">Question</th>
                              <th className="text-center">Answer</th>
                              <th className="text-center">Popular</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {helpcenterdata.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.question_name}</td>
                                <td>{item.answer_name}</td>
                                <td>
                                  <input
                                    type="checkbox"
                                    id={`switch-${item._id}`}
                                    checked={togglePopulor[index]}
                                    onChange={() =>
                                      handleTogglePopulor(item._id, index)
                                    }
                                  />
                                  <label htmlFor={`switch-${item._id}`}>
                                    Toggle
                                  </label>
                                </td>
                                <td className="text-center">
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(item._id, 9, 0)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="helpcenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="helpcenter"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Add Help Center Question
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form id="helpcenterquestion">
                      <div className="modal-body addNewGoalsDiv">
                        <div>
                          <label>Question</label> <br />
                          <input
                            type="text"
                            name="question_name"
                            maxLength={100}
                            onInput={handleAlphanumericquestionChange}
                            className="inputGoalTitle trio_mendate"
                            placeholder="Type Question"
                          />
                        </div>
                        <div>
                          <label>Answer</label> <br />
                          <textarea
                            name="answer_name"
                            className="inputGoalTitle trio_mendate"
                            maxLength={300}
                            onInput={handleIaphabetnumberChange}
                            placeholder="Type Answer"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btnHoverClass fntNanitu"
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "helpcenterquestion",
                              ethi_help_center_master
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* End Help-center by Arsalan @23/08/2023 */}

              {/* Quote by Arsalan @23/08/2023 */}
              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Quotes</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#quote"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>
                    <div className="list_items">
                      <div className="faqContainer">
                        <table className="table">
                          <thead>
                            <tr>
                              <th style={{ whiteSpace: "nowrap" }}>S No.</th>
                              <th>Quote</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {quotedata.map((item, index) => (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.quote_name}</td>
                                <td className="text-center">
                                  <img
                                    className="deleteIcon"
                                    src={deleteIcon}
                                    alt="delete"
                                    data-toggle="modal"
                                    data-target="#deleteGoalPopup"
                                    onClick={() =>
                                      handleDeleteIconClick(item._id, 10, 0)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="quote"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="helpcenter"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Add Quote
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form id="quotedata">
                      <div className="modal-body addNewGoalsDiv">
                        <div>
                          <label>Quote</label> <br />
                          <textarea
                            name="quote_name"
                            className="inputGoalTitle trio_mendate"
                            maxLength={200}
                            onInput={handleIaphabetnumberChange}
                            placeholder="Type Quote"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btnHoverClass fntNanitu"
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "quotedata",
                              ethi_quote_master_post
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* End Quote by Arsalan @23/08/2023 */}

              {/* Video Library by Arsalan @23/08/2023*/}

              <div className="appointments my-4">
                <div className="appointments_wrapper">
                  <div className="appointments_container">
                    <div className="d-flex">
                      <div className="list_head">
                        <h3 className="fntNanitu">Video Library</h3>
                      </div>
                      <div className="addGoalsContainer mb-2">
                        <button
                          className="btn btnHoverClass fntNanitu"
                          data-toggle="modal"
                          data-target="#videolibrary"
                        >
                          <img src={AddBtn} /> <p className="m-0 ms-1">Add</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="table table-striped text-center videoLibraryTable priceTable">
                    <thead>
                      <th
                        style={{ whiteSpace: "nowrap" }}
                        className="text-center"
                      >
                        S No.
                      </th>
                      <th className="text-center">Video Title</th>
                      <th className="text-center">Video</th>
                      <th className="text-center">Action</th>
                    </thead>

                    <tbody>
                      {videodata.map((item, index) => (
                        <tr key={item._id}>
                          <td>{index + 1}</td>
                          <td>{item.video_name}</td>
                          <td>
                            <div>
                              <video
                                src={
                                  data_ethi_video_master_image +
                                  item.video_image
                                }
                                controls
                                className="videoLibrary"
                              />
                            </div>
                          </td>
                          <td>
                            <img
                              className="deleteIcon"
                              src={deleteIcon}
                              alt="delete"
                              data-toggle="modal"
                              data-target="#deleteGoalPopup"
                              onClick={() =>
                                handleDeleteIconClick(item._id, 11, 0)
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="modal fade"
                id="videolibrary"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="helpcenter"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Add Video
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form id="videlibup">
                      <div className="modal-body addNewGoalsDiv">
                        <div>
                          <label>Video Title</label> <br />
                          <input
                            name="video_name"
                            className="inputGoalTitle trio_mendate"
                            placeholder="Enter Video Title"
                            maxLength={100}
                            onInput={handleIaphabetnumberChange}
                          />
                        </div>
                        <div className="my-3">
                          <label>Upload Video</label> <br />
                          <div className="uploadedImgPreview">
                            <input
                              type="file"
                              name="image_for_noti"
                              onChange={handleFileChangedynamic(
                                "image_for_noti"
                              )}
                              className="trio_mendate"
                              accept="video/*"
                            />
                          </div>
                          {dynaicimage && dynaicimage.image_for_noti_show && (
                            <video
                              src={dynaicimage.image_for_noti_show}
                              alt="Preview"
                              style={{
                                width: "100%",
                                marginTop: "10px",
                              }}
                            />
                          )}
                          <div></div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btnHoverClass fntNanitu"
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "videlibup",
                              post_video_libery
                            )
                          }
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Video Library by Arsalan @23/08/2023*/}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Goals by Arsalan @27-07-2023 */}

      <div
        className="modal fade"
        id="addNewGoal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addNewGoalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add New Goals
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Goal Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for"
                      onChange={handleFileChangedynamic("image_for")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_show && (
                      <img
                        src={dynaicimage.image_for_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label>Add Goal Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Title"
                    maxLength={100}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
                <div>
                  <label>Add Goal Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    maxLength={300}
                    onInput={handleIaphabetnumberChange}
                    placeholder="Goal Description"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btnHoverClass fntNanitu"
                  onClick={() =>
                    handleSaveChangesdynamic("form_data", goal_master_save)
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End Add New Goals by Arsalan @27-07-2023 */}

      {/*What you will get by Arsalan @31-07-2023 */}

      <div
        className="modal fade"
        id="getFromEthi"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="getFromEthiTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                What you will get from ETHI
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data2">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Popup Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_ethi"
                      onChange={handleFileChangedynamic("image_for_ethi")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_ethi_show && (
                      <img
                        src={dynaicimage.image_for_ethi_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="fileUploadDiv">
                  <label>Add Icon Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_popup"
                      onChange={handleFileChangedynamic("image_for_popup")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_popup_show && (
                      <img
                        src={dynaicimage.image_for_popup_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>
                <div>
                  <label className="fntNanitu">Add Popup Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Title"
                    maxLength={100}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
                <div>
                  <label>Add Popup Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Goal Description"
                    maxLength={200}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btnHoverClass fntNanitu"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data2",
                      ethi_front_master_save
                    )
                  }
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End What you will get by Arsalan @31-07-2023 */}

      {/*Testimonials by Arsalan @02-08-2023 */}

      <div
        className="modal fade"
        id="testimonialsPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="cardGetItemTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Testimonials
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_tes">
              <div className="modal-body addNewGoalsDiv">
                <div className="fileUploadDiv">
                  <label>Add Image</label> <br />
                  <div className="uploadedImgPreview">
                    <input
                      type="file"
                      name="image_for_tes"
                      onChange={handleFileChangedynamic("image_for_tes")}
                      className="trio_mendate"
                      accept=".jpg,.jpeg,.png"
                    />
                    {dynaicimage && dynaicimage.image_for_tes_show && (
                      <img
                        src={dynaicimage.image_for_tes_show}
                        alt="Preview"
                        style={{
                          width: "60px",
                          height: "60px",
                          marginTop: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label>Add Title</label> <br />
                  <input
                    type="text"
                    name="title"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Title"
                    maxLength={100}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
                <div>
                  <label>Add Description</label> <br />
                  <textarea
                    type="text"
                    name="description"
                    className="inputGoalTitle trio_mendate"
                    maxLength={300}
                    onInput={handleIaphabetnumberChange}
                    placeholder="Description"
                  />
                </div>
                <div>
                  <label>Add Author Name</label> <br />
                  <input
                    type="text"
                    name="authorname"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Author Name"
                    maxLength={100}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btnHoverClass fntNanitu"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_tes",
                      ethi_testmonial_master_save
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* End Testimonials by Arsalan @02-08-2023 */}

      {/* FAQ by Arsalan @01-08-2023 */}

      <div
        className="modal fade"
        id="faqAdd"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="cardGetItemTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                FAQ's
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_faq">
              <div className="modal-body addNewGoalsDiv">
                <div>
                  <label>Question</label> <br />
                  <input
                    type="text"
                    name="question"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Type Question"
                    maxLength={100}
                    onInput={handleAlphanumericquestionChange}
                  />
                </div>
                <div>
                  <label>Answer</label> <br />
                  <textarea
                    name="answer"
                    className="inputGoalTitle trio_mendate"
                    placeholder="Type Answer"
                    maxLength={300}
                    onInput={handleIaphabetnumberChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btnHoverClass fntNanitu"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_faq",
                      ethi_faq_master_save
                    )
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* FAQ by Arsalan @01-08-2023 */}

      {/* Package by Shubham jain @09-08-2023 */}
      <div
        className="modal fade"
        id="priceAdd"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Plan Package
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form id="form_data_package">
              <div className="modal-body">
                <div className="row editPackageWrapper">
                  <div className="col-md-6 my-2">
                    <h6>Package Name</h6>
                    <input
                      className="p-2 trio_mendate trio_name"
                      type="text"
                      name="package_name"
                      placeholder="Enter Package Name"
                      maxLength={70}
                      onInput={handleAphabetsChange}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Price</h6>
                    <input
                      className="p-2 trio_mendate"
                      type="text"
                      name="package_price"
                      placeholder="Enter Price"
                      maxLength={10}
                      onInput={handleNumbersChange}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Month</h6>
                    <input
                      type="text"
                      name="package_month_plan"
                      placeholder="Enter Month"
                      className="p-2 trio_mendate"
                      maxLength={2}
                      onInput={handleNumbersChange}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Days</h6>
                    <input
                      type="text"
                      name="package_days"
                      placeholder="Enter Days"
                      className="p-2 trio_mendate"
                      maxLength={3}
                      onInput={handleNumbersChange}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <h6>Calling</h6>
                    <input
                      type="text"
                      name="no_of_calling"
                      placeholder="No. of Calls"
                      className="p-2 trio_mendate"
                      maxLength={10}
                      onInput={handleNumbersChange}
                    />
                  </div>
                  <div className="col-md-12 my-2">
                    <h6>Features</h6>
                    <input
                      key="1"
                      placeholder="Feature 1"
                      name="feature_1"
                      className="p-2 my-2 trio_mendate"
                      maxLength={100}
                      onInput={handleIaphabetnumberChange}
                    />
                    {featureInputs}
                    {featuresCount < 5 && (
                      <p
                        className="my-2"
                        style={{
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={handleAddFeatureClick}
                      >
                        <img src={AddBtn} /> Add another feature
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSaveChangesdynamic(
                      "form_data_package",
                      ethi_package_master_save
                    )
                  }
                  className="btn btnHoverClass fntNanitu"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Package by Shubham jain @09-08-2023 */}

      {/* Delete Goals Popup by Arsalan @27-07-2023 */}
      <div
        className="modal fade"
        id="deleteGoalPopup"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteGoalPopupTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Are you sure, you want to delete this Record?
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={closepopup}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal fntNanitu"
                onClick={closepopup}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteConfirmed(0)}
                className="btn btnHoverClass fntNanitu"
                data-dismiss="modal"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End Delete Goals Popup by Arsalan @27-07-2023 */}
    </div>
  );
}
