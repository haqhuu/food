import "../../styles/Ingredients.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, } from "react";
// import { useLocation } from "react-dom";
import axios from "../../setup/axios.jsx";
import { toast } from "react-toastify";
// import { useCloseOpen, CloseOpenProvider } from "../../context/CloseOpenContext.jsx";
import Header from "../../components/Header.jsx";
import { useProvider } from "../../context/Provider.jsx";
import PopupAddRecipe from "../../components/PopupAddRecipe.jsx";
import Pagination from "../../components/Pagination.jsx";
import Footer from "../../components/Footer.jsx";
import PopupEditRecipe from "../../components/PopupEditRecipe.jsx";
import PopupDetailRecipe from "../../components/PopupDetailRecipe.jsx";
import PopupDeleteRecipe from "../../components/PopupDeleteRecipe.jsx";

const Index = () => {
    const {
        openSide, setOpenSide,
        recipeName, setRecipeName,
        time, setTime,
        energy, setEnergy,
        recipeDescription, setRecipeDescription,
        ingredient, setIngredient,
        recipeImgUrl, setRecipeImgUrl,
        instruction, setInstruction,
        RecipeInvalidObject, setRecipeInvalidObject,
        totalRecord, setTotalRecord,
        totalPages, setTotalPages,
        currentPage, limitIngLength, setCurrentPage,
    } = useProvider();
    const location = useLocation();
    const [listRecipe, setListRecipe] = useState([]);
    // const [searchRecipeName, ]

    const [isOpenPopup, setOpenPopup] = useState(false);
    const [isOpenPopupEdit, setOpenPopupEdit] = useState(false);
    const [isOpenPopupDetail, setOpenPopupDetail] = useState(false);
    const [isOpenPopupDelete, setOpenPopupDelete] = useState(false);
    const [selectItem, setSelectItem] = useState(null);
    const [searchRecipeName, setSearchRecipeName] = useState("");
    const [isActive, setSuggestActive] = useState(false);
    const [suggestions, setSuggestions] = useState([]);



    const handleOnClickEdit = (item, e) => {
        e.stopPropagation()
        setSelectItem(item);
        setOpenPopupEdit(true);
    }
    const handleOnClickDelete = (item, e) => {
        e.stopPropagation()
        setSelectItem(item);
        setOpenPopupDelete(true);
    }
    const handleOnClickItem = (item) => {
        setSelectItem(item);
        setOpenPopupDetail(true);
    }


    const getRecipes = async () => {
        const query = { page: currentPage, pageSize: 7 }
        // console.log("pppppppp: ", limitIngLength)
        const response = await axios.get("/recipes", { params: query });
        // console.log("-->response: ", response.recipes);
        setTotalRecord(response.total);
        // setTotalPages(5);
        setTotalPages(response.totalPages);
        // setCurrentPage(response.currentPage);
        setListRecipe(response.recipes);
    }

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    const seachSuggest = async () => {
        try {
            // console.log("----ing queryp: ", searchRecipeName);
            if (searchRecipeName) {
                const response = await axios.get("/ingredients",
                    {
                        params: {
                            query: searchRecipeName
                        }
                    });
                // console.log("ing iidata:: ", response);
                setSuggestions(response);
            } else {
                setSuggestions([]);
            }
        } catch (e) {
            setSuggestions([]);
            console.log("error: ", e);
        }
    }

    const onChangeSearch = async () => {
        setCurrentPage(1);
        try {
            const response = await axios.post("/recipes/search/manage", {
                params: {
                    searchRecipeName: searchRecipeName,
                    page: 1,
                    pageSize: limitIngLength
                }
            });
            setListRecipe(response.recipes);
            setTotalRecord(response.total);
            setTotalPages(response.totalPages);
            console.log("---> ress: ", response);
        } catch (e) {
            console.log(e);
        }
    }


    const currentSearch = async () => {
        try {
            const response = await axios.post("/recipes/search/manage", {
                params: {
                    searchRecipeName: searchRecipeName,
                    page: currentPage,
                    pageSize: limitIngLength
                }
            });
            setListRecipe(response.recipes);
            setTotalRecord(response.total);
            setTotalPages(response.totalPages);
            console.log("---> ress: ", response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (searchRecipeName) {
            onChangeSearch();
        } else {
            getRecipes();
        }
    }, [searchRecipeName]);

    useEffect(() => {
        currentSearch();
    }, [currentPage, totalRecord]);

    const handleOnClickSuggestItem = (index, item) => {
        // console.log("itemsdd", item);
        setSearchIngName(item.name);
        setSuggestActive(false);
    }

    useEffect(() => {
        currentSearch();
    }, [isOpenPopup, isOpenPopupDelete, isOpenPopupEdit]);

    useEffect(() => {
        setCurrentPage(1);
    }, [location.pathname, setCurrentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    return (
        <div className="column1 d-flex flex-row  gr gap-1">
            {
                openSide ?
                    <>
                        <div className="head-section d-flex flex-column col-2  bound">
                            <Header />
                        </div>
                        <div className="ingredients-container d-flex flex-col w-100 bound py-4">
                            <div className="row d-flex flex-col items-center justify-center align-items-center gap-2 " style={{ margin: "0px" }}>
                                <div className="list-ing-header d-flex flex-row mb-4">
                                    <h1 className="text-4xl font-bold ">RECIPES</h1>
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => setOpenPopup(true)}>
                                        + 1 Recipe
                                    </button>
                                </div>
                                <div className="list-ing-search-section d-flex flex-column gap-2  w-50">
                                    <div className="input-s-container d-flex flex-row">
                                        <input type="text" className="form-control" placeholder="Search for name recipe"
                                            value={searchRecipeName} onChange={(e) => setSearchRecipeName(e.target.value)}
                                            onClick={() => setSuggestActive(true)}
                                            onBlur={() => setTimeout(() => setSuggestActive(false), 200)}
                                        />
                                        <p>Found: </p>
                                        <p style={{ fontWeight: 600 }} > {totalRecord}  </p>
                                        <p>
                                            recipe(s)
                                        </p>
                                    </div>
                                    {
                                        <ul className="suggest-container">
                                            {isActive && suggestions && suggestions.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleOnClickSuggestItem(index, item)}
                                                    className="suggest-item form-group">
                                                    {item.name}
                                                    <img style={{ width: "35px", height: "35px" }} src={item.imgUrl} alt="" />
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>

                                <ul className="list-ing-main  py-1">
                                    {
                                        listRecipe && listRecipe.length > 0 &&
                                        listRecipe.map((item, index) => {
                                            return <li className="py-3" onClick={() => handleOnClickItem(item)}>
                                                <span className="name"> {item.name} </span>
                                                <img style={{ height: "50px", width: "50px" }} src={item.imgUrl} alt={index} />
                                                <button className="btn edit btn-black me-2" onClick={(e) => handleOnClickEdit(item, e)}> Edit</button>
                                                <button className="btn delete btn-danger" onClick={(e) => handleOnClickDelete(item, e)} > Delete</button>
                                            </li>
                                        })
                                    }
                                </ul>
                                <Pagination />
                                <Footer />
                            </div>
                        </div>
                    </>
                    :
                    <>

                    </>
            }
            {
                isOpenPopupDetail && <PopupDetailRecipe
                    itemm={selectItem}
                    onClose={setOpenPopupDetail}
                />
            }
            {
                isOpenPopup && <PopupAddRecipe
                    onClose={setOpenPopup}
                />
            }
            {
                isOpenPopupEdit && <PopupEditRecipe
                    itemm={selectItem}
                    onClose={setOpenPopupEdit}
                />
            }

            {
                isOpenPopupDelete && <PopupDeleteRecipe
                    itemm={selectItem}
                    onClose={setOpenPopupDelete}
                />
            }
        </div>
    );
};

export default Index;