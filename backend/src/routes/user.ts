import bcrypt from "bcrypt";
import { Router } from "express";
import { z } from "zod";
import { prisma } from "../config/db";

const userRouter = Router();

const userUpdateBody = z.strictObject({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    password: z.string().optional(),
});

userRouter.put("/update/:userId", async (req, res) => {
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
        // const user = await User.findByIdAndUpdate(userId, {
        //     ...req.body,
        //     password: hashedPasword,
        // });
        const user = await prisma.user.update({
            where: {
                id: Number(userId),
            },
            data: {
                password: hashedPasword,
            },
            select: {
                id: true,
            },
        });
        if (!user) return res.status(404).json({ message: "No User Found" });
        res.status(201).json({ message: "Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

userRouter.get("/allUsers", async (req, res) => {
    const filter = (req.query.filter || "") as string;
    // const users = await User.find({
    //     $or: [
    //         {
    //             firstname: {
    //                 $regex: filter,
    //             },
    //         },
    //         {
    //             lastname: {
    //                 $regex: filter,
    //             },
    //         },
    //     ],
    // }).select("_id email firstname lastname");
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    firstName: {
                        contains: filter,
                    },
                },
                {
                    lastName: {
                        contains: filter,
                    },
                },
            ],
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
        },
    });
    res.json({ users });
});
export default userRouter;
