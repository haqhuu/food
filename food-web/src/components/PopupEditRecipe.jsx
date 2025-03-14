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
const PopupEditRecipe = ({ itemm, onClose }) => {
    // console.log("itemdddd: ", item)
    const [receivedItem, setReceivedItem] = useState({
        ...itemm,
    });
    // console.log("--<>item: ", receivedItem);
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
    const handleOnClickSave = async (e) => {

        // console.log("qqqqqqqqqqq: ", receivedItem);
        try {
            const payload = {
                id: receivedItem._id,
                recipe: receivedItem
            }
            // console.log("--:>paload::", payload.recipe);
            const response = await axios.post("/recipes/update", {
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
            e.target.blur();
        } catch (e) {
            console.log("error: ", e);
        }
    }

    const [steps, setSteps] = useState();
    const [stepIdx, setStepIdx] = useState(null);
    const [ings, setIngs] = useState();

    const handleOnChangeIns = (e, index) => {
        const { name, value } = e.target;
        const items = receivedItem.instructions.map((it, idx) => {
            if (idx === index) {
                return { ...it, [name]: value }
            } else {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, instructions: items });
    }

    ///change ings 
    const handleOnChangeIngs = (e, index) => {
        const { name, value } = e.target;
        const items = receivedItem.ingredients.map((it, idx) => {
            if (idx === index) {
                return { ...it, [name]: value }
            } else {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, ingredients: items });
    }

    ///change alternatives
    const handleOnChangeAlters = (e, index, subIndex) => {
        const { name, value } = e.target;
        const newAlter = receivedItem.ingredients[index].alternatives.map((it, idx) => {
            if (idx === subIndex) {
                return { ...it, [name]: value }
            } else {
                return it;
            }
        });

        const items = receivedItem.ingredients.map((it, idx) => {
            if (idx === index) {
                return { ...it, alternatives: [...newAlter] }
            } else {
                return it;
            }
        })
        // console.log("itttttt: ", items);
        setReceivedItem({ ...receivedItem, ingredients: items });
    }

    useEffect(() => {
        // getArrayIns
    }, [receivedItem])

    const handleAddStep = (e) => {
        let newInstruction = [...receivedItem.instructions];
        newInstruction.push({ step: "", text: "", timeMinutes: "", imgUrl: "" });
        setReceivedItem({ ...receivedItem, instructions: newInstruction });
    }

    const handleAddAlter = (e, index) => {
        let newAlter = [];
        // if init ornot
        newAlter = receivedItem.ingredients[index].alternatives.map((it, idx) => {
            return it
        });
        // add empty obj
        newAlter.push({ name: "", unit: "", imgUrl: "", amount: "" });
        const items = receivedItem.ingredients.map((it, idx) => {
            if (idx === index) {
                return { ...it, alternatives: [...newAlter] }
            } else {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, ingredients: items });
        // const newIngs = [...receivedItem.ingredients[index], ingredients[index].alternatives]
        // console.log("newAlterrr: ", newAlter);
        // setReceivedItem({ ...receivedItem, alternatives: [...newAlter] });
        // console.log("reItem: ", receivedItem)
    }

    const handleAddIng = (e) => {
        const emptyIng = {
            name: "",
            imgUrl: "",
            amount: "",
            unit: "",
            alternatives: []
        }
        const newIngs = [...receivedItem.ingredients, emptyIng];
        setReceivedItem({ ...receivedItem, ingredients: newIngs });
    }
    const handleRemoveAlter = (e, index, subIndex) => {
        const newAlters = receivedItem.ingredients[index].alternatives.filter((it, idx) => {
            if (idx !== subIndex) {
                return it;
            }
        });
        // console.log("aldfddd", newAlters)
        const items = receivedItem.ingredients.map((it, idx) => {
            if (idx === index) {
                return { ...it, alternatives: [...newAlters] }
            } else {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, ingredients: items });
    }

    const handleRemoveIng = (e, index) => {
        const newIngs = receivedItem.ingredients.filter((it, idx) => {
            if (idx !== index) {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, ingredients: newIngs });
    }

    const handleRemoveStep = (e, index) => {
        const newIns = receivedItem.instructions.filter((it, idx) => {
            if (idx !== index) {
                return it;
            }
        })
        setReceivedItem({ ...receivedItem, instructions: newIns });
    }

    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2 >EDIT RECIPE</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>
                <div className="main-popup">
                    <div className="row d-flex flex-col items-center justify-center align-items-center px-2 gap-2">
                        <label>Name: <input name="name" className="label form-control" value={receivedItem.name}
                            onChange={(e) => handleOnChangeReceivedItem(e)}
                        /></label>
                        <div className="d-flex flex-row justify-center align-items-center">
                            <div className="col-2">
                                Image: <img style={{ width: "100px", height: "100px" }} src={receivedItem.imgUrl} alt="img" />
                            </div>
                            <label className="col-10"> Image Link:
                                <input name="imgUrl" className={ingredientInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" value={receivedItem.imgUrl}
                                    onChange={(e) => handleOnChangeReceivedItem(e)}
                                />
                            </label>
                        </div>
                        <form class="form-inline d-flex gap-2" >
                            <label>Time: <input name="time" className="col-1 form-control" value={receivedItem.time}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Time unit: <input name="timeUnit" className="col-1 form-control" value={receivedItem.timeUnit}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Energy: <input name="energy" className="col-1 form-control" value={receivedItem.energy}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>

                            <label>Energy unit: <input name="energyUnit" className="col-1 form-control" value={receivedItem.energyUnit}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                        </form>
                        <form class="form-inline d-flex gap-2" >
                            <label>Quantity: <input name="quantity" className="form-control" value={receivedItem.quantity}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                            <label className="w-100">Type: <input name="type" className=" form-control" value={receivedItem.type}
                                onChange={(e) => handleOnChangeReceivedItem(e)}
                            /></label>
                        </form>

                        <label>Description:
                            <textarea
                                className="form-control" name="description" placeholder="Description here" rows="2"
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

                                                <button
                                                    className='btn btn-secondary col-2 ing-btn alter-btn-add'
                                                    onClick={(e) => handleRemoveIng(e, ingIndex)}>
                                                    - Remove
                                                </button>
                                            </div>
                                            <div className="group gap-1 d-flex flex-row">
                                                <div className="col-9">
                                                    <label >Name:</label>
                                                    <input name="name" type="text" className="w-100 form-control" value={it.name} onChange={(e) => handleOnChangeIngs(e, ingIndex)} />
                                                </div>
                                                <div className=" col-1">
                                                    <label >Amount: </label>
                                                    <input name="amount" type="text" className="form-control col-1" value={it.amount} onChange={(e) => handleOnChangeIngs(e, ingIndex)} />
                                                </div>

                                                <div className="col-2">
                                                    <label >Unit: </label>
                                                    <input name="unit" type="text" className="form-control" value={it.unit} onChange={(e) => handleOnChangeIngs(e, ingIndex)} />
                                                </div>
                                            </div>
                                            <div className="group mb-1 gap-2 d-flex flex-row ">
                                                <div className="col-2">
                                                    <label >Image: </label>
                                                    <img src={it.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                                </div>
                                                <div className=" d-flex flex-row col-10">
                                                    <label >Image link: </label>
                                                    <input name="imgUrl" type="text " className="form-control" value={it.imgUrl} onChange={(e) => handleOnChangeIngs(e, ingIndex)} />
                                                </div>
                                            </div>
                                        </div>
                                        {/* open alter */}
                                        {
                                            <div className="ing-item-alter-container d-flex flex-column"> Alternatives:
                                                {it.alternatives && it.alternatives.length > 0 && it.alternatives.map((it2, it2idx) => {
                                                    return <div key={"it2idx" + it2idx} className="ing-item-alter d-flex flex-column gap-1 py-2">
                                                        <div className="d-flex flex-row alter-header-container">
                                                            <span>No.{it2idx + 1} </span>
                                                            <button
                                                                className='btn btn-secondary col-2 ing-btn item-btn-add'
                                                                onClick={(e) => handleRemoveAlter(e, ingIndex, it2idx)}>
                                                                - Remove
                                                            </button>

                                                        </div>
                                                        <div className="group d-flex flex-row gap-1 w-100">
                                                            <div className=" col-7">
                                                                <label >Name:</label>
                                                                <input name="name" type="text" className="form-group form-control" value={it2.name} onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                            <div className=" col-2">
                                                                <label >Amount: </label>
                                                                <input type="text" name="amount" className="form-control col-3" value={it2.amount} onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>

                                                            <div className="col-3">
                                                                <label >Unit: </label>
                                                                <input type="text" name="unit" className="form-control col-2" value={it2.unit} onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                        </div>
                                                        <div className="group d-flex gap-2 flex-row">
                                                            <div className="col-2">
                                                                <label >Image: </label>
                                                                <img src={it2.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                                            </div>
                                                            <div className=" d-flex flex-row  col-10">
                                                                <label >Image link: </label>
                                                                <input name="imgUrl" type="text " className="form-control" value={it2.imgUrl} onChange={(e) => handleOnChangeAlters(e, ingIndex, it2idx)} />
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                })}
                                                <button
                                                    className='btn btn-secondary col-2 ing-btn alter-btn-add'
                                                    onClick={(e) => handleAddAlter(e, ingIndex)}>
                                                    + 1 Ing Alternative
                                                </button>
                                            </div>
                                        }
                                    </div>
                                })
                            }
                            <button
                                className='btn btn-secondary col-2 ing-btn item-btn-add'
                                onClick={(e) => handleAddIng(e)}>
                                + 1 Ingredient
                            </button>
                        </div>

                        <div className="d-flex flex-column w-100 ins-container">
                            <label className="d-flex" >Instructions:</label>
                            {
                                // console.log("it: ", receivedItem.instructions)
                                receivedItem.instructions.map((it, index) => {
                                    return <>
                                        <div key={"ins" + index} className="d-flex w-100 flex-row form-group step-header-container gap-1 py-1">
                                            <label className="col-2"> {index + 1}:</label>
                                            <button
                                                className='btn btn-secondary ing-btn col-2 ins-btn-add'
                                                onClick={(e) => handleRemoveStep(e, index)}>
                                                - remove
                                            </button>
                                        </div>
                                        <textarea name="text" type="text" className="form-control" value={it.text} onChange={(e) => handleOnChangeIns(e, index)} />

                                        <div className="group mb-1 gap-1 d-flex flex-row ">
                                            <div className="col-2">
                                                <label >Image: </label>
                                                <img src={it?.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                            </div>
                                            <div className=" d-flex flex-row col-10">
                                                <label >Image link: </label>
                                                <input name="imgUrl" type="text" className="form-control" value={it.imgUrl} onChange={(e) => handleOnChangeIns(e, index)} />
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                })
                            }
                            <button
                                className='btn btn-secondary ing-btn col-2 ins-btn-add'
                                onClick={(e) => handleAddStep(e)}>
                                + 1 step
                            </button>
                        </div>
                        <div className="btn-container">
                            <button className="btn btn-success me-2 save-edit-recipe-btn"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => handleOnClickSave(e)}>Save</button>
                            <button className="btn btn-black " onClick={() => onClose()}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default PopupEditRecipe;