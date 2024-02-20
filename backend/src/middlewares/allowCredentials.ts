import { NextFunction, Request, Response } from "express"
import origins from "../config/origins";

const allowCredentials=(req:Request,res:Response,next:NextFunction)=>{
    const origin=req.headers.origin;
    if(origin && origins.includes(origin)){
        res.header('Access-Control-Allow-Credentials','true');
    }
    next();
}
export default allowCredentials;