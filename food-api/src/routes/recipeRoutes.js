import { Router } from "express";
import {
    getRecipes,
    //  getRecipe, createOrUpdateRecipe, 
    searchRecipes,
    createOrUpdateRecipe,
    searchName,
    updateRecipe,
    deleteRecipe,
    createRecipe,
    searchNameOnManage
} from "../controllers/recipeController.js";

const router = Router();
router.route("/recipes/search/manage").post(searchNameOnManage);

router.route("/recipes")
    .get(getRecipes)
    .post(createOrUpdateRecipe);
router.route("/recipes/search").post(searchRecipes);
router.route("/recipes/searchName").get(searchName);
// router.route("/recipes/:name").get(getRecipe);
router.route("/recipes/delete").post(deleteRecipe);
router.route("/recipes/update").post(updateRecipe);
router.route("/recipes/create").post(createRecipe);


export default router;
