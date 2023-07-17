
import { Navigate } from "react-router-dom";
import fetchFromApi from "./fetchFromApi";

// const playVideo = async (searchTerm, regionCode) => {
//   let value = searchTerm.split(" ").slice(1).join("%");
//   const url = `search?q=${value}&part=snippet%2Cid&regionCode=${regionCode}&maxResults=1`;
//   const response = await fetchFromApi(url);
//   const data = await response;
//   return data.items[0].id.videoId;
// };

const commands = [
  {
    command: ["play"],
    callback: async (searchTerm, regionCode) => {
        let value = searchTerm.split(" ").slice(1).join("%");
        const url = `search?q=${value}&part=snippet%2Cid&regionCode=${regionCode}&maxResults=1`;
        const response = await fetchFromApi(url);
        const data = await response;
        return [{exec:<Navigate  to={`/video/${data.items[0].id.videoId}`}/>}];
    }
  },
];

export default commands;
