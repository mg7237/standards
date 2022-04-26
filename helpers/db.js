import mongoose from "mongoose";
import UserModel from "../models/user.js";
const { APP_DB_URL,APP_DEFAULT_ADMIN_NAME,APP_DEFAULT_ADMIN_EMAIL,APP_DEFAULT_ADMIN_PASS } = process.env;

export const connectDB = async () => {
    await mongoose.connect(APP_DB_URL);
    initDB();
};

export const initDB = async () => {
    const users = await UserModel.find({ status: "active" });
    if (!users?.length) {
        const user = new UserModel({
            name: APP_DEFAULT_ADMIN_NAME,
            email: APP_DEFAULT_ADMIN_EMAIL,
            password: APP_DEFAULT_ADMIN_PASS,
            superadmin: true,
        });
        await user.save();
    }
};
