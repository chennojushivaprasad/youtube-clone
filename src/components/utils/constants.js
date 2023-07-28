import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
// import LiveTvIcon from "@mui/icons-material/LiveTv"
import SpotsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";

const categories = [
  {
    categoryId: "New",
    categoryName: "All",
    displayText: "Home",
    icon: <HomeIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Entertainmaent",
    categoryName: "Entertainment",
    displayText: "Entertainment",
    icon: <OndemandVideoIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Music",
    categoryName: "Music",
    displayText: "Music",
    icon: <MusicNoteIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Education",
    categoryName: "Education",
    displayText: "Education",
    icon: <SchoolIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Movies",
    categoryName: "Movies",
    displayText: "Movies",
    icon: <MovieFilterIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Gaming",
    categoryName: "Gaming",
    displayText: "Gaming",
    icon: <SpotsEsportsIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "News",
    categoryName: "News",
    displayText: "News",
    icon: <NewspaperIcon className="category-icon" fontSize="" />,
  },
  {
    categoryId: "Sports",
    categoryName: "Sports",
    displayText: "Sports",
    icon: <SchoolIcon className="category-icon" fontSize="" />,
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
};

export { categories, apiStatusConstants };
