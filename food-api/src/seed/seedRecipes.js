import mongoose from "mongoose";
import Recipe from "../models/Recipe.js"; // Đảm bảo Recipe được export từ Recipe.js

// Mảng chứa 20 bản ghi recipe mẫu
const sampleRecipes = [
    {
        name: "Bún riêu cua",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bún riêu cua với nước dùng chua thanh, thịt cua ngọt, và hương vị đặc trưng của vùng đồng bằng.",
        ingredients: [
            {
                name: "Cua đồng",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Crab_in_shell.jpg/640px-Crab_in_shell.jpg",
                alternatives: [],
            },
            {
                name: "Cà chua",
                amount: 3,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tomatoes.jpg/640px-Tomatoes.jpg",
                alternatives: [],
            },
            {
                name: "Bún tươi",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Sơ chế cua và cà chua, luộc bún cho mềm.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
            },
            {
                step: 2,
                text: "Nấu nước dùng với cua và cà chua cho đến khi nước chua, ngọt hài hòa.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
            },
            {
                step: 3,
                text: "Trình bày bún với cua, rau sống và nước dùng nóng.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
            },
        ],
        tags: ["bún riêu", "đồng bằng", "bình dân"],
        ratings: {
            rate: 4.7,
            count: 90,
        },
    },
    {
        name: "Cơm lam",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
        energy: 550,
        energyUnit: "cal",
        time: 90,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cơm lam truyền thống được nấu trong ống tre, mang hương vị độc đáo của gạo tre và đặc trưng của nông dân miền núi.",
        ingredients: [
            {
                name: "Gạo lam",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bamboo_Rice.jpg/640px-Bamboo_Rice.jpg",
                alternatives: [],
            },
            {
                name: "Nước",
                amount: 500,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Water_droplets.jpg/640px-Water_droplets.jpg",
                alternatives: [],
            },
            {
                name: "Muối",
                amount: 1,
                unit: "muỗng cà phê",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Salt_shaker.jpg/640px-Salt_shaker.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ngâm gạo lam trong nước khoảng 30 phút.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bamboo_Rice.jpg/640px-Bamboo_Rice.jpg",
            },
            {
                step: 2,
                text: "Cho gạo vào ống tre và nấu bằng củi trong 60 phút.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
            },
            {
                step: 3,
                text: "Lấy cơm ra và thưởng thức khi còn nóng.",
                timeMinutes: "5",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
            },
        ],
        tags: ["cơm lam", "nông dân", "truyền thống"],
        ratings: {
            rate: 4.5,
            count: 50,
        },
    },
    {
        name: "Bánh cuốn thịt nướng",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 90,
        timeUnit: "mins",
        quantity: 2,
        type: "Món ăn sáng",
        author: "Master Chef",
        description:
            "Bánh cuốn mềm mịn kết hợp thịt nướng thơm lừng, là món ăn sáng bình dân được ưa chuộng.",
        ingredients: [
            {
                name: "Bột gạo",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Rice_flour.jpg/640px-Rice_flour.jpg",
                alternatives: [],
            },
            {
                name: "Thịt heo nướng",
                amount: 150,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Grilled_pork_chops.jpg/640px-Grilled_pork_chops.jpg",
                alternatives: [],
            },
            {
                name: "Nước mắm",
                amount: 100,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fish_sauce.jpg/640px-Fish_sauce.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Trộn bột gạo với nước để tạo hỗn hợp sánh, sau đó hấp cho đến khi bánh cuốn mềm mịn.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
            },
            {
                step: 2,
                text: "Nướng thịt heo cho đến khi vàng đều.",
                timeMinutes: "40",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Grilled_pork_chops.jpg/640px-Grilled_pork_chops.jpg",
            },
            {
                step: 3,
                text: "Xếp bánh cuốn ra đĩa, cho thịt nướng và chan nước mắm.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
            },
        ],
        tags: ["bánh cuốn", "sáng", "bình dân"],
        ratings: {
            rate: 4.6,
            count: 70,
        },
    },
    {
        name: "Canh chua cá lóc",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vietnamese_sour_fish_soup.jpg/640px-Vietnamese_sour_fish_soup.jpg",
        energy: 400,
        energyUnit: "cal",
        time: 45,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Canh chua cá lóc với vị chua, ngọt thanh, mang đậm hương vị đồng bằng, là món ăn bình dân được ưa chuộng.",
        ingredients: [
            {
                name: "Cá lóc",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Snakehead_fish.jpg/640px-Snakehead_fish.jpg",
                alternatives: [],
            },
            {
                name: "Cà chua",
                amount: 2,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tomatoes.jpg/640px-Tomatoes.jpg",
                alternatives: [],
            },
            {
                name: "Me chua",
                amount: 2,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Tamarind.jpg/640px-Tamarind.jpg",
                alternatives: [],
            },
            {
                name: "Rau thơm",
                amount: 100,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Leafy_Greens.jpg/640px-Leafy_Greens.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Làm sạch cá lóc, cắt khúc vừa ăn.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Snakehead_fish.jpg/640px-Snakehead_fish.jpg",
            },
            {
                step: 2,
                text: "Nấu nước dùng với me chua cho đến khi đạt vị chua ngọt hài hòa.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Tamarind.jpg/640px-Tamarind.jpg",
            },
            {
                step: 3,
                text: "Thêm cá và cà chua vào nồi, nấu cho đến khi cá chín mềm.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Vietnamese_sour_fish_soup.jpg/640px-Vietnamese_sour_fish_soup.jpg",
            },
        ],
        tags: ["canh chua", "cá lóc", "bình dân"],
        ratings: {
            rate: 4.6,
            count: 80,
        },
    },

    {
        name: "Cháo gà dân dã",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chicken_Congee.jpg/640px-Chicken_Congee.jpg",
        energy: 300,
        energyUnit: "cal",
        time: 40,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cháo gà dân dã với nước dùng thơm ngon, cháo mịn màng, là món ăn chính bổ dưỡng của người nông dân Việt Nam.",
        ingredients: [
            {
                name: "Gà",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Raw_chicken.jpg/640px-Raw_chicken.jpg",
                alternatives: [],
            },
            {
                name: "Gạo tẻ",
                amount: 100,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Rice_flour.jpg/640px-Rice_flour.jpg",
                alternatives: [],
            },
            {
                name: "Hành lá",
                amount: 50,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Green_onions.jpg/640px-Green_onions.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Luộc gà cho đến khi chín, sau đó xé sợi.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Raw_chicken.jpg/640px-Raw_chicken.jpg",
            },
            {
                step: 2,
                text: "Nấu cháo với gạo và nước dùng từ gà cho đến khi cháo sánh mịn.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chicken_Congee.jpg/640px-Chicken_Congee.jpg",
            },
            {
                step: 3,
                text: "Thêm gà xé và hành lá, nêm gia vị vừa ăn.",
                timeMinutes: "5",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chicken_Congee.jpg/640px-Chicken_Congee.jpg",
            },
        ],
        tags: ["cháo gà", "dân dã", "nông dân"],
        ratings: {
            rate: 4.5,
            count: 70,
        },
    },
    {
        name: "Cơm lam nông dân",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
        energy: 550,
        energyUnit: "cal",
        time: 90,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cơm lam nông dân được nấu trong ống tre, mang đậm hương vị gạo tre và đặc trưng vùng núi.",
        ingredients: [
            {
                name: "Gạo lam",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bamboo_Rice.jpg/640px-Bamboo_Rice.jpg",
                alternatives: [],
            },
            {
                name: "Nước",
                amount: 500,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Water_droplets.jpg/640px-Water_droplets.jpg",
                alternatives: [],
            },
            {
                name: "Muối",
                amount: 1,
                unit: "muỗng cà phê",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Salt_shaker.jpg/640px-Salt_shaker.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ngâm gạo lam trong nước khoảng 30 phút.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bamboo_Rice.jpg/640px-Bamboo_Rice.jpg",
            },
            {
                step: 2,
                text: "Cho gạo vào ống tre và nấu bằng củi trong 60 phút.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
            },
            {
                step: 3,
                text: "Lấy cơm ra, bóc vỏ tre và thưởng thức khi còn nóng.",
                timeMinutes: "5",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Bamboo_Rice_%28Com_Lam%29.jpg/640px-Bamboo_Rice_%28Com_Lam%29.jpg",
            },
        ],
        tags: ["cơm lam", "nông dân", "truyền thống"],
        ratings: {
            rate: 4.5,
            count: 50,
        },
    },
    {
        name: "Bún riêu cua",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bún riêu cua với nước dùng chua ngọt, hương vị đặc trưng của vùng đồng bằng, là món ăn chính đậm đà hương vị nông dân.",
        ingredients: [
            {
                name: "Cua đồng",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Crab_in_shell.jpg/640px-Crab_in_shell.jpg",
                alternatives: [],
            },
            {
                name: "Cà chua",
                amount: 3,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Tomatoes.jpg/640px-Tomatoes.jpg",
                alternatives: [],
            },
            {
                name: "Bún tươi",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Sơ chế cua và cà chua, luộc bún cho mềm.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
            },
            {
                step: 2,
                text: "Nấu nước dùng với cua và cà chua cho đến khi nước chua ngọt hài hòa.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
            },
            {
                step: 3,
                text: "Trình bày bún với cua, rau sống và nước dùng nóng.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/B%C3%BAn_ri%E1%BB%81u_cua.jpg/640px-B%C3%BAn_ri%E1%BB%81u_cua.jpg",
            },
        ],
        tags: ["bún riêu", "đồng bằng", "nông dân"],
        ratings: {
            rate: 4.7,
            count: 90,
        },
    },
    {
        name: "Cá kho tộ truyền thống",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
        energy: 450,
        energyUnit: "cal",
        time: 80,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cá kho tộ với vị ngọt, mặn, đậm đà, là món ăn chính được ưa chuộng trong các gia đình nông dân Việt Nam.",
        ingredients: [
            {
                name: "Cá tra",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fish_%28unspecified%29.jpg/640px-Fish_%28unspecified%29.jpg",
                alternatives: [],
            },
            {
                name: "Nước mắm",
                amount: 100,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fish_sauce.jpg/640px-Fish_sauce.jpg",
                alternatives: [],
            },
            {
                name: "Đường",
                amount: 2,
                unit: "muỗng cà phê",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sugar_cubes.jpg/640px-Sugar_cubes.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ướp cá với nước mắm, đường và gia vị trong 15 phút.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fish_%28unspecified%29.jpg/640px-Fish_%28unspecified%29.jpg",
            },
            {
                step: 2,
                text: "Kho cá trong nồi đất (tộ) với lửa nhỏ trong 50 phút cho đến khi nước sốt sánh lại.",
                timeMinutes: "50",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
            },
            {
                step: 3,
                text: "Múc cá ra đĩa, rưới nước kho và thưởng thức khi còn nóng.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
            },
        ],
        tags: ["cá kho", "truyền thống", "nông dân"],
        ratings: {
            rate: 4.6,
            count: 80,
        },
    },

    {
        name: "Bún bò Huế cay",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bun_bo_hue.jpg/640px-Bun_bo_hue.jpg",
        energy: 600,
        energyUnit: "cal",
        time: 80,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bún bò Huế cay với nước dùng đậm đà, hương vị cay nồng, là món ăn chính được ưa chuộng bởi nông dân miền Trung.",
        ingredients: [
            {
                name: "Thịt bò",
                amount: 350,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Raw_beef.jpg/640px-Raw_beef.jpg",
                alternatives: [],
            },
            {
                name: "Bún tươi",
                amount: 400,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
                alternatives: [],
            },
            {
                name: "Ớt tươi",
                amount: 5,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_chili_peppers.jpg/640px-Red_chili_peppers.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Luộc bún cho đến khi chín mềm, để ráo nước.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Rice_noodles.jpg/640px-Rice_noodles.jpg",
            },
            {
                step: 2,
                text: "Nấu nước dùng với thịt bò, hành, gừng và ớt tươi cho đến khi nước sánh lại và có vị cay nồng.",
                timeMinutes: "50",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bun_bo_hue.jpg/640px-Bun_bo_hue.jpg",
            },
            {
                step: 3,
                text: "Trình bày bún với thịt bò, rau sống và rưới nước dùng nóng.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Bun_bo_hue.jpg/640px-Bun_bo_hue.jpg",
            },
        ],
        tags: ["bún bò Huế", "cay", "nông dân"],
        ratings: {
            rate: 4.7,
            count: 120,
        },
    },
    {
        name: "Cà ri gà cay",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Chicken_Curry_%28Viet%29.jpg/640px-Chicken_Curry_%28Viet%29.jpg",
        energy: 550,
        energyUnit: "cal",
        time: 90,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cà ri gà cay với nước cốt dừa béo ngậy, vị cay nồng, mang đậm hương vị Ấn Độ pha lẫn phong cách Việt.",
        ingredients: [
            {
                name: "Gà",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Raw_chicken.jpg/640px-Raw_chicken.jpg",
                alternatives: [],
            },
            {
                name: "Cà ri bột",
                amount: 2,
                unit: "muỗng canh",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Curry_powder.jpg/640px-Curry_powder.jpg",
                alternatives: [],
            },
            {
                name: "Nước cốt dừa",
                amount: 300,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Coconut_milk.jpg/640px-Coconut_milk.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ướp gà với gia vị và cà ri bột trong 15 phút.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Raw_chicken.jpg/640px-Raw_chicken.jpg",
            },
            {
                step: 2,
                text: "Xào gà với hành và tỏi, sau đó cho nước cốt dừa vào nấu cho đến khi gà chín mềm.",
                timeMinutes: "50",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Chicken_Curry_%28Viet%29.jpg/640px-Chicken_Curry_%28Viet%29.jpg",
            },
            {
                step: 3,
                text: "Nêm nếm gia vị và trang trí với rau thơm trước khi thưởng thức.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Chicken_Curry_%28Viet%29.jpg/640px-Chicken_Curry_%28Viet%29.jpg",
            },
        ],
        tags: ["cà ri", "gà", "cay"],
        ratings: {
            rate: 4.6,
            count: 95,
        },
    },
    {
        name: "Cá kho tộ cay",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
        energy: 450,
        energyUnit: "cal",
        time: 80,
        timeUnit: "mins",
        quantity: 3,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Cá kho tộ cay với vị ngọt, mặn đậm đà, cay nồng, là món ăn chính đặc trưng của nông dân miền đồng bằng.",
        ingredients: [
            {
                name: "Cá tra",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fish_%28unspecified%29.jpg/640px-Fish_%28unspecified%29.jpg",
                alternatives: [],
            },
            {
                name: "Nước mắm",
                amount: 100,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fish_sauce.jpg/640px-Fish_sauce.jpg",
                alternatives: [],
            },
            {
                name: "Đường",
                amount: 2,
                unit: "muỗng cà phê",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sugar_cubes.jpg/640px-Sugar_cubes.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ướp cá với nước mắm, đường và gia vị trong 15 phút.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Fish_%28unspecified%29.jpg/640px-Fish_%28unspecified%29.jpg",
            },
            {
                step: 2,
                text: "Kho cá tộ trên lửa nhỏ trong 50 phút cho đến khi nước sốt sánh lại, có vị cay nhẹ.",
                timeMinutes: "50",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
            },
            {
                step: 3,
                text: "Múc cá ra đĩa, rưới nước kho lên và thưởng thức khi còn nóng.",
                timeMinutes: "15",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Vietnamese_caramelized_fish.jpg/640px-Vietnamese_caramelized_fish.jpg",
            },
        ],
        tags: ["cá kho", "cay", "nông dân"],
        ratings: {
            rate: 4.6,
            count: 80,
        },
    },
    {
        name: "Bánh cuốn chả lụa cay",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
        energy: 360,
        energyUnit: "cal",
        time: 70,
        timeUnit: "mins",
        quantity: 2,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bánh cuốn chả lụa cay với lớp bánh mỏng mềm mại, chả lụa nướng vàng và nước mắm cay đặc trưng.",
        ingredients: [
            {
                name: "Bột gạo",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Rice_flour.jpg/640px-Rice_flour.jpg",
                alternatives: [],
            },
            {
                name: "Chả lụa",
                amount: 150,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Vietnamese_spring_rolls.jpg/640px-Vietnamese_spring_rolls.jpg",
                alternatives: [],
            },
            {
                name: "Ớt tươi",
                amount: 3,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_chili_peppers.jpg/640px-Red_chili_peppers.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Pha bột gạo với nước, sau đó hấp thành bánh cuốn mỏng mềm.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
            },
            {
                step: 2,
                text: "Nướng chả lụa và ớt tươi cho đến khi vàng đều, tạo vị cay nồng.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Vietnamese_spring_rolls.jpg/640px-Vietnamese_spring_rolls.jpg",
            },
            {
                step: 3,
                text: "Xếp bánh cuốn ra đĩa, cho chả lụa và ớt nướng lên, chan nước mắm cay và thưởng thức.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Banh_cuon_thit_nuong.jpg/640px-Banh_cuon_thit_nuong.jpg",
            },
        ],
        tags: ["bánh cuốn", "cay", "nông dân"],
        ratings: {
            rate: 4.5,
            count: 75,
        },
    },
    {
        name: "Bánh chưng truyền thống",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Banh_chung.jpg/640px-Banh_chung.jpg",
        energy: 700,
        energyUnit: "cal",
        time: 480, // 8 giờ luộc
        timeUnit: "mins",
        quantity: 1,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bánh chưng truyền thống, món ăn không thể thiếu trong dịp Tết của người Việt, được làm từ gạo nếp, đậu xanh và thịt heo, gói trong lá dong.",
        ingredients: [
            {
                name: "Gạo nếp",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
                alternatives: [],
            },
            {
                name: "Đậu xanh",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mung_bean.jpg/640px-Mung_bean.jpg",
                alternatives: [],
            },
            {
                name: "Thịt heo",
                amount: 300,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pork.jpg/640px-Pork.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ngâm gạo nếp và đậu xanh qua đêm để mềm.",
                timeMinutes: "120",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
            },
            {
                step: 2,
                text: "Gói bánh chưng trong lá dong với lớp nhân gồm gạo nếp, đậu xanh và thịt heo.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Banh_chung.jpg/640px-Banh_chung.jpg",
            },
            {
                step: 3,
                text: "Luộc bánh chưng trong nồi lớn khoảng 6-8 giờ cho đến khi chín mềm.",
                timeMinutes: "240",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Banh_chung.jpg/640px-Banh_chung.jpg",
            },
        ],
        tags: ["bánh chưng", "Tết", "nông dân"],
        ratings: {
            rate: 4.8,
            count: 150,
        },
    },
    {
        name: "Thịt kho tàu cay",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Thit_kho_tau.jpg/640px-Thit_kho_tau.jpg",
        energy: 600,
        energyUnit: "cal",
        time: 90,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Thịt kho tàu cay với nước kho đậm đà, vị cay nồng đặc trưng, là món ăn chính phổ biến trong mùa Tết của người Việt.",
        ingredients: [
            {
                name: "Thịt heo",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pork.jpg/640px-Pork.jpg",
                alternatives: [],
            },
            {
                name: "Nước mắm",
                amount: 100,
                unit: "ml",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fish_sauce.jpg/640px-Fish_sauce.jpg",
                alternatives: [],
            },
            {
                name: "Ớt tươi",
                amount: 3,
                unit: "quả",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Red_chili_peppers.jpg/640px-Red_chili_peppers.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ướp thịt với nước mắm, đường và gia vị trong 20 phút.",
                timeMinutes: "20",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pork.jpg/640px-Pork.jpg",
            },
            {
                step: 2,
                text: "Kho thịt trên lửa nhỏ trong 60 phút, thêm ớt tươi để tạo vị cay nồng.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Thit_kho_tau.jpg/640px-Thit_kho_tau.jpg",
            },
            {
                step: 3,
                text: "Thưởng thức khi thịt đã mềm và nước kho sánh lại.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Thit_kho_tau.jpg/640px-Thit_kho_tau.jpg",
            },
        ],
        tags: ["thịt kho", "cay", "Tết"],
        ratings: {
            rate: 4.7,
            count: 110,
        },
    },
    {
        name: "Xôi gấc đỏ may mắn",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Xoi_gac.jpg/640px-Xoi_gac.jpg",
        energy: 450,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        quantity: 4,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Xôi gấc đỏ may mắn với màu sắc rực rỡ, ngọt bùi, là món ăn chính không thể thiếu trong dịp Tết của người Việt.",
        ingredients: [
            {
                name: "Gạo nếp",
                amount: 500,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
                alternatives: [],
            },
            {
                name: "Gấc",
                amount: 100,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Gac_fruit.jpg/640px-Gac_fruit.jpg",
                alternatives: [],
            },
            {
                name: "Đường",
                amount: 50,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sugar_cubes.jpg/640px-Sugar_cubes.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ngâm gạo nếp trong nước khoảng 2 tiếng cho mềm.",
                timeMinutes: "120",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
            },
            {
                step: 2,
                text: "Hấp gạo nếp cùng với gấc cho đến khi cháo sánh mịn, khoảng 30 phút.",
                timeMinutes: "30",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Xoi_gac.jpg/640px-Xoi_gac.jpg",
            },
            {
                step: 3,
                text: "Trộn đường vào và khuấy đều, sau đó thưởng thức khi còn ấm.",
                timeMinutes: "10",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Xoi_gac.jpg/640px-Xoi_gac.jpg",
            },
        ],
        tags: ["xôi gấc", "Tết", "may mắn"],
        ratings: {
            rate: 4.8,
            count: 130,
        },
    },
    {
        name: "Bánh tét xanh truyền thống",
        imgUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Banh_tet.jpg/640px-Banh_tet.jpg",
        energy: 500,
        energyUnit: "cal",
        time: 180,
        timeUnit: "mins",
        quantity: 1,
        type: "Món chính",
        author: "Master Chef",
        description:
            "Bánh tét xanh truyền thống với lớp vỏ mềm, nhân đậu xanh và thịt heo, là món ăn chính của mùa Tết được nhiều gia đình nông dân ưa chuộng.",
        ingredients: [
            {
                name: "Bột gạo nếp",
                amount: 400,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
                alternatives: [],
            },
            {
                name: "Đậu xanh",
                amount: 150,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mung_bean.jpg/640px-Mung_bean.jpg",
                alternatives: [],
            },
            {
                name: "Thịt heo",
                amount: 200,
                unit: "g",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pork.jpg/640px-Pork.jpg",
                alternatives: [],
            },
        ],
        instructions: [
            {
                step: 1,
                text: "Ngâm gạo nếp qua đêm và xay nhuyễn để làm bột bánh.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rice_sticky.jpg/640px-Rice_sticky.jpg",
            },
            {
                step: 2,
                text: "Trộn đậu xanh đã nấu chín với thịt heo, sau đó gói nhân vào lớp bột bánh và cuốn trong lá dong.",
                timeMinutes: "60",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Banh_tet.jpg/640px-Banh_tet.jpg",
            },
            {
                step: 3,
                text: "Hấp bánh tét trong 3-4 tiếng cho đến khi nhân chín và lớp bánh mềm.",
                timeMinutes: "180",
                imgUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Banh_tet.jpg/640px-Banh_tet.jpg",
            },
        ],
        tags: ["bánh tét", "Tết", "truyền thống"],
        ratings: {
            rate: 4.7,
            count: 100,
        },
    },

];

async function seedRecipes() {
    try {
        await Recipe.insertMany(sampleRecipes);
        console.log("Inserted sample recipes successfully!");
    } catch (error) {
        console.error("Error inserting sample recipes:", error);
    } finally {
        mongoose.connection.close();
    }
}

mongoose
    .connect("mongodb://admin:admin@food-mongodb:27017/food?authSource=admin", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB for recipes seeding");
        seedRecipes();
    })
    .catch((err) => {
        console.error("Connection error:", err);
    });
