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

const pageSize = 10;

function Index() {
    const [searching, setSearching] = useState(false);
    const [recipes, setRecipes] = useState([""]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

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
    // useEffect(() => {
    // setCurrentPage(1);
    // }, [pageSize]);

    return (
        <>
            <Menu />
            <div className="head-section w-100 d-flex flex-row">
                <Header />
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

            </div>

            <hr />
            {
                <div className="recipes-container ">
                    <span className='count'>
                        {/* {count} of  */}
                        {total} recipe(s)</span>
                    {
                        recipes && recipes.length > 0 && recipes.map(it => {
                            return <RecipeCard
                                key={it._id}
                                name={it.name}
                                imgUrl={it.imgUrl}
                                time={it.time}
                                timeUnit={it.timeUnit}
                                energy={it.energy}
                                energyUnit={it.energyUnit}
                                ingredients={it.ingredients}
                                description={it.description}
                                instructions={it.instructions}
                            />
                        })
                    }
                </div>
            }

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setTotalPages={setTotalPages}
            />
            <Footer />
        </>
    )
}

export default Index;
