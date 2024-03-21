import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
    name: string;
    books: mongoose.Types.ObjectId[];
}

const AuthorSchema: Schema = new Schema({
    name: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
