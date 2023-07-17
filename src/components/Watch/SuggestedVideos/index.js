import React, { useEffect, useState } from "react";
import SuggestedCard from "../SuggestedCard";
import fetchFromApi from "../../utils/fetchFromApi";
import { apiStatusConstants } from "../../utils/constants";

const SuggestedVideos = (props) => {
  const [suggestedVideos, setSuggestedVideosData] = useState(undefined);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const { videoId } = props;
  useEffect(() => {
    const suggestedVideosUrl = `search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20`;

    fetchFromApi(suggestedVideosUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setSuggestedVideosData([]);

          setApiStatus(apiStatusConstants.failure);
        }
      })
      .then((suggestedData) => {
        setSuggestedVideosData(suggestedData.items);
        setApiStatus(apiStatusConstants.success)
      });
  }, [videoId]);

  return (
    <div className="suggested-videos-container">
      {apiStatus === apiStatusConstants.success ? (
        <ul>
          {suggestedVideos.map((video) => (
            <SuggestedCard key={video.id.videoId} video={video} />
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SuggestedVideos;
