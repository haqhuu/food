import React, { useState, useRef, useEffect } from "react";
import "./Popup.css"; // Optional CSS for styling
import ShareButton from "./ShareButton.jsx";
import fire from "/ascii-art-fire.png";
import clock from "/ascii-art-clock.png";
import people from "/ascii-art-people.png";
import diet from "/ascii-art-diet.png";
import author from "/ascii-art-author.png";
import rating from "/ascii-art-rating.png";

const Popup = (props) => {
    const popupRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                props.onClose(); // Close popup if click is outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props.onClose]);


    return (
        <div className="popup-overlay">
            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2>{props.item.name}</h2>
                    <span className="btn btn-danger" onClick={() => props.onClose()}>X</span>
                </div>

                <div className="main-popup">
                    <div className="intro-popup">
                        <div className="img-recipe w-25">
                            <img style={{ width: "200px", height: "200px" }} src={props.item.imgUrl} alt={props.item.imgUrl} />
                        </div>
                        <div className="right-popup-content w-75">
                            <div className="attribute-content-popup">
                                {
                                    props.item.energy && props.item.energyUnit ?
                                        <>•<img className="ic" src={fire} alt="" /><span>Calories: {props.item.energy} {props.item.energyUnit} </span> </> : ""
                                }
                                {
                                    props.item.time && props.item.timeUnit ?
                                        <>•<img className="ic" src={clock} alt="" /><span>Cooking: {props.item.time} {props.item.timeUnit} </span></> : ""
                                }
                                {
                                    props.item.quantity ?
                                        <>•<img className="ic" src={people} alt="" /><span>•Q/Amount for: {props.item.quantity} people </span> </> : ""
                                }
                                {
                                    props.item.type ?
                                        <>•<img className="ic" src={diet} alt="" /><span>Diet: {props.item.type}  </span> </> : ""
                                }
                                {
                                    props.item.rating ?
                                        <>•<img className="ic" src={rating} alt="" /><span>Rating: {props.item.rating * 100}% </span> </> : ""
                                }
                                {
                                    props.item.author ?
                                        <>•<img className="ic" src={author} alt="" /><span> •Author: {props.item.author}  </span> </> : ""
                                }
                            </div>

                            <hr />
                            <h2>Description</h2>

                            <span> {props.item.description}</span>
                        </div>

                    </div>
                    <hr />
                    <div className="bottom-popup-content">
                        <div className="d-flex flex-column  ing-content">
                            <h2>Ingredients</h2>

                            {props.item.ingredients ? props.item.ingredients.map((it, ingIndex) => {
                                return <span className="ing-item">
                                    {/* {console.log("iit:", it)} */}
                                    {ingIndex + 1}:__ {it.amount ? it.amount : ""} {it.amount && it.unit ? it.unit : ""} {it.name}
                                    {it.alternatives && it.alternatives.length > 0 ?
                                        <div className="d-flex flex-column"> , Alternatives:
                                            {it.alternatives.map(it2 => {
                                                return <span>
                                                    +++--- {it2.amount ? it2.amount : ""} {it2.amount && it2.unit ? it2.unit : ""} {it2.name}
                                                    {/* +++--- {it2?.amount} {it2?.name}  {it2?.unit} */}
                                                </span>
                                            })}
                                        </div> : ""
                                    }
                                </span>
                            }) : <span> Not have</span>
                            }
                        </div>
                        <hr />
                        <div className="d-flex flex-column ins-content">
                            <h2>Instructions</h2>

                            {props.item.instructions ? props.item.instructions.map(it => {
                                return <>
                                    <span>
                                        {it.step ? it.step : ""}: {it.text ? it.text : "No have"}
                                    </span>
                                    <img src={it?.imgUrl} alt="" style={{ width: "100px", height: "100px" }} />
                                </>

                            }) : <span> Not have</span>
                            }
                        </div>
                    </div>


                    <hr />
                    {/* <ShareButton /> */}
                </div>

            </div>
        </div>
    );
};

export default Popup;