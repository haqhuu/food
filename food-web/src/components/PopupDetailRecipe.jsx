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
import "./PopupEditRecipe.css";

const cleanString = (str) => {
    return str.trim().replace(/\s*[,\.]+$/, '').replace(/^[,\.]+\s*/, '').replace(/,\s*,/g, ',');
}

const PopupDetailRecipe = ({ itemm, onClose }) => {
    const [receivedItem, setReceivedItem] = useState({
        ...itemm,
    });
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



    const handleSubmit = () => {
        const inputs = document.querySelectorAll('input'); // Lấy tất cả input
        const values = Array.from(inputs).map(input => input.value); // Lấy giá trị
        console.log(values); // In ra giá trị của tất cả các input
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >DETAIL RECIPE</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>
                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center px-2 gap-2">
                        <label>Name: <input name="name" className="label form-control" value={receivedItem.name}
                            onChange={(e) => handleOnChangeReceivedItem(e)} disabled
                        /></label>
                        <div className="d-flex flex-row justify-center align-items-center">
                            <div className="col-2">
                                Image: <img style={{ width: "100px", height: "100px" }} src={receivedItem.imgUrl} alt="img" />
                            </div>
                            <label className="col-10"> Image Link:
                                <textarea name="imgUrl" className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" value={receivedItem.imgUrl}
                                    onChange={(e) => handleOnChangeReceivedItem(e)} disabled
                                />
                            </label>
                        </div>
                        <form class="form-inline d-flex gap-2" >
                            <label>Time: <input name="time" className="col-1 form-control" value={receivedItem.time} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Time unit: <input name="timeUnit" className="col-1 form-control" value={receivedItem.timeUnit} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Energy: <input name="energy" className="col-1 form-control" value={receivedItem.energy} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Energy unit: <input name="energyUnit" className="col-1 form-control" value={receivedItem.energyUnit} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                        </form>
                        <form class="form-inline d-flex gap-2" >
                            <label>Quantity: <input name="quantity" className="form-control" value={receivedItem.quantity} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                            <label className="w-100">Type: <input name="type" className=" form-control" value={receivedItem.type} disabled
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                        </form>

                        <label>Description:
                            <textarea
                                className="form-control" name="description" placeholder="Description here" rows="2" disabled
                                value={receivedItem.description}
                                onChange={(e) => handleOnChangeReceivedItem(e)} >
                            </textarea>
                        </label>




                        {/* open ings */}
                        <div className="ing-popup-container d-flex flex-column">Ingredient:
                            {
                                receivedItem.ingredients.map((it, ingIndex) => {
                                    return <div key={ingIndex} className="ing-item-popup d-flex flex-column py-2 w-100">
                                        {/* {console.log("iit:", it)} */}
                                        <div className="main-ing d-flex flex-column gap-1 w-100">
                                            <div className="d-flex flex-row ing-item-header-container">
                                                <span>No.{ingIndex + 1} </span>


                                            </div>
                                            <div className="group gap-1 d-flex flex-row">
                                                <div className="col-9">
                                                    <label >Name:</label>
                                                    <input name="name" type="text" className="w-100 form-control" value={it.name} onChange={(e) => handleOnChangeIngs(e, ingIndex)} disabled />
                                                </div>
                                                <div className=" col-1">
                                                    <label >Amount: </label>
                                                    <input name="amount" type="text" className="form-control col-1" value={it.amount} onChange={(e) => handleOnChangeIngs(e, ingIndex)} disabled />
                                                </div>

                                                <div className="col-2">
                                                    <label >Unit: </label>
                                                    <input name="unit" type="text" className="form-control" value={it.unit} onChange={(e) => handleOnChangeIngs(e, ingIndex)} disabled />
                                                </div>
                                            </div>
                                            <div className="group mb-1 gap-2 d-flex flex-row ">
                                                <div className="col-2">
                                                    <label >Image: </label>
                                                    <img src={it.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                                </div>
                                                <div className=" d-flex flex-row col-10">
                                                    <label >Image link: </label>
                                                    <textarea name="imgUrl" type="text " className="form-control" value={it.imgUrl} onChange={(e) => handleOnChangeIngs(e, ingIndex)} disabled />
                                                </div>
                                            </div>
                                        </div>
                                        {/* open alter */}
                                        {
                                            it.alternatives.length > 0 && <div className="ing-item-alter-container d-flex flex-column"> Alternatives:
                                                {it.alternatives && it.alternatives.length > 0 && it.alternatives.map((it2, it2idx) => {
                                                    return <div key={"it2idx" + it2idx} className="ing-item-alter d-flex flex-column gap-1 py-2">
                                                        <div className="d-flex flex-row alter-header-container">
                                                            <span>No.{it2idx + 1} </span>


                                                        </div>
                                                        <div className="group d-flex flex-row gap-1 w-100">
                                                            <div className=" col-7">
                                                                <label >Name:</label>
                                                                <input name="name" type="text" className="form-group form-control" value={it2.name} disabled onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                            <div className=" col-2">
                                                                <label >Amount: </label>
                                                                <input type="text" name="amount" className="form-control col-3" value={it2.amount} disabled onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>

                                                            <div className="col-3">
                                                                <label >Unit: </label>
                                                                <input type="text" name="unit" className="form-control col-2" value={it2.unit} disabled onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                        </div>
                                                        <div className="group d-flex gap-2 flex-row">
                                                            <div className="col-2">
                                                                <label >Image: </label>
                                                                <img src={it2.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                                            </div>
                                                            <div className=" d-flex flex-row  col-10">
                                                                <label >Image link: </label>
                                                                <textarea name="imgUrl" type="text " className="form-control" value={it2.imgUrl} disabled onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                })}

                                            </div>
                                        }
                                    </div>
                                })
                            }

                        </div>

                        <div className="d-flex flex-column w-100 ins-container">
                            <label className="d-flex" >Instructions:</label>
                            {
                                // console.log("it: ", receivedItem.instructions)
                                receivedItem.instructions.map((it, index) => {
                                    return <>
                                        <div key={"ins" + index} className="d-flex w-100 flex-row form-group step-header-container gap-1 py-1">
                                            <label className="col-2"> {index + 1}:</label>

                                        </div>
                                        <textarea name="text" type="text" className="form-control" value={it.text} disabled onChange={(e) => handleOnChangeIns(e, index)} />

                                        {
                                            it.imgUrl &&
                                            <div className="group mb-1 gap-1 d-flex flex-row ">
                                                <div className="col-2">
                                                    <label >Image: </label>
                                                    <img src={it?.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                                </div>
                                                <div className=" d-flex flex-row col-10">
                                                    <label >Image link: </label>
                                                    <textarea name="imgUrl" type="text" className="form-control" value={it.imgUrl} disabled onChange={(e) => handleOnChangeIns(e, index)} />
                                                </div>
                                            </div>
                                        }

                                        <hr />
                                    </>
                                })
                            }

                        </div>
                        <div className="btn-container">
                            <button className="btn btn-black " onClick={() => onClose()}>Exit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default PopupDetailRecipe;