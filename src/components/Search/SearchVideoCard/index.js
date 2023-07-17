import React, { useContext, useEffect, useState } from "react";
import "./index.css"
import { Link } from "react-router-dom";
import PublishedTimeAgo from "../../TimeAgo";
import UserContext from "../../Context";
import ViewsCount from "../../ViewsCount";
import fetchFromApi from "../../utils/fetchFromApi";

const SearchVideoCard = (props) => {
  const [videoStats,setVideoStats] = useState(null)
  // const [channelDetails,setChannelDetails] = useState(null)
  const [hover, setHover] = useState({ hoverState: false, videoId: null });

  const { textColor,onHoverVideoMuted } = useContext(UserContext);

  const { video } = props;
  const {
    title,
    // channelId,
    channelTitle,
    description,
    // liveBroadcasstContent,
    // publishTime,
    publishedAt,
    thumbnails,
  } = video.snippet;

  const viewCount = videoStats?.statistics?.viewCount
  const { videoId } = video.id;

  useEffect(()=>{

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

    // const fethedChannelUrl = `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`;
    // fetchFromApi(fethedChannelUrl).then((response)=>{
    //   return response.json()
    // }).then((data) => {
    //   setChannelDetails(data.items[0]);
    // });
     
  },[videoId])

  return (
    <Link
      to={`/video/${videoId}`}
      className="searched-video-card searched-video-card-link"
    >
      <li
        key={videoId}
        className="searched-video-card-container"
        onMouseEnter={() =>
          setHover({ hoverState: true, hoverVideoId: videoId })
        }
        onMouseLeave={() => setHover({ hoverState: false, hoverVideoId: "" })}
      >
        <div className="searched-video-thumbnail-container">
          {hover.hoverVideoId === videoId && hover.hoverState ? (
            <iframe
              width="100%"
              title="youtube-searh-frame"
              className="search-video-player"
              src={`https://youtube.com/embed/${videoId}?autoplay=${
                hover.hoverVideoId === videoId && +"1"
              }&controls=0&showinfo=0&mute=${onHoverVideoMuted}}`}
            ></iframe>
          ) : (
            <img
              src={thumbnails.medium.url}
              className="searched-video-thumbnail"
              alt="load"
            />
          )}
        </div>
        <div className="searched-video-card-details">
          <p className={`video-title ${textColor}`}>{title}</p>
          <div className="views-published-container">
            <p className={`views ${textColor}`}>{<ViewsCount views={viewCount}/>}</p>
            <p className={`ago-text ${textColor} `}>
              {<PublishedTimeAgo date={publishedAt} />}
            </p>
          </div>
          <div className="channel-container">
            <p className={`channel-name ${textColor}`}>{channelTitle}</p>
          </div>
          <div className-="searchfeed-videodescription-container">
            <p className={`searched-video-description ${textColor}`}>
              {description.length > 200
                ? `${description.slice(0, 200)}...`
                : description}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default SearchVideoCard;
