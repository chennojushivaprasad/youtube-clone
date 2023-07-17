import React, { useContext} from "react";
import "./index.css";
import YouTube from "react-youtube";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import UserContext from "../../Context";
// import fetchFromApi from "../../utils/fetchFromApi";

// function YTDurationToSeconds(duration) {
//   if (duration !== undefined) {
//     let a = duration.match(/\d+/g);
//     if (
//       duration.indexOf("M") >= 0 &&
//       duration.indexOf("H") === -1 &&
//       duration.indexOf("S") === -1
//     ) {
//       a = [0, a[0], 0];
//     }

//     if (duration.indexOf("H") >= 0 && duration.indexOf("M") === -1) {
//       a = [a[0], 0, a[1]];
//     }
//     if (
//       duration.indexOf("H") >= 0 &&
//       duration.indexOf("M") === -1 &&
//       duration.indexOf("S") === -1
//     ) {
//       a = [a[0], 0, 0];
//     }

//     duration = 0;

//     if (a.length === 3) {
//       duration = duration + parseInt(a[0]) * 3600;
//       duration = duration + parseInt(a[1]) * 60;
//       duration = duration + parseInt(a[2]);
//     }

//     if (a.length === 2) {
//       duration = duration + parseInt(a[0]) * 60;
//       duration = duration + parseInt(a[1]);
//     }

//     if (a.length === 1) {
//       duration = duration + parseInt(a[0]);
//     }
//     return duration;
//   }
// }
// const checkElapsedTime = (e) => {
//   const duration = e.target.getDuration();
//   const currentTime = e.target.getCurrentTime();
//   // if (currentTime / duration > 0.95) {
//   //   setModalIsOpen(true);
//   // }
// };

const ShortVideo = (props) => {
  // const [videoStats, setVideoStatistics] = useState(null);
  const { video, headerHeight, viewableHeight, isActive,nextShortVideo } =
    props;
  const { textColor } = useContext(UserContext);
  const videoId = video?.id?.videoId;

  // useEffect(() => {
  //   const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  //   fetchFromApi(url)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //     })
  //     .then((data) => setVideoStatistics(data.items[0]));
  // }, [videoId]);

  const videoHeight = viewableHeight - headerHeight;

  // const opts = {
  //   height: videoHeight,
  //   width: "100%",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: isActive ? 1 : 0,
  //   },
  // };

  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  const videoWidth = (9 / 16) * videoHeight
  return (
    <li
      className={`short-video`}
      max-height={videoHeight}
      width={videoWidth}
    >
     
      {isActive ? (
        <YouTube
          videoId={videoId}
          opts={{
            height: videoHeight,
            width:videoWidth,
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: isActive ? 1 : 0,
            },
          }}
          onReady={(event) => {
            if (isActive) {
              event.target.playVideo();
            }
          }}
          
          // onStateChange={(e) => checkElapsedTime(e)}

          onPlay={(event) => {
            if (isActive) {
              event.target.playVideo();
            }
          }}
          onPause={(event) => {
            if (!isActive) {
              event.target.pauseVideo();
            }
          }}
          onEnd={(event) => {
            nextShortVideo();
          }}
        />
      ) : (
        
        <img height={videoHeight} className="short-video-image"  width={videoWidth} alt="video-failed" src={video?.snippet?.thumbnails?.high?.url}/>
      )}

      <div className="short-video-detail" max-height={videoHeight}>
        <div className="short-video-like-container">
          <button type="button" className="like-button short-button">
            <AiFillLike className="short-button-icon" />
            <p className={`like  short-button-name ${textColor}`}>
              {}Like
            </p>{" "}
          </button>
        </div>
        <div className="short-video-dislike-container">
          <button type="button" className="dislike-button short-button">
            <AiFillDislike className="short-button-icon" />
            <p className={`short-dislike  short-button-name ${textColor}`}>
              {}Dislike
            </p>{" "}
          </button>
        </div>
        <div className="short-video-comment-container">
          <button type="button" className="short-button comment-button">
            <BiSolidCommentDetail className="short-button-icon" />
            <p className={`short-comment  short-button-name  ${textColor}`}>
              {}Comment
            </p>
          </button>
        </div>
        <div className="short-video-share-container">
          <button type="button" className="short-button share-button">
            <FaShare className="short-button-icon" />
            <p className={`"short-share short-button-name ${textColor}`}>
              {}Share
            </p>{" "}
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShortVideo;
