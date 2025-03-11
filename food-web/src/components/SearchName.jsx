import { useState, useEffect } from 'react';;
import axios from "../setup/axios.jsx";
import { Link } from "react-router-dom";
import "./SearchName.css";
import { useForm } from '../context/FormContext.jsx';
import { useRecipes } from '../context/RecipesContext.jsx';
import { useProvider } from '../context/Provider.jsx';

function SearchName() {
    const {
        nameSearchRecipe, setNameSearchRecipe,
        setSimilars,
        recipes, setRecipes
    } = useProvider();
    const [nameSuggestions, setNameSuggestions] = useState([]);
    const [active, setActive] = useState(false);
    // const { setRecipes } = useRecipes();

    const searchNameSuggestions = async () => {
        if (nameSuggestions) {
            try {
                const data = await axios.get("/recipes/searchName", {
                    params: {
                        query: nameSearchRecipe
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

    const handleSearchSimilars = async () => {
        try {
            const response = await axios.post("/keywords/similars",
                {
                    params: {
                        q: nameSearchRecipe
                    }
                });

            console.log("=>>res.dt::::", response);
            // setSimilars(ressetSimilarsponse.data);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm từ khóa:', error);
        }
    };

    const removeSearchName = () => {
        setNameSearchRecipe("");
        setActive(false);
    }

    useEffect(() => {
        searchNameSuggestions();
    }, [nameSearchRecipe]);

    useEffect(() => {
        handleSearchSimilars();
    }, [nameSearchRecipe]);

    const handleSelect = (indexItem, item) => {
        console.log(item, "item-----");
        console.log("index L : ", indexItem);
        setNameSearchRecipe(nameSuggestions[indexItem].name);
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
                        value={nameSearchRecipe}
                        onChange={(e) => { setNameSearchRecipe(e.target.value); setActive(true) }}
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
