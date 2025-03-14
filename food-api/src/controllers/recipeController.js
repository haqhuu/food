import Recipe from "../models/Recipe.js";
import Ingredient from "../models/Ingredient.js";
import mongoose from "mongoose";

function createRegexForVietnamese(str) {
    const vietnameseMappings = {
        'a': '[aàáảãạăằắẳẵặâầấẩẫậ]',
        'e': '[eèéẻẽẹêềếểễệ]',
        'i': '[iìíỉĩị]',
        'o': '[oòóỏõọôồốổỗộơờớởỡợ]',
        'u': '[uùúủũụưừứủữự]',
        'y': '[yỳýỷỹỵ]',
        'd': '[dđ]',
        'A': '[AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬ]',
        'E': '[EÈÉẺẼẸÊỀẾỂỄỆ]',
        'I': '[IÌÍỈĨỊ]',
        'O': '[OÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢ]',
        'U': '[UÙÚỦŨỤƯỪỨỦỮỰ]',
        'Y': '[YỲÝỶỸỴ]',
        'D': '[DĐ]'
        // Bạn có thể mở rộng thêm nếu cần cho các ký tự khác
    };

    const regexStr = str.split('').map(char => {
        return vietnameseMappings[char] || char; // Nếu ký tự không có trong mappings, giữ nguyên
    }).join('');

    return new RegExp(regexStr, 'i'); // 'i' để không phân biệt chữ hoa/thường
}

