import { createContext, useContext, useState } from "react";

const ProviderContext = createContext(null);

export const Provider = ({ children }) => {
    const [openSide, setOpenSide] = useState(true);
    const [ingredients, setIngredients] = useState([""]);
    const [similars, setSimilars] = useState(["fhdfhd", "fdfhhd"]);
    const [nameSearchRecipe, setNameSearchRecipe] = useState("");
    const [recipes, setRecipes] = useState([""]);

    const [searching, setSearching] = useState(false);
    const [countRecord, setCountRecord] = useState(0);
    const [totalRecord, setTotalRecord] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    //recipes index
    const [recipeName, setRecipeName] = useState("");
    const [time, setTime] = useState("");
    const [energy, setEnergy] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [recipeImgUrl, setRecipeImgUrl] = useState("");
    const [instruction, setInstruction] = useState("");
    const [RecipeInvalidObject, setRecipeInvalidObject] = useState({
        invalidName: false,
        invalidImgUrl: false,
    });


    // ingredient index
    const [nameIngredient, setNameIngredient] = useState("");
    const [ingredientAliases, setIngredientAliases] = useState("");
    const [ingredientImgUrl, setIngredientImgUrl] = useState("");
    const [ingredientInvalidObject, setIngredientInvalidObject] = useState({
        invalidName: false,
        invalidUnit: false,
        invalidImgUrl: false,
    });

    const [listIngredient, setListIngredient] = useState([]);
    const [listRecipe, setListRecipe] = useState([]);

    const [limitIngLength, setLimitIngLength] = useState(7);
    const [limitRecipeLength, setLimitRecipeLength] = useState(7);

    return (
        <ProviderContext.Provider
            value={{
                limitIngLength, setLimitIngLength,
                limitRecipeLength, setLimitRecipeLength,

                openSide, setOpenSide,
                ingredients, setIngredients,
                similars, setSimilars,
                nameSearchRecipe, setNameSearchRecipe,
                recipes, setRecipes,
                nameSearchRecipe, setNameSearchRecipe,
                recipeName, setRecipeName,
                time, setTime,
                energy, setEnergy,
                recipeDescription, setRecipeDescription,
                ingredient, setIngredient,
                recipeImgUrl, setRecipeImgUrl,
                instruction, setInstruction,
                RecipeInvalidObject, setRecipeInvalidObject,
                nameIngredient, setNameIngredient,
                ingredientAliases, setIngredientAliases,
                ingredientImgUrl, setIngredientImgUrl,
                ingredientInvalidObject, setIngredientInvalidObject,


                searching, setSearching,
                countRecord, setCountRecord,
                totalRecord, setTotalRecord,
                totalPages, setTotalPages,
                currentPage, setCurrentPage,
                listIngredient, setListIngredient,
                listRecipe, setListRecipe
            }} >
            {children}
        </ProviderContext.Provider>
    );
}

export const useProvider = () => {
    return useContext(ProviderContext);
}