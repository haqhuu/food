import { Router } from "express";
import {
    // getIngredient,
    getIngredients,
    createIngredient
} from "../controllers/ingredientController.js";

const router = Router();

// router.route("/ingredients/:name").get(getIngredient);
router.route("/ingredients")
    .get(getIngredients)
    .post(createIngredient);

export default router;
