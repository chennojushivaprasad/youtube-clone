import React, { useContext, useEffect, useRef, useState } from "react";

import "./index.css";

import UserContext from "../../Context";
import fetchFromApi from "../../utils/fetchFromApi";
import FailureView from "../../FailureView";
import VideoFeedItem from "../VideoFeedItem";
import LoadingView from "../../LoadingView";
import { apiStatusConstants } from "../../utils/constants";

const Videos = () => {
  const [videosData, setVideosData] = useState([]);
  const [loading, setLoadingStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.pending);
  const pageToken = useRef("");
  const previousCategory = useRef("");
  const [nextPageToken, setNextPageToken] = useState("");

  const { selectedCategory, regionCode } = useContext(UserContext);

  useEffect(() => {
    setLoadingStatus(true);

    const url = `search?part=snippet&q=${selectedCategory}&regionCode=${regionCode}&type=video&maxResults=30&pageToken=${nextPageToken}`;

    fetchFromApi(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setVideosData([]);
          setLoadingStatus(false);
          setApiStatus(apiStatusConstants.failure);
        }
        setLoadingStatus(false);
      })
      .then((data) => {
        if (previousCategory.current !== selectedCategory) {
          previousCategory.current = selectedCategory;
          pageToken.current = data.nextPageToken;
          window.scrollTo(0, 0);
          setVideosData(data?.items);
          setLoadingStatus(false);
        } else {
          setVideosData((prev) => [...prev, ...data.items]);
          setLoadingStatus(false);
          pageToken.current = data.nextPageToken;
        }
        setApiStatus(apiStatusConstants.success);
        setLoadingStatus(false);
      });
  }, [selectedCategory, regionCode,nextPageToken]);

  const handleOnScroll = () => {
    const screenHeight = window.innerHeight;
    const toalDocumentElemhHeight = document.documentElement.scrollHeight;
    if (screenHeight + window.scrollY + 2 >= toalDocumentElemhHeight) {
      setNextPageToken(pageToken.current);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  const renderVideosView = () => (
    <ul className="videos-cards-container">
      {videosData.map((video) => (
        <VideoFeedItem video={video} />
        // <p className="video-card">video</p>
      ))}
    </ul>
  );

  const renderLoadingView = () => (
    <div className="loading-container-view">
      <LoadingView />
    </div>
  );

  const renderFailureView = () => <FailureView />;

  // const renderResultantView = () => {
  //   switch (apiStatus) {
  //     case apiStatusConstants.success:
  //       return renderVideosView();
  //     case apiStatusConstants.pending:
  //       return renderLoadingView();
  //     case apiStatusConstants.failure:
  //       return renderFailureView();
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div className="home-video-section">
      {videosData?.length > 0 && renderVideosView()}
      {loading && renderLoadingView()}
      {apiStatusConstants.failure === apiStatus && renderFailureView()}
    </div>
    // renderResultantView()
  );
};

export default Videos;
