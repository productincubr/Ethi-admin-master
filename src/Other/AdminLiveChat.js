import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/LiveChatAdmin.css';
import AdminHeader from "./AdminPanel/AdminHeader";
import ArrowLeft from '../../Assests/images/arrow_left.svg';
import DoctorImg from '../../Assests/images/doctor_img.png';
import telephone from '../../Assests/images/telephone.svg';
import vcall from '../../Assests/images/vcall.svg';
import threeDot from '../../Assests/images/threeDot.svg';
// import addMedia from '../../Assests/images/addMedia.svg';
import sendChatBtn from '../../Assests/images/sendChatBtn.svg';
import searchIcon from '../../Assests/images/searchIcon.svg';
import funnelIcon from '../../Assests/images/funnelIcon.svg';
import pdfIcon from '../../Assests/images/pdfIcon.png';
import user1 from '../../Assests/images/user1.png';
import user2 from '../../Assests/images/user2.png';

function AdminLiveChat() {

  // Back button
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const addAdminMessage = () => {
    const adminInput = document.getElementById('adminInput');
    const message = adminInput.value.trim();

    if (message !== '') {
      const newMessage = {
        sender: 'admin',
        text: message,
        time: getCurrentTime(),
      };

      setMessages([...messages, newMessage]);
      adminInput.value = ''; // Clear the input field after adding the message
    }
  };

  const addUserMessage = () => {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message !== '') {
      const newMessage = {
        sender: 'user',
        text: message,
        time: getCurrentTime(),
      };

      setMessages([...messages, newMessage]);
      userInput.value = ''; // Clear the input field after adding the message
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return hours + ':' + minutes;
  };

  const handleMediaUpload = (event) => {
    const file = event.target.files[0];

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const mediaMessage = {
          sender: 'admin',
          media: reader.result,
          time: getCurrentTime(),
        };

        setMessages([...messages, mediaMessage]);
      };

      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type === 'application/pdf') {
        const mediaName = file.name;
        reader.onloadend = () => {
          const mediaMessage = {
            sender: 'admin',
            media: reader.result,
            mediaName: mediaName,
            time: getCurrentTime(),
          };

          setMessages([...messages, mediaMessage]);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const userLiveChat = [
    {
      userName: 'Jessy K',
      lastMessage: 'Good Morning!',
      chatTiming: '01:15 PM',
      numberOfMessage: 3,
      image: user1
    },
    {
      userName: 'Marvin Cobb',
      lastMessage: 'Im ready for next project!',
      chatTiming: '03:15 PM',
      numberOfMessage: 2,
      image: user2
    },
    {
      userName: 'Arsalan Khan',
      lastMessage: 'Im ready for next project!',
      chatTiming: '03:15 PM',
      numberOfMessage: 2,
      image: user2
    },

    // Add more users as needed
  ];

  const filteredUsers = userLiveChat.filter(user =>
    user.userName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const selectedUser = userLiveChat[selectedItem];

  return (
    <>
      <div className="container-xl create_diet_plan my-5">
        <div>
          <AdminHeader />
        </div>
        <div className="create_diet_plan_dash">
          <div className="my_patients_dash_head my-4">
            <div className="my_patients_dash_head_container">
              <div className="back_btn_heading">
                <span className="backBtnWrap">
                  <div className='back_btn' onClick={() => navigate(-1)}><img src={ArrowLeft} alt='icon' /></div>
                </span>
                <h4>My Chatsssss</h4>
              </div>
            </div>
          </div>
          <div className="create_diet_plan_dash_container p-3">
            <div className="row create_diet_plan_dash_container_row">
              {/* Long bar */}
              <div className="col-lg-8">
                <div className="chatsWrapper p-3">
                  <div className="chatHeader">
                    <img src={selectedUser ? selectedUser.image : DoctorImg} alt="User" />
                    <div>
                      <h4>{selectedUser ? selectedUser.userName : 'Marvin Cobb'}</h4>
                      <p>Online</p>
                    </div>
                  </div>
                  <div className="iconsWrapper">
                    <img src={telephone} alt="Telephone" />
                    <img src={vcall} alt="VCall" />
                    <img src={threeDot} alt="ThreeDot" />
                  </div>
                </div>
                <div className="chatHistoryWrapper pb-3">
                  <div className="chatsHistory pt-5 pb-3">
                    {messages.map((message, index) => (
                      <div key={index} className={`${message.sender}ChatHeader`}>
                        {message.text && (
                          <p className={`${message.sender}ChatText p-3`}>{message.text}</p>
                        )}
                        {message.media && (
                          <div className="mediaMessage">
                            {message.media.startsWith('data:image') ? (
                              <img
                                src={message.media}
                                alt="Media"
                                style={{ height: '300px', width: '300px' }}
                              />
                            ) : (
                              <div>
                                <div className='mediaPdfContainer'>
                                  <img className='pdfIcon' src={pdfIcon} alt='icon' />
                                  <a
                                    href={message.media}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='mediaNameUploaded'
                                  >
                                    {message.mediaName}
                                  </a>
                                </div>
                                <button
                                  className='mediaDownloadBtn mt-2'
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = message.media;
                                    link.download = message.mediaName;
                                    link.click();
                                  }}
                                >
                                  Download
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        <p className="chatTime my-2">{message.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="inputSendWrapper mx-5 p-2 mt-3 adminInputWrite">
                    {/* <label htmlFor="adminMedia" className="mediaLabel">
                                            <img className="addMedia" src={addMedia} alt="Add Media" />
                                        </label> */}
                    {/* <input
                                            id="adminMedia"
                                            type="file"
                                            accept="image/jpeg, image/png, application/pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleMediaUpload}
                                        /> */}
                    <input id="adminInput" placeholder="Type a Message" />
                    <img
                      className="sendChatBtn"
                      src={sendChatBtn}
                      alt="Send Chat"
                      onClick={addAdminMessage}
                    />
                  </div>
                  <div className="inputSendWrapper mx-5 p-2 mt-3 userInputWrite">
                    {/* <label htmlFor="userMedia" className="mediaLabel">
                                            <img className="addMedia" src={addMedia} alt="Add Media" />
                                        </label>
                                        <input
                                            id="userMedia"
                                            type="file"
                                            accept="image/jpeg, image/png, application/pdf"
                                            style={{ display: 'none' }}
                                            onChange={handleMediaUpload}
                                        /> */}
                    <input id="userInput" placeholder="Type a Message" />
                    <img
                      className="sendChatBtn"
                      src={sendChatBtn}
                      alt="Send Chat"
                      onClick={addUserMessage}
                    />
                  </div>
                </div>
              </div>
              {/* <div className='col-lg-1'></div> */}
              {/* short bar */}
              <div className="col-lg-4 smallContainer">
                <div>
                  <h4 className="py-3">Chats</h4>
                  <div className="searchTools">
                    <div className="searchInputWrapper p-2">
                      <img src={searchIcon} alt="Search" />
                      <input
                        placeholder="Search"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                      />
                    </div>
                    <img src={funnelIcon} alt="Funnel" />
                  </div>

                  <div className='chatPeopleWrapper'>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <div
                          key={index}
                          className={`chatUserWrapper my-2 ${selectedItem === index ? 'chatSelected' : ''
                            }`}
                          onClick={() => handleItemClick(index)}
                        >
                          <div className='d-flex'>
                            <img src={user.image} alt={`User ${index + 1}`} />
                            <div className='userContainer'>
                              <h3 className='userName'>{user.userName}</h3>
                              <p className='lastMessage'>{user.lastMessage}</p>
                            </div>
                          </div>
                          <div className='logsContainer'>
                            <p className='chatTiming'>{user.chatTiming}</p>
                            <p className='numberOfMessage'>{user.numberOfMessage}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No results found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLiveChat;
