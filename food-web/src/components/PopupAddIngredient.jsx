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

const cleanString = (str) => {
    return str.trim().replace(/\s*[,\.]+$/, '').replace(/^[,\.]+\s*/, '').replace(/,\s*,/g, ',');
}

const PopupAddIngredient = ({ onClose }) => {
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

    // const checkInValidInput = () => {
    //     if (!nameIngredient) {
    //         setIngredientInvalidObject({ ...ingredientInvalidObject, invalidName: true });
    //         return true;
    //     }
    //     if (!ingredientImgUrl) {
    //         setIngredientInvalidObject({ ...ingredientInvalidObject, invalidImgUrl: true });
    //         return true;
    //     }
    //     if (!ingredientAliases) {
    //         setIngredientInvalidObject({ ...ingredientInvalidObject, invalidImgUrl: true });
    //         return true;
    //     }
    //     return false;
    // }

    const [item, setItem] = useState({
        name: "",
        aliases: "",
        imgUrl: "",
        category: ""
    });

    // const handleOnClicksave

    const handleOnClickSave = async () => {
        // if (!checkInValidInput()) {
        try {
            const str = cleanString(item.aliases);
            const payload = {
                name: item.name,
                aliases: str.split(",").map(it => it.trim())
                ,
                imgUrl: item.imgUrl,
                category: item.category
            }
            // console.log("payload::::", payload);
            const response = await axios.post("/ingredients", payload);
            if (response.ok) {
                toast.success(response.message);
                onClose();
            } else {
                toast.error(response.message);
            }
            // console.log("aa", response);
        } catch (e) {
            console.log(e);
        }
        // }
        // else {
        // toast.error("Empty field");
    }


    const handleOnChangeReceivedItem = (e) => {
        const { name, value } = e.target;
        // console.log("--->e:", target.value);
        setItem(
            {
                ...item,
                [name]: value
            }
        )
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >ADD INGREDIENT</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>

                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center px-2 gap-2">
                        <label>Name: <input name="name" className="label form-control" value={item.name}
                            onChange={(e) => handleOnChangeReceivedItem(e)}
                        /></label>

                        <label>Aliases: <input name="aliases" className="label form-control" value={item.aliases}
                            onChange={(e) => handleOnChangeReceivedItem(e)}
                        /></label>

                        <div className="d-flex flex-row justify-center align-items-center w-50">
                            Image: <img style={{ width: "100px", height: "100px" }} src={item.imgUrl} alt="img" />
                        </div>
                        <label > Image Link:
                            <input name="imgUrl" className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                type="text" value={item.imgUrl}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            />
                        </label>
                        <label > Category:
                            <input name="category" className="form-control"
                                type="text" value={item.category}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            />
                        </label>
                        <div className="btn-container">
                            <button className="btn btn-success me-2" onClick={() => handleOnClickSave()}>Save</button>
                            <button className="btn btn-black " onClick={() => onClose()}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default PopupAddIngredient;