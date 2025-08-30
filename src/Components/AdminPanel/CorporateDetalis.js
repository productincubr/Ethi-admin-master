import React, { useEffect, useState } from "react";
import "../../Css/AdminGeneralProfile.css";
import crossIcon from "../../Assests/images/rejectedIcon.svg.svg";
import AdminHeader from "./AdminHeader";
import {
  get_quote,
  server_post_data,
} from "../../ServiceConnection/serviceconnection";

import { getDateOnly } from "../../CommonJquery/CommonJquery.js";

function CorporateDetalis() {
  const [corporateData, setCorporateData] = useState([]);
  const [subscriberData, setsubscriberData] = useState([]);
  const [contactData, setcontactData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [notificationdata, setNotificationdata] = useState([]);
  const [selecteddata, setselecteddataa] = useState([]);
  const [activeTab, setActiveTab] = useState("corporate");

  const master_data_get = async () => {
    const fd = new FormData();
    setShowLoader(true);
    await server_post_data(get_quote, fd)
      .then((Response) => {
        setShowLoader(false);
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log("corpoooo", Response.data.message);
          setCorporateData(Response.data.message.data_ethi_feeds_master);
          setQueryData(Response.data.message.data_query);
          setsubscriberData(Response.data.message.web_subscribeEmaildata);
          setcontactData(Response.data.message.web_contactFormdata);
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleGetId = (index) => {
    setselecteddataa(notificationdata[index]);
  };

  useEffect(() => {
    master_data_get();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
            <div className="tableTabs">
              <h5
                className={`my-4 ${
                  activeTab === "corporate" ? "selectedTabA fntNanitu" : ""
                }`}
                onClick={() => handleTabClick("corporate")}
                style={{ fontFamily: "nutino" }}
              >
                Corporate Details
              </h5>
              <h5
                className={`my-4 ${
                  activeTab === "subscribers" ? "selectedTabA fntNanitu" : ""
                }`}
                onClick={() => handleTabClick("subscribers")}
                style={{ fontFamily: "nutino" }}
              >
                Subscribers
              </h5>
              <h5
                className={`my-4 ${
                  activeTab === "contacts" ? "selectedTabA " : ""
                }`}
                onClick={() => handleTabClick("contacts")}
                style={{ fontFamily: "nutino" }}
              >
                Contact Details
              </h5>
              <h5
                className={`my-4 ${
                  activeTab === "queries" ? "selectedTabA " : ""
                }`}
                onClick={() => handleTabClick("queries")}
                style={{ fontFamily: "nutino" }}
              >
                Queries
              </h5>
            </div>
            <div className="upload_list_wrapper">
              {activeTab === "corporate" && (
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded">
                      <tr className="rounded ">
                        <th scope="col" className="fntNanitu">
                          S.No.
                        </th>
                        <th scope="col" className="fntNanitu">
                          Name
                        </th>
                        <th scope="col" className="fntNanitu">
                          Company
                        </th>
                        <th scope="col" className="fntNanitu">
                          Email Id
                        </th>
                        <th scope="col" className="fntNanitu">
                          Phone No.
                        </th>
                        <th scope="col" className="fntNanitu">
                          No. of Employees
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-bottom">
                      {corporateData.map((data, index) => (
                        <tr key={index}>
                          <td className="fntNanitu" scope="row">
                            {index + 1}
                          </td>
                          <td className="fntNanitu">{data.customer_name}</td>
                          <td className="tdBtnApprove fntNanitu">
                            {data.company_name}
                          </td>
                          <td className="fntNanitu">{data.work_email_id}</td>
                          <td className="fntNanitu">{data.mobile_no}</td>
                          <td className="fntNanitu">{data.no_of_employee}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "subscribers" && (
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded">
                      <tr className="rounded ">
                        <th scope="col" className="fntNanitu">
                          S.No.
                        </th>
                        <th scope="col" className="fntNanitu">
                          Email Id
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-bottom">
                      {subscriberData.map((data, index) => (
                        <tr key={index}>
                          <td scope="row">{index + 1}</td>
                          <td>{data.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "contacts" && (
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded">
                      <tr className="rounded ">
                        <th scope="col" className="fntNanitu">
                          S.No.
                        </th>
                        <th scope="col" className="fntNanitu">
                          Name
                        </th>
                        <th scope="col" className="fntNanitu">
                          Email Id
                        </th>
                        <th scope="col" className="fntNanitu">
                          Phone No.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-bottom">
                      {contactData.map((data, index) => (
                        <tr key={index}>
                          <td scope="row">{index + 1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.email}</td>
                          <td>{data.phoneNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "queries" && (
                <div className="leave_list_table table-responsive rounded">
                  <table className="table rounded text-center">
                    <thead className="thead_bg rounded">
                      <tr className="rounded">
                        <th scope="col" className="fntNanitu  ">
                          S.No.
                        </th>
                        <th scope="col" className="fntNanitu  ">
                          Query Date
                        </th>
                        <th scope="col" className="fntNanitu  ">
                          Name
                        </th>
                        <th scope="col" className="fntNanitu  ">
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody className="rounded-bottom">
                      {queryData.length > 0 ? (
                        queryData.map((data, index) => (
                          <tr key={index} onClick={() => handleGetId(index)}>
                            <td className="fntNanitu" scope="row">
                              {index + 1}
                            </td>
                            <td className="fntNanitu">
                              {getDateOnly(data.createdAt)}
                            </td>
                            <td className="tdBtnApprove fntNanitu">
                              {data.customer_name}
                            </td>
                            <td>
                              <button
                                type="button"
                                data-toggle="modal"
                                data-target="#leaveDetailsModal"
                                className="fntNanitu"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>
                            <p className="color_black">No Queries Found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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
                                <span>
                                  {getDateOnly(selecteddata.createdAt)}
                                </span>
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
        </div>
      </div>
    </div>
  );
}

export default CorporateDetalis;
