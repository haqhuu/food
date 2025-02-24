import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../styles/App.css'
import Menu from "../components/Menu.jsx";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard.jsx";
import Footer from "../components/Footer.jsx";
function Index() {
    const [recipes, setRecipes] = useState([]);

    const getAllrecipes = async () => {
        const response = await axios.get("/recipes");
        setRecipes(response);
    }
    useEffect(() => {
        getAllrecipes();
    }, []);

    const handleAddItem = () => {

    }

    return (
        <>
            <Menu />
            <Link to="/" >
                <img src={"https://storage.needpix.com/rsynced_images/chef-29205_1280.png"} className="logo" alt="Logo" />
            </Link>

            <div className="search-container">
                <div id='ingredients'></div>
                <button className='btn btn-secondary' onClick={() => handleAddItem()}>Add an ingredient +</button>
            </div>
            <hr />
            <div className="recipes-container">
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
