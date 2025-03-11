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

const PopupEditIngredient = ({ item, onClose }) => {
    console.log("itemdddd: ", item)
    const [receivedItem, setReceivedItem] = useState({
        ...item, aliases: item.aliases.join(","),
        category: item.category
    });
    console.log("--<>item: ", receivedItem);
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

    // console.log("pppp: ", openSide);
    const handleOnChangeReceivedItem = (e) => {
        const { name, value } = e.target;
        // console.log("--->e:", target.value);
        setReceivedItem(
            {
                ...receivedItem,
                [name]: value
            }
        )
    }
    const handleOnClickSave = async () => {
        try {
            const payload = {
                id: receivedItem._id,
                name: receivedItem.name,
                aliases: receivedItem.aliases.split(",").map(it => it.trim()),
                imgUrl: receivedItem.imgUrl,
                category: receivedItem.category
            }
            // console.log("--:>paload::", payload);
            const response = await axios.post("/ingredients/update", {
                payload
            })
            if (response.ok) {
                toast.success(response.message);
                onClose();
            }
            else {
                toast.error("fail: " + response.message);
            }
            // console.log("___>resss: ", response);
        } catch (e) {
            console.log("error: ", e);
        }
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >EDIT INGREDIENT</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>
                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center px-2 gap-2">
                        <label>Name: <input name="name" className="label form-control" value={receivedItem.name}
                            onChange={(e) => handleOnChangeReceivedItem(e)}
                        /></label>

                        <label>Aliases: <input name="aliases" className="label form-control" value={receivedItem.aliases}
                            onChange={(e) => handleOnChangeReceivedItem(e)}
                        /></label>

                        <div className="d-flex flex-row justify-center align-items-center w-50">
                            Image: <img style={{ width: "100px", height: "100px" }} src={receivedItem.imgUrl} alt="img" />
                        </div>
                        <label > Image Link:
                            <input name="imgUrl" className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                type="text" value={receivedItem.imgUrl}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            />
                        </label>
                        <label > Category:
                            <input name="category" className="form-control"
                                type="text" value={receivedItem.category}
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

export default PopupEditIngredient;