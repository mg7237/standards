import express, { Router } from "express";
import { getUser } from "../helpers/session.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));

router.use("/:module/", async (req, res, next) => {
    const user = await getUser(req.signedCookies);
    if (!user?.superadmin && !user?.docsPermissions?.includes(req.params.module)) {
        res.status(401).render("401");
        return;
    }
    next();
});

router.use("/:module/", (req, res, next) => {
    express.static(join(__dirname, "../docs/" + req.params.module))(req, res, next);
});

router.get("/", async (req, res) => {
    res.redirect("/");
});

export default router;
