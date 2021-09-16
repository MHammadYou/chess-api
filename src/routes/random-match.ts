import express from "express";
import axios from "axios";

const router = express.Router();


router.get('/random/:player',  (req, res) => {

  const username = req.params.player;

  axios.get(`https://api.chess.com/pub/player/${username}/`)
    .then(response => {
      const data = response.data;
      res.json(data);
    })
    .then(error => {
      console.log("hit")
      console.log(error);
      res.send("Not found");
    })

})


export default router;