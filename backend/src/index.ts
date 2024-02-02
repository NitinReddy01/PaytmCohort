import dotenv from 'dotenv';
import express from 'express';
import connectToDb from './config/db';
import { router } from './routes';
const app = express();

dotenv.config();
const PORT = process.env.PORT;
connectToDb();

app.use(express.json());


app.use('/api',router)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
