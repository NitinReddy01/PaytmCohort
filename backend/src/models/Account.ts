import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    balance:{
        required:true,
        type:Number
    }
})

export const Account = mongoose.model('Account',accountSchema);
