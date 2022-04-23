import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { initializeModels } from "./models/index.js";
import { connectDB } from "./helpers/db.js";
import { docs } from "./helpers/docs.js";
import { getUser } from "./helpers/session.js";

import docsRouter from "./routes/docs.js";
import SessionModel from "./models/session.js";
import UserModel from "./models/user.js";

const startApp = async () => {
    await initializeModels();
    await connectDB();

    const app = express();

    app.set("view engine", "ejs");
    app.set("views", "./views");
    app.use(cookieParser("docs-secret"));
    app.use(express.urlencoded({ extended: false }));

    app.get("/", async (req, res) => {
        const user = await getUser(req.signedCookies);
        res.render("index", { user, docs });
    });

    app.post("/login", async (req, res) => {
        if (req.body.email && req.body.password) {
            const user = await UserModel.findOne({
                status: "active",
                email: req.body.email,
            });
            if (!user || user?.password !== req.body.password) {
                res.status(401).render("401");
                return;
            }

            const session = new SessionModel({
                user: user._id,
                expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                data: {
                    name: user.name,
                    docsPermissions: user.docsPermissions,
                    superadmin: !!user.superadmin,
                },
            });

            await session.save();

            res.cookie("duid", session._id, {
                maxAge: 10 * 24 * 60 * 60 * 1000,
                signed: true,
                path: "/",
                httpOnly: true,
            });
            res.redirect("/");
            return;
        } else {
            res.status(401).render("401");
            return;
        }
    });

    app.get("/logout", async (req, res) => {
        const sessionId = req.signedCookies.duid;
        if (sessionId) {
            await SessionModel.findByIdAndDelete(sessionId);
        }
        res.clearCookie("duid");
        res.redirect("/");
    });

    app.use("/docs", docsRouter);

    app.use("/", (req, res) => {
        res.status(404).render("404");
    });

    app.listen(process.env.APP_PORT, () => {
        console.log("App listening on : http://127.0.0.1:" + process.env.APP_PORT + "/");
    });
};

startApp();
