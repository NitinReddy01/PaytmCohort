import { Router } from "express";
import { Account } from "../models/Account";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get('/balance/:id',async (req,res)=>{
    const {id} = req.params;
    if(!id) return res.status(400).json({message:"User Id required"});
    const userAccount = await Account.findOne({userId:id});
    if(!userAccount) return res.status(404).json({message:"No User Found"});
    res.status(200).json({balance:userAccount.balance});
})

accountRouter.post('/transfer/:id',async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {amount,to} = req.body;
        const {id} = req.params;
        const fromAcc = await Account.findOne({userId:id}).session(session);
        if(!fromAcc || fromAcc.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({message:"Insufficient Balance"});
        }
        const toAcc = await Account.findOne({userId:to}).session(session);
        if(!toAcc){
            await session.abortTransaction();
            return res.status(400).json({message:"Invalid Account"});
        }
        await Account.updateOne({userId:id},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
        await session.commitTransaction();
        res.json({message:"Tranfer Successful"});
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
    }
    finally{
        await session.endSession();
    }
});


