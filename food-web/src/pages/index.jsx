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

function Index() {
    const [recipes, setRecipes] = useState([""]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    const getAllrecipes = async () => {
        const response = await axios.get("/recipes");
        setTotal(response.total);
        // setCount(response.length);
        setRecipes(response.recipes);
        console.log(response);
    }

    useEffect(() => {
        getAllrecipes();
    }, []);

    return (
        <>
            <Menu />
            <Link to="/" >
                <img src={"https://storage.needpix.com/rsynced_images/chef-29205_1280.png"} className="logo" alt="Logo" />
            </Link>

            <IngredientForm
                setRecipes={setRecipes}
                setCount={setCount}
            />

            <hr />
            <div className="recipes-container">
                <span className='count'>Result: {count} of {total} recipe(s)</span>
                {
                    recipes && recipes.length > 0 && recipes.map(it => {
                        console.log(recipes);
                        return <RecipeCard
                            key={it._id}
                            name={it.name}
                            id={it._id}
                            imgUrl={it.imgUrl}
                            time={it.time}
                            energy={it.energy}
                            ingredient={it.ingredient}
                            description={it.description}
                            instruction={it.instruction}
                        />
                    })
                }
            </div>
            <Footer />
        </>
    )
}

export default Index;
