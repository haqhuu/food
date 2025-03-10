// extractCandidates.js
// import mongoose from "mongoose";
import Recipe from "../models/Recipe.js"; // Model Recipe đã được định nghĩa
// import CandidateKeyword from "../models/CandidateKeyword.js";
// import axios from "axios";

export const getUniqueKeywords = async () => {
    // Giả sử chúng ta lấy danh sách duy nhất của "name" từ Recipe
    const result = await Recipe.aggregate([
        { $group: { _id: { $toLower: "$name" } } },
        { $project: { keyword: "$_id" } }
    ]).allowDiskUse(true);
    // result.map(it => {
    //     console.log("==> result.map: ", it.keyword)
    // }
    // )

    return result.map(item => item.keyword);
}
