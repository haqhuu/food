
import { useEffect, useState } from "react";
import axios from "../setup/axios.jsx";
import "./IngredientForm.css";
import { useForm } from "../context/FormContext.jsx";

const limitIngredients = 7;

function IngredientForm({ searching, pageSize, currentPage, setRecipes, setCount, setSearching, setTotalPages, setTotal, setCurrentPage, getAll }) {
    const { ingredients, setIngredients } = useForm();
    const [activeIndex, setActiveIndex] = useState(""); // Track which input is active
    const [suggestions, setSuggestions] = useState([]);

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index)); // Remove ingredient
    };

    const addIngredient = () => {
        setIngredients([...ingredients, ""]); // Add new empty input
    };

    const getIngredients = async (query) => {
        try {
            // console.log("ing queryp: ", query);
            if (query) {
                const response = await axios.get("/ingredients",
                    {
                        params: {
                            query: query
                        }
                    });
                // console.log("ing data:: ", response);
                setSuggestions(response);
            } else {
                setSuggestions([]);
            }
            setActiveIndex(activeIndex);
        } catch (e) {
            setSuggestions([]);
            console.log("error: ", e);
        }
    }

    useEffect(() => {

        if (validIngredients()) {
            handleOnClickSearch();

        } else {
            getAll();
        }
    }, [, ingredients]);

    useEffect(() => {
        if (searching && validIngredients()) {
            handleOnClickSearch();
        }
    }, [currentPage,]);


    useEffect(() => {
        getIngredients(ingredients[activeIndex]);
    }, [activeIndex]);

    const updateIngredient = async (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
        // setQuery(value);
        // console.log("state: ----------------");
        // console.log(" ingredients: ", updated);
        // console.log("query this: ", value);
        // console.log("suggestion: ", suggestions);
        // console.log("state: ----------------");


        await getIngredients(value);
        setActiveIndex(index);
    };

    const validIngredients = () => {
        return ingredients.filter(it => { return it }).length > 0 ? true : false;
    }

    const handleOnClickSearch = async () => {
        let payload = {
            ingredients: ingredients.filter(it => { return it }),
            page: currentPage,
            pageSize: pageSize
        };
        // console.log("search pay::", payload);
        if (ingredients.length > 0) {
            setSearching(true);
            // console.log("search pay::", payload);
            const response = await axios.post("/recipes/search", payload);
            // console.log("ress", response);
            setRecipes(response.recipes);
            setTotal(response.totalRecords);
            setCurrentPage(response.currentPage);
            setTotalPages(response.totalPages);
            // console.log("state: ----------------");
        }
    }

    // Handle click on suggestion
    const handleSelect = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value.name;
        setIngredients(updated);
        setSuggestions([]);
    };

    const clearIngredients = () => {
        setIngredients([""]);
        setSearching(false);
    }

    return (
        <div className="search-container  ">
            <b className="filter-title">
                Filter
            </b>
            <div className="filter-title-container">
                <b className="title-filter-recipe">In Recipe: {ingredients.length}/{limitIngredients}</b>
                <button
                    className='btn btn-secondary ing-btn'
                    onClick={() => clearIngredients()}>
                    Reset
                </button>
            </div>
            <div className="ing-container ">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ing-item ">
                        <div className="ing-input" >
                            <input
                                className="form-control ing-form-input"
                                type="text"
                                value={ingredient}
                                onChange={(e) => updateIngredient(index, e.target.value)}
                                onClick={(e) => updateIngredient(index, e.target.value)}

                                placeholder="Name ingredient"
                                onFocus={() => setActiveIndex(index)}
                                onBlur={() => setTimeout(() => setActiveIndex(null), 200)} // Close on blur
                            />
                            {ingredients.length > 0 && (
                                <button className='btn btn-secondary remove' onClick={() => removeIngredient(index)}>X</button>
                            )}
                        </div>

                        {
                            activeIndex === index && (
                                <ul className="suggest-container" style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                                    {suggestions && suggestions.map((item, indexIt) => (
                                        <li
                                            key={indexIt}
                                            onClick={() => handleSelect(index, item)}
                                            className="suggest-item form-group">
                                            {item.name}
                                            <img style={{ width: "35px", height: "35px" }} src={item.imgUrl} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            )
                        }
                    </div>
                ))}
                {
                    ingredients.length < limitIngredients ? <button
                        className='btn btn-secondary ing-btn ing-btn-add'
                        onClick={addIngredient}>
                        + 1 Ingredient
                    </button>
                        : ""
                }
            </div>
        </div>
    );
}

export default IngredientForm;
