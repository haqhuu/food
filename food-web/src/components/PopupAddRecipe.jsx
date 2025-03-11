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

const PopupAddRecipe = ({ onClose }) => {
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
        recipeName, setRecipeName,
        time, setTime,
        energy, setEnergy,
        recipeDescription, setRecipeDescription,
        ingredient, setIngredient,
        recipeImgUrl, setRecipeImgUrl,
        instruction, setInstruction,
        RecipeInvalidObject, setRecipeInvalidObject,
    } = useProvider();
    // const [name, setName] = useState("");
    // const [time, setTime] = useState("");
    // const [energy, setEnergy] = useState("");
    // const [description, setDescription] = useState("");
    // const [ingredient, setIngredient] = useState("");
    // const [imgUrl, setImgUrl] = useState("");
    // const [instruction, setInstruction] = useState("");
    // const [invalidObject, setInvalidObject] = useState({
    //     invalidName: false,
    //     invalidImgUrl: false,
    // });
    // const { openSide, setOpenSide } = useCloseOpen();

    const checkInValidInput = () => {
        if (!recipeName) {
            setRecipeInvalidObject({ ...RecipeInvalidObject, invalidName: true });

            return true;
        }
        if (!recipeImgUrl) {
            setRecipeInvalidObject({ ...RecipeInvalidObject, invalidImgUrl: true });
            return true;
        }
        return false;
    }


    const handleAddOne = async () => {
        if (!checkInValidInput()) {
            try {
                const payload = {
                    name: recipeName,
                    imgUrl: recipeImgUrl,
                    time: time,
                    energy: energy,
                    ingredients: ingredient,
                    description: recipeDescription,
                    instructions: instruction
                }
                console.log("pl: ", payload);

                const response = await axios.post("/recipes", payload);
                console.log("aa", response);
            } catch (e) {
                console.log(e);
            }
        }
        else {
            toast.error("Empty field");
        }
    }


    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >CREATE RECIPE</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>

                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center gap-2 px-3">

                        <input className={RecipeInvalidObject.invalidName ? "form-control" : "form-control"}
                            type="text" placeholder="Name Recipe"
                            value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                        <div className="d-flex flex-row justify-center align-items-center w-50">
                            <img style={{ width: "100px", height: "100px" }} src={recipeImgUrl} alt={recipeImgUrl} />
                        </div>

                        <input
                            className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                            type="text" placeholder="Paste link image recipe"
                            value={recipeImgUrl} onChange={(e) => setRecipeImgUrl(e.target.value)} />
                        <input
                            className={RecipeInvalidObject.invalidUnit ? "form-control" : "form-control"}
                            type="text" placeholder="Time cooking"
                            value={time} onChange={(e) => setTime(e.target.value)} />
                        <input
                            className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                            type="text" placeholder="Calories"
                            value={energy} onChange={(e) => setEnergy(e.target.value)} />
                        <textarea
                            className="form-control" placeholder="Ingredients here" rows="3"
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)} >
                        </textarea>
                        <textarea
                            className="form-control" placeholder="Description here" rows="2"
                            value={recipeDescription}
                            onChange={(e) => setRecipeDescription(e.target.value)} >
                        </textarea>
                        <textarea
                            className="form-control" placeholder="Instruction here" rows="3"
                            value={instruction}
                            onChange={(e) => setInstruction(e.target.value)}>
                        </textarea>
                        <div className=" d-flex flex-row justify-content-between">
                            <button className="btn btn-success" onClick={() => handleAddOne()}>
                                Add
                            </button>
                            <button
                                className="btn btn-dark" onClick={() => onClose()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default PopupAddRecipe;