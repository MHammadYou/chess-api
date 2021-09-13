import express from "express";
import dotenv from "dotenv";
import getData from "./data"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {

  const data = await getData();
  return res.json(data);

})


app.listen(PORT, () => `Listening on port: ${PORT}`);
