import Recipe from "../models/Recipe.js";

export const getRecipe = async (req, res) => {
    try {
        const { name } = req.params;
        const recipe = await Recipe.find({ name: { $in: [new RegExp(name, 'i')] } });
        return res.status(200).json(recipe);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        return res.status(200).json(recipes);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const createOrUpdateRecipe = async (req, res) => {
    try {
        const { name, time, imgUrl, energy, ingredient, description, instruction } = req.body;
        console.log(name, "|", "|", imgUrl);
        const response = await Recipe.findOneAndUpdate({ name: name },
            { time, imgUrl, energy, ingredient, description, instruction },
            { new: true, upsert: true }
        );
        console.log(response);

        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}