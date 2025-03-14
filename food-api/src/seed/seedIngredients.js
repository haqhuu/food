import mongoose from "mongoose";
import Ingredient from "../models/Ingredient.js"; // Đảm bảo rằng file Ingredient.js đã export schema Ingredient đúng cách

// Kết nối đến MongoDB (điều chỉnh URI theo cấu hình của bạn)
mongoose.connect("mongodb://admin:admin@food-mongodb:27017/food?authSource=admin", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection error:", err));

// Mảng chứa 20 bản ghi ingredients mẫu
const sampleIngredients = [
    {
        name: "Cà chua",
        aliases: ["Pomodoro", "Cà chua"],
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png"
    },
    {
        name: "Hành tây",
        aliases: ["Hành", "Bawang"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidoxORgVGmDatQLE_uyunTDYiUxC3Q8B2QA&s"
    },
    {
        name: "Tỏi",
        aliases: ["Tỏi"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSZoNb4hbfQA-9Jexw_SBaFVWkeY6mikl0Q&s"
    },
    {
        name: "Muối",
        aliases: ["Muối"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIxQmc2fM_0oMmD41n-oJEPtjKNKOJS6HXww&s"
    },
    {
        name: "Tiêu",
        aliases: ["Tiêu"],
        imgUrl: "https://www.worldhistory.org/uploads/images/14563.jpeg"
    },
    {
        name: "Húng quế",
        aliases: ["Húng quế"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiS2ex3O77KtvPQN1px3spnoNiI7isEJdxyw&s"
    },
    {
        name: "Kinh giới",
        aliases: ["Kinh giới"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK0BFdurUjj6wigjIIQRngQIdjpif7GdWK3w&s"
    },
    {
        name: "Ngò tây",
        aliases: ["Ngò tây"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK3CxPS6KtTGy-65oewNnPQw-vO2PpyCM8AA&s"
    },
    {
        name: "Cà rốt",
        aliases: ["Cà rốt"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHDZuNiIBh5xx2eoMa0YtYWHoFkhW3hkWcw&s"
    },
    {
        name: "Khoai tây",
        aliases: ["Khoai tây"],
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Potato_potato.jpg"
    },
    {
        name: "Sữa",
        aliases: ["Sữa"],
        imgUrl: "https://live.staticflickr.com/65535/53788961991_1631e03d72_b.jpg"
    },
    {
        name: "Trứng",
        aliases: ["Trứng"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISdU1CcacamNm_zeXYZd_euZZCBg7fJ8SWw&s"
    },
    {
        name: "Bột mì",
        aliases: ["Bột mì"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv8vbYoHioc_yuuX85MwB1t0dZ1teoVPxRsA&s"
    },
    {
        name: "Đường",
        aliases: ["Đường"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgCEb6O4RXWFsDcc2SyiPzh-Pj73Qaw4PT5A&s"
    },
    {
        name: "Bơ",
        aliases: ["Bơ"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYPjGHvzZ3rWeTA_84PzTOnmgKUk_H_bHIUw&s"
    },
    {
        name: "Dầu ô liu",
        aliases: ["Dầu ô liu"],
        imgUrl: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4ODUzMDgxLWltYWdlLWt3dnhiZWhmLmpwZw.jpg"
    },
    {
        name: "Giấm",
        aliases: ["Giấm"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrrZzX6pkrZjbcNua5BK07R026S5A0k3TRqw&s"
    },
    {
        name: "Hạt thì là",
        aliases: ["Hạt thì là"],
        imgUrl: "https://pixahive.com/wp-content/uploads/2020/11/Cumin-seeds-macro-photography-209787-pixahive.jpg"
    },
    {
        name: "Ớt",
        aliases: ["Ớt"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCkXWB-zXC0IFVStvTiSTv-hFNxIcG5mZaCQ&s"
    },
    {
        name: "Gừng",
        aliases: ["Gừng"],
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISrvt7FojBwFjMJm1R-0sFIyFCuEM2LoWYg&s"
    }
]

// Hàm seed dữ liệu: sử dụng arrow function
const seedIngredients = async () => {
    try {
        await Ingredient.insertMany(sampleIngredients);
        console.log("Inserted sample ingredients successfully!");
    } catch (error) {
        console.error("Error inserting sample ingredients:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedIngredients();
