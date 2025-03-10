import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './SimilarWords.css';
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";
import { useForm } from '../context/FormContext.jsx';

function SimilarWords() {
    const { similars, setSimilar, nameRecipe } = useForm();
    // console.log("ssssssimi: ", p);
    // console.log("ssssssimi: ", similars);
    // console.log("search name: ", nameRecipe);




    useEffect(() => {
    }, [nameRecipe]);
    return (
        <>
            <div className='similar-wrords-container'>
                <b className="similar-title">
                    Similar keywords
                </b>
                <div className="similar-content">
                    {similars && similars.length > 0 && similars.map((it, index) => {
                        return <>
                            <button key={index} className='btn btn-warning similar-item'>
                                {it + nameRecipe}
                            </button>
                        </>

                    })}
                </div>
            </div>
        </>
    )
}

export default SimilarWords;
