import mongoose from "mongoose";
import IngredientSchema from "./Ingredient.js";
const { Schema } = mongoose;

const RecipeIngredientSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, default: null },
    unit: { type: String, default: null },
    imgUrl: { type: String, default: "https://images.wordcloud.app/wikipedia/404.php.png" },
    // Các lựa chọn thay thế, nếu có, có thể lưu như một mảng của các subdocument:
    alternatives: [{
        name: { type: String, required: true },
        amount: { type: Number, default: null },
        unit: { type: String, default: null },
        imgUrl: { type: String, default: "https://images.wordcloud.app/wikipedia/404.php.png" }
    }]
});

const InstructionSchema = new Schema({
    step: { type: Number, required: true },
    text: { type: String, required: true },
    timeMinutes: { type: String, default: 0 },
    imgUrl: { type: String, default: "https://images.wordcloud.app/wikipedia/404.php.png" }  // Có thể chứa đường dẫn URL nếu kèm hình ảnh hoặc video
});

const RecipeSchema = new Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, default: "https://images.wordcloud.app/wikipedia/404.php.png" },
    energy: { type: Number, default: 300 },
    energyUnit: { type: String, default: "cal" },
    time: { type: Number, default: 30 },
    timeUnit: { type: String, default: "mins" },
    quantity: { type: Number, default: 1 },
    type: { type: String, default: null },

    author: { type: String, default: "Master chef" },
    description: { type: String, default: "<none>" },
    ingredients: [RecipeIngredientSchema],
    instructions: [InstructionSchema],
    tags: [{ type: String, default: null }],
    ratings: {
        rate: { type: Number, default: 1 },
        count: { type: Number, default: 1 }
    }
    // Thêm các metadata khác (ví dụ: popularity, createdAt, tags, …)
});

export default mongoose.model("Recipe", RecipeSchema);