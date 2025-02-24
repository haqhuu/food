import { Router } from "express";
import { getRecipes, getRecipe, createOrUpdateRecipe } from "../controllers/recipeController.js";

const router = Router();

router.route("/recipes").get(getRecipes)
    .post(createOrUpdateRecipe);
router.route("/recipes/:name").get(getRecipe);

export default router;
