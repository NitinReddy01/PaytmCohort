import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";

const connectToDb = (): void => {
    mongoose
        .connect(process.env.MONGO_URL!)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const prisma = new PrismaClient();

export default connectToDb;
