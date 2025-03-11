import React, { useState, useRef, useEffect } from "react";
import "./Popup.css"; // Optional CSS for styling
import ShareButton from "./ShareButton.jsx";
import fire from "/ascii-art-fire.png";
import clock from "/ascii-art-clock.png";
import people from "/ascii-art-people.png";
import diet from "/ascii-art-diet.png";
import author from "/ascii-art-author.png";
import rating from "/ascii-art-rating.png";
import { useProvider } from "../context/Provider.jsx";
import { Link } from "react-router-dom";

const PopupDetailIngredient = ({ item, onClose }) => {
    const popupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose(); // Close popup if click is outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    const {
        openSide, setOpenSide,
        nameIngredient, setNameIngredient,
        ingredientAliases, setIngredientAliases,
        ingredientImgUrl, setIngredientImgUrl,
        ingredientInvalidObject, setIngredientInvalidObject
    } = useProvider();

    console.log("pppp: ", openSide);

    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >Detail</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>

                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center px-2 gap-2">
                        <label>Name: <input className="label form-control" value={item.name} disabled /></label>
                        <label>Aliases: <input disabled className="label form-control" value={item.aliases ? item.aliases.join(",") : ""} /></label>
                        <div className="d-flex flex-row justify-center align-items-center w-50">
                            Image: <img style={{ width: "100px", height: "100px" }} src={item.imgUrl} alt="img" />
                        </div>
                        <label > Image Link:
                            <input className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                type="text" placeholder="Paste link image ingredient" value={item.imgUrl} disabled />
                        </label>
                        <label > Category:
                            <input className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                type="text" value={item.category} disabled />
                        </label>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default PopupDetailIngredient;