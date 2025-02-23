import { Router } from "express";

const router = Router();

router.route("/dev").get((req, res) => {
    console.log("Hello from dev");
    res.send("Hello from dev");
});

export default router;
