import React, { useState, useEffect } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useParams } from "react-router-dom";
import {
  get_booking_data,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function AdminVideoCall() {
  const [appChannel, setappChannel] = useState(true);
  const [AppID, setappID] = useState("");
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { action } = useParams();

  useEffect(() => {
    const retrievedDoctorId = retrieveData("doctor_id");
    master_data_get(retrievedDoctorId, action);
  }, [action]);

  const master_data_get = async (retrievedDoctorId, booking_id) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("booking_id", booking_id);

    await server_post_data(get_booking_data, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setUpcomingAppoint(Response.data.message.data_appointment[0]);
          setappID(Response.data.message.appId);
          setappChannel(Response.data.message.channelName);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const handleDeleteConfirmed = async () => {
    setUpcomingAppoint(null); // Clear the selectedGoalId to close the delete popup
  };

  return (
    <div style={styles.container}>
      <div className={showLoader ? "loading" : ""}></div>
      <div style={styles.videoContainer}>
        {upcomingAppoint ? (
          <>
            <h1 style={styles.heading}>
              Video Calling To {upcomingAppoint.customer_name}
            </h1>
            <AgoraUIKit
              rtcProps={{
                appId: AppID,
                channel: appChannel,
                token: upcomingAppoint.token_agora, // add your token if using app in secured mode
                uid: 0, // add your token if using app in secured mode
                // uid: upcomingAppoint.customer_id, // add your token if using app in secured mode
                role: "host",
                layout: layout.grid,
                enableScreensharing: false,
              }}
              rtmProps={{
                username: upcomingAppoint.customer_name || "user",
                displayUsername: true,
              }}
              callbacks={{
                EndCall: () => handleDeleteConfirmed(),
              }}
            />
          </>
        ) : (
          <div style={styles.nav}>No Call Found</div>
        )}
      </div>
    </div>
  );
}
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

export default AdminVideoCall;
