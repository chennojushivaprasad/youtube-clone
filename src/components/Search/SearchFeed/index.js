import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";

import { useParams } from "react-router-dom";

import Header from "../../Header";
import SideBar from "../../SideBar";
// import PublishedTimeAgo from "../TimeAgo";
import UserContext from "../../Context";
import fetchFromApi from "../../utils/fetchFromApi";
import SearchVideoCard from "../SearchVideoCard";
import LoadingView from "../../LoadingView";
import { apiStatusConstants } from "../../utils/constants";
import FailureView from "../../FailureView";
// import ViewsCount from "../ViewsCount";
// import HoverVideoPlayer from "react-hover-video-player";
// import ReactPlayer from "react-player";

function SearchFeed() {
  const [searchedVideos, setSearchVideosData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const pageToken = useRef("");
  const previousSearchedTerm = useRef("");
  const { regionCode, bgColor } = useContext(UserContext);

  const { searchTerm } = useParams();

  useEffect(() => {
    setLoadingStatus(true);
    const url = `search?q=${searchTerm}&part=snippet%2Cid&regionCode=${regionCode}&pageToken=${nextPageToken}&maxResults=20`;
    fetchFromApi(url).then((response) => {
      if (response.ok) {
         return response.json()
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    }).then((data)=>{
      if (previousSearchedTerm.current === searchTerm) {
        setSearchVideosData((prev) => [...prev, ...data.items]);
      } else {
        setSearchVideosData(data.items);
        previousSearchedTerm.current = searchTerm;
        window.scrollTo(0, 0);
      }
      pageToken.current = data.nextPageToken;
      setApiStatus(apiStatusConstants.success);
    });

    setLoadingStatus(false);
  }, [searchTerm, regionCode, nextPageToken]);

  const handleOnScroll = () => {
    const screenHeight = window.innerHeight;
    const totalDocumentElemhHeight = document.documentElement.scrollHeight;
    if (screenHeight + window.scrollY + 2 >= totalDocumentElemhHeight) {
      setNextPageToken(pageToken.current);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  const renderVideos = () => (
    <ul className="searched-videos">
      {searchedVideos.map((video) => {
        return <SearchVideoCard video={video} />;
      })}
    </ul>
  );

  const renderFailureView = () => <FailureView />;

  const renderResultantView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVideos();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className={`searchfeed-container ${bgColor}`}>
      <Header />
      <div className="searchfeed-responsive-container">
        <SideBar />
        <div className="searched-videos-container">
          {renderResultantView()}
          {loadingStatus && <LoadingView />}
        </div>
      </div>
    </div>
  );
}
export default SearchFeed;
