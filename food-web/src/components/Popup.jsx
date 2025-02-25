import React, { useState, useRef, useEffect } from "react";
import "./Popup.css"; // Optional CSS for styling

const Popup = ({ props, onClose }) => {
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
            <div className="popup-content" ref={popupRef}>
                <img style={{ width: "200px", height: "200px" }} src={props.imgUrl} alt={props.imgUrl} />
                <h2>{props.name}</h2>
                <hr />
                <span>{props.time}</span>
                <hr />
                <span>{props.energy}</span>
                <hr />
                <span>{props.description}</span>
                <hr />
                <span>{props.ingredient}</span>
                <hr />
                <span>{props.instruction}</span>

                <hr />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;