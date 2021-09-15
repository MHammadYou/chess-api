import express from "express";

const router = express.Router();


router.get('/random/:player',  (req, res) => {
  const player: string = req.params.player;
  res.json({"Player": player})
})


export default router;