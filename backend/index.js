import express from 'express'
import connectDB from './db/connect.db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from 'cors'
import { app, server } from './socket/socket.js';
import path from 'path';
dotenv.config();


app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();


app.use('/api/user', userRouter);
app.use('/api/message', messageRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running at http://localhost:${PORT}`);

})