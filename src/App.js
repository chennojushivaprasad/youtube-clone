import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Feed from "./components/Feed/Feed";
import ChannelDetail from "./components/ChannelDetail";
import { useState } from "react";
import UserContext from "./components/Context";
import WatchScreen from "./components/Watch/WatchScreen";
import SearchFeed from "./components/Search/SearchFeed";
import SubscribedVideos from "./components/Subscriptions";
import ShortFeed from "./components/Shorts/ShortFeed";

// import Cookies from "js-cookie";

// import {app} from "./components/Context/firebase"

function App() {
  const [isSideBarActive, toggleSideBar] = useState(false);
  const [selectedCategory, setCategory] = useState("New");
  const [regionCode, setRegionCode] = useState("IN");
  const [isLightModeActive, activateMode] = useState(true);
  const [isLoggedIn, setLoginStatus] = useState(false);
  const [onHoverVideoMuted, changeHoverMuteStatus] = useState(true);
  const [headerHeight, storeHeaderHeight] = useState("");

  const toggleLightDarkMode = () => activateMode(!isLightModeActive);

  const bgColor = isLightModeActive
    ? "light-background-color"
    : "dark-background-color";

  const textColor = isLightModeActive ? "dark-text-color" : "light-text-color";

  const activeCategoryBgColor = isLightModeActive
    ? "active-category-light-bg-color"
    : "active-category-dark-bg-color";

  // useEffect(() => {
  //   if (Cookies.get("accessToken") !== undefined) {
  //     console.log("accessToken",isLoggedIn)
  //     setLoginStatus(true);
  //   } else {
  //     setLoginStatus(false);
  //   }
  // },[]);

  return (
    <UserContext.Provider
      value={{
        isLightModeActive,
        isSideBarActive,
        toggleSideBar,
        selectedCategory,
        isLoggedIn,
        setLoginStatus,
        setCategory,
        regionCode,
        setRegionCode,
        headerHeight,
        storeHeaderHeight,
        bgColor,
        textColor,
        toggleLightDarkMode,
        activeCategoryBgColor,
        onHoverVideoMuted,
        changeHoverMuteStatus,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Feed />} />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/video/:id" element={<WatchScreen />} />

          <Route exact path="/channel/:id" element={<ChannelDetail />} />
          <Route exact path="/search/:searchTerm" element={<SearchFeed />} />

          <Route exact path="/shorts" element={<ShortFeed />} />
          <Route exact path="/subscriptions" element={<SubscribedVideos />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
