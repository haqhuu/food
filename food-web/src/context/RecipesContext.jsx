import { createContext, useContext, useState } from "react";

const RecipesContext = createContext(null);

export const RecipesProvider = ({ recipes, setRecipes, children }) => {

    return (
        <RecipesContext.Provider value={{ recipes, setRecipes }}>
            {children}
        </RecipesContext.Provider>
    )
}

export const useRecipes = () => {
    return useContext(RecipesContext);
}