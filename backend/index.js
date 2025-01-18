import express from 'express'
import connectDB from './db/connect.db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))


app.use('/api/user', userRouter);
app.use('/api/message', messageRoute)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);

})