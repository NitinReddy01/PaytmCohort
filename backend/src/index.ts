import dotenv from "dotenv";
import express from "express";
import connectToDb from "./config/db";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import cors from "cors";
import corsConfig from "./config/corsConfig";
const app = express();

dotenv.config();
const PORT = process.env.PORT;
connectToDb();

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
