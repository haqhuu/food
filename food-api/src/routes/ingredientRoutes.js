import { Router } from "express";
import {
    // getIngredient,
    getIngredients,
    getIngredientSuggests,
    createIngredient,
    updateIngredient,
    deleteIngredient
} from "../controllers/ingredientController.js";

const router = Router();

// router.route("/ingredients/:name").get(getIngredient);
router.route("/ingredients")
    .get(getIngredientSuggests)
    .post(createIngredient);

router.route("/ingredients/all").get(getIngredients)
router.route("/ingredients/update").post(updateIngredient);
router.route("/ingredients/delete").post(deleteIngredient);


export default router;
