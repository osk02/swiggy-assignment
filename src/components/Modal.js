import React, { useState, useEffect } from "react";
import axios from "axios";

function Modal({ id, onClose }) {
  const [foodItemDetails, setFoodItemDetails] = useState([]);
  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => {
        console.log(res.data.meals);
        setFoodItemDetails(res.data.meals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
      <div className="overlay">
      {foodItemDetails.map((itemDetails) => (
        <div key={itemDetails.idMeal} className="modal-container">
          <img
            className="object-cover w-full h-96"
            src={itemDetails.strMealThumb}
            alt={itemDetails.strMeal}
          />
          <div dir="rtl">
            <div className="absolute h-14 w-14 top-0 start-0 ...">
              <button onClick={onClose} className="modal-close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="modal-title">
            <span>{itemDetails.strMeal}</span>
          </div>
          <div className="modal-data">
            <div className="modal-subtitle">
              <span>Category:</span>
            </div>
            <div className="modal-subtitle-text">
              <span>{itemDetails.strCategory}</span>
            </div>
            <div className="modal-subtitle">
              <span>Area:</span>
            </div>
            <div className="modal-subtitle-text">
              <span>{itemDetails.strArea}</span>
            </div>
            <div className="modal-subtitle">
              <span>Instructions:</span>
            </div>
            <div className="modal-subtitle-text">
              <span>{itemDetails.strInstructions}</span>
            </div>
            <div className="modal-subtitle">
              <span>Measure & Ingredients:</span>
            </div>
            <div className="modal-subtitle-text">
              <ul>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                  const ingredient = itemDetails[`strIngredient${index}`];
                  const measure = itemDetails[`strMeasure${index}`];
                  if (ingredient && ingredient.trim() !== "") {
                    return (
                      <li key={index}>
                        {measure} {ingredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Modal;
