import React, { useContext, useState } from "react";
import ViewsCount from "../../ViewsCount";

import PublishedTimeAgo from "../../TimeAgo";
import UserContext from "../../Context";
// import LoadingView from "../../LoadingView";


const WatchScreenVideoPlayer = (props) => {
  const { textColor, isLightModeActive } = useContext(UserContext);
  const [showMore, setShowMoreStatus] = useState(false);

  const { videoDetails } = props;
  const { snippet, statistics, id } = videoDetails;
  const {
    channelTitle,
    description,
    publishedAt,
    // tags,
    // thumbnails,
    title,
  } = snippet;
  const { viewCount, likeCount, commentCount } = statistics;

  const containerBgColor = isLightModeActive
    ? "light-mode-button"
    : "dark-mode-button";

  return (
    <div className="video-player-details-container">
      <div className="player-wrapper">
        (
        <iframe
          width="100%"
          height="100%"
          title="youtube-searh-frame"
          className="watch-screen-video-player"
          src={`https://youtube.com/embed/${id}?autoplay=1&controls=1&showinfo=0&mute=1`}
          allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          webkitallowfullscreen="webkitallowfullscreen"
        ></iframe>
        )
      </div>
      <h2 className={`videoplaying-title ${textColor}`}>{title}</h2>

      <div className="playing-video-details">
        <div className="playing-video-channel-details">
          <div className="channel-logo-container">
            <img src="" alt="" />
          </div>
          <div className="channel-name-subsciber-count-container">
            <h1 className={`channel-name ${textColor}`}>{channelTitle}</h1>
            <p className={`channel-subscribers ${textColor}`}>{} subscribers</p>
          </div>
          <button className={`subscribe-btn ${textColor}`}>Subscribe</button>
        </div>
        <div className="video-like-share-more-container">
          <div className={`like-dislike-container ${containerBgColor}`}>
            <button type="button" className={`like-btn ${textColor}`}>
              {likeCount}
            </button>
            <button className={`dislike-btn ${textColor}`} type="button">
              {}
            </button>
          </div>
          <button className={`share-btn  ${containerBgColor} ${textColor}`}>
            Share
          </button>
          <button
            className={`more-btn ${containerBgColor} ${textColor}`}
            type="button"
          >
            more
          </button>
        </div>
      </div>

      <div
        className={`popup-details-description-container ${containerBgColor} `}
      >
        <p className={`playing-video-views-count ${textColor}`}>
          {<ViewsCount views={viewCount} />} Views
        </p>
        <p className={`video-published ${textColor}`}>
          {<PublishedTimeAgo date={publishedAt} />}
        </p>
        <p className={`video-description ${textColor}`}>
          {showMore
            ? description
            : description.length > 250
            ? `${description.slice(0, 250)}...`
            : description}
        </p>
        <button
          className={`show-more-btn ${textColor}`}
          onClick={() => setShowMoreStatus(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
      <div className="comments-container">
        <div className="top-header">
          <p className={`playingvideo-comments-count ${textColor}`}>
            {commentCount} Comments
          </p>
        </div>
        <ul className="comments-list">
          {
            <li className="comment-list">
              <div className="commet-user-logo-container">{}</div>
              <div className="comment-details-container">
                <div className="username-comment-container">
                  <p className="commented-user">{}</p>
                  <p className="comment">{}</p>
                </div>
                <div className="comments-btn-container">
                  <button className="like-btn">{}</button>
                  <button className="dislike-btn">{}</button>
                  <button className="like-btn">Reply</button>
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    </div>
  );
};

export default WatchScreenVideoPlayer;
