import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    expiresAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const SessionModel = new mongoose.model('Session', SessionSchema);
export default SessionModel;