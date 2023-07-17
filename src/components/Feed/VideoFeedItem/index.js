import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../Context";
import { Link } from "react-router-dom";
import PublishedTimeAgo from "../../TimeAgo";
import "./index.css";
import ViewsCount from "../../ViewsCount";
import fetchFromApi from "../../utils/fetchFromApi";

const VideoFeedItem = (props) => {
  const [videoStats, setVideoStats] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);

  const { video } = props;

  const { textColor, onHoverVideoMuted } = useContext(UserContext);
  const [hover, setHover] = useState({ hoverState: false, videoId: null });

  const {
    title,
    channelId,
    channelTitle,
    // description,
    // liveBroadcasstContent,
    // publishTime,
    publishedAt,
    thumbnails,
  } = video.snippet;
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
        setVideoStats(data.items[0]);
      });

    const fethedChannelUrl = `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`;
    fetchFromApi(fethedChannelUrl).then((response)=>{
      return response.json()
    }).then((data) => {
      setChannelDetails(data.items[0]);
    });
  }, [videoId, channelId]);

  let viewCount = videoStats?.statistics?.viewCount;

  const channelThumbnail = channelDetails?.snippet?.thumbnails;
  return (
    <Link to={`/video/${videoId}`} className="video-card video-card-link">
      <li
        key={videoId}
        className="video-card-container"
        onMouseEnter={() =>
          setHover({ hoverState: true, hoverVideoId: videoId })
        }
        onMouseLeave={() => setHover({ hoverState: false, hoverVideoId: "" })}
      >
        <div className="video-thumbnail-container">
          {hover.hoverVideoId === videoId && hover.hoverState ? (
            <iframe
              width="100%"
              title="youtube-searh-frame"
              className="feed-video-player"
              src={`https://youtube.com/embed/${videoId}?autoplay=${
                hover.hoverVideoId === videoId && +"1"
              }&controls=0&showinfo=0&mute=${onHoverVideoMuted ? 0 : 1}`}
            ></iframe>
          ) : (
            <img
              src={thumbnails?.medium?.url}
              className="video-feed-thumbnail"
              alt="load"
            />
          )}
        </div>
        <div className="video-card-details">
          <p className={`video-title ${textColor}`}>{title}</p>
          <div className="video-feed-channel-container">
            <div className="video-card-channel-logo-container">
              <img
                className="video-card-channel-logo"
                src={channelThumbnail?.medium?.url}
                alt="channel-logo"
              />
            </div>
            <p className={`channel-name ${textColor}`}>{channelTitle}</p>
          </div>
          <div className="views-published-container">
            <p className={`views ${textColor}`}>
              {<ViewsCount views={viewCount} />}{" "}
            </p>
            <p className={`ago-text ${textColor} `}>
              {<PublishedTimeAgo date={publishedAt} />}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default VideoFeedItem;
