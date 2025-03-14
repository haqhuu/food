import mongoose from "mongoose";
import { faker } from '@faker-js/faker'
// const { faker } = require('@faker-js/faker');
import Recipe from "../models/Recipe.js"; // Import model Recipe
import Ingredient from "../models/Ingredient.js";

// Thiết lập locale của faker thành tiếng Việt
faker.locale = "vi";

// Mảng các tính từ mô tả
const adjectives = [
    "Tươi ngon", "Đặc sắc", "Thơm lừng", "Đậm đà", "Hấp dẫn",
    "Sảng khoái", "Năng động", "Tinh tế", "Sáng tạo", "Cổ điển", "Giòn tan", "Ngon miệng", "Mát lạnh", "Đậm vị", "Quen thuộc",
    "Hảo hạng", "Truyền thống", "Sôi động", "Độc đáo", "Tinh túy"
];

// Mảng các danh từ (tên món ăn)
const nouns = [
    "Phở", "Bún", "Mì", "Cơm", "Bánh", "Salad", "Gỏi", "Cháo", "Hủ tiếu",
    "Lẩu", "Bít tết", "Nướng", "Xào", "Hấp", "Nước ép", "Sinh tố", "Đậu hủ",
    "Bánh mì", "Bánh cuốn", "Xôi", "Chè", "Kem", "Bia", "Trà", "Cà phê",
    "Súp", "Canh", "Sushi", "Pizza", "Burger", "Pasta", "Nem", "Chả"
];

// Tạo mảng chứa 300 tên thực đơn bằng cách kết hợp từng phần tử
let recipeNames = [];
for (let i = 0; i < adjectives.length; i++) {
    for (let j = 0; j < nouns.length; j++) {
        recipeNames.push(`${nouns[j]} ${adjectives[i]} `);
    }
}

