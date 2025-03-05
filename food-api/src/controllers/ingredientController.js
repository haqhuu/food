import Ingredient from "../models/Ingredient.js";

export const createIngredient = async (req, res) => {
    try {
        const payload = req.body;
        console.log(payload);
        const newIngredient = new Ingredient({
            name: payload.name,
            imgUrl: payload.imgUrl,
            aliases: payload.aliases
        });

        console.log(newIngredient, "kkkk")

        const result = await newIngredient.save();
        console.log(result, "kkkk")
        return res.status(200).json({
            message: "Ingredient created successfully",
            ingredient: result
        });
    } catch (e) {
        console.log("error: ", e);
        return res.status(500).json({ message: "server is broken" });
    }
};




//old--------------------
// export const getIngredient = async (req, res) => {
//     try {
//         const { name } = req.params;
//         const ingredient = await Ingredient.find({ name: { $in: [new RegExp(name, 'i')] } });
//         return res.status(200).json(ingredient);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ message: "server is broken" });
//     }
// }

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
export const getIngredients = async (req, res) => {
    try {
        const { query } = req.query; // Giả sử chuỗi tìm kiếm được gửi trong phần body của yêu cầu
        // console.log("body", req.body);
        // console.log("query", req.query);
        // console.log("params", req.params);

        if (!query) {
            return res.status(400).json({ message: "Query string is required" });
        }

        // Tạo regex từ chuỗi tìm kiếm để khớp với các biến thể có dấu
        const regex = createRegexForVietnamese(query);

        // Truy vấn MongoDB
        const q = {
            $or: [
                { name: { $regex: regex } },
                { aliases: { $elemMatch: { $regex: regex } } }
            ]
        };

        const ingredients = await Ingredient.find(q)
            .limit(7) // Giới hạn trả về tối đa 7 bản ghi
            .exec();

        // const ingredients = await Ingredient.find();

        return res.status(200).json(ingredients);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "server is broken" });
    }
}

// export const createOrUpdateIngredient = async (req, res) => {
//     try {
//         const { name, unit, imgUrl } = req.body;
//         // console.log(name, "|", unit, "|", imgUrl);
//         const response = await Ingredient.findOneAndUpdate({ name: name },
//             { unit: unit, imgUrl: imgUrl }, { new: true, upsert: true }
//         );

//         return res.status(200).json(response);
//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ message: "server is broken" });
//     }
// }