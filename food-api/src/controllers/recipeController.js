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
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;  // Số item mỗi trang (mặc định: 10)
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

function countOccurrences(a, b) {
    const regex = new RegExp(a.join('|'), 'gi'); // Create a regex pattern from array elements
    const matches = b.match(regex); // Find all matches in string b
    return matches ? matches.length : 0; // Return count, handling null case
}

export const searchRecipes = async (req, res) => {
    try {
        // const ingredients = req.body; // Mảng nguyên liệu từ client
        // console.log(ingredients);
        // const page = parseInt(req.query.page) || 1;  // Trang hiện tại
        // const pageSize = parseInt(req.query.pageSize) || 10; // Số bản ghi mỗi trang
        // const skip = (page - 1) * pageSize;

        // const result = await Recipe.aggregate([
        //     // 🟢 1. Chuyển `ingredient` từ string -> array bằng `$split`
        //     {
        //         $addFields: {
        //             ingredientArray: {
        //                 $cond: {
        //                     if: { $eq: [{ $type: "$ingredient" }, "string"] },
        //                     then: { $split: ["$ingredient", "|"] }, // ✅ Tách chuỗi thành mảng
        //                     else: "$ingredient" // ✅ Nếu đã là mảng thì giữ nguyên
        //                 }
        //             }
        //         }
        //     },
        //     // 🟢 1. Tính tần suất xuất hiện của nguyên liệu trong mỗi công thức
        //     {
        //         $addFields: {
        //             freq: {
        //                 $size: {
        //                     $ifNull: [
        //                         { $setIntersection: ["$ingredientArray", ingredients] },
        //                         [] // ✅ Tránh lỗi `null`
        //                     ]
        //                 }
        //             }
        //         }
        //     },
        //     // 🟢 2. Chỉ lấy các công thức có `freq > 0` (công thức có ít nhất 1 nguyên liệu)
        //     {
        //         $match: { freq: { $gt: 0 } }
        //     },
        //     // 🟢 3. Sắp xếp theo `freq` giảm dần
        //     {
        //         $sort: { freq: -1 }
        //     },
        //     // 🟢 4. Phân trang: Bỏ qua và lấy đúng số lượng bản ghi
        //     {
        //         $skip: skip
        //     },
        //     {
        //         $limit: pageSize
        //     },
        //     // 🟢 5. (Tuỳ chọn) Lấy tổng số bản ghi để tính số trang
        //     {
        //         $facet: {
        //             metadata: [{ $count: "total" }],
        //             data: [{ $skip: skip }, { $limit: pageSize }]
        //         }
        //     }

        // ]);

        // console.log(result);
        // // 🟢 6. Xử lý kết quả trả về
        // const total = result[0].metadata[0]?.total || 0;
        // const recipes = result[0].data;

        // return res.status(200).json({
        //     total,
        //     totalPages: Math.ceil(total / pageSize),
        //     currentPage: page,
        //     pageSize,
        //     recipes
        // });

        const ingredients = req.body;
        console.log(ingredients);
        const allRecipes = await Recipe.find().lean();; // ✅ Use `.lean()` to convert Mongoose documents to plain objects
        allRecipes.forEach(it => {
            it.freq = 0; // Initialize frequency to 0
        });
        allRecipes.forEach(it => {
            const fre = countOccurrences(ingredients, it.ingredient);
            it.freq += fre;
        });

        allRecipes.sort((a, b) => b.freq - a.freq);

        return res.status(200).json(allRecipes);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
};