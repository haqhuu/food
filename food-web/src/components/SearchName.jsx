import { useState, useEffect, useRef } from 'react';;
import axios from "../setup/axios.jsx";
import { Link } from "react-router-dom";
import "./SearchName.css";
import { useForm } from '../context/FormContext.jsx';
import { useRecipes } from '../context/RecipesContext.jsx';
import { useProvider } from '../context/Provider.jsx';
import useOnClickOutside from "./useOnClickOutside";
function SearchName() {
    const {
        nameSearchRecipe, setNameSearchRecipe,
        setSimilars,
        recipes, setRecipes, totalRecord, currentPage, setCurrentPage, setTotalPages
    } = useProvider();
    const suggestRef = useRef();
    useOnClickOutside(suggestRef, () => setNameSuggestions([]));
    const [isSelecting, setIsSelecting] = useState(false);
    const [nameSuggestions, setNameSuggestions] = useState([]);
    const [active, setActive] = useState(false);
    // const { setRecipes } = useRecipes();

    const handleSearchNameSuggestions = async () => {
        // if (nameSuggestions) {
        try {
            const payload = { name: nameSearchRecipe, page: currentPage, pageSize: 7 };

            const data = await axios.get("/recipes/searchName", {
                params: {
                    query: payload
                }
            });
            // console.log("dataa: ", data);
            if (data) {
                setNameSuggestions([]);
                // setRecipes(data.recipes);
                // setTotalPages(data.totalPages);
            }
            else {
                setNameSuggestions([]);
                setRecipes([]);
            }
        } catch (e) {
            setNameSuggestions([]);
            console.log("error:", e);
        }
        // }
    };

    const handleSearchSimilars = async () => {
        try {
            // const response = await axios.post("/keywords/similars",
            //     {
            //         params: {
            //             q: nameSearchRecipe
            //         }
            //     });

            // console.log("=>>res.dt::::", response);
            setSimilars([nameSearchRecipe]);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm từ khóa:', error);
        }
    };

    const removeSearchName = () => {

        setNameSearchRecipe("");
        setActive(false);
    }

    // useEffect(() => {
    //     if (nameSearchRecipe) {
    //         handleSearchNameSuggestions();
    //     }
    //     // Nếu isSelecting là true, reset flag sau một khoảng thời gian ngắn

    // }, [nameSearchRecipe]);

    useEffect(() => {
        handleSearchSimilars();
    }, [nameSearchRecipe]);

    const handleSelect = (indexItem, item) => {
        // console.log(item, "item-----");
        // console.log("index L : ", indexItem);
        setNameSearchRecipe(item.name);

        // setNameSearchRecipe(nameSuggestions[indexItem].name);
        setNameSuggestions([]);
    }

    const handleOnClickInput = async () => {
        if (nameSearchRecipe) {
            await handleSearchNameSuggestions();
        } else {
            setNameSuggestions(null);
        }
    }


    // const handleOnChangeNameSearchRecipe = async (value) => {
    //     setNameSearchRecipe(value);
    //     if (value.trim() !== "") {
    //         await searchNameSuggestions();
    //     } else {
    //         setNameSuggestions([]);
    //     }
    // }

    const handleOnChangeNameSearchRecipe = async (value) => {

        if (value) {
            setNameSearchRecipe(value)
        } else {
            setNameSearchRecipe(value)
            setNameSuggestions([]);
        }

    }
    useEffect(() => {
        setNameSearchRecipe("");
        setNameSuggestions([]);
    }, []);

    return (
        <>
            <div className='search-name-input col-10'>
                <div className="input-s-container d-flex gap-1 flex-row">
                    <div className="w-100 input-search-recipe-name">
                        <input
                            className="form-control input-name-recipe row"
                            type="text"
                            placeholder="Name Recipe"
                            value={nameSearchRecipe}
                            onChange={(e) => handleOnChangeNameSearchRecipe(e.target.value)}
                            onClick={() => handleOnClickInput()}
                        />
                        <button className='btn btn-secondary remove-search-name' onClick={() => removeSearchName()}>X</button>
                    </div>

                    <p >Found: </p>
                    <p style={{ fontWeight: 600 }} > {totalRecord}  </p>
                    <p> recipe(s) </p>
                </div>
                <ul className="name-search-suggest-container" style={{ listStyleType: "none", padding: 0, margin: 0 }}

                    ref={suggestRef}
                >
                    {nameSearchRecipe && nameSuggestions && nameSuggestions.length > 0 && nameSuggestions.map((item, indexIt) => (
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
