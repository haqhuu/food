import React, { useState, useRef, useEffect } from "react";
import "./Popup.css"; // Optional CSS for styling
import ShareButton from "./ShareButton.jsx";

const Popup = ({ props, onClose, isPopupOpen }) => {
    console.log(props);

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


    return (
        <div className="popup-overlay">

            <div className="popup-content"
                ref={popupRef}>
                <div className="header-popup" onClick={(e) => e.stopPropagation()}>
                    <h2>{props.name}</h2>
                    <span className="btn btn-danger" onClick={() => onClose()}>X</span>
                </div>

                <div className="main-popup">
                    <div className="intro-popup">
                        <div className="img-recipe w-25">
                            <img style={{ width: "200px", height: "200px" }} src={props.imgUrl} alt={props.imgUrl} />

                        </div>
                        <div className="right-popup-content w-75">
                            <div className="attribute-content">
                                <h2>Time</h2>
                                <span> {props.time} {props.timeUnit}</span>
                                <hr />
                                <h2> Energy</h2>
                                <span>  {props.energy} {props.energyUnit}</span>

                            </div>

                            <hr />
                            <h2>Description</h2>
                            <span> {props.description}</span>
                        </div>


                    </div>
                    <hr />
                    <div className="bottom-popup-content">
                        <div className="d-flex flex-column  ing-content">
                            <h2>Ingredients</h2>

                            {props.ingredients ? props.ingredients.map((it, ingIndex) => {
                                return <span className="ing-item">
                                    {console.log("iit:", it)};
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

                            {props.instructions ? props.instructions.map(it => {
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
                    <ShareButton />
                </div>

            </div>
        </div>
    );
};

export default Popup;