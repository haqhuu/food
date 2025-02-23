import { Router } from "express";
import {
    getIngredient,
    getIngredients,
    createOrUpdateIngredient
} from "../controllers/ingredientController.js";

const router = Router();


router.route("/ingredients").get(getIngredients);
router.route("/ingredients/:name").post(createOrUpdateIngredient);

export default router;
