import { Router } from "express";
import {authRouter} from './auth';
import verifyToken from "../middlewares/verifyToken";
import userRouter from "./user";
import { accountRouter } from "./account";
export const router = Router();

router.use('/auth',authRouter);
router.use(verifyToken);
router.use('/users',userRouter);
router.use('/account',accountRouter);