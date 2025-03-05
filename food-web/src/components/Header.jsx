import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/Footer.css'
import Menu from "./Menu.jsx";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <div className='header-container w-25 d-flex flex-column'>
                <Link to="/" >
                    <img src={"https://storage.needpix.com/rsynced_images/grain-42620_1280.png"} className="logo" alt="Logo" />
                </Link>
                <span className='title text-center'>Provide search recipes</span>
            </div>
        </>
    )
}

export default Header;
