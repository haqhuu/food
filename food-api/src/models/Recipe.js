import mongoose from "mongoose";
import IngredientSchema from "./Ingredient.js";

const RecipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        time: { type: String, required: true },
        energy: { type: String, required: true },
        imgUrl: { type: String, required: true },
        description: { type: String, required: true },
        ingredient: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
        instruction: [{ type: String, required: true }]
    },
    { timestamps: true }
);

export default mongoose.model("Recipe", RecipeSchema);