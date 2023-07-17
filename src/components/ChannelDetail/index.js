import React, { useContext } from "react";
import UserContext from "../Context";
import { Navigate } from "react-router-dom";

const ChannelDetail = () => {
  const { isLoggedIn } = useContext(UserContext);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
 }

  return <div>channelDetail</div>;
};

export default ChannelDetail;
