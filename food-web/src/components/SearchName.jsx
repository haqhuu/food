import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import { Link } from "react-router-dom";
import "./SearchName.css";
import { useForm } from '../context/FormContext.jsx';
import { useRecipes } from '../context/RecipesContext.jsx';

function SearchName() {
    const { nameRecipe, setNameRecipe } = useForm();
    const [nameSuggestions, setNameSuggestions] = useState([]);
    const [active, setActive] = useState(false);
    const { setRecipes } = useRecipes();

    const searchNameSuggestions = async () => {
        if (nameSuggestions) {
            try {
                const data = await axios.get("/recipes/searchName", {
                    params: {
                        query: nameRecipe
                    }
                });
                console.log("dataa: ", data);
                if (data) {
                    setNameSuggestions(data.result);
                    setRecipes(data.result);
                }
                else {
                    searchNameSuggestions([]);
                    setRecipes([]);
                }
            } catch (e) {
                setNameSuggestions([]);
                console.log("error:", e);
            }
        }
    };

    const removeSearchName = () => {
        setNameRecipe("");
        setActive(false);
    }

    useEffect(() => {
        searchNameSuggestions();
    }, [nameRecipe]);



    const handleSelect = (indexItem, item) => {
        console.log(item, "item-----");
        console.log("index L : ", indexItem);
        setNameRecipe(nameSuggestions[indexItem].name);
        setActive(false);
    }

    return (
        <>
            <div className='search-name-input col-6'>
                <div className="input-search-recipe-name">
                    <input
                        className="form-control input-name-recipe"
                        type="text"
                        placeholder="Name Recipe"
                        value={nameRecipe}
                        onChange={(e) => { setNameRecipe(e.target.value); setActive(true) }}
                        onClick={() => setActive(true)}
                        onBlur={() => setTimeout(() => setActive(false), 200)}
                    />
                    <button className='btn btn-secondary remove-search-name' onClick={() => removeSearchName()}>X</button>
                </div>
                <ul className="name-search-suggest-container" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {active && nameSuggestions.length > 0 && nameSuggestions.map((item, indexIt) => (
                        <li
                            key={indexIt}
                            onClick={() => handleSelect(indexIt, item)}
                            className="name-search-suggest-item form-group">
                            {item.name}
                            <img style={{ width: "35px", height: "35px" }} src={item.imgUrl} alt="" />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default SearchName;
