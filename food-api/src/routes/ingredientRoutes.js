import { Router } from "express";
import {
    getIngredient,
    getIngredients,
    createOrUpdateIngredient
} from "../controllers/ingredientController.js";

const router = Router();

router.route("/ingredients/:name").get(getIngredient);
router.route("/ingredients").get(getIngredients)
    .post(createOrUpdateIngredient);

export default router;
