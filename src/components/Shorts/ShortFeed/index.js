import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import SideBar from "../../SideBar";
import Header from "../../Header";
import UserContext from "../../Context";
import fetchFromApi from "../../utils/fetchFromApi";
import { apiStatusConstants } from "../../utils/constants";
import LoadingView from "../../LoadingView";
import ShortVideo from "../ShortVideo";
import FailureView from "../../FailureView";

import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";

const ShortFeed = () => {
  const [shortVideos, setShortVideosData] = useState([]);
  const [loading, setLoadingStatus] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.pending);
  const [activeVideoElementPosition, setActiveVideoElement] = useState(0);
  const shortVideoParentElem = useRef(null);
  // let previousHeight = useRef(0);
  // const [previousPageToken ,setPreviousPageToken] = useState("")
  // const [nextPageToken, setNextPageToken] = useState("");
  const pageToken = useRef("");
  const { bgColor, regionCode, headerHeight } = useContext(UserContext);
  const [viewableHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const url = `search?part=snippet&q=Shorts&regionCode=${regionCode}&order=date&maxResults=25`;
    fetchFromApi(url)
      .then((response) => {
        console.log("response in fedd", response);
        if (response.ok) {
          return response.json();
        } else {
          setShortVideosData([]);
          setApiStatus(apiStatusConstants.failure);
        }
      })
      .then((data) => {
        pageToken.current = data.nextPageToken;
        window.scrollTo(0, 0);

        setShortVideosData(data.items);
        pageToken.current = data.nextPageToken;

        setApiStatus(apiStatusConstants.success);
      });
    setLoadingStatus(false);
  }, [regionCode]);

  // useEffect(() => {
  //   const handleOnScroll = () => {
  //     const screenHeight = window.innerHeight;
  //     const toalDocumentElemhHeight = document.documentElement.scrollHeight;
  //     if (screenHeight + window.scrollY + 2 >= toalDocumentElemhHeight) {
  //       setNextPageToken(pageToken.current);
  //       setApiStatus(apiStatusConstants.initial);
  //     }
  //   };

  //   window.addEventListener("scroll", handleOnScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleOnScroll);
  //   };
  // }, [viewableHeight]);

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setScreenHeight(event.target.innerHeight);
    });
  }, []);


  const nextShortVideo = () =>{
    const currentPosition= shortVideoParentElem.current.scrollTop
    const scrolledPosition = currentPosition /(viewableHeight-headerHeight)
    shortVideoParentElem.current.scrollTo(0,currentPosition+(viewableHeight-headerHeight))
    setActiveVideoElement(scrolledPosition+1)
  }

  useEffect(() => {
    const onScroll = (event) => {
      const scrolledPosition = event.target.scrollTop / (viewableHeight-headerHeight+3);
      console.log("scrolled",scrolledPosition)
      if (scrolledPosition-0.2 <= (scrolledPosition) <= scrolledPosition+0.2) {
        console.log("scrolled", Math.ceil(scrolledPosition));
        setActiveVideoElement(Math.ceil(scrolledPosition));
      }
    }
    shortVideoParentElem.current.addEventListener("scroll", onScroll);
    //  return () =>{
    //   shortVideoParentElem.current.removeEventListener("scroll", onScroll);
    // }
  });

  console.log("render short feed");
  return (
    <div className={`short-feed-container ${bgColor}`}>
      <Header />
      <div className="shortfeed-responsive-container">
        <SideBar />
        <div className="shorts-container">
          <div id="player"></div>
          <ul
            className="short-videos"
            ref={shortVideoParentElem}
            height={viewableHeight - headerHeight}
          >
            {shortVideos?.map((video, index) => (
              <ShortVideo
                video={video}
                viewableHeight={viewableHeight}
                headerHeight={headerHeight}
                isActive={index === activeVideoElementPosition}
                nextShortVideo={nextShortVideo}
              />
            ))}
          </ul>
          {apiStatus === apiStatusConstants.failure && <FailureView />}
          <div
            className="shorts-scroll-button-container"
            height={viewableHeight - headerHeight}
          >
            <button
              className="scroll-down short-scroll-button"
             
            >
              <BsFillArrowDownCircleFill className="short-scroll-button-icon" />
            </button>
            <button
              className="scroll-up short-scroll-button"
             
            >
              <BsFillArrowUpCircleFill className="short-scroll-button-icon" />
            </button>
          </div>
        </div>
        {loading && <LoadingView />}
      </div>
    </div>
  );
};

export default ShortFeed;
