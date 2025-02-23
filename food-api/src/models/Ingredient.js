import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        unit: { type: String, required: true },
        image_url: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Ingredient", IngredientSchema);