// Mảng dữ liệu mẫu cho tên công thức và tên nguyên liệu
// Mảng 300 tên công thức nấu ăn
// const recipeNames = [
//     "Phở truyền thống Hà Nội",
//     "Phở truyền thống Sài Gòn",
//     "Phở truyền thống Huế",
//     "Phở truyền thống Đà Nẵng",
//     "Phở truyền thống Nha Trang",
//     "Phở truyền thống Cần Thơ",
//     "Phở truyền thống Hải Phòng",
//     "Phở truyền thống Đà Lạt",
//     "Phở truyền thống Quảng Ninh",
//     "Phở truyền thống Vũng Tàu",
//     "Phở sáng tạo Hà Nội",
//     "Phở sáng tạo Sài Gòn",
//     "Phở sáng tạo Huế",
//     "Phở sáng tạo Đà Nẵng",
//     "Phở sáng tạo Nha Trang",
//     "Phở sáng tạo Cần Thơ",
//     "Phở sáng tạo Hải Phòng",
//     "Phở sáng tạo Đà Lạt",
//     "Phở sáng tạo Quảng Ninh",
//     "Phở sáng tạo Vũng Tàu",
//     "Phở tươi ngon Hà Nội",
//     "Phở tươi ngon Sài Gòn",
//     "Phở tươi ngon Huế",
//     "Phở tươi ngon Đà Nẵng",
//     "Phở tươi ngon Nha Trang",
//     "Phở tươi ngon Cần Thơ",
//     "Phở tươi ngon Hải Phòng",
//     "Phở tươi ngon Đà Lạt",
//     "Phở tươi ngon Quảng Ninh",
//     "Phở tươi ngon Vũng Tàu",
//     "Bún đặc sản Hà Nội",
//     "Bún đặc sản Sài Gòn",
//     "Bún đặc sản Huế",
//     "Bún đặc sản Đà Nẵng",
//     "Bún đặc sản Nha Trang",
//     "Bún đặc sản Cần Thơ",
//     "Bún đặc sản Hải Phòng",
//     "Bún đặc sản Đà Lạt",
//     "Bún đặc sản Quảng Ninh",
//     "Bún đặc sản Vũng Tàu",
//     "Bún đậm đà Hà Nội",
//     "Bún đậm đà Sài Gòn",
//     "Bún đậm đà Huế",
//     "Bún đậm đà Đà Nẵng",
//     "Bún đậm đà Nha Trang",
//     "Bún đậm đà Cần Thơ",
//     "Bún đậm đà Hải Phòng",
//     "Bún đậm đà Đà Lạt",
//     "Bún đậm đà Quảng Ninh",
//     "Bún đậm đà Vũng Tàu",
//     "Bún thơm ngon Hà Nội",
//     "Bún thơm ngon Sài Gòn",
//     "Bún thơm ngon Huế",
//     "Bún thơm ngon Đà Nẵng",
//     "Bún thơm ngon Nha Trang",
//     "Bún thơm ngon Cần Thơ",
//     "Bún thơm ngon Hải Phòng",
//     "Bún thơm ngon Đà Lạt",
//     "Bún thơm ngon Quảng Ninh",
//     "Bún thơm ngon Vũng Tàu",
//     "Mì giản dị Hà Nội",
//     "Mì giản dị Sài Gòn",
//     "Mì giản dị Huế",
//     "Mì giản dị Đà Nẵng",
//     "Mì giản dị Nha Trang",
//     "Mì giản dị Cần Thơ",
//     "Mì giản dị Hải Phòng",
//     "Mì giản dị Đà Lạt",
//     "Mì giản dị Quảng Ninh",
//     "Mì giản dị Vũng Tàu",
//     "Mì hấp dẫn Hà Nội",
//     "Mì hấp dẫn Sài Gòn",
//     "Mì hấp dẫn Huế",
//     "Mì hấp dẫn Đà Nẵng",
//     "Mì hấp dẫn Nha Trang",
//     "Mì hấp dẫn Cần Thơ",
//     "Mì hấp dẫn Hải Phòng",
//     "Mì hấp dẫn Đà Lạt",
//     "Mì hấp dẫn Quảng Ninh",
//     "Mì hấp dẫn Vũng Tàu",
//     "Mì ngon tuyệt Hà Nội",
//     "Mì ngon tuyệt Sài Gòn",
//     "Mì ngon tuyệt Huế",
//     "Mì ngon tuyệt Đà Nẵng",
//     "Mì ngon tuyệt Nha Trang",
//     "Mì ngon tuyệt Cần Thơ",
//     "Mì ngon tuyệt Hải Phòng",
//     "Mì ngon tuyệt Đà Lạt",
//     "Mì ngon tuyệt Quảng Ninh",
//     "Mì ngon tuyệt Vũng Tàu",
//     "Cơm mộc mạc Hà Nội",
//     "Cơm mộc mạc Sài Gòn",
//     "Cơm mộc mạc Huế",
//     "Cơm mộc mạc Đà Nẵng",
//     "Cơm mộc mạc Nha Trang",
//     "Cơm mộc mạc Cần Thơ",
//     "Cơm mộc mạc Hải Phòng",
//     "Cơm mộc mạc Đà Lạt",
//     "Cơm mộc mạc Quảng Ninh",
//     "Cơm mộc mạc Vũng Tàu",
//     "Cơm đặc sản Hà Nội",
//     "Cơm đặc sản Sài Gòn",
//     "Cơm đặc sản Huế",
//     "Cơm đặc sản Đà Nẵng",
//     "Cơm đặc sản Nha Trang",
//     "Cơm đặc sản Cần Thơ",
//     "Cơm đặc sản Hải Phòng",
//     "Cơm đặc sản Đà Lạt",
//     "Cơm đặc sản Quảng Ninh",
//     "Cơm đặc sản Vũng Tàu",
//     "Cơm thơm ngon Hà Nội",
//     "Cơm thơm ngon Sài Gòn",
//     "Cơm thơm ngon Huế",
//     "Cơm thơm ngon Đà Nẵng",
//     "Cơm thơm ngon Nha Trang",
//     "Cơm thơm ngon Cần Thơ",
//     "Cơm thơm ngon Hải Phòng",
//     "Cơm thơm ngon Đà Lạt",
//     "Cơm thơm ngon Quảng Ninh",
//     "Cơm thơm ngon Vũng Tàu",
//     "Bánh mì truyền thống Hà Nội",
//     "Bánh mì truyền thống Sài Gòn",
//     "Bánh mì truyền thống Huế",
//     "Bánh mì truyền thống Đà Nẵng",
//     "Bánh mì truyền thống Nha Trang",
//     "Bánh mì truyền thống Cần Thơ",
//     "Bánh mì truyền thống Hải Phòng",
//     "Bánh mì truyền thống Đà Lạt",
//     "Bánh mì truyền thống Quảng Ninh",
//     "Bánh mì truyền thống Vũng Tàu",
//     "Bánh xèo giòn tan Hà Nội",
//     "Bánh xèo giòn tan Sài Gòn",
//     "Bánh xèo giòn tan Huế",
//     "Bánh xèo giòn tan Đà Nẵng",
//     "Bánh xèo giòn tan Nha Trang",
//     "Bánh xèo giòn tan Cần Thơ",
//     "Bánh xèo giòn tan Hải Phòng",
//     "Bánh xèo giòn tan Đà Lạt",
//     "Bánh xèo giòn tan Quảng Ninh",
//     "Bánh xèo giòn tan Vũng Tàu",
//     "Bánh cuốn mềm mịn Hà Nội",
//     "Bánh cuốn mềm mịn Sài Gòn",
//     "Bánh cuốn mềm mịn Huế",
//     "Bánh cuốn mềm mịn Đà Nẵng",
//     "Bánh cuốn mềm mịn Nha Trang",
//     "Bánh cuốn mềm mịn Cần Thơ",
//     "Bánh cuốn mềm mịn Hải Phòng",
//     "Bánh cuốn mềm mịn Đà Lạt",
//     "Bánh cuốn mềm mịn Quảng Ninh",
//     "Bánh cuốn mềm mịn Vũng Tàu",
//     "Gỏi cuốn tươi mát Hà Nội",
//     "Gỏi cuốn tươi mát Sài Gòn",
//     "Gỏi cuốn tươi mát Huế",
//     "Gỏi cuốn tươi mát Đà Nẵng",
//     "Gỏi cuốn tươi mát Nha Trang",
//     "Gỏi cuốn tươi mát Cần Thơ",
//     "Gỏi cuốn tươi mát Hải Phòng",
//     "Gỏi cuốn tươi mát Đà Lạt",
//     "Gỏi cuốn tươi mát Quảng Ninh",
//     "Gỏi cuốn tươi mát Vũng Tàu",
//     "Gỏi gà hấp dẫn Hà Nội",
//     "Gỏi gà hấp dẫn Sài Gòn",
//     "Gỏi gà hấp dẫn Huế",
//     "Gỏi gà hấp dẫn Đà Nẵng",
//     "Gỏi gà hấp dẫn Nha Trang",
//     "Gỏi gà hấp dẫn Cần Thơ",
//     "Gỏi gà hấp dẫn Hải Phòng",
//     "Gỏi gà hấp dẫn Đà Lạt",
//     "Gỏi gà hấp dẫn Quảng Ninh",
//     "Gỏi gà hấp dẫn Vũng Tàu",
//     "Xôi gà ngon Hà Nội",
//     "Xôi gà ngon Sài Gòn",
//     "Xôi gà ngon Huế",
//     "Xôi gà ngon Đà Nẵng",
//     "Xôi gà ngon Nha Trang",
//     "Xôi gà ngon Cần Thơ",
//     "Xôi gà ngon Hải Phòng",
//     "Xôi gà ngon Đà Lạt",
//     "Xôi gà ngon Quảng Ninh",
//     "Xôi gà ngon Vũng Tàu",
//     "Xôi xéo truyền thống Hà Nội",
//     "Xôi xéo truyền thống Sài Gòn",
//     "Xôi xéo truyền thống Huế",
//     "Xôi xéo truyền thống Đà Nẵng",
//     "Xôi xéo truyền thống Nha Trang",
//     "Xôi xéo truyền thống Cần Thơ",
//     "Xôi xéo truyền thống Hải Phòng",
//     "Xôi xéo truyền thống Đà Lạt",
//     "Xôi xéo truyền thống Quảng Ninh",
//     "Xôi xéo truyền thống Vũng Tàu",
//     "Cháo lòng đậm đà Hà Nội",
//     "Cháo lòng đậm đà Sài Gòn",
//     "Cháo lòng đậm đà Huế",
//     "Cháo lòng đậm đà Đà Nẵng",
//     "Cháo lòng đậm đà Nha Trang",
//     "Cháo lòng đậm đà Cần Thơ",
//     "Cháo lòng đậm đà Hải Phòng",
//     "Cháo lòng đậm đà Đà Lạt",
//     "Cháo lòng đậm đà Quảng Ninh",
//     "Cháo lòng đậm đà Vũng Tàu",
//     "Cháo gà thơm ngon Hà Nội",
//     "Cháo gà thơm ngon Sài Gòn",
//     "Cháo gà thơm ngon Huế",
//     "Cháo gà thơm ngon Đà Nẵng",
//     "Cháo gà thơm ngon Nha Trang",
//     "Cháo gà thơm ngon Cần Thơ",
//     "Cháo gà thơm ngon Hải Phòng",
//     "Cháo gà thơm ngon Đà Lạt",
//     "Cháo gà thơm ngon Quảng Ninh",
//     "Cháo gà thơm ngon Vũng Tàu",
//     "Canh chua cá lóc Hà Nội",
//     "Canh chua cá lóc Sài Gòn",
//     "Canh chua cá lóc Huế",
//     "Canh chua cá lóc Đà Nẵng",
//     "Canh chua cá lóc Nha Trang",
//     "Canh chua cá lóc Cần Thơ",
//     "Canh chua cá lóc Hải Phòng",
//     "Canh chua cá lóc Đà Lạt",
//     "Canh chua cá lóc Quảng Ninh",
//     "Canh chua cá lóc Vũng Tàu",
//     "Canh bí đỏ ngọt thanh Hà Nội",
//     "Canh bí đỏ ngọt thanh Sài Gòn",
//     "Canh bí đỏ ngọt thanh Huế",
//     "Canh bí đỏ ngọt thanh Đà Nẵng",
//     "Canh bí đỏ ngọt thanh Nha Trang",
//     "Canh bí đỏ ngọt thanh Cần Thơ",
//     "Canh bí đỏ ngọt thanh Hải Phòng",
//     "Canh bí đỏ ngọt thanh Đà Lạt",
//     "Canh bí đỏ ngọt thanh Quảng Ninh",
//     "Canh bí đỏ ngọt thanh Vũng Tàu",
//     "Salad rau củ tươi mát Hà Nội",
//     "Salad rau củ tươi mát Sài Gòn",
//     "Salad rau củ tươi mát Huế",
//     "Salad rau củ tươi mát Đà Nẵng",
//     "Salad rau củ tươi mát Nha Trang",
//     "Salad rau củ tươi mát Cần Thơ",
//     "Salad rau củ tươi mát Hải Phòng",
//     "Salad rau củ tươi mát Đà Lạt",
//     "Salad rau củ tươi mát Quảng Ninh",
//     "Salad rau củ tươi mát Vũng Tàu",
//     "Salad hải sản hấp dẫn Hà Nội",
//     "Salad hải sản hấp dẫn Sài Gòn",
//     "Salad hải sản hấp dẫn Huế",
//     "Salad hải sản hấp dẫn Đà Nẵng",
//     "Salad hải sản hấp dẫn Nha Trang",
//     "Salad hải sản hấp dẫn Cần Thơ",
//     "Salad hải sản hấp dẫn Hải Phòng",
//     "Salad hải sản hấp dẫn Đà Lạt",
//     "Salad hải sản hấp dẫn Quảng Ninh",
//     "Salad hải sản hấp dẫn Vũng Tàu",
//     "Lẩu thái cay Hà Nội",
//     "Lẩu thái cay Sài Gòn",
//     "Lẩu thái cay Huế",
//     "Lẩu thái cay Đà Nẵng",
//     "Lẩu thái cay Nha Trang",
//     "Lẩu thái cay Cần Thơ",
//     "Lẩu thái cay Hải Phòng",
//     "Lẩu thái cay Đà Lạt",
//     "Lẩu thái cay Quảng Ninh",
//     "Lẩu thái cay Vũng Tàu",
//     "Lẩu nấm thượng hạng Hà Nội",
//     "Lẩu nấm thượng hạng Sài Gòn",
//     "Lẩu nấm thượng hạng Huế",
//     "Lẩu nấm thượng hạng Đà Nẵng",
//     "Lẩu nấm thượng hạng Nha Trang",
//     "Lẩu nấm thượng hạng Cần Thơ",
//     "Lẩu nấm thượng hạng Hải Phòng",
//     "Lẩu nấm thượng hạng Đà Lạt",
//     "Lẩu nấm thượng hạng Quảng Ninh",
//     "Lẩu nấm thượng hạng Vũng Tàu",
//     "Hủ tiếu Nam Vang Hà Nội",
//     "Hủ tiếu Nam Vang Sài Gòn",
//     "Hủ tiếu Nam Vang Huế",
//     "Hủ tiếu Nam Vang Đà Nẵng",
//     "Hủ tiếu Nam Vang Nha Trang",
//     "Hủ tiếu Nam Vang Cần Thơ",
//     "Hủ tiếu Nam Vang Hải Phòng",
//     "Hủ tiếu Nam Vang Đà Lạt",
//     "Hủ tiếu Nam Vang Quảng Ninh",
//     "Hủ tiếu Nam Vang Vũng Tàu",
//     "Hủ tiếu xào phong cách Hà Nội",
//     "Hủ tiếu xào phong cách Sài Gòn",
//     "Hủ tiếu xào phong cách Huế",
//     "Hủ tiếu xào phong cách Đà Nẵng",
//     "Hủ tiếu xào phong cách Nha Trang",
//     "Hủ tiếu xào phong cách Cần Thơ",
//     "Hủ tiếu xào phong cách Hải Phòng",
//     "Hủ tiếu xào phong cách Đà Lạt",
//     "Hủ tiếu xào phong cách Quảng Ninh",
//     "Hủ tiếu xào phong cách Vũng Tàu",
//     "Bún mắm chua Hà Nội",
//     "Bún mắm chua Sài Gòn",
//     "Bún mắm chua Huế",
//     "Bún mắm chua Đà Nẵng",
//     "Bún mắm chua Nha Trang",
//     "Bún mắm chua Cần Thơ",
//     "Bún mắm chua Hải Phòng",
//     "Bún mắm chua Đà Lạt",
//     "Bún mắm chua Quảng Ninh",
//     "Bún mắm chua Vũng Tàu"
// ];
// Hàm lấy tên thực đơn ngẫu nhiên từ mảng
function getRandomMenuName() {
    const randomIndex = Math.floor(Math.random() * recipeNames.length);
    return recipeNames[randomIndex];
}

