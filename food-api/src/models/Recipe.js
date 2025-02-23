import mongoose from "mongoose";
import IngredientSchema from "./Ingredient.js";

const RecipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image_url: { type: String },
        ingredients: { type: String, required: true },
        instructions: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);