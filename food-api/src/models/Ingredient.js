import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        unit: { type: String, required: true },
        imgUrl: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model("Ingredient", IngredientSchema);
