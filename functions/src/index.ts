import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import userProfileRouter from "./routes/userProfileRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user_profiles", userProfileRouter);
export const api = functions.https.onRequest(app);
