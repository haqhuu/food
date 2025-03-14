import "../../styles/Ingredients.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../setup/axios.jsx";
import { toast } from "react-toastify";
import { useProvider } from "../../context/Provider.jsx";
import Header from "../../components/Header.jsx";
import PopupAddIngredient from "../../components/PopupAddIngredient.jsx";
import PopupEditIngredient from "../../components/PopupEditIngredient.jsx";
import PopupDetailIngredient from "../../components/PopupDetailIngredient.jsx";
import PopupDeleteIngredient from "../../components/PopupDeleteIngredient.jsx";

import Footer from "../../components/Footer.jsx";
import Pagination from "../../components/Pagination.jsx";

const cleanString = (str) => {
    return str.trim().replace(/\s*[,\.]+$/, '').replace(/^[,\.]+\s*/, '').replace(/,\s*,/g, ',');
}

const Index = () => {
    const {
        openSide, setOpenSide,
        limitIngLength,
        nameIngredient, setNameIngredient,
        ingredientAliases, setIngredientAliases,
        ingredientImgUrl, setIngredientImgUrl,
        ingredientInvalidObject, setIngredientInvalidObject,
        listIngredient, setListIngredient,
        totalRecord, setTotalRecord,
        currentPage, setCurrentPage,
        setTotalPages
    } = useProvider();
    console.log("pppp: ", openSide);
    const [isOpenPopup, setOpenPopup] = useState(false);
    const [isOpenPopupEdit, setOpenPopupEdit] = useState(false);
    const [isOpenPopupDetail, setOpenPopupDetail] = useState(false);
    const [isOpenPopupDelete, setOpenPopupDelete] = useState(false);
    const [selectItem, setSelectItem] = useState(null);
    const [searchIngName, setSearchIngName] = useState("");
    const [isActive, setSuggestActive] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const getListIngredient = async () => {
        try {
            const query = {
                page: currentPage,
                pageSize: limitIngLength
            }
            const response = await axios.get("/ingredients/all",
                {
                    params: query
                }
            );
            console.log("/ingredients/all: ", response);
            setListIngredient(response.ingredients);
            setTotalPages(response.totalPages);
            setTotalRecord(response.total);
        } catch (e) {
            console.log("error: ", e);
        }
    }

    useEffect(() => {
        setCurrentPage(1);
    }, []);


    useEffect(() => {
        getListIngredient();
    }, [currentPage]);

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

    const seachSuggest = async () => {
        try {
            // console.log("----ing queryp: ", searchIngName);
            if (searchIngName) {
                const response = await axios.get("/ingredients",
                    {
                        params: {
                            query: searchIngName
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
        await seachSuggest();
        setCurrentPage(1);
        try {
            const response = await axios.post("/ingredients/search", {
                params: {
                    searchIngName: searchIngName,
                    page: 1,
                    pageSize: limitIngLength
                }
            });
            setListIngredient(response.ingredients);
            setTotalRecord(response.total);
            setTotalPages(response.totalPages);
            console.log("---> ress: ", response);
        } catch (e) {
            console.log(e);
        }

    }

    const currentSearch = async () => {
        try {
            const response = await axios.post("/ingredients/search", {
                params: {
                    searchIngName: searchIngName,
                    page: currentPage,
                    pageSize: limitIngLength
                }
            });
            setListIngredient(response.ingredients);
            setTotalRecord(response.total);
            setTotalPages(response.totalPages);
            // console.log("---> ress: ", response);
        } catch (e) {
            console.log(e);
        }
    }

    const handleOnClickSuggestItem = (index, item) => {
        // console.log("itemsdd", item);
        setSearchIngName(item.name);
        setSuggestActive(false);
    }

    useEffect(() => {
        if (searchIngName) {
            onChangeSearch();
        } else {
            setSuggestions([]);
            getListIngredient();
        }
    }, [searchIngName]);

    useEffect(() => {
        currentSearch();
    }, [currentPage, totalRecord]);

    useEffect(() => {
        currentSearch();
    }, [isOpenPopup, isOpenPopupDelete, isOpenPopupEdit]);

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    return (
        <>
            <div className="column1 d-flex flex-row gap-1 gr">
                {
                    openSide ?
                        <>
                            <div className="head-section d-flex flex-column col-2  bound">
                                <Header />
                            </div>
                            <div className="ingredients-container d-flex flex-col w-100 bound py-4">
                                <div className="row d-flex flex-col items-center justify-center align-items-center gap-2 " style={{ margin: "0px" }}>
                                    <div className="list-ing-header d-flex flex-row mb-4">
                                        <h1 className="text-4xl font-bold ">INGREDIENTS</h1>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => setOpenPopup(true)}>
                                            + 1 Ingredient
                                        </button>
                                    </div>
                                    <div className="list-ing-search-section d-flex flex-column gap-2  w-50">
                                        <div className="input-s-container d-flex flex-row">
                                            <input type="text" className="form-control" placeholder="Search for name ingredient"
                                                value={searchIngName} onChange={(e) => setSearchIngName(e.target.value)}
                                                onClick={() => setSuggestActive(true)}
                                                onBlur={() => setTimeout(() => setSuggestActive(false), 200)}
                                            />
                                            <p>Found: </p>
                                            <p style={{ fontWeight: 600 }} > {totalRecord}  </p>

                                            <p>
                                                ingredient(s)
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

                                    <ul className="list-ing-main backward-layer">
                                        {
                                            listIngredient && listIngredient.length > 0 &&
                                            listIngredient.map((item, index) => {
                                                return <li onClick={() => handleOnClickItem(item)}>
                                                    <span className="name"> {item.name} </span>
                                                    <img style={{ height: "50px", width: "50px" }} src={item.imgUrl} alt={index} />
                                                    <button className="btn edit btn-black" onClick={(e) => handleOnClickEdit(item, e)}> Edit</button>
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
                            <div className="head-section d-flex flex-column col-2  bound">
                                <Header />
                            </div>
                            <div className="ingredients-container d-flex flex-col  py-4">
                                <div className="row d-flex flex-col items-center justify-center align-items-center gap-2 " style={{ margin: "0px" }}>
                                    <div className="list-ing-header d-flex flex-row mb-4">
                                        <h1 className="text-4xl font-bold ">RECIPES</h1>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => setOpenPopup(true)}>
                                            + 1 Recipe
                                        </button>
                                    </div><div className="list-ing-search-section d-flex flex-column gap-2  w-50">
                                        <div className="input-s-container d-flex flex-row">
                                            <input type="text" className="form-control" placeholder="Search for name ingredient"
                                                value={searchIngName} onChange={(e) => setSearchIngName(e.target.value)}
                                                onClick={() => setSuggestActive(true)}
                                                onBlur={() => setTimeout(() => setSuggestActive(false), 200)}
                                            />
                                            <p>Found: </p>
                                            <p style={{ fontWeight: 600 }} > {totalRecord}  </p>

                                            <p>
                                                ingredient(s)
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
                                    <div className="list-ing-search-section d-flex flex-column gap-2  w-50">
                                        <div className="input-s-container d-flex flex-row">
                                            <input type="text" className="form-control" placeholder="Search for name ingredient"
                                                value={searchIngName} onChange={(e) => setSearchIngName(e.target.value)}
                                                onClick={() => setSuggestActive(true)}
                                                onBlur={() => setTimeout(() => setSuggestActive(false), 200)}
                                            />
                                            <p>Found: </p>
                                            <p style={{ fontWeight: 600 }} > {totalRecord}  </p>

                                            <p>
                                                ingredient(s)
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

                                    <ul className="list-ing-main backward-layer">
                                        {
                                            listIngredient && listIngredient.length > 0 &&
                                            listIngredient.map((item, index) => {
                                                return <li onClick={() => handleOnClickItem(item)}>
                                                    <span className="name"> {item.name} </span>
                                                    <img style={{ height: "50px", width: "50px" }} src={item.imgUrl} alt={index} />
                                                    <button className="btn edit btn-black" onClick={(e) => handleOnClickEdit(item, e)}> Edit</button>
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
                }

            </div >
            {
                isOpenPopupDetail && <PopupDetailIngredient
                    item={selectItem}
                    onClose={setOpenPopupDetail}
                />
            }
            {
                isOpenPopup && <PopupAddIngredient
                    onClose={setOpenPopup}
                />
            }

            {
                isOpenPopupEdit && <PopupEditIngredient
                    item={selectItem}
                    onClose={setOpenPopupEdit}
                />
            }

            {
                isOpenPopupDelete && <PopupDeleteIngredient
                    item={selectItem}
                    onClose={setOpenPopupDelete}
                />
            }
        </>


    );
};

export default Index;