import React, { useContext, useEffect, useState } from "react";
import "./index.css";

// import { useParams } from "react-router-dom";
// import UserContext from "../Context";
import SideBar from "../SideBar";
import Header from "../Header";
import fetchFromApi from "../utils/fetchFromApi";
import UserContext from "../Context";
// import VideoFeedItem from "../Feed/VideoFeedItem";
// import Cookies from "js-cookie";

function SubscribedVideos() {
  const [subscribedChannels, setSubscribedChannelsData] = useState(undefined);
  const [videosData,setVideosData] = useState(undefined)
  const { regionCode } = useContext(UserContext);

  // const { searchTerm } = useParams();
  // const searchedValue = searchTerm;
  // console.log(searchedValue);

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  useEffect(() => {
    // const url = `search?q=${searchedValue}&part=snippet%2Cid&regionCode=${regionCode}&maxResults=5`;

    const url = `subscriptions?part=snippet%2CcontentDetails&mine=true&order=relevance&regionCode=${regionCode}&maxResults=10`;

    fetchFromApi(url)
      .then((response) => response.json())
      .then((data) => setSubscribedChannelsData(data.items));
    // .then((data) => console.log("data channel", data));

    console.log(url);
  }, [regionCode]);
  

  const channelIds = subscribedChannels?.map((data) => data?.snippet?.channelId )
  console.log("chnael list",channelIds)


  useEffect(()=>{

    channelIds?.forEach((channelId)=>{

      // publishedAfter
       fetchFromApi(`search?part=snippet&channelId=${channelId}&maxResults=25&q=surfing&maxResults=1`).then((response) => {
        if(response.ok){
          return response.json()
        }
       }).then((data) => setVideosData(data.items))
    })
  //  const videoBychannelId = `search?part=snippet&${channelId}=channelId&maxResults=2&q=surfing`
  },[channelIds])


  useEffect(()=>{
    videosData?.forEach((video) => console.log("video",video))
  },[videosData])

  // const handleOnScroll = () => {
  //   const screenHeight = window.innerHeight;
  //   const toalDocumentElemhHeight = document.documentElement.scrollHeight;
  //   if (screenHeight + window.scrollY + 2 >= toalDocumentElemhHeight) {
  //     setNextPageToken(pageToken.current);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleOnScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleOnScroll);
  //   };
  // });


  return (
    <div className={`subscribefeed-container `}>
      <Header />
      <div className="subscribefeed-responsive-container">
        <SideBar />
        <div className="subscribed-videos-container">
          {
            <ul className="subscribed-videos videos-cards-container">
              {/* {subscribedVideos?.map((video) => (
                <VideoFeedItem video={video} />
              ))} */}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}
export default SubscribedVideos;
