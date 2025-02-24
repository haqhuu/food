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
            <div className='footer-container row d-flex flex-row'>
                To make your life more convience - c:2025!
            </div>
        </>
    )
}

export default Footer;
