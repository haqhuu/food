import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/RecipeCard.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";
import Popup from './Popup.jsx';

function RecipeCard(props) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOnClickIt = (e) => {
        console.log(e.target.value);
    }
    useEffect(() => {

    }, [isPopupOpen]);

    return (
        <>
            <div className='recipe-container d-flex flex-row' onClick={() => setPopupOpen(true)}>
                <img src={props.imgUrl} style={{ width: "100px", height: "100px" }} alt={props.imgUrl} />
                <div className='intro'>
                    <span className='name'>{props.name}</span>
                    <span>🗲__ : {props.energy} {props.energyUnit}</span>
                    <span>⏲_ : {props.time} {props.timeUnit}</span>
                </div>

            </div>
            {isPopupOpen && <Popup
                props={props}
                onClose={() => setPopupOpen(false)}
            />}
        </>
    );
}

export default RecipeCard;
