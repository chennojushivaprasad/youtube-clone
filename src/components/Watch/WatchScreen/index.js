import React, { useContext, useEffect, useState } from "react";
import "./index.css";

import Header from "../../Header";
import UserContext from "../../Context";
import { apiStatusConstants } from "../../utils/constants";
import fetchFromApi from "../../utils/fetchFromApi";

import { useParams } from "react-router-dom";
import SideBar from "../../SideBar";
import FailureView from "../../FailureView";
import LoadingView from "../../LoadingView";
import WatchScreenVideoPlayer from "../WatchScreenVideoPlayer";
import SuggestedVideos from "../SuggestedVideos";
import Comments from "../Comments";

const WatchScreen = () => {
  const [videoDetails, setVideoData] = useState(undefined);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { bgColor } = useContext(UserContext);

  const param = useParams();
  const { id: videoId } = param;
  useEffect(() => {
    setLoadingStatus(true);
    const videoDetailsUrl = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

    let fetchedVideosDatasuccessfully = false;
    fetchFromApi(videoDetailsUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setVideoData([]);
          setApiStatus(apiStatusConstants.failure);
        }
      })
      .then((videoData) => {
        fetchedVideosDatasuccessfully = true;
        setVideoData(videoData.items[0]);
      });

    if (fetchedVideosDatasuccessfully) {
      setLoadingStatus(false);
      setApiStatus(apiStatusConstants.success);
    }

    setLoadingStatus(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [videoId]);

  const renderFailureView = () => <FailureView />;

  return (
    <div>
      <Header />
      <div className={`video-details-responsive-container ${bgColor}`}>
        <SideBar />
        <div className="video-details-and-suggested-container">
          {videoDetails !== undefined && (
            <>
              <WatchScreenVideoPlayer
                videoId={videoId}
                videoDetails={videoDetails}
                loadingStatus={loadingStatus}
              />
              <Comments videoId={videoId} />
            </>
          )}

          <SuggestedVideos videoId={videoId} />

          {apiStatus === apiStatusConstants.failure && renderFailureView()}
          {loadingStatus && <LoadingView />}
        </div>
      </div>
    </div>
  );
};

export default WatchScreen;
