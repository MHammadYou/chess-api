import express from "express";
import dotenv from "dotenv";
import "./data";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.json({"msg": "Working"})
})


app.listen(PORT, () => `Listening on port: ${PORT}`);
