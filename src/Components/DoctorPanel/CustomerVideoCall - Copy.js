import React, { useState, useEffect } from "react";
import AgoraUIKit, { layout } from "agora-react-uikit";
import "agora-react-uikit/dist/index.css";
import { useParams } from "react-router-dom";
import "../../Css/loading.css";
import {
  get_booking_data_by_customer,
  server_post_data,
} from "../../ServiceConnection/serviceconnection.js";
function CustomerVideoCall() {
  const [appChannel, setappChannel] = useState(true);
  const [AppID, setappID] = useState("shubham jain");
  const [upcomingAppoint, setUpcomingAppoint] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const { action } = useParams();

  useEffect(() => {
    const retrievedDoctorId = "000000000000000000000000";
    master_data_get(retrievedDoctorId, action);
  }, [action]);

  const master_data_get = async (retrievedDoctorId, booking_id) => {
    setShowLoader(true);
    const fd = new FormData();
    fd.append("doctor_id", retrievedDoctorId);
    fd.append("booking_id", booking_id);

    await server_post_data(get_booking_data_by_customer, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message);
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
              Video Calling With {upcomingAppoint.doctor_name}
            </h1>
            <AgoraUIKit
              rtcProps={{
                appId: AppID,
                channel: appChannel,
                token: upcomingAppoint.token_agora, // add your token if using app in secured mode
                uid: 0, // add your token if using app in secured mode
                //  uid: upcomingAppoint.customer_id, // add your token if using app in secured mode
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

export default CustomerVideoCall;

// import React, { useState, useEffect } from "react";
// import AgoraUIKit, { layout } from "agora-react-uikit";
// import "agora-react-uikit/dist/index.css";
// import { useParams } from "react-router-dom";
// import "../../Css/loading.css";
// import {
//   get_booking_data,
//   server_post_data,
//   delete_master_data,
// } from "../../ServiceConnection/serviceconnection.js";
// import { retrieveData } from "../../LocalConnection/LocalConnection.js";

// function CustomerVideoCall() {
//   const [appChannel, setappChannel] = useState(true);
//   const [AppID, setappID] = useState("shubham jain");
//   const [upcomingAppoint, setUpcomingAppoint] = useState([]);
//   console.log(upcomingAppoint);
//   const [showLoader, setShowLoader] = useState(false);
//   const { action } = useParams();

//   const [videoCallTime, setVideoCallTime] = useState(null);

//   useEffect(() => {
//     const fetchVideoCallTime = () => {
//       setTimeout(() => {
//         const currentTime = new Date();
//         const hours = currentTime.getHours();
//         const minutes = currentTime.getMinutes();
//         const formattedTime = `${hours}:${minutes}`;
//         setVideoCallTime(formattedTime);
//       }, 2000);
//     };

//     fetchVideoCallTime();
//   }, []);

//   useEffect(() => {
//     const retrievedDoctorId = retrieveData("doctor_id");
//     master_data_get(retrievedDoctorId, action);
//   }, [action]);

//   const master_data_get = async (retrievedDoctorId, booking_id) => {
//     setShowLoader(true);
//     const fd = new FormData();
//     fd.append("doctor_id", retrievedDoctorId);
//     fd.append("booking_id", booking_id);

//     await server_post_data(get_booking_data, fd)
//       .then((Response) => {
//         if (Response.data.error) {
//           alert(Response.data.message);
//         } else {
//           setUpcomingAppoint(Response.data.message.data_appointment[0]);
//           setappID(Response.data.message.appId);
//           setappChannel(Response.data.message.channelName);
//         }
//         setShowLoader(false);
//       })
//       .catch((error) => {
//         setShowLoader(false);
//       });
//   };

//   const handleDeleteConfirmed = async () => {
//     setShowLoader(true);
//     const fd = new FormData();
//     fd.append("id_for_delete", upcomingAppoint._id);
//     fd.append("flag_for", "15");
//     fd.append("for_status_final", upcomingAppoint.subscription_id);
//     await server_post_data(delete_master_data, fd)
//       .then((Response) => {
//         if (Response.data.error) {
//           alert(Response.data.message);
//         } else {
//           setUpcomingAppoint(null);
//         }
//         setShowLoader(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setShowLoader(false);
//       });
//   };
//   const handleEnableDisabled = (item) => {
//     let shouldEnableButton = false;
//     const enableCallButtonTime = 5 * 60 * 1000; // 5 minutes in milliseconds
//     const currentDate = new Date().toDateString();

//     const now = new Date().getTime();
//     const meetingDate = new Date(item.booking_date).toDateString();
//     const startTime = new Date(
//       item.booking_date + " " + item.booking_start_time
//     ).getTime();
//     const endTime = new Date(
//       item.booking_date + " " + item.booking_end_time
//     ).getTime();

//     if (
//       currentDate === meetingDate &&
//       now >= startTime - enableCallButtonTime &&
//       now <= endTime + enableCallButtonTime
//     ) {
//       shouldEnableButton = true;
//     }
//     return shouldEnableButton;
//   };
//   return (
//     <div style={styles.container}>
//       {console.log(
//         upcomingAppoint.booking_date + " " + upcomingAppoint.booking_start_time
//       )}
//       <div className={showLoader ? "loading" : ""}></div>
//       <div style={styles.videoContainer}>
//         {upcomingAppoint.booking_start_time <= videoCallTime ? (
//           <>
//             {upcomingAppoint.booking_start_time <= videoCallTime &&
//             upcomingAppoint.booking_end_time > videoCallTime ? (
//               <>
//                 {console.log({ videoCallTime })}
//                 <h1 style={styles.heading}>
//                   Video Calling With {upcomingAppoint.doctor_name}
//                 </h1>
//                 <AgoraUIKit
//                   rtcProps={{
//                     appId: AppID,
//                     channel: appChannel,
//                     token: upcomingAppoint.token_agora,
//                     uid: 0,
//                     role: "host",
//                     layout: layout.grid,
//                     enableScreensharing: false,
//                   }}
//                   rtmProps={{
//                     username: upcomingAppoint.customer_name || "user",
//                     displayUsername: true,
//                   }}
//                   callbacks={{
//                     EndCall: () => handleDeleteConfirmed(),
//                   }}
//                 />
//               </>
//             ) : (
//               <div className="container mt-5">
//                 <h1 className="text-center">Meeting End</h1>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="container mt-5">
//             <h1 className="text-center">Appointment</h1>
//             <div className="text-center">
//               <p className="lead">
//                 Appointment Date & Time:{" "}
//                 {upcomingAppoint.booking_date +
//                   " " +
//                   upcomingAppoint.booking_start_time}
//               </p>
//               <p className="lead"></p>
//               {booking_date}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     width: "100vw",
//     height: "100vh",
//     display: "flex",
//     flex: 1,
//     backgroundColor: "#007bff22",
//   },
//   heading: { textAlign: "center", marginBottom: 0 },
//   videoContainer: {
//     display: "flex",
//     flexDirection: "column",
//     flex: 1,
//   },
//   nav: { display: "flex", justifyContent: "space-around" },
//   btn: {
//     backgroundColor: "#007bff",
//     cursor: "pointer",
//     borderRadius: 5,
//     padding: "4px 8px",
//     color: "#ffffff",
//     fontSize: 20,
//   },
//   input: { display: "flex", height: 24, alignSelf: "center" },
// };

// export default CustomerVideoCall;
