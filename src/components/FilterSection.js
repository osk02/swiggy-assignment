import React, { useEffect, useState } from "react";
import axios from "axios";

function FilterSection({ setSelectedArea, toggleSortOrder }) {
  // Dropdown State
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [sortDropDown, setSortDropDown] = useState(false);

  const [areas, setAreas] = useState([]);

  // selectedArea inside FilterSection
  const [localSelectedArea, setLocalSelectedArea] = useState("Indian");
  const [sortingOrder, setSortingOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => {
        // console.log(res);
        setAreas(res.data.meals.map((meal) => meal.strArea));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterClickHandler = () => {
    setSortDropDown(false);
    setFilterDropDown(!filterDropDown);
  };
  const sortClickHandler = () => {
    setFilterDropDown(false);
    setSortDropDown(!sortDropDown);
  };

  useEffect(() => {
    setSelectedArea(localSelectedArea);
  }, [localSelectedArea, setSelectedArea]);

  const handleSortOrderChange = (e) => {
    const newSortingOrder = e.target.value;
    toggleSortOrder(newSortingOrder);
    setSortingOrder(newSortingOrder);
  };

  return (
    <div className="filter-container">
      <h1 className="font-bold text-3xl mb-4 mt-4 md:text-3xl">
        Restaurants with online food delivery in Pune
      </h1>
      <div
        id="filter-btn-container"
        className="relative py-4 flex flex-row flex-wrap gap-4 items-center"
      >
        <button onClick={filterClickHandler}>
          Filter{" "}
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 30 30"
              id="filter"
            >
              <path
                fill="#111224"
                d="M17 11H4A1 1 0 0 1 4 9H17A1 1 0 0 1 17 11zM26 11H22a1 1 0 0 1 0-2h4A1 1 0 0 1 26 11z"
              ></path>
              <path
                fill="#111224"
                d="M19.5 13.5A3.5 3.5 0 1 1 23 10 3.5 3.5 0 0 1 19.5 13.5zm0-5A1.5 1.5 0 1 0 21 10 1.5 1.5 0 0 0 19.5 8.5zM26 21H13a1 1 0 0 1 0-2H26A1 1 0 0 1 26 21zM8 21H4a1 1 0 0 1 0-2H8A1 1 0 0 1 8 21z"
              ></path>
              <path
                fill="#111224"
                d="M10.5,23.5A3.5,3.5,0,1,1,14,20,3.5,3.5,0,0,1,10.5,23.5Zm0-5A1.5,1.5,0,1,0,12,20,1.5,1.5,0,0,0,10.5,18.5Z"
              ></path>
            </svg>
          </span>
        </button>
        {filterDropDown && (
          <div className="filter-list">
            <ul className="flex flex-col items-start">
              {areas.map((area, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      setLocalSelectedArea(area);
                    }}
                  >
                    <span>{area}</span>
                    <input
                      type="radio"
                      name="filter"
                      onChange={() => {}}
                      value={area}
                      checked={localSelectedArea === area}
                    ></input>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <button onClick={sortClickHandler}>
          Sort By{" "}
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 30 30"
              id="down-arrow"
            >
              <path d="M22.782 13.8 17 19.582 11.218 13.8a1 1 0 0 0-1.414 1.414L16.29 21.7a.992.992 0 0 0 .71.292.997.997 0 0 0 .71-.292l6.486-6.486a1 1 0 0 0-1.414-1.414z"></path>
            </svg>
          </span>
        </button>
        {sortDropDown && (
          <div className="sort-list" dir="rtl">
            <ul>
              <li>
                <input
                  type="radio"
                  name="sort"
                  value="asc"
                  onChange={handleSortOrderChange}
                  checked={sortingOrder === "asc"}
                ></input>
                A-Z
              </li>
              <li>
                <input
                  type="radio"
                  name="sort"
                  value="desc"
                  onChange={handleSortOrderChange}
                  checked={sortingOrder === "desc"}
                ></input>
                Z-A
              </li>
            </ul>
          </div>
        )}
        <button>Fast Delivery</button>
        <button>New on Swiggy</button>
        <button>Ratings 4.0+</button>
        <button>Pure Veg</button>
        <button>Offers</button>
        <button>Rs. 300-Rs. 600</button>
        <button>Less than Rs. 300</button>
      </div>
    </div>
  );
}

export default FilterSection;
