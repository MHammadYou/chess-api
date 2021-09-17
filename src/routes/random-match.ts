import express from "express";
import axios from "axios";

const router = express.Router();


interface MatchData {
  pgn: string
}


router.get('/random/:player',  (req, res) => {

  const username = req.params.player;
  const url = `https://api.chess.com/pub/player/${username}/games/2007/07`;


  axios.get(url)

    .then(response => {

      const data = response.data;
      const pgnSplitArr = data.games[0].pgn.split('\n');
      const pgn = pgnSplitArr[pgnSplitArr.length - 2];

      const matchResult: MatchData = {
        pgn,
      }

      res.json(matchResult);

    })

    .catch(error => {
      console.log(error);
    })

})

export default router;