import { useState, useEffect, useCallback } from 'react';;
import axios from "../setup/axios.jsx";
import '../styles/App.css'
import Menu from "../components/Menu.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import Footer from "../components/Footer.jsx";
import IngredientForm from "../components/IngredientForm.jsx";
import Pagination from '../components/Pagination.jsx';
import Header from '../components/Header.jsx';
import SearchName from "../components/SearchName.jsx";
import SimilarWords from "../components/SimilarWords.jsx";
import { useProvider } from '../context/Provider.jsx';
import { useLocation } from "react-router-dom";

const pageSize = 4;

function Index() {
    const {
        recipes, setRecipes,
        searching, setSearching,
        countRecord, setCountRecord,
        totalRecord, setTotalRecord,
        totalPages, setTotalPages,
        currentPage, setCurrentPage,
        openSide, setOpenSide
    } = useProvider();
    const location = useLocation();
    // Reset currentPage về 1 khi pathname thay đổi (tùy chọn)
    useEffect(() => {
        setCurrentPage(1);
    }, [location.pathname, setCurrentPage]);

    // Hàm lấy danh sách recipes
    const getAllrecipes = useCallback(async () => {
        const query = { page: currentPage, pageSize: pageSize };
        const response = await axios.get("/recipes", { params: query });
        setTotalRecord(response.total);
        setTotalPages(response.totalPages);
        setCountRecord(response.recipes.length);
        setRecipes(response.recipes);
    }, [currentPage, setTotalRecord, setTotalPages, setCountRecord, setRecipes]);

    useEffect(() => {

    }, [recipes]);

    return (
        <>
            <Menu />
            <div className="column1 d-flex flex-row   gap-1 gr">
                {
                    openSide ?
                        <>
                            <div className="head-section d-flex flex-column col-2  bound">
                                <Header />
                            </div>
                            <div className="column2 d-flex flex-column w-100  gap-1 bound">
                                <div className="fusion-container d-flex col-11 flex-row gap-1 ">
                                    <div className="middle-container d-flex flex-column   col-8 ">
                                        <SearchName />
                                        {
                                            <div className="recipes-container">
                                                <div className="cards-container">
                                                    {
                                                        recipes && recipes.length > 0 && recipes.map(it => {
                                                            return <RecipeCard
                                                                key={it._id}
                                                                item={it}
                                                            />
                                                        })
                                                    }
                                                </div>

                                                <Pagination />
                                            </div>
                                        }
                                    </div>
                                    <div className="last-container col-4 ">
                                        <IngredientForm getAll={getAllrecipes} />
                                        <hr />
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </>
                        :
                        <>
                            <div className="head-section d-flex flex-column bound">

                                <Header />
                            </div>
                            <div className="column2 d-flex flex-column w-100  gap-1 bound">
                                <div className="fusion-container d-flex col-11 flex-row gap-1 ">
                                    <div className="middle-container d-flex flex-column   col-8">
                                        <SearchName />
                                        {
                                            <div className="recipes-container">

                                                {
                                                    recipes && recipes.length > 0 && recipes.map(it => {
                                                        return <RecipeCard
                                                            key={it._id}
                                                            item={it}
                                                        />
                                                    })
                                                }
                                                <Pagination />
                                            </div>
                                        }


                                    </div>
                                    <div className="last-container col-4">
                                        <SimilarWords />
                                        <IngredientForm getAll={getAllrecipes} />
                                        <hr />
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Index;
