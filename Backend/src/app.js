import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true, }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// routes import
import userRouter from './routes/user.route.js';
import testRouter from './routes/test.route.js';
import feedbackRouter from './routes/feedback.route.js';
import healthCheckRouter from './routes/healthCheck.route.js';


// routes declaration/mount
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tests', testRouter);
app.use('/api/v1/feedbacks', feedbackRouter);
app.use('/api/v1/healthCheck', healthCheckRouter);


export { app };