import { Router } from "express";
import {
    getRecipes,
    //  getRecipe, createOrUpdateRecipe, 
    searchRecipes,
    createOrUpdateRecipe,
    searchName
} from "../controllers/recipeController.js";

const router = Router();

router.route("/recipes")
    .get(getRecipes)
    .post(createOrUpdateRecipe);
router.route("/recipes/search").post(searchRecipes);
router.route("/recipes/searchName").get(searchName);
// router.route("/recipes/:name").get(getRecipe);

export default router;
