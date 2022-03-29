import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        superadmin: { type: Boolean, default: false },
        docsPermissions: [String],
        status: { type: String, default: "active" },
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
    },
    {
        timestamps: true,
    }
);

const UserModel = new mongoose.model("User", UserSchema);
export default UserModel;
