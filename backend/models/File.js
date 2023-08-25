import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    filename: {
        type: String,
        unique: true,
    },
    size: Number,
    contentType: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("File", FileSchema);