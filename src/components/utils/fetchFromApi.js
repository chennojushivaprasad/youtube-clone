
// import Cookies from "js-cookie";


// const accessToken = Cookies.get("yt_access_token");
const base_url = "https://www.googleapis.com/youtube/v3";
const options = {
  method: "GET",
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  //   Accept: "application/json",
  // },
};

const fetchFromApi = async (url) => {
  const fetchUrl = `${base_url}/${url}&key=${process.env.REACT_APP_KEY}`
  try {
    const response = await fetch(fetchUrl, options);
    if (response.ok) {
      return response;
    }
    else{

    console.log("sorry quota exceeded");
    return { error_msg: "something went wrong", ok: false };
    }
  } catch (error) {
    return { error_msg: "something went wrong", ok: false };
  }
};

export default fetchFromApi;