// Ví dụ: Lấy 5 tên ngẫu nhiên và in ra console
// for (let k = 0; k < 10000; k++) {
//     console.log(getRandomMenuName());
// }

// Mảng 300 tên nguyên liệu
const ingredientNames = [
    "Thịt bò tươi",
    "Thịt bò bò viên",
    "Thịt bò nạm",
    "Thịt bò bắp",
    "Thịt bò thăn",
    "Thịt bò cắt lát",
    "Thịt bò gầu",
    "Thịt bò ba chỉ",
    "Thịt bò siêu tươi",
    "Thịt bò hữu cơ",
    "Thịt heo tươi",
    "Thịt heo ba chỉ",
    "Thịt heo nạc vai",
    "Thịt heo nạc thăn",
    "Thịt heo sườn non",
    "Thịt heo cắt miếng",
    "Thịt heo bò viên",
    "Thịt heo giòn",
    "Thịt heo hữu cơ",
    "Thịt heo truyền thống",
    "Thịt gà tươi",
    "Thịt gà ta",
    "Thịt gà sốt",
    "Thịt gà hữu cơ",
    "Thịt gà cắt lát",
    "Thịt gà nguyên con",
    "Thịt gà cánh",
    "Thịt gà đùi",
    "Thịt gà ướp gia vị",
    "Thịt gà mềm mịn",
    "Cá basa tươi",
    "Cá hồi nhập khẩu",
    "Cá chẽm tươi",
    "Cá thu đại dương",
    "Cá trê đồng",
    "Cá lóc sông",
    "Cá ngừ tươi",
    "Cá diêu hồng",
    "Cá bơn tươi",
    "Cá rô phi",
    "Tôm sú tươi",
    "Tôm tươi sống",
    "Tôm hùm",
    "Tôm thẻ",
    "Tôm nướng",
    "Tôm hấp",
    "Tôm sạch",
    "Tôm hữu cơ",
    "Tôm chua",
    "Tôm đông lạnh",
    "Mực tươi",
    "Mực ống",
    "Mực nướng",
    "Mực chiên giòn",
    "Mực hấp",
    "Mực mềm",
    "Mực bào",
    "Mực xào",
    "Mực sốt cà chua",
    "Mực hữu cơ",
    "Rau muống tươi",
    "Rau muống hữu cơ",
    "Cải xoăn xanh",
    "Cải bẹ xanh",
    "Rau dền tươi",
    "Rau xà lách",
    "Rau diếp xanh",
    "Rau mồng tơi",
    "Rau cải ngọt",
    "Rau cải xanh",
    "Cà rốt tươi",
    "Cà rốt hữu cơ",
    "Khoai tây vàng",
    "Khoai tây sủi",
    "Khoai lang đỏ",
    "Khoai lang tím",
    "Bắp cải trắng",
    "Bắp cải tím",
    "Bắp cải xanh",
    "Củ cải trắng",
    "Bí đỏ tươi",
    "Bí xanh mướt",
    "Mướp hương",
    "Bí ngòi",
    "Đậu que tươi",
    "Đậu bắp xanh",
    "Đậu que hữu cơ",
    "Đậu hũ non",
    "Đậu hũ cứng",
    "Đậu phụ vàng",
    "Nấm rơm",
    "Nấm hương",
    "Nấm sò",
    "Nấm mèo",
    "Nấm linh chi",
    "Nấm bào ngư",
    "Nấm kim châm",
    "Nấm mỡ",
    "Nấm đồng",
    "Nấm đùi gà",
    "Hành tây đỏ",
    "Hành tây trắng",
    "Hành tím",
    "Tỏi tươi",
    "Tỏi hữu cơ",
    "Gừng tươi",
    "Gừng nghiền",
    "Sả xanh",
    "Sả bằm",
    "Lá chanh thơm",
    "Lá quế tươi",
    "Húng quế",
    "Ngò gai",
    "Rau răm",
    "Húng lủi",
    "Mùi tàu",
    "Ngò rí",
    "Lá mùi",
    "Lá bạc hà",
    "Lá bạc hà tươi",
    "Cà chua đỏ",
    "Cà chua bi",
    "Dưa leo xanh",
    "Dưa leo hữu cơ",
    "Ớt chuông đỏ",
    "Ớt chuông xanh",
    "Ớt chuông vàng",
    "Đu đủ chín",
    "Thanh long tươi",
    "Xoài thơm",
    "Chuối tươi",
    "Táo đỏ",
    "Táo xanh",
    "Lê tươi",
    "Lựu đỏ",
    "Nho đen",
    "Nho xanh",
    "Cam tươi",
    "Quýt ngọt",
    "Bưởi da xanh",
    "Dứa chín",
    "Mận đỏ",
    "Sung tươi",
    "Lạc rang",
    "Hạt điều",
    "Hạt dẻ",
    "Hạt sen",
    "Đậu phộng",
    "Hạt hướng dương",
    "Hạt chia",
    "Nước mắm ngon",
    "Đường cát",
    "Muối biển",
    "Tiêu đen",
    "Tiêu trắng",
    "Ớt bột cay",
    "Bột ngọt",
    "Gừng bột",
    "Tỏi bột",
    "Bột nghệ",
    "Dầu ăn",
    "Dầu mè",
    "Dầu oliu",
    "Bơ tươi",
    "Bơ muối",
    "Dầu hướng dương",
    "Dầu đậu nành",
    "Dầu cọ",
    "Dầu hạt cải",
    "Dầu hạt lanh",
    "Sữa tươi",
    "Sữa đặc",
    "Sữa bột",
    "Trứng gà",
    "Trứng vịt",
    "Trứng cút",
    "Phô mai cheddar",
    "Phô mai mozzarella",
    "Sữa chua không đường",
    "Sữa chua trái cây",
    "Bún tươi",
    "Bánh phở",
    "Mì sợi",
    "Bánh canh",
    "Hủ tiếu sợi",
    "Mì ăn liền",
    "Bánh hỏi",
    "Bánh phồng tôm",
    "Bánh đa",
    "Bánh tráng",
    "Nước cốt dừa",
    "Nước cốt chanh",
    "Nước cốt dứa",
    "Nước cốt me",
    "Nước tương",
    "Xì dầu",
    "Giấm gạo",
    "Giấm táo",
    "Nước mía",
    "Nước ép trái cây",
    "Rau diếp cá",
    "Rau má tươi",
    "Rau diếp xanh",
    "Cải bẹ dưa",
    "Bắp non",
    "Rau sam",
    "Rau ngót",
    "Rau kinh giới",
    "Rau đay",
    "Rau sấu",
    "Mận tươi",
    "Sung chín",
    "Mít non",
    "Mít chín",
    "Chôm chôm",
    "Măng cụt",
    "Sầu riêng",
    "Đu đủ xanh",
    "Bưởi tươi",
    "Quả mận",
    "Bột ớt",
    "Bột cà ri",
    "Bột súp ăn liền",
    "Hạt nêm",
    "Bột nêm",
    "Bột dừa",
    "Đinh hương",
    "Quế chi",
    "Hạt tiêu",
    "Hạt mùi",
    "Rượu gạo",
    "Rượu trắng",
    "Rượu vang",
    "Nước cốt me chua",
    "Đậu đỏ",
    "Đậu xanh",
    "Đậu đen",
    "Đậu xanh bóc vỏ",
    "Đậu nành hữu cơ",
    "Đậu phộng rang",
    "Sữa đặc ngọt",
    "Sữa chua Hy Lạp",
    "Kem tươi",
    "Kem vani",
    "Siro dâu",
    "Siro chanh",
    "Mứt dâu",
    "Mứt cam",
    "Mứt sầu riêng",
    "Mứt xoài",
    "Bột mì",
    "Bột gạo",
    "Bột chiên xù",
    "Bột bắp",
    "Hạt lựu",
    "Hạt quinoa",
    "Hạt dẻ cười",
    "Hạt bí",
    "Hạt hạnh nhân",
    "Hạt óc chó",
    "Nước ép cà rốt",
    "Nước ép táo",
    "Nước ép nho",
    "Nước ép cam",
    "Nước ép dứa",
    "Nước ép lựu",
    "Nước ép lô hội",
    "Nước ép cần tây",
    "Nước ép cải xoăn",
    "Nước ép dưa hấu",
    "Mì căn tươi",
    "Bánh tráng cuốn",
    "Bánh tráng phơi sương",
    "Bánh đa nem",
    "Bánh gạo",
    "Bánh đúc",
    "Bánh chưng",
    "Bánh tét",
    "Bánh dày",
    "Bánh bột lọc",
    "Nước mắm Chinsu",
    "Nước tương Huy Fong",
    "Dầu ăn Anlene",
    "Bột nêm Maggi",
    "Sữa Vinamilk",
    "Trứng hữu cơ",
    "Cà phê sữa",
    "Trà xanh",
    "Trà đào",
    "Trà sữa",
    "Gạo tẻ",
    "Gạo nếp",
    "Gạo lứt",
    "Gạo hữu cơ",
    "Bột cacao",
    "Bột ca cao",
    "Bột protein",
    "Bột năng",
    "Bột bột",
    "Nước dừa tươi",
    "Thịt bò tươi",        // 1
    "Thịt bò ba chỉ",       // 2
    "Thịt bò nạc",          // 3
    "Thịt bò sườn",         // 4
    "Thịt bò thăn",         // 5
    "Thịt bò cừu",          // 6
    "Thịt heo tươi",        // 7
    "Thịt heo ba chỉ",       // 8
    "Thịt heo sườn",         // 9
    "Thịt heo nạc",         // 10
    "Thịt gà tươi",         // 11
    "Thịt gà hữu cơ",       // 12
    "Thịt gà cánh",         // 13
    "Thịt gà đùi",          // 14
    "Cá basa",              // 15
    "Cá hồi",               // 16
    "Cá chẽm",              // 17
    "Cá thu",               // 18
    "Tôm sú",               // 19
    "Tôm hùm",              // 20
    "Tôm tươi",             // 21
    "Mực tươi",             // 22
    "Mực ống",              // 23
    "Rau muống",            // 24
    "Rau cải xanh",         // 25
    "Rau xà lách",          // 26
    "Rau diếp",             // 27
    "Cà chua",              // 28
    "Cà rốt",               // 29
    "Khoai tây",            // 30
    "Khoai lang",           // 31
    "Bắp cải",              // 32
    "Đậu xanh",             // 33
    "Đậu đỏ",               // 34
    "Bí đỏ",                // 35
    "Bí xanh",              // 36
    "Nấm rơm",              // 37
    "Nấm hương",            // 38
    "Nấm sò",               // 39
    "Hành tây",            // 40
    "Hành tím",             // 41
    "Tỏi",                  // 42
    "Gừng",                 // 43
    "Sả",                   // 44
    "Lá chanh",             // 45
    "Lá quế",               // 46
    "Húng quế",             // 47
    "Ngò gai",              // 48
    "Rau thơm",             // 49
    "Ớt chuông",            // 50
    "Ớt hiểm",             // 51
    "Đường",                // 52
    "Muối",                 // 53
    "Tiêu",                 // 54
    "Bột ngọt",             // 55
    "Dầu ăn",               // 56
    "Dầu mè",               // 57
    "Dầu oliu",             // 58
    "Nước mắm",            // 59
    "Xì dầu",               // 60
    "Giấm gạo",             // 61
    "Bột cà ri",           // 62
    "Bột ớt",              // 63
    "Đậu phụ",              // 64
    "Hạt điều",             // 65
    "Hạt sen",              // 66
    "Nước cốt dừa",        // 67
    "Sữa tươi",             // 68
    "Sữa đặc",             // 69
    "Trứng gà",            // 70
    "Trứng vịt",            // 71
    "Phô mai cheddar",      // 72
    "Phô mai mozzarella",   // 73
    "Bơ",                   // 74
    "Kem",                  // 75
    "Siro dâu",             // 76
    "Mật ong",              // 77
    "Bột mì",               // 78
    "Bột năng",             // 79
    "Bột bắp",              // 80
    "Bột chiên xù",         // 81
    "Hạt hướng dương",      // 82
    "Hạt chia",             // 83
    "Nước ép cà rốt",       // 84
    "Nước ép táo",          // 85
    "Nước ép cam",          // 86
    "Nước ép dứa",          // 87
    "Nước ép lựu",          // 88
    "Nước cốt chanh",       // 89
    "Nước cốt me",          // 90
    "Nước cốt dứa",         // 91
    "Bánh phở",             // 92
    "Bún tươi",             // 93
    "Mì sợi",               // 94
    "Bánh cuốn",            // 95
    "Hủ tiếu",              // 96
    "Bánh mì",              // 97
    "Cháo lòng",           // 98
    "Cháo gà",             // 99
    "Xôi gà"
];


