import { Router } from "express";
import {authRouter} from './auth';
import verifyToken from "../middlewares/verifyToken";
export const router = Router();

router.use('/auth',authRouter);
// router.use(verifyToken);
router.get('/',(req,res)=>{res.send("AS")});