import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader =  req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({message:"Forbidden"});
    }
    const token = authHeader.split(' ')[1];
    if(!token) return res.sendStatus(403);
    try {
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!);
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
}

export default verifyToken;