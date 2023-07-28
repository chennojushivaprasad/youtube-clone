import React, { useEffect, useRef, useState } from "react";
import GoogleButton from 'react-google-button'

import "./index.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const clientId = process.env.REACT_APP_CLIENT_ID
const clientSecret = process.env.REACT_APP_CLIENT_SECRECT

const redirectUri =  "https://nxtube.netlify.app/login"


const getAccessToken = async () => {
  const options = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      client_id:
        clientId,
      client_secret: clientSecret,
      refresh_token: Cookies.get("yt_refresh_token"),
      grant_type: "refresh_token",
    }),
  };

  const url = `https://oauth2.googleapis.com/token`;
  const response = await fetch(url, options);
  const data = await response.json();
  const accessToken = data.access_token;
  Cookies.set("yt_access_token", accessToken);
   
};

const Login = () => {
  const [loginClicked, setLoginClicked] = useState(false);
  const formRef = useRef(null);

  let authoriazationGrantCode = null;

  useEffect(() => {
    if (loginClicked !== false) {
      formRef.current.submit();
    }
  }, [loginClicked]);

  const oauth2EndPoint = `https://accounts.google.com/o/oauth2/v2/auth`;

  const params = {
    client_id:
     clientId,
    redirect_uri:redirectUri,
    scope:
      "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit",
    response_type: "code",
    access_type: "offline",
    include_granted_scopes: true,
    state: "state_parameter_passthrough_value",
  };

  const getRefreshToken = async () => {
    const options = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        client_id:
         clientId,
        client_secret: clientSecret,
        code: authoriazationGrantCode,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    };

    const url = `https://oauth2.googleapis.com/token`;
    const response = await fetch(url, options);
    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    Cookies.set("yt_access_token", accessToken);
    Cookies.set("yt_refresh_token", refreshToken);
  };

  if (Cookies.get("yt_refresh_token") === undefined) {
    const myKeysValues = window.location.search;

    const urlParams = new URLSearchParams(myKeysValues);
    authoriazationGrantCode = urlParams.get("code");

    if (authoriazationGrantCode !== null) {
      getRefreshToken();
    }
  }

  if (Cookies.get("yt_refresh_token") !== undefined) {
    getAccessToken();
  }

  const signIn = () => {
    setLoginClicked(!loginClicked);
  };

  

  if(Cookies.get("yt_access_token") !== undefined){
   return <Navigate to="/"/>
  }
  return (
    <div className="login" id="login">
      <form ref={formRef} id="form" action={oauth2EndPoint} method="GET">
        {Object.keys(params).map((key) => (
          <input type="hidden" name={`${key}`} value={params[key]} />
        ))}
      </form>

   
      <GoogleButton
        type="light" // can be light or dark
        onClick={signIn}
      />
    </div>
  );
};

export default Login;
