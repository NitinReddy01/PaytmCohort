import { Router } from "express";
import { z } from "zod";
import { User } from "../models/User";
import bcrypt from 'bcrypt';;

const userRouter = Router();

const userUpdateBody = z.strictObject({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional()
})

userRouter.put('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ message: "User ID required" });
    }
    const { success } = userUpdateBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }
    try {
        const hashedPasword = await bcrypt.hash(req.body.password, 10);
        const user = await User.findByIdAndUpdate(userId, {...req.body,password:hashedPasword});
        if(!user) return res.status(404).json({message:"No User Found"});
        res.status(201).json({ message: "Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRouter.get("/allUsers", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({$or:[{
        firstname:{
            "$regex":filter
        }
    },{
        lastname:{
            "$regex":filter
        }
    }]}).select("_id username firstname lastname");
    res.json({users})
})
export default userRouter;