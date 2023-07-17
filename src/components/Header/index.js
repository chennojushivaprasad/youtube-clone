import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import CloseIcon from "@mui/icons-material/Close";
import {IoVolumeMuteSharp,IoVolumeHighSharp} from "react-icons/io5"
import { Link, useNavigate  } from "react-router-dom";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";
import "./index.css";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import {BsMicFill,BsMicMuteFill,BsFillSunFill} from "react-icons/bs";
import UserContext from "../Context";
import { signOut } from "firebase/auth";
import { auth } from "../Context/firebase";
import Cookies from "js-cookie";
import { FiLogOut } from "react-icons/fi";
// import { PropagateLoader } from "react-spinners";
// import commands from "../utils/listenCommands";

function Header() {
  const [search, changeSearchValue] = useState("");
  const [searchedValue, setSearchValue] = useState("");
  const [microphoneListening, setMicrophoneListening] = useState(false);
  const { storeHeaderHeight } = useContext(UserContext);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  const SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;

  let recognition = useRef(new SpeechRecognition());
  // const [permission, setPermission] = useState(false);  store in app component
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const {
    isLightModeActive,
    isSideBarActive,
    toggleSideBar,
    // regionCode,
    bgColor,
    textColor,
    toggleLightDarkMode,
    onHoverVideoMuted,
    changeHoverMuteStatus,
  } = useContext(UserContext);

  let recognizing = false;
  let transcriptfound = "";

  const searchBarborder = isLightModeActive
    ? "light-mode-search-border"
    : "dark-mode-search-border";

  const searchPopupBgColor = isLightModeActive
    ? "search-popup-lightcolor"
    : "search-popup-darkcolor";
  const navigate = useNavigate();

  useEffect(() => {
    if (searchedValue !== "") {
      // executeCommands(search);
      return navigate(`/search/${searchedValue}`);
    }
  }, [searchedValue, navigate]);

  useEffect(() => {
    recognition.current = new SpeechRecognition();
  }, [recognition, SpeechRecognition]);

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);


  useEffect(()=> {
    storeHeaderHeight(height)
  },[height,storeHeaderHeight])

  recognition.current.onstart = function () {
    recognizing = true;
    transcriptfound = false;
  };

  recognition.current.onend = function () {
    recognizing = false;
    if (!transcriptfound) {
      setMicrophoneListening(false);
      // onClickSearchHandler();
    }
  };

  recognition.current.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    // const confidence = event.results[0][0].confidence;
    console.log(transcript);
    if (transcript !== "") {
      transcriptfound = true;
      setSearchValue(transcript);
      setVoiceSearchActive(false);
      // onClickSearchHandler();
    }
  };

  // const notification = () => console.log("");

  const changeSearchInput = (event) => {
    changeSearchValue(event.target.value);
  };

  const onClickEnterSetSearchValue = (event) => {
    if (event.key === "Enter") {
      setSearchValue(search);
    }
  };

  const runVoiceSearch = () => {
    recognition.current.start();
  };

  const onClickVoiceSearch = () => {
    if (recognizing) {
      recognition.current.stop();
      return;
    } else {
      runVoiceSearch();
      setMicrophoneListening(true);
      setVoiceSearchActive(true);
    }
  };

  const onClickCloseVoiceSearch = () => {
    recognition.current.stop();
    setVoiceSearchActive(false);

    // runVoiceSearch(false);
  };

  const renderVoiceSearch = () => (
    <div className={`voice-search-container ${bgColor}`}>
      <div className={`voice-search-popup ${searchPopupBgColor} ${bgColor}`}>
        <div className="voice-search-top-content">
          <button
            className="voice-search-close-btn"
            type="button"
            onClick={onClickCloseVoiceSearch}
          >
            {<CloseIcon className={textColor} />}
          </button>
          <p className={`voice-search-listen-txt ${textColor}`}>
            {microphoneListening
              ? "Listening ..."
              : "Didn't hear that. Try again. "}
          </p>
        </div>
        <div className="voice-search-bottom-content popup-search-icon-container">
          {/* <div>
              {microphoneListening && (
                <PropagateLoader className="mic-listening" color="#36d7b7" />
              )}
            </div> */}
          <button
            className="popup-search-icon-btn"
            onClick={onClickVoiceSearch}
          >
            {microphoneListening ? < BsMicFill fontSize="" className={textColor}/> : <BsMicMuteFill fontSize="" className={textColor} />}
          </button>
          {!microphoneListening && (
            <p className={`voice-search-popup-text ${textColor}`}>
              Tap the microphone to try again
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const hangleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Cookies.remove("yt-access-token");
       
      })
      .catch((error) => {
        // An error happened.
        console.log("error",error);
      });

      return navigate(`/login`);
  };
  // console.log("trabscript", transcript);

  return (
    <>
      {voiceSearchActive && renderVoiceSearch()}
      <div className={`header ${bgColor}`} ref={ref}>
        {/* {voiceSearchActive && renderVoiceSearch()} */}
        <div className="navbar">
          <div className="logo-container">
            <MenuIcon
              fontSize=""
              className={`menu-icon ${textColor}`}
              onClick={() => toggleSideBar(!isSideBarActive)}
            />
            <Link to="/">
              <img
                className="website-logo"
                src="https://freelogopng.com/images/all_img/1656501255youtube-logo-png.png"
                alt=""
              />
            </Link>
          </div>
          <div className={`search-container`}>
            <div className={`searchbar ${searchBarborder} ${bgColor}`}>
              <input
                type="text"
                placeholder="search"
                className={`search-input  ${textColor}`}
                onChange={changeSearchInput}
                onKeyDown={onClickEnterSetSearchValue}
                value={search}
              />
              <button
                className={`search-button ${searchBarborder} ${bgColor}`}
                onClick={() => {
                  setSearchValue(search);
                }}
              >
                <SearchIcon
                  fontSize=""
                  className={`search-icon ${textColor}`}
                />
              </button>
            </div>

            <button
              type="button"
              className="voice-search-button"
              onClick={() => onClickVoiceSearch()}
            >
              <MicIcon
                fontSize=""
                className={`voice-search-icon ${textColor}`}
              />
            </button>
          </div>
          <div className="navbar-right">
            <button
              className="toggleThem-button"
              type="button"
              onClick={() => toggleLightDarkMode()}
            >
             {isLightModeActive ? <DarkModeIcon className={textColor} /> :<BsFillSunFill className={textColor}  />}
            </button>
            {/* <button
              className="notifications-button"
              type="button"
              onClick={() => notification()}
            >
              <NotificationsIcon />
            </button> */}
            <button
              className="hover-mute-video-button"
              type="button"
              onClick={() => changeHoverMuteStatus(!onHoverVideoMuted)}
            >
             {onHoverVideoMuted?<IoVolumeMuteSharp className={textColor} />: <IoVolumeHighSharp className={textColor}/> }
            </button>
            <button
              className="logout-button"
              type="button"
              onClick={() => hangleLogout()}
            >
              <FiLogOut fontSize="" className={textColor} />
              {/* <DarkModeIcon /> */}
            </button>
          </div>
        </div>
      </div>
      { <div className={`mobile-search-container`}>
            <div className={`mobile-searchbar ${searchBarborder} ${bgColor}`}>
              <input
                type="text"
                placeholder="search"
                className={`search-input  ${textColor}`}
                onChange={changeSearchInput}
                onKeyDown={onClickEnterSetSearchValue}
                value={search}
              />
              <button
                className={`mobile-search-button ${searchBarborder} ${bgColor}`}
                onClick={() => {
                  setSearchValue(search);
                }}
              >
                <SearchIcon
                  fontSize=""
                  className={`mobile-search-icon ${textColor}`}
                />
              </button>
              <button
              type="button"
              className="mobile-voice-search-button"
              onClick={() => onClickVoiceSearch()}
            >
              <MicIcon
                fontSize=""
                className={`mobile-voice-search-icon ${textColor}`}
              />
            </button>
            </div>

         
          </div>}
    </>
  );
}

export default Header;
