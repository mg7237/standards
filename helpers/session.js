import SessionModel from "../models/session.js";

export const getUser = async (cookies) => {
    if (cookies.duid) {
        const session = await SessionModel.findById(cookies.duid);
        if (session && session.expiresAt >= new Date()) {
            return session.data;
        }
    }
    return null;
};
