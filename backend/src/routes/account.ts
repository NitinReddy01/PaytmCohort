import { Router } from "express";
import { prisma } from "../config/db";

export const accountRouter = Router();

accountRouter.get("/balance/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User Id required" });
    // const userAccount = await Account.findOne({ userId: id });
    const userAccount = await prisma.account.findFirst({
        where: {
            userId: Number(id),
        },
    });
    if (!userAccount) return res.status(404).json({ message: "No User Found" });
    res.status(200).json({ balance: userAccount.balance });
});

accountRouter.post("/transfer/:id", async (req, res) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // try {
    //     const { amount, to } = req.body;
    //     const { id } = req.params;
    //     const fromAcc = await Account.findOne({ userId: id }).session(session);
    //     if (!fromAcc || fromAcc.balance < amount) {
    //         await session.abortTransaction();
    //         return res.status(400).json({ message: "Insufficient Balance" });
    //     }
    //     const toAcc = await Account.findOne({ userId: to }).session(session);
    //     if (!toAcc) {
    //         await session.abortTransaction();
    //         return res.status(400).json({ message: "Invalid Account" });
    //     }
    //     await Account.updateOne(
    //         { userId: id },
    //         { $inc: { balance: -amount } },
    //     ).session(session);
    //     await Account.updateOne(
    //         { userId: to },
    //         { $inc: { balance: amount } },
    //     ).session(session);
    //     await session.commitTransaction();
    //     res.json({ message: "Tranfer Successful" });
    // } catch (error) {
    //     console.log(error);
    //     await session.abortTransaction();
    // } finally {
    //     await session.endSession();
    // }
    try {
        const { amount, to } = req.body;
        const id = req.params.id;
        await prisma.$transaction(async (tx) => {
            const fromAcc = await tx.account.findFirst({
                where: {
                    userId: Number(id),
                },
            });
            if (!fromAcc || fromAcc.balance < Number(amount)) {
                throw new Error("Insufficient Balance");
            }
            const toAcc = await tx.account.findFirst({
                where: {
                    userId: Number(to),
                },
            });
            if (!toAcc) {
                throw new Error("Invalid Account");
            }
            await tx.account.update({
                where: {
                    userId: Number(id),
                },
                data: {
                    balance: fromAcc.balance - Number(amount),
                },
            });
            await tx.account.update({
                where: {
                    userId: Number(to),
                },
                data: {
                    balance: toAcc.balance + Number(amount),
                },
            });
        });
        res.status(200).json({ message: "Transfered" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// async function transfer(req:any){
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const {amount,to} = req.body;
//         const {id} = req.params;
//         const fromAcc = await Account.findOne({userId:id}).session(session);
//         if(!fromAcc || fromAcc.balance<amount){
//             await session.abortTransaction();
//             console.log("fail")
//         }
//         const toAcc = await Account.findOne({userId:to}).session(session);
//         if(!toAcc){
//             await session.abortTransaction();
//             console.log("fail")
//         }
//         await Account.updateOne({userId:id},{$inc:{balance:-amount}}).session(session);
//         await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
//         await session.commitTransaction();
//         console.log("success");
//     } catch (error) {
//         console.log(error);
//         await session.abortTransaction();
//     }
//     finally{
//         await session.endSession();
//     }
// }

// async function transferPG(req:{body:{amount:Number,to:number},params:{id:number}}){
//     try {
//         const {amount,to} = req.body;
//         const id = req.params.id;
//         const message = await prisma.$transaction(async (tx)=>{
//             const fromAcc = await tx.account.findFirst({
//                 where:{
//                     userId:Number(id)
//                 }
//             })
//             if(!fromAcc || fromAcc.balance<Number(amount)) {
//                 throw new Error("Insuffiecient Balance");
//             }
//             const toAcc = await tx.account.findFirst({
//                 where:{
//                     userId:Number(to)
//                 }
//             })
//             if(!toAcc) {
//                 throw new Error("Invalid Account");
//             }
//             await tx.account.update({
//                 where:{
//                     userId:Number(id)
//                 },
//                 data:{
//                     balance:fromAcc.balance - Number(amount)
//                 }
//             })
//             await tx.account.update({
//                 where:{
//                     userId:Number(to)
//                 },
//                 data:{
//                     balance:toAcc.balance + Number(amount)
//                 }
//             })
//             return "Transfered";
//         });
//         console.log(message);
//     } catch (error) {
//         console.log(error);
//     }
// }
