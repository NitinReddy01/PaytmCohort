import mongoose, { Schema, type Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: mongoose.Types.ObjectId;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
});

export default mongoose.model<IBook>("Book", BookSchema);
