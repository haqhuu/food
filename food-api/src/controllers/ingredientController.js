import Ingredient from "../models/Ingredient.js";
import mongoose from "mongoose";

export const createIngredient = async (req, res) => {
    try {
        const payload = req.body;
        const newIngredient = new Ingredient({
            name: payload.name,
            imgUrl: payload.imgUrl,
            aliases: payload.aliases,
            category: payload.category
        });
        // console.log(newIngredient, "kkkk")
        const result = await newIngredient.save();
        console.log(result, "kkkk")

        return res.status(200).json({
            ok: 1,
            message: "Ingredient '" + result.name + "' created successfully",
            ingredient: result
        });
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
};

export const searchByIngredientName = async (req, res) => {
    try {
        // console.log("---> qerry: ", req.body);
        const page = parseInt(req.body.params.page) || 1;
        const pageSize = parseInt(req.body.params.pageSize) || 10;  // Số item mỗi trang (mặc định: 10)
        const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua
        const searchIngName = req.body.params.searchIngName;

        const regex = createRegexForVietnamese(searchIngName);

        // Truy vấn MongoDB
        const q = {
            $or: [
                { name: { $regex: regex } },
                { aliases: { $elemMatch: { $regex: regex } } }
            ]
        };

        const result = await Ingredient.aggregate([
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
        const ingredients = result[0].data; // Dữ liệu phân trang

        return res.status(200).json({
            total, // Tổng số bản ghi
            totalPages: Math.ceil(total / pageSize), // Tổng số trang
            currentPage: page, // Trang hiện tại
            pageSize,
            ingredients // Dữ liệu trả về
        });
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
}

/**
 * Hàm tạo regex cho chuỗi tìm kiếm tiếng Việt, cho phép khớp với các ký tự có dấu.
 * Ví dụ: "thi" sẽ thành "[tT][hH][iìíỉĩị]".
 */
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
export const getIngredientSuggests = async (req, res) => {
    try {
        const { query } = req.query; // Giả sử chuỗi tìm kiếm được gửi trong phần body của yêu cầu

        console.log("quer: eee: ", query);
        if (!query) {
            return res.status(400).json({ message: "Query string is required" });
        }

        // Tạo regex từ chuỗi tìm kiếm để khớp với các biến thể có dấu
        const regex = createRegexForVietnamese(query);

        // Truy vấn MongoDB
        // const q = {
        //     $or: [
        //         { name: { $regex: regex } },
        //         { aliases: { $elemMatch: { $regex: regex } } }
        //     ]
        // };

        const q = {
            name: { $regex: regex },
        };

        const ingredients = await Ingredient.aggregate([
            { $match: q },
            { $group: { _id: "$name", doc: { $first: "$$ROOT" } } },
            { $limit: 7 }
        ]).exec();

        const result = ingredients.map(item => item.doc);

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const getIngredients = async (req, res) => {
    try {
        // console.log("---> qerry: ", req.query);
        // console.log("all ing: ", );
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;  // Số item mỗi trang (mặc định: 10)
        const skip = (page - 1) * pageSize; // Tính số bản ghi cần bỏ qua

        const result = await Ingredient.aggregate([
            {
                $facet: {
                    // 🔹 Pipeline 1: Đếm tổng số bản ghi
                    metadata: [{ $count: "total" }],

                    // 🔹 Pipeline 2: Lấy dữ liệu cho trang hiện tại
                    data: [
                        // { $sort: { rating: -1 } }, // Sắp xếp theo rating giảm dần
                        { $skip: skip }, // Bỏ qua các bản ghi không cần thiết
                        { $limit: pageSize } // Giới hạn số bản ghi
                    ]
                }
            }
        ]);
        // Xử lý kết quả trả về
        const total = result[0].metadata[0]?.total || 0; // Số lượng tổng
        const ingredients = result[0].data; // Dữ liệu phân trang

        return res.status(200).json({
            total, // Tổng số bản ghi
            totalPages: Math.ceil(total / pageSize), // Tổng số trang
            currentPage: page, // Trang hiện tại
            pageSize,
            ingredients // Dữ liệu trả về
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

export const updateIngredient = async (req, res) => {
    try {
        const payload = req.body.payload;
        const id = payload.id;

        // console.log("q:::::", payload);

        const response = await Ingredient.findByIdAndUpdate(new mongoose.Types.ObjectId(id), { $set: payload }, { new: true, runValidators: true });

        // console.log("q:::::", response);
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

export const deleteIngredient = async (req, res) => {
    try {
        const q = req.body;
        const id = q.params;
        // console.log("q:::::", q);

        const response = await Ingredient.findByIdAndDelete(Object(id));

        // console.log("q:::::", response);
        return res.status(200).json({ ok: 1, message: "Deleted " + response.name });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
} 