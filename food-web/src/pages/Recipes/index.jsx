import "../../styles/Ingredients.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../setup/axios.jsx";
import { toast } from "react-toastify";
// import { useCloseOpen, CloseOpenProvider } from "../../context/CloseOpenContext.jsx";
import Header from "../../components/Header.jsx";
import { useProvider } from "../../context/Provider.jsx";
import PopupAddRecipe from "../../components/PopupAddRecipe.jsx";


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
    } = useProvider();


    const [isOpenPopup, setOpenPopup] = useState(false);

    const checkInValidInput = () => {
        if (!recipeName) {
            setRecipeInvalidObject({ ...RecipeInvalidObject, invalidName: true });

            return true;
        }
        if (!recipeImgUrl) {
            setRecipeInvalidObject({ ...RecipeInvalidObject, invalidImgUrl: true });
            return true;
        }
        return false;
    }


    const handleAddOne = async () => {
        if (!checkInValidInput()) {
            try {
                const payload = {
                    name: recipeName,
                    imgUrl: recipeImgUrl,
                    time: time,
                    energy: energy,
                    ingredients: ingredient,
                    description: recipeDescription,
                    instructions: instruction
                }
                console.log("pl: ", payload);

                const response = await axios.post("/recipes", payload);
                console.log("aa", response);
            } catch (e) {
                console.log(e);
            }
        }
        else {
            toast.error("Empty field");
        }
    }

    return (
        <div className="column1 d-flex flex-row   gap-1">
            {
                openSide ?
                    <>
                        <div className="head-section d-flex flex-column col-2  bound">
                            <Header />
                        </div>
                        <div className="recipes-container  d-flex flex-col items-center justify-center align-items-center py-4">
                            <div className="row d-flex flex-col items-center justify-center align-items-center gap-2">
                                <h1 className="text-4xl font-bold mb-4">CREATE RECIPE</h1>
                                <button
                                    className='btn btn-secondary'
                                    onClick={() => setOpenPopup(true)}>
                                    + 1 Recipe
                                </button>
                                <input className={RecipeInvalidObject.invalidName ? "form-control" : "form-control"}
                                    type="text" placeholder="Name Recipe"
                                    value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                                <div className="d-flex flex-row justify-center align-items-center w-50">
                                    <img style={{ width: "100px", height: "100px" }} src={recipeImgUrl} alt={recipeImgUrl} />
                                </div>

                                <input
                                    className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" placeholder="Paste link image recipe"
                                    value={recipeImgUrl} onChange={(e) => setRecipeImgUrl(e.target.value)} />
                                <input
                                    className={RecipeInvalidObject.invalidUnit ? "form-control" : "form-control"}
                                    type="text" placeholder="Time cooking"
                                    value={time} onChange={(e) => setTime(e.target.value)} />
                                <input
                                    className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" placeholder="Calories"
                                    value={energy} onChange={(e) => setEnergy(e.target.value)} />
                                <textarea
                                    className="form-control" placeholder="Ingredients here" rows="3"
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)} >
                                </textarea>
                                <textarea
                                    className="form-control" placeholder="Description here" rows="2"
                                    value={recipeDescription}
                                    onChange={(e) => setRecipeDescription(e.target.value)} >
                                </textarea>
                                <textarea
                                    className="form-control" placeholder="Instruction here" rows="3"
                                    value={instruction}
                                    onChange={(e) => setInstruction(e.target.value)}>
                                </textarea>
                                <div className=" d-flex flex-row justify-content-between">
                                    <button className="btn btn-success" onClick={() => handleAddOne()}>
                                        Add
                                    </button>
                                    <Link
                                        to="/"
                                        className="btn btn-dark">
                                        Return home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="head-section d-flex flex-column  bound">
                            <Header />
                        </div>
                        <div className="recipes-container  d-flex flex-col items-center justify-center align-items-center py-4">
                            <div className="row d-flex flex-col items-center justify-center align-items-center gap-2">
                                <h1 className="text-4xl font-bold mb-4">Your Recipes</h1>
                                <input className={RecipeInvalidObject.invalidName ? "form-control" : "form-control"}
                                    type="text" placeholder="Name Recipe"
                                    value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                                <div className="d-flex flex-row justify-center align-items-center w-50">
                                    <img style={{ width: "100px", height: "100px" }} src={recipeImgUrl} alt={recipeImgUrl} />
                                </div>

                                <input
                                    className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" placeholder="Paste link image recipe"
                                    value={recipeImgUrl} onChange={(e) => setRecipeImgUrl(e.target.value)} />
                                <input
                                    className={RecipeInvalidObject.invalidUnit ? "form-control" : "form-control"}
                                    type="text" placeholder="Time cooking"
                                    value={time} onChange={(e) => setTime(e.target.value)} />
                                <input
                                    className={RecipeInvalidObject.invalidImgUrl ? "form-control" : "form-control"}
                                    type="text" placeholder="Calories"
                                    value={energy} onChange={(e) => setEnergy(e.target.value)} />
                                <textarea
                                    className="form-control" placeholder="Ingredients here" rows="3"
                                    value={ingredient}
                                    onChange={(e) => setIngredient(e.target.value)} >
                                </textarea>
                                <textarea
                                    className="form-control" placeholder="Description here" rows="2"
                                    value={recipeDescription}
                                    onChange={(e) => setRecipeDescription(e.target.value)} >
                                </textarea>
                                <textarea
                                    className="form-control" placeholder="Instruction here" rows="3"
                                    value={instruction}
                                    onChange={(e) => setInstruction(e.target.value)}>
                                </textarea>
                                <div className=" d-flex flex-row justify-content-between">
                                    <button className="btn btn-success" onClick={() => handleAddOne()}>
                                        Add
                                    </button>
                                    <Link
                                        to="/"
                                        className="btn btn-dark">
                                        Return home
                                    </Link>
                                </div>
                            </div>
                        </div>


                    </>
            }
            {
                isOpenPopup && <PopupAddRecipe
                    onClose={setOpenPopup}
                />
            }
        </div>
    );
};

export default Index;