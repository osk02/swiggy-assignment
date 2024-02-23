import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function CardGrid({ selectedArea, sortOrder }) {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const handleModalClose = () => {
    setSelectedCardId(null);
  };

  const handleCardClick = (id) => {
    setSelectedCardId(id);
  };

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
      )
      .then((res) => {
        setFoodItems(res.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedArea]);

  // Sorting
  const sortFoodItems = useCallback(() => {
    setFoodItems((foodItems) => {
      return [...foodItems].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.strMeal.localeCompare(b.strMeal);
        } else {
          return b.strMeal.localeCompare(a.strMeal);
        }
      });
    });
  }, [sortOrder, setFoodItems]);

  useEffect(() => {
    sortFoodItems();
  }, [sortFoodItems]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const totalPages = Math.ceil(foodItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = foodItems.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="outlined"
            className={`pagination-btn ${
              currentPage === 1 ? "" : "hover:bg-[#fc8019]"
            }`}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </button>
          <span className="mx-2 self-center">
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">{totalPages}</strong>
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage * pageSize >= foodItems.length}
            variant="outlined"
            className={`pagination-btn ${
              currentPage === totalPages ? "" : "hover:bg-[#fc8019]"
            }`}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-8 m-4"> */}
      <div className="grid-container">
        {currentPageItems.map((item) => {
          return (
            <div
              key={item.idMeal}
              className="grid-card cursor-pointer"
              onClick={() => handleCardClick(item.idMeal)}
            >
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="card-img"
              />
              <span className="card-offer">₹100 OFF ABOVE ₹249</span>
              <div className="card-body mt-[10px]">
                <p className="text-lg font-bold text-nowrap overflow-hidden text-gray-700">
                  {item.strMeal}
                </p>
                <p className="flex items-center card-rating">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    id="Star"
                  >
                    <path fill="none" d="M0 0h48v48H0z"></path>
                    <path
                      d="M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zm8.47 32L24 30.9 15.54 36l2.24-9.62-7.46-6.47 9.84-.84L24 10l3.84 9.07 9.84.84-7.46 6.47L32.46 36z"
                      fill="#178b3f"
                      className="color000000 svgShape"
                    ></path>
                  </svg>
                  <span className="rating font-bold text-base ml-2">
                    4.3 • 30-35 mins
                  </span>
                </p>
                <p className="font-extralight">{selectedArea}</p>
              </div>
            </div>
          );
        })}
        {selectedCardId && (
          <Modal id={selectedCardId} onClose={handleModalClose} />
        )}
      </div>
    </div>
  );
}

export default CardGrid;