export const createOrUpdateRecipe = async (req, res) => {
    try {
        console.log(req.body);
        // const ingredientsJS = JSON.parse(req.body.ingredients);
        const instructions = JSON.parse(req.body.instructions);
        const ingredients = JSON.parse(req.body.ingredients);
        // console.log("reqbody", req.body);
        // console.log("lllllllyyyylllllllll");

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

//////////////index
export const searchRecipes = async (req, res) => {
    try {
        let { searchIngName, ingredients, bannedIngs, page, pageSize } = req.body;
        page = parseInt(page) || 1;
        pageSize = parseInt(pageSize) || 10;
        const skip = (page - 1) * pageSize;
        // Pipeline chính để xử lý dữ liệu
        const pipeline = [];

        // 1. Tạo trường tạm để đánh dấu công thức thuộc tập A (searchIngName)
        pipeline.push({
            $addFields: {
                inSetA: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: [searchIngName, null] },
                                { $eq: [searchIngName, ""] }
                            ]
                        },
                        then: true, // Nếu searchIngName null hoặc rỗng, A là toàn bộ công thức
                        else: {
                            $regexMatch: {
                                input: "$name",
                                regex: createRegexForVietnamese(searchIngName)
                            }
                        }
                    }
                }
            }
        });

        // 2. Tạo trường tạm để đánh dấu công thức thuộc tập B (ingredients)
        // 2. Tạo trường tạm để đánh dấu công thức thuộc tập B (ingredients) với regex
        pipeline.push({
            $addFields: {
                inSetB: {
                    $cond: {
                        if: {
                            $or: [
                                { $eq: [ingredients, null] },
                                { $eq: [{ $size: { $ifNull: [ingredients, []] } }, 0] }
                            ]
                        },
                        then: true, // Nếu ingredients null hoặc rỗng, B là toàn bộ công thức
                        else: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: "$ingredients",
                                            as: "ing",
                                            cond: {
                                                $or: [
                                                    // Kiểm tra ingredients.name với regex
                                                    {
                                                        $regexMatch: {
                                                            input: "$$ing.name",
                                                            regex: createRegexForVietnamese(ingredients.join("|")) // Tạo regex từ danh sách ingredients
                                                        }
                                                    },
                                                    // Kiểm tra ingredients.alternatives.name với regex
                                                    {
                                                        $gt: [
                                                            {
                                                                $size: {
                                                                    $filter: {
                                                                        input: "$$ing.alternatives",
                                                                        as: "alt",
                                                                        cond: {
                                                                            $regexMatch: {
                                                                                input: "$$alt.name",
                                                                                regex: createRegexForVietnamese(ingredients.join("|"))
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            },
                                                            0
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                0
                            ]
                        }
                    }
                }
            }
        });

        // 3. Tạo trường tạm để đánh dấu công thức thuộc tập C (bannedIngs)
        pipeline.push({
            $addFields: {
                inSetC: {
                    $cond: {
                        if: {
                            $and: [
                                { $ne: [bannedIngs, null] },
                                { $gt: [{ $size: { $ifNull: [bannedIngs, []] } }, 0] }
                            ]
                        },
                        then: {
                            $or: [
                                { $gt: [{ $size: { $setIntersection: ["$ingredients.name", bannedIngs] } }, 0] },
                                {
                                    $gt: [
                                        {
                                            $size: {
                                                $filter: {
                                                    input: "$ingredients",
                                                    as: "ing",
                                                    cond: {
                                                        $gt: [
                                                            { $size: { $setIntersection: ["$$ing.alternatives.name", bannedIngs] } },
                                                            0
                                                        ]
                                                    }
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            ]
                        },
                        else: false // Nếu bannedIngs null hoặc rỗng, C là tập rỗng
                    }
                }
            }
        });

        // 4. Lọc các công thức thuộc (A ∩ B) \ C
        pipeline.push({
            $match: {
                $and: [
                    { inSetA: true },
                    { inSetB: true },
                    { inSetC: false }
                ]
            }
        });

        // 5. Áp dụng phân trang
        pipeline.push({
            $facet: {
                metadata: [{ $count: "total" }],
                data: [
                    { $skip: skip },
                    { $limit: pageSize }
                ]
            }
        });

        // Thực thi pipeline
        const result = await Recipe.aggregate(pipeline).exec();
        const totalRecords = result[0].metadata[0]?.total || 0;
        const recipes = result[0].data;

        // console.log("Total records:", totalRecords, "Recipes returned:", recipes);
        // console.log("rrrrrreeee:", recipes);
        return res.status(200).json({
            recipes,
            totalRecords,
            totalPages: Math.ceil(totalRecords / pageSize),
            currentPage: page,
            pageSize
        });
    } catch (e) {
        console.error("Error in searchRecipes:", e);
        return res.status(500).json({ message: "Server error occurred" });
    }
};

export const searchName = async (req, res) => {
    try {
        // console.log("---> qerry: s", req.query.query);
        const page = parseInt(req.query.query.page) || 1;
        const pageSize = parseInt(req.query.query.pageSize) || 10;  // Số item mỗi trang (mặc định: 10)
        const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
        const searchRecipeName = req.query.query.name;
        if (!searchRecipeName) {
            return res.status(200).json({
                ok: 0, message: "null name"
            });
        }
        const regex = createRegexForVietnamese(searchRecipeName);

        // Truy vấn MongoDB
        const q = {
            $or: [
                { name: { $regex: regex } },
                { aliases: { $elemMatch: { $regex: regex } } }
            ]
        };

        const result = await Recipe.aggregate([
            { $match: q },
            {
                $facet: {
                    // 🔹 Pipeline 1: Đếm tổng số bản ghi
                    metadata: [{ $count: "total" }],

                    // 🔹 Pipeline 2: Lấy dữ liệu cho trang hiện tại
                    data: [
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
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
}



export const deleteRecipe = async (req, res) => {
    try {
        const q = req.body;
        const id = q.params;
        // console.log("q:::::", q);

        const response = await Recipe.findByIdAndDelete(Object(id));

        // console.log("q:::::", response);
        return res.status(200).json({ ok: 1, message: "Deleted " + response.name });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}


export const updateRecipe = async (req, res) => {
    try {
        const payload = req.body.payload;
        const id = payload.id;

        // console.log("q:::::", payload);

        const response = await Recipe.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { $set: payload.recipe }, { new: true, runValidators: true });

        // console.log("q:::::xx", response);
        if (response) {
            return res.status(200).json({ ok: 1, message: "updated successful " + response.name });
        } else {
            return res.status(500).json({ ok: 0, message: "Something wrong!" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const createRecipe = async (req, res) => {
    try {
        const payload = req.body.payload;
        // console.log("oooo: ", payload)
        const newRecipe = new Recipe(payload.recipe);
        const result = await newRecipe.save();

        // console.log(result, "kkkk")

        return res.status(200).json({
            ok: 1,
            message: "'" + result.name + "' created successfully",
            recipe: result
        });
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
};

export const searchNameOnManage = async (req, res) => {
    try {
        // console.log("---> qerry: ", req.body);
        const page = parseInt(req.body.params.page) || 1;
        const pageSize = parseInt(req.body.params.pageSize) || 10;  // Số item mỗi trang (mặc định: 10)
        const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
        const searchRecipeName = req.body.params.searchRecipeName;

        const regex = createRegexForVietnamese(searchRecipeName);

        // Truy vấn MongoDB
        const q = {
            $or: [
                { name: { $regex: regex } },
                { aliases: { $elemMatch: { $regex: regex } } }
            ]
        };

        const result = await Recipe.aggregate([
            { $match: q },
            {
                $facet: {
                    // 🔹 Pipeline 1: Đếm tổng số bản ghi
                    metadata: [{ $count: "total" }],

                    // 🔹 Pipeline 2: Lấy dữ liệu cho trang hiện tại
                    data: [
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
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
}