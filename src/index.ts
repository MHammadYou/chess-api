import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

import { randomRoute } from "./routes"

app.use('/', randomRoute);


app.listen(PORT, () => `Listening on port: ${PORT}`);
