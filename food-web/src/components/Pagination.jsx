import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/RecipeCard.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";
import Popup from './Popup.jsx';
import "./Pagination.css";
import { useProvider } from '../context/Provider.jsx';

function Pagination() {
    const {
        totalPages, setTotalPages,
        currentPage, setCurrentPage

    } = useProvider();
    const [prev, setPrev] = useState(1);
    const [next, setNext] = useState(2);
    const [pButton, setPbutton] = useState(true);
    const [nButton, setNbutton] = useState(true);
    const [p, setP] = useState(true);
    const [n, setN] = useState(true);
    const [c, setC] = useState(true);

    const handleOnClickPrevButton = (e) => {
        setNext(2);
        setP(false);
        setPbutton(false);
        setN(true);
        setNbutton(true);
        setCurrentPage(1);

    }
    const handleOnClickNextButton = (e) => {
        setN(false);
        setNbutton(false);
        setP(true);
        setPbutton(true);
        setPrev(totalPages - 1);
        setCurrentPage(totalPages - 0);
    }

    const handleOnClickPrev = (e) => {
        if (currentPage - 1 <= 1) {
            setP(false);
            setPbutton(false);
            setN(true);
            setNbutton(true);
            setNext(next - 1);
            setCurrentPage(currentPage - 1);
        } else {
            setPrev(currentPage - 2);
            setNext(currentPage);
            setCurrentPage(currentPage - 1);
        }
    }

    const handleOnClickNext = (e) => {
        if (currentPage + 1 >= totalPages) {
            setN(false);
            setNbutton(false);
            setP(true);
            setPbutton(true);
            setPrev(currentPage);
            setCurrentPage(currentPage + 1);
        }
        else {
            setPrev(currentPage);
            setNext(currentPage + 2);
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(() => {
        console.log("c; ", currentPage);
        console.log(totalPages);
        if (totalPages === 0) {
            console.log(222);
            setPbutton(false);
            setNbutton(false);
            setP(false);
            setC(false);
            setN(false);
        } else if (totalPages === 1) {
            setPbutton(false);
            setNbutton(false);
            setP(false);
            setN(false);
        } else if (totalPages === 2) {
            setPbutton(false);
            setNbutton(false);
            if (currentPage === 1) {
                setP(false);
            } else {
                setN(false);
            }
        } else if (totalPages === 3) {
            if (currentPage === 1) {
                setPbutton(false);
                setP(false);
                setN(true);
                setNbutton(true);
            } else if (currentPage === 2) {
                setPbutton(false);
                setNbutton(false);
                setP(true);
                setN(true);
            } else if (currentPage === 3) {
                setNbutton(false);
                setN(false);
                setPbutton(true);
                setP(true);
            }
        } else {
            if (currentPage === 1) {
                setP(false);
                setPbutton(false);
                setN(true);
                setNbutton(true);
            } else if (currentPage === totalPages) {
                setN(false);
                setNbutton(false);
                setP(true);
                setPbutton(true);
            } else {
                setN(true);
                setNbutton(true);
                setP(true);
                setPbutton(true);
            }

        }
        if (totalPages !== 0) {
            setC(true);
        }

        window.scrollTo(0, 0);
    }, [totalPages, currentPage,
        n, p, nButton, pButton
    ]);

    return (
        <>
            <ul className="pagination">
                {
                    pButton ? <li className="page-item" name="pButton" onClick={(e) => handleOnClickPrevButton(e)}>
                        <a className="page-link" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a></li> : ""
                }
                {
                    p ? <li className="page-item1 li-item" name="item1" onClick={(e) => handleOnClickPrev(e)} ><a className="page-link" >{prev}</a></li> : ""
                }

                {
                    c ?

                        <li className="page-item2 li-item" name="item2" onClick={() => window.scrollTo(0, 0)}><a className="page-link" style={{ color: "red" }}>{currentPage}</a></li>
                        : ""
                }

                {
                    n ? <li className="page-item3 li-item" name="item3" onClick={(e) => handleOnClickNext(e)}><a className="page-link" >{next}</a></li> : ""
                }

                {
                    nButton ? <li className="page-item" name="nButton" onClick={(e) => handleOnClickNextButton(e)}>
                        <a className="page-link" aria-label="Next">
                            <span aria-hidden="true" >&raquo;</span>
                        </a></li> : ""
                }
            </ul>
        </>
    );
}

export default Pagination;
