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
import axios from "../setup/axios.jsx";
import { toast } from "react-toastify";

const PopupDeleteIngredient = ({ item, onClose }) => {
    const [receivedItem, setReceivedItem] = useState(item);
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

    const handleOnClickSave = async () => {
        try {
            const payload = receivedItem._id;
            // console.log("uuu: ", payload);
            const response = await axios.post("/ingredients/delete/", {
                params: payload
            })
            if (response.ok) {
                toast.success(response.message);
                onClose();
            } else {
                toast.error("something's wrong");
            }
        } catch (e) {
            console.log("error: ", e);
        }
    }
    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >CONFIRM DELETE</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>
                <div className="main-popup">
                    <div className="row d-flex flex-row px-2 gap-1">
                        <div className="question">
                            <span>Do you want to delete ingredient name: "{receivedItem.name}"</span>
                            <div className="d-flex flex-row justify-center align-items-center w-50">
                                <img style={{ width: "100px", height: "100px" }} src={receivedItem.imgUrl} alt="img" />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger me-2" onClick={() => handleOnClickSave()}>Yes</button>
                    <button className="btn btn-black" onClick={() => onClose()}>No</button>
                </div>
            </div>
        </div >
    );
};

export default PopupDeleteIngredient;