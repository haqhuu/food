import Ingredient from "../models/Ingredient.js";

export const getIngredient = async (req, res) => {
    try {
        const { name } = req.params;
        const ingredient = await Ingredient.find({ name: { $in: [new RegExp(name, 'i')] } });
        return res.status(200).json(ingredient);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        return res.status(200).json(ingredients);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const createOrUpdateIngredient = async (req, res) => {
    try {
        const { name, unit, imgUrl } = req.body;
        // console.log(name, "|", unit, "|", imgUrl);
        const response = await Ingredient.findOneAndUpdate({ name: name },
            { unit: unit, imgUrl: imgUrl }, { new: true, upsert: true }
        );

        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}