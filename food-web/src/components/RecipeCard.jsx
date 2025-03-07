import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/RecipeCard.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";
import Popup from './Popup.jsx';
import DetailIntro from "../components/DetailIntro.jsx";
function RecipeCard(props) {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleOnClickIt = (e) => {
        console.log(e.target.value);
    }
    useEffect(() => {

    }, [isPopupOpen]);
    console.log("ittt: ", props)
    return (
        <>
            <div className='recipe-container d-flex flex-row' onClick={() => setPopupOpen(true)}>
                <img src={props.item.imgUrl} style={{ width: "100px", height: "100px" }} alt={props.item.imgUrl} />
                <DetailIntro
                    item={props.item}
                />
            </div>
            {isPopupOpen && <Popup
                item={props.item}
                onClose={() => setPopupOpen(false)}
            />}
        </>
    );
}

export default RecipeCard;
