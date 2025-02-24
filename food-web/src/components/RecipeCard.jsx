import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/RecipeCard.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";

function RecipeCard(props) {
    return (
        <>
            <div className='recipe-container d-flex flex-row '>
                <img src={props.imgUrl} style={{ width: "100px", height: "100px" }} alt={props.imgUrl} />
                <div className='intro'>
                    <span className='name'>{props.name}</span>
                    <span>🗲__ : {props.energy}</span>
                    <span>⏲_ : {props.time}</span>
                </div>
            </div>
        </>
    )
}

export default RecipeCard;
