import mongoose from "mongoose";
import UserModel from "../models/user.js";
const { APP_DB_URL } = process.env;

export const connectDB = async () => {
    await mongoose.connect(APP_DB_URL);
    initDB();
};

export const initDB = async () => {
    const users = await UserModel.find({ status: "active" });
    if (!users?.length) {
        const user = new UserModel({
            name: "Super Admin",
            email: "superadmin@saarthipedagogy.com",
            password: "12345678",
            superadmin: true,
        });
        await user.save();
    }
};