// Kết nối đến MongoDB (cập nhật connection string nếu cần)
mongoose.connect(`mongodb://admin:admin@food-mongodb:27017/food?authSource=admin`)
    .then()
    .then()
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
    });

// Hàm tạo một nguyên liệu ngẫu nhiên với dữ liệu tiếng Việt
const generateIngredient = () => {
    const numAlternatives = faker.number.int({ min: 0, max: 2 });
    return {
        name: faker.helpers.arrayElement(ingredientNames),
        amount: faker.number.int({ min: 50, max: 500 }),
        unit: faker.helpers.arrayElement(["g", "ml", "muỗng canh", "ly"]),
        imgUrl: "https://images.wordcloud.app/wikipedia/404.php.png",
        // alternatives: Array.from({ length: numAlternatives }, () => ({
        //     name: faker.helpers.arrayElement(ingredientNames),
        //     amount: faker.number.int({ min: 50, max: 500 }),
        //     unit: faker.helpers.arrayElement(["g", "ml", "muỗng canh", "ly"]),
        //     imgUrl: "https://images.wordcloud.app/wikipedia/404.php.png"
        // }))
    };
};

// Hàm tạo một bước hướng dẫn nấu ăn (instruction) với dữ liệu tiếng Việt
const generateInstruction = (index) => {
    return {
        step: index + 1,
        text: faker.lorem.sentence(), // Faker với locale tiếng việt sẽ tạo ra câu tiếng việt
        timeMinutes: faker.number.int({ min: 5, max: 30 }).toString(),
        imgUrl: "https://images.wordcloud.app/wikipedia/404.php.png"
    };
};

