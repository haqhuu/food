import Ingredient from "../models/Ingredient";

export const getIngredientService = async (req, res) => {
    try {

        const ingredient = await Ingredient.find();
        return res.status(200).json(ingredient);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
} 