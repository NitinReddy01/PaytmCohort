import { Router } from "express";
import { z } from "zod";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Account } from "../models/Account";

export const authRouter = Router();

const signupBody = z.strictObject({
    email: z.string().email(),
    password: z.string(),
    firstname: z.string().min(1),
    lastname: z.string().min(1),
});

const signinBody = z.strictObject({
    email: z.string().email(),
    password: z.string(),
});

const AbcE_A = [1];
authRouter.post(
    "/signup",

    async (req, res) => {
        try {
            const { success } = signupBody.safeParse(req.body);
            if (!success)
                return res.status(400).json({ message: "Invalid Inputs" });
            const existingUser = await User.findOne({
                email: req.body.email,
            });
            if (existingUser)
                return res.status(409).json({
                    message: "User already exists with the given email",
                });
            const hashedPasword = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({
                email: req.body.email,
                password: hashedPasword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            });
            await Account.create({
                userId: user._id,
                balance: 1 + Math.random() * 1000,
            });
            res.json({ message: "User Created" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
);

authRouter.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) return res.status(400).json({ message: "Invalid Inputs" });
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ messge: "No User Found" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(403).json({ message: "Invalid Credentials" });
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: "1d" },
    );
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "3d" },
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, id: user._id });
});

authRouter.get("/logout", async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(204);
    const decode = jwt.decode(token) as jwt.JwtPayload;
    const id = decode?.id;
    const user = await User.findById(id);
    if (!user) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendStatus(204);
    }
    user.refreshToken = "";
    await user.save();
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.sendStatus(204);
});
