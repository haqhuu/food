import mongoose from "mongoose";


const IngredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, inde: true },       // Tên chính của nguyên liệu
        aliases: [String],                                           // Các tên thay thế (nếu có)
        imgUrl: { type: String },                                 // URL hình ảnh
        category: { type: String, default: "vegetable" }
        // Các thông tin bổ sung khác (category, nutritional info, ...)
    },
    { timestamps: true }
);

export default mongoose.model("Ingredient", IngredientSchema);
