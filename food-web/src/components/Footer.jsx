import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/Footer.css'
import Menu from "./Menu.jsx";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className='footer-container row d-flex flex-row col-11 red'>
                To make your life more convience - c:2025! (Get in touch: https://www.asciiart.eu/image-to-ascii (fake))
            </div>
        </>
    )
}

export default Footer;
