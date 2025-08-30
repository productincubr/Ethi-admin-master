import React, { useState, useEffect } from "react";
import "../../Css/AdminGeneralProfile.css";
import crossIcon from "../../Assests/images/rejectedIcon.svg.svg";
import AdminHeader from "./AdminHeader";
import {
  server_post_data,
  ethi_query_master_get,
} from "../../ServiceConnection/serviceconnection.js";
import { getDateOnly } from "../../CommonJquery/CommonJquery.js";
function AdminPanelQueries() {
  const [showLoader, setShowLoader] = useState(false);
  const [notificationdata, setNotificationdata] = useState([]);
  const [selecteddata, setselecteddataa] = useState([]);

  const master_data_get = async () => {
    setShowLoader(true);
    const fd = new FormData();
    await server_post_data(ethi_query_master_get, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setNotificationdata(Response.data.message.data_query);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    master_data_get();
  }, []);

  const handleGetId = (index) => {
    setselecteddataa(notificationdata[index]);
  };

  return (
    <div className="container-xl create_diet_plan general_profile">
      <div className={showLoader ? "loading" : ""}></div>
      <div>
        <AdminHeader />
      </div>

      <div>
        <div className="general_profile_uplaod_wrapper">
          <div className="uplaod_container">
            <h4 className="my-4">Queries</h4>
            <form>
              <div className="upload_list_wrapper">
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded">
                      <tr className="rounded">
                        <th scope="col">S.No.</th>
                        <th scope="col">Query Date</th>
                        <th scope="col">Name</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody className="rounded-bottom">
                      {notificationdata.length > 0 ? (
                        notificationdata.map((data, index) => (
                          <tr key={index} onClick={() => handleGetId(index)}>
                            <td scope="row">{index + 1}</td>
                            <td>{getDateOnly(data.createdAt)}</td>
                            <td className="tdBtnApprove">
                              {data.customer_name}
                            </td>
                            <td>
                              <button
                                type="button"
                                data-toggle="modal"
                                data-target="#leaveDetailsModal"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>
                            {" "}
                            <p className="color_black">No Queries Found</p>
                          </td>
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
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header modal_header_leaveDetails">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Query Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <img src={crossIcon} />
                </span>
              </button>
            </div>
            <div className="row m-3">
              {selecteddata && (
                <div className="modal-body">
                  <div className="leave_details_container">
                    <p>
                      Name : <span>{selecteddata.customer_name}</span>
                    </p>
                    <div>
                      <p>
                        Email : <span>{selecteddata.customer_email}</span>
                      </p>
                      <div className="leaveDatesDiv">
                        <p>
                          Date :{" "}
                          <span>{getDateOnly(selecteddata.createdAt)}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>
                        Issue : <span>{selecteddata.issue_name}</span>
                      </p>
                    </div>
                    <div>
                      <p>Comments :</p>
                      <p>
                        <span>{selecteddata.issue_detail}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanelQueries;
