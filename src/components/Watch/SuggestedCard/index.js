import React, { useContext, useEffect, useState } from "react";
import ViewsCount from "../../ViewsCount";
import fetchFromApi from "../../utils/fetchFromApi";
import UserContext from "../../Context";
import { Link } from "react-router-dom";
import PublishedTimeAgo from "../../TimeAgo";

const SuggestedCard = (props) => {
  const {  textColor } = useContext(UserContext);
  const [SuggestedVideoDetails, setSuggestedVideoDetails] = useState(null);


  const { video } = props;

  const {
    title,
    // channelId,
    channelTitle,
    // description,
    // liveBroadcasstContent,
    // publishTime,
    publishedAt,
    thumbnails,
  } = video.snippet;

  // const {viewCount} = video.statistics
  const { videoId } = video.id;
  useEffect(() => {
    const fetchVideoStatsUrl = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    fetchFromApi(fetchVideoStatsUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSuggestedVideoDetails(data.items[0]);
      });

    // const fethedChannelUrl = `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`;
    // fetchFromApi(fethedChannelUrl).then((response)=>{
    //   return response.json()
    // }).then((data) => {
    //   setChannelDetails(data.items[0]);
    // });
  }, [videoId]);

  let viewCount = SuggestedVideoDetails?.statistics?.viewCount;

  return (
    <Link
      to={`/video/${videoId}`}
      className="suggested-video-card suggested-video-card-link"
    >
      <li key={videoId} className="suggested-video-card-container">
        <div className="suggested-video-thumbnail-container">
          <img
            src={thumbnails?.medium?.url}
            className="suggested-video-thumbnail"
            max-height="200px"
            width="200px"
            alt="load"
          />
        </div>
        <div className="suggested-video-card-details">
          <p className={`video-title ${textColor}`}>{title.slice(0, 60)}...</p>
          <div className="channel-container">
            <p className={`channel-name ${textColor}`}>{channelTitle}</p>
          </div>
          <div className="views-published-container">
            <p className={`views ${textColor}`}>{<ViewsCount views={viewCount}/>}</p>
            <p className={`ago-text ${textColor} `}>
              {<PublishedTimeAgo date={publishedAt} />}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default SuggestedCard;
