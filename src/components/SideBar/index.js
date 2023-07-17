import React, { useContext } from "react";
import "./index.css";

import { Link } from "react-router-dom";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';

import UserContext from "../Context/index.js";
import { categories } from "../utils/constants";

// import MenuIcon from "@mui/icons-material/Menu";

function SideBar() {
  const {
    isSideBarActive,
    selectedCategory,
    setCategory,
    bgColor,
    textColor,
    activeCategoryBgColor,
  } = useContext(UserContext);

  return (
    <div
      className={`sidebar ${bgColor} ${
        isSideBarActive ? "active-sidebar" : "unactive-sidebar"
      }`}
    >
      <ul className="categories">
        <Link to="/shorts" className="category-link">
          
          <li
            key={"Shorts"}
            className={`category ${
              selectedCategory === "Shorts" && "active-category" && activeCategoryBgColor
            } `}
          >
            <button
              className={`category-btn ${
                selectedCategory === "Shorts" && "active-category"
              } ${
                isSideBarActive === false && "category-default-menu-btn"
              } ${textColor}`}
              onClick={() => setCategory("Shorts")}
            >
              {/* {category.icon} */}
              {<SlowMotionVideoIcon className="category-icon"  fontSize=""/>}
              <p
                className={`category-name ${
                  !isSideBarActive && "category-menu-size"
                } ${textColor} ${selectedCategory === "Shorts" && "active-category"}`}
              >
                {/* {category.displayText} */}
                Shorts
              </p>
            </button>
          </li>
        </Link>
        {categories.map((category) => {
          const isActiveCategory = selectedCategory === category.categoryId;
          return (
            <Link to="/" className="category-link">
              <li
                key={category.categoryId}
                className={`category ${
                  isActiveCategory && "active-category" && activeCategoryBgColor
                } `}
              >
                <button
                  className={`category-btn ${
                    isActiveCategory && "active-category"
                  } ${
                    isSideBarActive === false && "category-default-menu-btn"
                  } ${textColor}`}
                  onClick={() => setCategory(category.categoryId)}
                >
                  {category.icon}
                  <p
                    className={`category-name ${
                      !isSideBarActive && "category-menu-size"
                    } ${textColor} ${isActiveCategory && "active-category"}`}
                  >
                    {category.displayText}
                  </p>
                </button>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
