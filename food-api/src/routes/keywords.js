import { Router } from "express";
import { recommendSimilarKeywords } from "../controllers/keywordController.js";

const router = Router();

router.route("/keywords/similars").get().post(recommendSimilarKeywords);

export default router;
