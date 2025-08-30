import React, { useState, useEffect } from "react";
import "../../Css/AdminGeneralProfile.css";
import AdminHeader from "./AdminHeader";
import SearchIcon from "../../Assests/images/search_icon.svg";
import {
  update_leaves,
  server_post_data,
  get_leaves,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleReloadClick,
  handleIaphabetnumberChange,
  getDateOnly,
} from "../../CommonJquery/CommonJquery.js";

function LeaveRequest() {
  const [showLoader, setShowLoader] = useState(false);
  const [notificationdata, setNotificationdata] = useState([]);
  const [selecteddata, setselecteddataa] = useState([]);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredLeaveRequest, setFilteredLeaveRequest] = useState([]);

  const handleSaveChangesdynamic = async (
    form_data,
    url_for_save,
    approvalStatus
  ) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setShowLoader(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("status_for", approvalStatus);

      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          // console.log(Response.data);
          setShowLoader(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            const closeButton = document.querySelector(
              "#leaveDetailsModal" + ' [data-dismiss="modal"]'
            );
            empty_form(form_data);

            if (closeButton) {
              closeButton.click();
            }
            // handleReloadClick();
            master_data_get();
          }
        })
        .catch((error) => {
          setShowLoader(false);
        });
    }
  };

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(get_leaves, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setNotificationdata(Response.data.message);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    master_data_get();
  }, [selecteddata]);

  const handlerSearchInputChange = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchInputValue(searchInput);

    // Filter patients for "Past Patients" tab based on the search input value
    if (searchInput.trim() !== "") {
      const filtered = notificationdata.filter((patient) => {
        return (
          patient.doctor_name.toLowerCase().includes(searchInput) ||
          patient.doctor_id.toLowerCase().includes(searchInput)
        );
      });

      setFilteredLeaveRequest(filtered);
    } else {
      setFilteredLeaveRequest([]);
    }
  };

  console.log(notificationdata);
  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>

      <div>
        <div className="general_profile_uplaod_wrapper">
          <div className="uplaod_container">
            <div className=" d-flex justify-content-between align-items-center">
              <h3 className="fntNanitu">Leave Request </h3>
              <div className=" position-relative mb-1">
                <img
                  className="leaveReq_searchBar_Icon "
                  src={SearchIcon}
                  alt="icon"
                />
                <input
                  className="serach_bar "
                  type="text"
                  placeholder="Search..."
                  value={searchInputValue}
                  onChange={handlerSearchInputChange}
                />
              </div>
            </div>

            <form id="leaveRequest">
              <div className="upload_list_wrapper">
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded ">
                      <tr className="rounded">
                        <th scope="col" style={{ whiteSpace: "nowrap" }}>
                          S. No.
                        </th>
                        <th scope="col fntNanitu">Applied Date</th>
                        <th scope="col fntNanitu">Name</th>
                        <th scope="col fntNanitu">Reason & Duration</th>
                        <th scope="col fntNanitu">Status</th>
                      </tr>
                      <tr className="rounded"></tr>
                    </thead>
                    <tbody className="rounded-bottom ">
                      {searchInputValue.trim() !== "" ? (
                        filteredLeaveRequest.map((data, index) => (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td>{getDateOnly(data.createdAt)}</td>
                            <td>{data.doctor_name}</td>
                            <td>
                              <button
                                type="button"
                                data-toggle="modal"
                                onClick={() => setselecteddataa(data)}
                                data-target="#leaveDetailsModal"
                              >
                                View Details
                              </button>
                            </td>
                            <td className="tdBtnApprove">
                              <p
                                className={
                                  data.status_for === "2"
                                    ? "leaveRjct"
                                    : data.status_for === "1"
                                    ? "leaveApr"
                                    : "leavePnd"
                                }
                              >
                                {data.status_for === "2" && "Rejected"}
                                {data.status_for === "1" && "Approved"}
                                {data.status_for === "0" && "Pending"}
                              </p>
                            </td>
                          </tr>
                        ))
                      ) : notificationdata.length > 0 ? (
                        notificationdata.map((data, index) => (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td>{getDateOnly(data.createdAt)}</td>
                            <td>{data.doctor_name}</td>
                            <td>
                              <button
                                type="button"
                                data-toggle="modal"
                                onClick={() => setselecteddataa(data)}
                                data-target="#leaveDetailsModal"
                              >
                                View Details
                              </button>
                            </td>
                            <td className="tdBtnApprove">
                              <p
                                className={
                                  data.status_for === "2"
                                    ? "leaveRjct"
                                    : data.status_for === "1"
                                    ? "leaveApr"
                                    : "leavePnd"
                                }
                              >
                                {data.status_for === "2" && "Rejected"}
                                {data.status_for === "1" && "Approved"}
                                {data.status_for === "0" && "Pending"}
                              </p>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className=" fs-4">
                          <td colSpan="5">No Data Found</td>
                        </tr>
                      )}
                      {searchInputValue.length > 0 &&
                        filteredLeaveRequest.length <= 0 && (
                          <tr className=" fs-4">
                            <td colSpan="5">No Request Found</td>
                          </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="leaveDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="leaveDetailsModalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header modal_header_leaveDetails">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Leave Details
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

            {selecteddata && (
              <div className="row m-5">
                <div className="modal-body col-md-6">
                  <div className="leave_details_container">
                    <p>
                      Leave Type : <span>{selecteddata.leave_type}</span>
                    </p>
                    <div>
                      <p>
                        Leave Duration :{" "}
                        <span>{selecteddata.leave_duration} days</span>
                      </p>
                      <div className="leaveDatesDiv">
                        <p>
                          From : <span>{selecteddata.leave_from}</span>
                        </p>
                        <p>
                          To : <span>{selecteddata.leave_to}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>Reason :</p>
                      <p>
                        <span>{selecteddata.reason}</span>
                      </p>
                    </div>

                    {/* Approve and Reject by Arsalan @21-08-2023 */}

                    {/* End Approve and Reject by Arsalan @21-08-2023 */}
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-5 leaveContainer">
                  {selecteddata.status_for === "0" && (
                    <form id="leaveremarks">
                      <h6>Update the Leave Request:</h6>
                      <label>
                        Remarks*{" "}
                        <span className="max">(Max length: 100 Words)</span>
                      </label>
                      <textarea
                        placeholder="Write Remarks..."
                        rows={8}
                        className="p-2 trio_mendate"
                        id="remarks"
                        name="remarks"
                        maxLength={200}
                        onInput={handleIaphabetnumberChange}
                      />
                      <div className="btnActionLeave">
                        <button
                          type="button"
                          className="btn  modalAddBtn"
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "leaveremarks",
                              update_leaves,
                              1
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="btn modalCancelBtn"
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "leaveremarks",
                              update_leaves,
                              2
                            )
                          }
                        >
                          Reject
                        </button>
                      </div>
                      <div hidden>
                        <input
                          id="reason"
                          name="reason"
                          className="p-2 trio_mendate"
                          defaultValue={selecteddata.reason}
                        />
                        <input
                          id="leave_id"
                          name="leave_id"
                          className="p-2 trio_mendate"
                          defaultValue={selecteddata._id}
                        />
                        <input
                          id="doctor_id"
                          name="doctor_id"
                          className="p-2 trio_mendate"
                          defaultValue={selecteddata.doctor_id}
                        />
                      </div>
                    </form>
                  )}
                </div>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest;
