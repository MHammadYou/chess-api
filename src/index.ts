import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

import indexRoute from "./routes/index";

app.use('/', indexRoute);


app.listen(PORT, () => `Listening on port: ${PORT}`);
