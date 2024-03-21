import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
    },
    refreshToken: {
        type: String,
    },
});

export const User = mongoose.model("User", userSchema);
