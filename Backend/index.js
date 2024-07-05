import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/db/connectDB.js";
import { app } from "./src/app.js";


const PORT = process.env.PORT || 8000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection Failed!!!");
    })
