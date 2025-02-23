import { Router } from "express";

const router = Router();

router.route("/")
    .get((req, res) => {
        console.log("Hello from dev");
        res.send("Hello from dev");
    });

export default router;
