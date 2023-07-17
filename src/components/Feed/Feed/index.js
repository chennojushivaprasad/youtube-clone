import React, { useContext, useEffect } from "react";
import "./index.css";

import UserContext from "../../Context";
import Videos from "../Videos";
import SideBar from "../../SideBar";
import Header from "../../Header";
// import { useParams } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const Feed = () => {
  const { bgColor } = useContext(UserContext);

  // const param = useParams()
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);


  return (
    <div className={`feed-container ${bgColor}`}>
      <Header />
      <div className="feed-responsive-container">
        <SideBar />
        <Videos />
      </div>
    </div>
  );
};

export default Feed;
