import Recipe from "../models/Recipe.js";
import Ingredient from "../models/Ingredient.js";
import mongoose from "mongoose";

export const createOrUpdateRecipe = async (req, res) => {
    try {
        console.log(req.body);
        // const ingredientsJS = JSON.parse(req.body.ingredients);
        const instructions = JSON.parse(req.body.instructions);
        const ingredients = JSON.parse(req.body.ingredients);
        console.log("reqbody", req.body);
        console.log("lllllllyyyylllllllll");

        // Tạo Recipe mới với các ingredient đã chuyển đổi sang ObjectId
        const recipe = new Recipe({
            name: req.body.name,
            imgUrl: req.body.imgUrl,
            ingredients: ingredients,
            instructions: instructions
        });

        const result = await recipe.save();

        console.log("results:", result);
        return res.status(200).json({
            "message": "Recipe created successfully",
            result
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
};

export const getRecipes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 50;  // Số item mỗi trang (mặc định: 10)
        const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua

        const result = await Recipe.aggregate([
            {
                $facet: {
                    // 🔹 Pipeline 1: Đếm tổng số bản ghi
                    metadata: [{ $count: "total" }],

                    // 🔹 Pipeline 2: Lấy dữ liệu cho trang hiện tại
                    data: [
                        { $sort: { rating: -1 } }, // Sắp xếp theo rating giảm dần
                        { $skip: skip }, // Bỏ qua các bản ghi không cần thiết
                        { $limit: pageSize } // Giới hạn số bản ghi
                    ]
                }
            }
        ]);
        // Xử lý kết quả trả về
        const total = result[0].metadata[0]?.total || 0; // Số lượng tổng
        const recipes = result[0].data; // Dữ liệu phân trang

        return res.status(200).json({
            total, // Tổng số bản ghi
            totalPages: Math.ceil(total / pageSize), // Tổng số trang
            currentPage: page, // Trang hiện tại
            pageSize,
            recipes // Dữ liệu trả về
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}


// export const createOrUpdateRecipe = async (req, res) => {
//     try {
//         const { name, time, imgUrl, energy, ingredient, description, instruction } = req.body;
//         console.log(name, "|", "|", imgUrl);
//         const response = await Recipe.findOneAndUpdate({ name: name },
//             { time, imgUrl, energy, ingredient, description, instruction },
//             { new: true, upsert: true }
//         );
//         console.log(response);

//         return res.status(200).json(response);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ message: "server is broken" });
//     }
// }


export const searchRecipes = async (req, res) => {
    try {
        let inputArray = req.body.ingredients;
        console.log("req: ", req.body);
        // Nếu không có inputArray, trả về kết quả rỗng
        if (!inputArray) {
            return res.status(200).json({
                recipes: [],
                totalRecords: 0,
                totalPages: 0,
                currentPage: 1,
                pageSize: 10
            });
        }

        // Nếu inputArray không phải mảng, chuyển thành mảng
        if (!Array.isArray(inputArray)) {
            inputArray = [inputArray];
        }

        // Kiểm tra từng phần tử trong inputArray phải là chuỗi
        for (const term of inputArray) {
            if (typeof term !== "string") {
                return res.status(400).json({
                    message: `Each term in inputArray must be a string, but received ${typeof term}: ${term}`
                });
            }
        }

        // Lấy page và pageSize từ req.body, mặc định là 1 và 10
        const page = Number(req.body.page) || 1;
        const pageSize = Number(req.body.pageSize) || 10;

        // Giải quyết từng đầu vào thành danh sách tên chuẩn từ Ingredient
        const resolvedLists = await Promise.all(
            inputArray.map(async (term) => {
                const regex = new RegExp(term, "i"); // Không phân biệt hoa thường, không xử lý dấu tiếng Việt
                const ingredients = await Ingredient.find(
                    {
                        $or: [
                            { name: { $regex: regex } },
                            { aliases: { $elemMatch: { $regex: regex } } }
                        ]
                    },
                    { name: 1 }
                );
                return ingredients.map((ing) => ing.name);
            })
        );

        // Nếu không có danh sách nào được giải quyết, trả về rỗng
        if (resolvedLists.every((list) => list.length === 0)) {
            return res.status(200).json({
                recipes: [],
                totalRecords: 0,
                totalPages: 0,
                currentPage: page,
                pageSize: pageSize
            });
        }

        // Xây dựng pipeline để tìm kiếm và tính điểm
        const pipeline = [];
        let fieldCount = 0;

        // Tính điểm khớp cho từng danh sách đã giải quyết
        for (const list of resolvedLists) {
            if (list.length > 0) {
                fieldCount++;
                pipeline.push({
                    $addFields: {
                        [`count${fieldCount}`]: {
                            $size: {
                                $filter: {
                                    input: {
                                        $map: {
                                            input: { $ifNull: ["$ingredients", []] },
                                            as: "ing",
                                            in: "$$ing.name"
                                        }
                                    },
                                    as: "ingName",
                                    cond: { $in: ["$$ingName", list] }
                                }
                            }
                        }
                    }
                });
            }
        }

        // Nếu không có danh sách nào hợp lệ, trả về rỗng
        if (fieldCount === 0) {
            return res.status(200).json({
                recipes: [],
                totalRecords: 0,
                totalPages: 0,
                currentPage: page,
                pageSize: pageSize
            });
        }

        // Tính tổng điểm liên quan
        const sumFields = Array.from({ length: fieldCount }, (_, i) => `$count${i + 1}`);
        pipeline.push({
            $addFields: {
                total_relevance: { $sum: sumFields }
            }
        });

        // Xóa các trường count tạm thời
        const unsetFields = sumFields.map((field) => field.replace("$", ""));
        pipeline.push({
            $unset: unsetFields
        });

        // Lọc các công thức có điểm lớn hơn 0
        pipeline.push({ $match: { total_relevance: { $gt: 0 } } });

        // Đếm tổng số bản ghi trước khi phân trang
        const countPipeline = [...pipeline, { $count: "totalRecords" }];
        const countResult = await Recipe.aggregate(countPipeline);
        const totalRecords = countResult.length > 0 ? countResult[0].totalRecords : 0;
        const totalPages = Math.ceil(totalRecords / pageSize);

        // Sắp xếp và phân trang
        pipeline.push({ $sort: { total_relevance: -1, createdAt: -1 } });
        pipeline.push({ $skip: (page - 1) * pageSize });
        pipeline.push({ $limit: pageSize });

        // Thực thi pipeline để lấy danh sách công thức
        const recipes = await Recipe.aggregate(pipeline);
        console.log("res: ", recipes);
        console.log("total: re: ", totalRecords);
        console.log("total: pgs: ", totalPages);

        // Trả về kết quả
        return res.status(200).json({
            recipes,
            totalRecords,
            totalPages,
            currentPage: page,
            pageSize
        });
    } catch (e) {
        console.error("Error in searchRecipes:", e);
        return res.status(500).json({ message: "Server error occurred" });
    }
};