import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../Css/loading.css";
import {
  get_package_data,
  server_post_data,
  publishableKey,
  submit_pre_payment_call_website,
} from "../../ServiceConnection/serviceconnection.js";
import { loadStripe } from "@stripe/stripe-js";
function CustomerPayment() {
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { action } = useParams();

  useEffect(() => {
    const retrievedDoctorId = "000000000000000000000000";
    master_data_get(retrievedDoctorId, action);
  }, [action]);

  const master_data_get = async (retrievedDoctorId, subscription_plan_id) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("subscription_plan_id", subscription_plan_id);

    await server_post_data(get_package_data, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setUpcomingAppoint(Response.data.message.package_data);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const makePayment = async (
    package_name,
    package_price,
    package_days,
    package_id
  ) => {
    const stripe = await loadStripe(publishableKey);
    const fd = new FormData();
    fd.append("package_name", package_name);
    fd.append("package_price", package_price);
    fd.append("package_days", package_days);
    fd.append("package_id", package_id);
    fd.append("subscription_plan_id", action);

    await server_post_data(submit_pre_payment_call_website, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          stripe.redirectToCheckout({
            sessionId: Response.data.message,
          });
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const styles = {
    container: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flex: 1,
      backgroundColor: "#007bff22",
    },
    heading: { textAlign: "center", marginBottom: 0 },
    videoContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    nav: { display: "flex", justifyContent: "space-around" },
    btn: {
      backgroundColor: "#007bff",
      cursor: "pointer",
      borderRadius: 5,
      padding: "4px 8px",
      color: "#ffffff",
      fontSize: 20,
    },
    input: { display: "flex", height: 24, alignSelf: "center" },
  };

  return (
    <div style={styles.container}>
      <div className={showLoader ? "loading" : ""}></div>
      <div style={styles.videoContainer}>
        {/* <div style={styles.nav}>Payment data</div> */}
        <h2 className="headSubs">Membership Plans: Choose Your Subscription</h2>

        <div className="row caRDs">
          {upcomingAppoint.map((item, index) => (
            <div className="col-sm-3" key={index}>
              <div className="cc">
                <div className="card-body">
                  <h1
                    className="card-title"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {index === 0 ? (
                      <h3 className="fantsSubs">Basic Plan</h3>
                    ) : (
                      <h3 className="fantsSubs">Standard Plan</h3>
                    )}
                  </h1>
                  <hr className="new5"></hr>
                  <h5
                    className="card-title"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <b>{item.package_name}</b>
                  </h5>
                  <p
                    className="card-text"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <b>₹{item.package_price}</b>
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    <b> {item.package_days} Appointments</b>
                  </p>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      href="#"
                      className="btnUpgrade"
                      onClick={() =>
                        makePayment(
                          item.package_name,
                          item.package_price,
                          item.package_days,
                          item._id
                        )
                      }
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerPayment;
