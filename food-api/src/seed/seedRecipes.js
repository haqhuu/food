import mongoose from "mongoose";
import Recipe from "../models/Recipe.js"; // Đảm bảo Recipe được export từ Recipe.js

// Mảng chứa 20 bản ghi recipe mẫu
const sampleRecipes = [
    {
        name: "Tomato Soup",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tomato_soup.jpg/800px-Tomato_soup.jpg",
        energy: 150,
        energyUnit: "cal",
        time: 40,
        timeUnit: "mins",
        description: "A delicious and healthy tomato soup.",
        ingredients: [
            {
                name: "Tomato",
                amount: 4,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png",
                alternatives: []
            },
            {
                name: "Onion",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Garlic",
                amount: 2,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Chop tomatoes, onion, and garlic.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Chopping_vegetables.jpg"
            },
            {
                step: 2,
                text: "Sauté onion and garlic until translucent.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Sauteing_onions.jpg"
            },
            {
                step: 3,
                text: "Add tomatoes and cook until soft.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Simmering_soup.jpg"
            },
            {
                step: 4,
                text: "Blend the mixture, season with salt and pepper, and serve.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Blender_in_use.jpg"
            }
        ],
        tags: ["soup", "vegetarian", "healthy"],
        ratings: { rate: 4.5, count: 10 }
    },
    {
        name: "Garlic Bread",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Garlic_bread.jpg",
        energy: 250,
        energyUnit: "cal",
        time: 20,
        timeUnit: "mins",
        description: "Crispy and buttery garlic bread.",
        ingredients: [
            {
                name: "Garlic",
                amount: 3,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 50,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Preheat your oven to 180°C.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Oven_preheat.jpg"
            },
            {
                step: 2,
                text: "Mix minced garlic with softened butter and salt.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Butter_mix.jpg"
            },
            {
                step: 3,
                text: "Spread the mixture on slices of bread.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Spreading_butter.jpg"
            },
            {
                step: 4,
                text: "Bake for 10 minutes until golden.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Baked_garlic_bread.jpg"
            }
        ],
        tags: ["snack", "side dish"],
        ratings: { rate: 4.7, count: 25 }
    },
    {
        name: "Onion Rings",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Onion_rings.jpg",
        energy: 300,
        energyUnit: "cal",
        time: 25,
        timeUnit: "mins",
        description: "Crispy fried onion rings.",
        ingredients: [
            {
                name: "Onion",
                amount: 2,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Flour",
                amount: 100,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Slice onions into rings.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Sliced_onions.jpg"
            },
            {
                step: 2,
                text: "Coat onion rings in flour mixed with salt and pepper.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Onion_rings_coating.jpg"
            },
            {
                step: 3,
                text: "Deep fry until crispy and golden.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Frying_onion_rings.jpg"
            }
        ],
        tags: ["snack", "appetizer"],
        ratings: { rate: 4.3, count: 15 }
    },
    {
        name: "Pasta with Tomato Sauce",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Spaghetti_with_tomato_sauce.jpg",
        energy: 500,
        energyUnit: "cal",
        time: 35,
        timeUnit: "mins",
        description: "Classic pasta with a rich tomato sauce.",
        ingredients: [
            {
                name: "Tomato",
                amount: 5,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png",
                alternatives: []
            },
            {
                name: "Onion",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Garlic",
                amount: 3,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Basil",
                amount: 10,
                unit: "leaves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Basil_plant.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Boil pasta until al dente.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Boiling_pasta.jpg"
            },
            {
                step: 2,
                text: "Prepare tomato sauce with chopped tomatoes, onion, garlic, basil, salt, and pepper.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Simmering_sauce.jpg"
            },
            {
                step: 3,
                text: "Mix pasta with the sauce and serve hot.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Serving_pasta.jpg"
            }
        ],
        tags: ["pasta", "italian"],
        ratings: { rate: 4.6, count: 20 }
    },
    {
        name: "Salad with Tomato and Basil",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Caprese_salad_%28tomatoes%29.jpg",
        energy: 200,
        energyUnit: "cal",
        time: 15,
        timeUnit: "mins",
        description: "Fresh salad featuring tomatoes, basil, and a light vinaigrette.",
        ingredients: [
            {
                name: "Tomato",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png",
                alternatives: []
            },
            {
                name: "Basil",
                amount: 8,
                unit: "leaves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Basil_plant.jpg",
                alternatives: []
            },
            {
                name: "Olive Oil",
                amount: 2,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Olive_oil.jpg/800px-Olive_oil.jpg",
                alternatives: []
            },
            {
                name: "Vinegar",
                amount: 1,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vinegar.jpg/800px-Vinegar.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Chop tomatoes and basil.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Chopped_salad.jpg"
            },
            {
                step: 2,
                text: "Mix with olive oil and vinegar.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Mixing_salad.jpg"
            }
        ],
        tags: ["salad", "vegetarian", "healthy"],
        ratings: { rate: 4.2, count: 18 }
    },
    {
        name: "Potato Salad",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Potato_salad.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 30,
        timeUnit: "mins",
        description: "Creamy potato salad with a tangy dressing.",
        ingredients: [
            {
                name: "Potato",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Potato_potato.jpg",
                alternatives: []
            },
            {
                name: "Onion",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Olive Oil",
                amount: 2,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Olive_oil.jpg/800px-Olive_oil.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Boil potatoes until tender.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/70/Boiled_potatoes.jpg"
            },
            {
                step: 2,
                text: "Chop potatoes and mix with chopped onion, olive oil, and salt.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mixing_potato_salad.jpg"
            }
        ],
        tags: ["salad", "side dish"],
        ratings: { rate: 4.0, count: 12 }
    },
    {
        name: "Carrot Cake",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Carrot_cake.jpg",
        energy: 450,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        description: "Moist and spiced carrot cake with cream cheese frosting.",
        ingredients: [
            {
                name: "Carrot",
                amount: 4,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Carrots.jpg",
                alternatives: []
            },
            {
                name: "Flour",
                amount: 200,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Sugar",
                amount: 150,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sugar.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 100,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Preheat oven to 180°C.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Oven_preheat.jpg"
            },
            {
                step: 2,
                text: "Mix carrots, flour, sugar, butter, and eggs.",
                timeMinutes: "20",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Mixing_batter.jpg"
            },
            {
                step: 3,
                text: "Bake for 30 minutes until a toothpick comes out clean.",
                timeMinutes: "30",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/Baking_cake.jpg"
            }
        ],
        tags: ["dessert", "cake"],
        ratings: { rate: 4.8, count: 30 }
    },
    {
        name: "Egg Omelette",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Omelette.jpg",
        energy: 300,
        energyUnit: "cal",
        time: 15,
        timeUnit: "mins",
        description: "Simple and fluffy egg omelette.",
        ingredients: [
            {
                name: "Egg",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            },
            {
                name: "Milk",
                amount: 50,
                unit: "ml",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Milk_glass.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Beat eggs with milk and salt.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Beaten_eggs.jpg"
            },
            {
                step: 2,
                text: "Pour mixture into a heated pan and cook until set.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Cooking_omelette.jpg"
            }
        ],
        tags: ["breakfast", "quick"],
        ratings: { rate: 4.4, count: 22 }
    },
    {
        name: "Pancakes",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/23/Blueberry_pancakes_%283%29.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 20,
        timeUnit: "mins",
        description: "Fluffy pancakes perfect for breakfast.",
        ingredients: [
            {
                name: "Flour",
                amount: 150,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Milk",
                amount: 200,
                unit: "ml",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Milk_glass.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 2,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            },
            {
                name: "Sugar",
                amount: 30,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sugar.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 30,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Mix flour, milk, eggs, sugar, and melted butter.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Mixing_pancake_batter.jpg"
            },
            {
                step: 2,
                text: "Cook pancakes on a hot griddle until golden brown on both sides.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Cooking_pancakes.jpg"
            }
        ],
        tags: ["breakfast", "sweet"],
        ratings: { rate: 4.5, count: 28 }
    },
    {
        name: "Butter Cookies",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Butter_cookies.jpg",
        energy: 400,
        energyUnit: "cal",
        time: 25,
        timeUnit: "mins",
        description: "Crispy and buttery cookies.",
        ingredients: [
            {
                name: "Flour",
                amount: 200,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Sugar",
                amount: 100,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sugar.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 100,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Mix flour, sugar, butter, and egg to form a dough.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Preparing_cookie_dough.jpg"
            },
            {
                step: 2,
                text: "Shape dough into cookies and bake at 180°C for 15 minutes.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Baking_cookies.jpg"
            }
        ],
        tags: ["dessert", "snack"],
        ratings: { rate: 4.5, count: 16 }
    },
    {
        name: "Spicy Chili",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Chili.jpg",
        energy: 550,
        energyUnit: "cal",
        time: 45,
        timeUnit: "mins",
        description: "Hearty spicy chili with beans and ground meat.",
        ingredients: [
            {
                name: "Chili",
                amount: 2,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Chili_peppers.jpg",
                alternatives: []
            },
            {
                name: "Onion",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Garlic",
                amount: 2,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Sauté onions, garlic, and chili in a pot.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Sauteing_chili.jpg"
            },
            {
                step: 2,
                text: "Add other ingredients and simmer for 30 minutes.",
                timeMinutes: "30",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Chili_simmer.jpg"
            }
        ],
        tags: ["spicy", "hearty"],
        ratings: { rate: 4.5, count: 18 }
    },
    {
        name: "Ginger Tea",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/37/Ginger_tea.jpg",
        energy: 100,
        energyUnit: "cal",
        time: 10,
        timeUnit: "mins",
        description: "Refreshing ginger tea perfect for cold days.",
        ingredients: [
            {
                name: "Ginger",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Ginger.jpg",
                alternatives: []
            },
            {
                name: "Honey",
                amount: 1,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Honey.jpg",
                alternatives: []
            },
            {
                name: "Lemon",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Lemon.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Boil water and add sliced ginger.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Boiling_water.jpg"
            },
            {
                step: 2,
                text: "Steep for 5 minutes, then add honey and lemon.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/39/Steeping_tea.jpg"
            }
        ],
        tags: ["beverage", "healthy"],
        ratings: { rate: 4.3, count: 16 }
    },
    {
        name: "Oregano Chicken",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Chicken_with_oregano.jpg",
        energy: 600,
        energyUnit: "cal",
        time: 50,
        timeUnit: "mins",
        description: "Roasted chicken with a hint of oregano.",
        ingredients: [
            {
                name: "Chicken",
                amount: 1,
                unit: "whole",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Whole_chicken.jpg",
                alternatives: []
            },
            {
                name: "Oregano",
                amount: 5,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Oregano.jpg",
                alternatives: []
            },
            {
                name: "Garlic",
                amount: 3,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Marinate chicken with oregano, garlic, and salt.",
                timeMinutes: "20",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Marinating_chicken.jpg"
            },
            {
                step: 2,
                text: "Roast the chicken in the oven at 200°C for 30 minutes.",
                timeMinutes: "30",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/67/Roasting_chicken.jpg"
            }
        ],
        tags: ["chicken", "roasted"],
        ratings: { rate: 4.7, count: 22 }
    },
    {
        name: "Parsley Pesto",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Parsley_pesto.jpg",
        energy: 350,
        energyUnit: "cal",
        time: 20,
        timeUnit: "mins",
        description: "A twist on the classic pesto using fresh parsley.",
        ingredients: [
            {
                name: "Parsley",
                amount: 1,
                unit: "bunch",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Basil_plant.jpg",
                alternatives: []
            },
            {
                name: "Olive Oil",
                amount: 3,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Olive_oil.jpg/800px-Olive_oil.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Blend parsley, olive oil, salt, and pepper until smooth.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Blending_pesto.jpg"
            }
        ],
        tags: ["sauce", "vegan"],
        ratings: { rate: 4.5, count: 18 }
    },
    {
        name: "Cumin Rice",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Cumin_rice.jpg",
        energy: 400,
        energyUnit: "cal",
        time: 30,
        timeUnit: "mins",
        description: "Fragrant rice cooked with cumin and spices.",
        ingredients: [
            {
                name: "Cumin",
                amount: 2,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Cumin_seeds.jpg/800px-Cumin_seeds.jpg",
                alternatives: []
            },
            {
                name: "Rice",
                amount: 200,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Rice_bowl.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Rinse the rice thoroughly.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Rinsing_rice.jpg"
            },
            {
                step: 2,
                text: "Cook rice with cumin, salt, and water until done.",
                timeMinutes: "25",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/Cooking_rice.jpg"
            }
        ],
        tags: ["side dish", "rice"],
        ratings: { rate: 4.3, count: 14 }
    },
    {
        name: "Sugar Cookies",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Sugar_cookies.jpg",
        energy: 420,
        energyUnit: "cal",
        time: 30,
        timeUnit: "mins",
        description: "Sweet and crunchy sugar cookies.",
        ingredients: [
            {
                name: "Flour",
                amount: 250,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Sugar",
                amount: 150,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sugar.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 100,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Mix flour, sugar, butter, and egg to form a dough.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Preparing_cookie_dough.jpg"
            },
            {
                step: 2,
                text: "Shape dough into cookies and bake at 180°C for 15 minutes.",
                timeMinutes: "15",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Baking_cookies.jpg"
            }
        ],
        tags: ["dessert", "snack"],
        ratings: { rate: 4.5, count: 16 }
    },
    {
        name: "Olive Oil Cake",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Olive_oil_cake.jpg",
        energy: 500,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        description: "Moist cake made with olive oil.",
        ingredients: [
            {
                name: "Flour",
                amount: 300,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Olive Oil",
                amount: 100,
                unit: "ml",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Olive_oil.jpg/800px-Olive_oil.jpg",
                alternatives: []
            },
            {
                name: "Sugar",
                amount: 150,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sugar.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Mix all ingredients until smooth.",
                timeMinutes: "20",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Mixing_cake_batter.jpg"
            },
            {
                step: 2,
                text: "Bake at 180°C for 40 minutes.",
                timeMinutes: "40",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Baking_cake_in_oven.jpg"
            }
        ],
        tags: ["dessert", "cake"],
        ratings: { rate: 4.4, count: 14 }
    },
    {
        name: "Vinegar Dressing Salad",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Salad_with_vinegar.jpg",
        energy: 180,
        energyUnit: "cal",
        time: 15,
        timeUnit: "mins",
        description: "Light salad dressed with vinegar.",
        ingredients: [
            {
                name: "Vinegar",
                amount: 2,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vinegar.jpg/800px-Vinegar.jpg",
                alternatives: []
            },
            {
                name: "Olive Oil",
                amount: 3,
                unit: "tbsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Olive_oil.jpg/800px-Olive_oil.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Whisk together vinegar, olive oil, salt, and pepper.",
                timeMinutes: "5",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/6/63/Mixing_dressing.jpg"
            }
        ],
        tags: ["salad", "dressing"],
        ratings: { rate: 4.2, count: 12 }
    },
    {
        name: "Mixed Vegetable Stew",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Vegetable_stew.jpg",
        energy: 500,
        energyUnit: "cal",
        time: 60,
        timeUnit: "mins",
        description: "Hearty stew loaded with a mix of vegetables.",
        ingredients: [
            {
                name: "Tomato",
                amount: 3,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tomato.png",
                alternatives: []
            },
            {
                name: "Carrot",
                amount: 2,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/28/Carrots.jpg",
                alternatives: []
            },
            {
                name: "Onion",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Onion.jpg",
                alternatives: []
            },
            {
                name: "Garlic",
                amount: 2,
                unit: "cloves",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Garlic_bulb.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 1,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Chop all vegetables.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Chopped_vegetables.jpg"
            },
            {
                step: 2,
                text: "Simmer vegetables in a pot with water and seasoning for 50 minutes.",
                timeMinutes: "50",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/14/Vegetable_stew_in_pot.jpg"
            }
        ],
        tags: ["stew", "vegetarian", "healthy"],
        ratings: { rate: 4.4, count: 16 }
    },
    {
        name: "Cheesy Pasta",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Cheese_pasta.jpg/800px-Cheese_pasta.jpg",
        energy: 550,
        energyUnit: "cal",
        time: 30,
        timeUnit: "mins",
        description: "Creamy pasta with melted cheese.",
        ingredients: [
            {
                name: "Milk",
                amount: 100,
                unit: "ml",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Milk_glass.jpg",
                alternatives: []
            },
            {
                name: "Butter",
                amount: 50,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Butter.jpg/800px-Butter.jpg",
                alternatives: []
            },
            {
                name: "Flour",
                amount: 150,
                unit: "g",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flour_%28wheat%29.jpg/800px-Flour_%28wheat%29.jpg",
                alternatives: []
            },
            {
                name: "Egg",
                amount: 1,
                unit: "pcs",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Egg.jpg",
                alternatives: []
            },
            {
                name: "Salt",
                amount: 0.5,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Salt_crystals.jpg",
                alternatives: []
            },
            {
                name: "Pepper",
                amount: 0.25,
                unit: "tsp",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Black_peppercorns.jpg",
                alternatives: []
            }
        ],
        instructions: [
            {
                step: 1,
                text: "Boil pasta until al dente.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Boiling_pasta.jpg"
            },
            {
                step: 2,
                text: "Prepare a cheese sauce with milk, butter, flour, salt, and pepper.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Cheese_sauce.jpg"
            },
            {
                step: 3,
                text: "Mix pasta with the cheese sauce and serve.",
                timeMinutes: "10",
                imgUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Serving_cheesy_pasta.jpg"
            }
        ],
        tags: ["pasta", "cheesy"],
        ratings: { rate: 4.6, count: 20 }
    }
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
