import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
// import '../styles/Footer.css'
import Menu from "./Menu.jsx";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "/ascii-art.png";
import logo2 from "/ascii-art2.png";
import logo3 from "/ascii-art3.png";
import logo4 from "/ascii-art4.png";
import { useCloseOpen } from '../context/CloseOpenContext.jsx';

function Header() {
    const p = useCloseOpen();
    console.log("xxx: ", p);

    const { openSide, setOpenSide } = useCloseOpen();
    return (
        <>
            {
                openSide ?
                    <div className='header-container d-flex flex-column p-0 col-12'>
                        <div className="logo-container d-flex flex-row w-100   ">
                            <img src={logo} className="logo" alt="Logo" />
                            <button aria-hidden="true" className='btn btn-white   '
                                onClick={() => setOpenSide(!openSide)}
                            >&laquo;</button>
                        </div>
                        <NavLink
                            to={"/"}
                            className={({ isActive }) => isActive ? "active nav-container d-flex flex-row w-100" : "nav-container d-flex flex-row w-100"}
                        >
                            <img src={logo3} className="logo3" alt="Logo" />
                            <span className='title-nav text-center'> Search recipes</span>
                        </NavLink>
                        <NavLink
                            to={"/recipes"}
                            className={({ isActive }) => isActive ? "active nav-container d-flex flex-row w-100" : "nav-container d-flex flex-row w-100"}                        >
                            <img src={logo4} className="logo3" alt="Logo" />
                            <span className='title-nav text-center'> Add recipe</span>
                        </NavLink>
                    </div >
                    :
                    <div className='header-container2 d-flex flex-column p-0'>
                        <div className="logo-container d-flex flex-row   ">
                            <button aria-hidden="true" className='btn btn-white   '
                                onClick={() => setOpenSide(!openSide)}
                            >&raquo;</button>


                        </div>
                        <img src={logo2} className="logo" alt="Logo" />
                        <div className='nav-container d-flex flex-row    '>
                            <img src={logo3} className="logo3" alt="Logo" />

                        </div>
                        <div className='nav-container d-flex flex-row   '>
                            <img src={logo4} className="logo3" alt="Logo" />

                        </div>
                    </div>
            }
        </>
    )
}

export default Header;
