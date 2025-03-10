import { useContext, createContext, useState } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
    const [ingredients, setIngredients] = useState([""]);
    const [similars, setSimilars] = useState(["fhdfhd", "fdfhhd"]);
    const [nameRecipe, setNameRecipe] = useState("");
    return (
        <FormContext.Provider value={{
            ingredients, setIngredients,
            similars, setSimilars,
            nameRecipe, setNameRecipe
        }}>
            {children}
        </FormContext.Provider>
    );
}

export const useForm = () => {
    return useContext(FormContext);
}
