import mongoose, {Schema} from "mongoose";

const Token = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: { type: String, required: true}
});

export default mongoose.model('Token', Token);