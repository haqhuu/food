
import { useEffect, useState, useRef } from "react";
import axios from "../setup/axios.jsx";
import "./IngredientForm.css";
// import { useForm } from "../context/FormContext.jsx";
import { useProvider } from "../context/Provider.jsx";
import useOnClickOutside from "./useOnClickOutside";

const limitIngredients = 7;
const pageSize = 7;
function IngredientForm({ getAll }) {
    const {
        searching,
        currentPage, setRecipes,
        setSearching,
        setTotalPages, setTotalRecord,
        setCurrentPage, nameSearchRecipe,

        totalRecord
    } = useProvider();

    const suggestRef = useRef();
    const suggestRef0 = useRef();
    useOnClickOutside(suggestRef0, () => setActiveIndex(null));
    useOnClickOutside(suggestRef, () => setBannedIndex(null));

    const { ingredients, setIngredients } = useProvider();
    const [bannedIngs, setBannedIngs] = useState([""]);
    const [activeIndex, setActiveIndex] = useState(""); // Track which input is active
    const [suggestions, setSuggestions] = useState([]);
    const [bannedIndex, setBannedIndex] = useState("");
    const [bannedSuggestions, setBannedSuggestions] = useState([""]);

    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index)); // Remove ingredient
        } else {
            setIngredients([""]);
        }
    };

    const removeBannedIng = (index) => {
        if (bannedIngs.length > 1) {
            setBannedIngs(bannedIngs.filter((_, i) => i !== index)); // Remove ingredient
        } else {
            setBannedIngs([""]);
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, ""]); // Add new empty input
    };


    const currentSearch = async () => {
        let payload = {
            searchIngName: nameSearchRecipe,
            ingredients: ingredients.filter(it => { return it }),
            bannedIngs: bannedIngs.filter(it => { return it }),
            page: currentPage,
            pageSize: pageSize
        };
        // console.log("search pay::", payload);
        setSearching(true);
        // console.log("search pay::", payload);
        const response = await axios.post("/recipes/search", payload);
        console.log("ress set: ", response);
        setRecipes(response.recipes);
        setTotalRecord(response.totalRecords);
        // setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        // console.log("state: ----------------");
    }
    //////////////////////////////////////////////////////////////
    const getIngs = async () => {
        try {
            const query = { pageSize: pageSize }
            const response = await axios.get("/ingredients", { params: query });
            console.log(response, ";;;;;");
            setSuggestions()
        } catch (e) {
            console.log(e);
        }
    }

    // get suggestions
    const getIngsSuggestions = async (query) => {
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
            // setActiveIndex(activeIndex);
        } catch (e) {
            setSuggestions([]);
            console.log("error: ", e);
        }
    }
    // end getsuggestions
    const updatePreferIngs = async (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
        setActiveIndex(index);
        await getIngredients(value);
    }


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

        if (value) {
            await getIngsSuggestions(value);
            setActiveIndex(index);
        }
        else {
            setSuggestions([]);
            setActiveIndex(null);
        }
    };

    const handleOnClickSearch = async () => {
        setCurrentPage(1);
        let payload = {
            searchIngName: nameSearchRecipe,
            ingredients: ingredients.filter(it => { return it }),
            bannedIngs: bannedIngs.filter(it => { return it }),
            page: 1,
            pageSize: pageSize
        };
        setSearching(true);
        const response = await axios.post("/recipes/search", payload);
        setRecipes(response.recipes);
        setTotalRecord(response.totalRecords);
        setTotalPages(response.totalPages);
    }

    const handleOnClickIngInput = async (index, value) => {
        if (value) {
            await getIngsSuggestions(value);
            setActiveIndex(index);
        } else {
            setSuggestions([]);
            setActiveIndex(index);
        }
    }
    // Handle click on suggestion
    const handleSelect = (index, value) => {
        const updated = [...ingredients];
        updated[activeIndex] = value.name;
        setIngredients(updated);
        setSuggestions([]);
    };
    ////////////////////////////////////////
    const handleBannedSelect = (index, it) => {
        const updated = [...bannedIngs];
        updated[index] = it.name;
        setBannedIngs(updated);
        setBannedSuggestions([]);
    };
    const getBannedSuggestions = async (query) => {
        try {
            if (query) {
                const response = await axios.get("/ingredients",
                    {
                        params: {
                            query: query
                        }
                    });
                console.log("banndeg data:: ", response);
                setBannedSuggestions(response);
            } else {
                setSuggestions([]);
            }

        } catch (e) {
            setSuggestions([]);
            console.log("error: ", e);
        }
    }
    const updateBannedIngs = async (index, value) => {
        const updated = [...bannedIngs];
        updated[index] = value;
        setBannedIngs(updated);
        if (value) {
            await getBannedSuggestions(value);
            setBannedIndex(index);
        } else {
            setBannedSuggestions([]);
            setBannedIndex(null);
        }
    };
    const clearIngredients = () => {
        setIngredients([""]);
    }
    const clearBannedIngs = () => {
        setBannedIngs([""]);
        // setSearching(false);
    }
    const addBannedIngs = (e) => {
        setBannedIngs([...bannedIngs, ""]); // Add new empty input
    }
    const handleOnClickInput = async (index, value) => {
        if (value) {
            await getBannedSuggestions(value);
            setBannedIndex(index);
        } else {
            setBannedSuggestions([]);
            setBannedIndex(index);
        }
    }


    useEffect(() => {
        setIngredients([""]);
        setBannedIngs([""]);
    }, []);

    useEffect(() => {
        currentSearch();
    }, [currentPage]);

    // useEffect(() => {
    //     getBannedSuggestions();
    // }, [bannedIndex]);

    useEffect(() => {
        handleOnClickSearch();
    }, [nameSearchRecipe, bannedIngs, ingredients]);

    // useEffect(() => {
    //     getIngredients(ingredients[activeIndex]);
    // }, [activeIndex, bannedIndex]);

    return (
        <>
            <div className="search-container  ">
                <b className="filter-title mt-2">
                    Filter Ingredients
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
                                    onClick={(e) => handleOnClickIngInput(index, e.target.value)}
                                    placeholder="Name ingredient"
                                    onFocus={() => setActiveIndex(index)}
                                />
                                {ingredients.length > 0 && (
                                    <button className='btn btn-secondary remove' onClick={() => removeIngredient(index)}>X</button>
                                )}
                            </div>

                            {
                                activeIndex === index && (
                                    <ul className="suggest-container" style={{ listStyleType: "none", padding: 0, margin: 0 }}
                                        ref={suggestRef0}
                                    >
                                        {suggestions && suggestions.map((item, indexIt) => (
                                            <li
                                                key={indexIt}
                                                onClick={() => handleSelect(indexIt, item)}
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
            <hr />
            {/* banned ings................................................... */}
            <div className="search-container  ">
                {/* <b className="filter-title">
                    Filter
                </b> */}
                <div className="filter-title-container">
                    <b className="title-filter-recipe">Banned Recipe: {bannedIngs.length}/{limitIngredients}</b>
                    <button
                        className='btn btn-secondary ing-btn'
                        onClick={() => clearBannedIngs()}>
                        Reset
                    </button>
                </div>
                <div className="ing-container ">
                    {bannedIngs.map((ingredient, index) => (
                        <div key={index} className="ing-item ">
                            <div className="ing-input" >
                                <input
                                    className="form-control ing-form-input"
                                    type="text"
                                    value={ingredient}
                                    onChange={(e) => updateBannedIngs(index, e.target.value)}
                                    onClick={(e) => handleOnClickInput(index, e.target.value)}
                                    placeholder="Name ingredient"
                                    onFocus={() => setBannedIndex(index)}
                                // onBlur={() => setTimeout(() => setBannedIndex(null), 200)} // Close on blur
                                />
                                {bannedIngs.length > 0 && (
                                    <button className='btn btn-secondary remove' onClick={() => removeBannedIng(index)}>X</button>
                                )}
                            </div>
                            {
                                bannedIndex === index && (
                                    <ul className="suggest-container" style={{ listStyleType: "none", padding: 0, margin: 0 }} ref={suggestRef}>
                                        {bannedSuggestions && bannedSuggestions.map((item, indexIt) => (
                                            <li
                                                key={indexIt}
                                                onClick={() => handleBannedSelect(index, item)}
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
                        bannedIngs.length < limitIngredients ? <button
                            className='btn btn-secondary ing-btn ing-btn-add'
                            onClick={(e) => addBannedIngs(e)}>
                            + 1 Baned Ingredient
                        </button>
                            : ""
                    }
                </div>
            </div>
        </>

    );
}

export default IngredientForm;