// Hàm tạo một công thức nấu ăn (recipe)
const generateRecipe = () => {
    const numIngredients = faker.number.int({ min: 3, max: 10 });
    const numInstructions = faker.number.int({ min: 2, max: 5 });

    const ingredients = Array.from({ length: numIngredients }, () => generateIngredient());
    const instructions = Array.from({ length: numInstructions }, (_, i) => generateInstruction(i));

    return {
        name: getRandomMenuName(),
        imgUrl: "https://images.wordcloud.app/wikipedia/404.php.png",
        energy: faker.number.int({ min: 200, max: 800 }),
        energyUnit: "cal",
        time: faker.number.int({ min: 10, max: 120 }),
        timeUnit: "phút",
        quantity: faker.number.int({ min: 1, max: 10 }),
        type: faker.helpers.arrayElement(["Món chính", "Tráng miệng", "Khai vị", "Nước giải khát", "Salad"]),
        author: faker.person.fullName(),
        description: faker.lorem.paragraph(),
        ingredients: ingredients,
        instructions: instructions,
        tags: faker.lorem.words(3).split(" "),
        ratings: {
            rate: faker.number.int({ min: 1, max: 5 }),
            count: faker.number.int({ min: 1, max: 100 })
        }
    };
};

// const generateIngredient = () => {
// return {
//     name
// }

// }

// Hàm seed dữ liệu 10.000 công thức
const seedRecipes = async () => {
    try {
        // Xóa dữ liệu cũ (nếu có)
        await Recipe.deleteMany({});
        console.log("Đã xóa dữ liệu cũ");

        const recipes = [];
        for (let i = 0; i < 10000; i++) {
            recipes.push(generateRecipe());
        }

        await Recipe.insertMany(recipes);
        console.log("Đã thêm 10.000 công thức nấu ăn");
    } catch (error) {
        console.error("Lỗi khi seed dữ liệu:", error);
    } finally {
        mongoose.connection.close();
    }
};

// seedRecipes();

const seedIngredients = async () => {
    try {
        // Xóa dữ liệu cũ (nếu có)
        await Ingredient.deleteMany({});
        console.log("Đã xóa dữ liệu cũ");

        const ingredients = [];
        for (let i = 0; i < 10000; i++) {
            ingredients.push(generateIngredient());
        }

        await Ingredient.insertMany(ingredients);
        console.log("Đã thêm 10.000 ings ");
    } catch (error) {
        console.error("Lỗi khi seed dữ liệu:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedIngredients();
