import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";
import "./DetailIntro.css";

function DetailIntro(props) {
    return (
        <>
            <div className='detail-intro'>
                <span className='card-name'>{props.item.name}</span>
                {
                    props.item.author ?
                        <span>•By: {props.item.author}  </span> : ""
                }
                <div className="detail-attributes">
                    {
                        props.item.energy && props.item.energyUnit ?
                            <span>•{props.item.energy} {props.item.energyUnit} </span> : ""
                    }

                    {
                        props.item.time && props.item.timeUnit ?
                            <span>• {props.item.time} {props.item.timeUnit} </span> : ""
                    }
                    {
                        props.item.quantity ?
                            <span>•{props.item.quantity} people </span> : ""
                    }
                    {
                        props.item.type ?
                            <span>•{props.item.type}  </span> : ""
                    }

                    {
                        props.item.rating ?
                            <span>•{props.item.rating * 100}% rating </span> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default DetailIntro;
