import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/App.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import Footer from "../components/Footer.jsx";
import IngredientForm from "../components/IngredientForm.jsx";
import Pagination from '../components/Pagination.jsx';
import Header from '../components/Header.jsx';
import SearchName from "../components/SearchName.jsx";
import SimilarWords from "../components/SimilarWords.jsx";
import { FormProvider } from '../context/FormContext.jsx';
import { RecipesProvider } from '../context/RecipesContext.jsx';

const pageSize = 4;

function Index() {
    const [recipes, setRecipes] = useState([""]);

    const [searching, setSearching] = useState(false);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [openSide, setOpenSide] = useState(true);

    const getAllrecipes = async () => {
        const query = { page: currentPage, pageSize: pageSize }

        const response = await axios.get("/recipes", { params: query });
        setTotal(response.total);
        // setTotalPages(5);

        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
        setCount(response.recipes.length);
        setRecipes(response.recipes);
        // console.log(
        //     "recipes::", response
        // );
    }

    useEffect(() => {
        console.log("searching", searching);
        if (!searching) {
            getAllrecipes();
        }
    }, [currentPage, searching]);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalPages]);


    return (
        <>
            <Menu />
            <FormProvider>
                <RecipesProvider recipes={recipes} setRecipes={setRecipes}>
                    <div className="column1 d-flex flex-row   gap-1 gr">
                        {
                            openSide ?
                                <>
                                    <div className="head-section d-flex flex-column col-2  bound">
                                        <Header
                                            openSide={openSide}
                                            setOpenSide={setOpenSide}
                                        />
                                    </div>
                                    <div className="column2 d-flex flex-column w-100  gap-1 bound">
                                        <div className="fusion-container d-flex col-11 flex-row gap-1 ">
                                            <div className="middle-container d-flex flex-column   col-8 ">
                                                <SearchName
                                                    setRecipes={setRecipes}
                                                />
                                                {
                                                    <div className="recipes-container">
                                                        <span className='count'>
                                                            {total} recipe(s)</span>
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

                                                        <Pagination
                                                            totalPages={totalPages}
                                                            currentPage={currentPage}
                                                            setCurrentPage={setCurrentPage}
                                                            setTotalPages={setTotalPages}
                                                        />
                                                    </div>
                                                }

                                            </div>
                                            <div className="last-container col-4 ">
                                                <SimilarWords />
                                                <IngredientForm
                                                    searching={searching}
                                                    pageSize={pageSize}
                                                    currentPage={currentPage}
                                                    setRecipes={setRecipes}
                                                    setCount={setCount}
                                                    setSearching={setSearching}
                                                    setTotalPages={setTotalPages}
                                                    setTotal={setTotal}
                                                    setCurrentPage={setCurrentPage}
                                                    getAll={getAllrecipes}
                                                />
                                                <hr />
                                            </div>
                                        </div>
                                        <Footer />
                                    </div>
                                </>
                                :
                                <>
                                    <div className="head-section d-flex flex-column bound">
                                        <Header
                                            openSide={openSide}
                                            setOpenSide={setOpenSide}
                                        />
                                    </div>
                                    <div className="column2 d-flex flex-column w-100  gap-1 bound">
                                        <div className="fusion-container d-flex col-11 flex-row gap-1 ">
                                            <div className="middle-container d-flex flex-column   col-8">
                                                <SearchName
                                                    setRecipes={setRecipes}
                                                />
                                                {
                                                    <div className="recipes-container">
                                                        <span className='count'>
                                                            {total} recipe(s)</span>
                                                        {
                                                            recipes && recipes.length > 0 && recipes.map(it => {
                                                                return <RecipeCard
                                                                    key={it._id}
                                                                    item={it}
                                                                />
                                                            })
                                                        }
                                                        <Pagination
                                                            totalPages={totalPages}
                                                            currentPage={currentPage}
                                                            setCurrentPage={setCurrentPage}
                                                            setTotalPages={setTotalPages}
                                                        />
                                                    </div>
                                                }


                                            </div>
                                            <div className="last-container col-4">
                                                <SimilarWords

                                                />
                                                <IngredientForm
                                                    searching={searching}
                                                    pageSize={pageSize}
                                                    currentPage={currentPage}
                                                    setRecipes={setRecipes}
                                                    setCount={setCount}
                                                    setSearching={setSearching}
                                                    setTotalPages={setTotalPages}
                                                    setTotal={setTotal}
                                                    setCurrentPage={setCurrentPage}
                                                    getAll={getAllrecipes}
                                                />
                                                <hr />
                                            </div>
                                        </div>
                                        <Footer />
                                    </div>
                                </>
                        }
                    </div>
                </RecipesProvider>

            </FormProvider>
        </>
    )
}

export default Index;
