import express from "express";
import axios from "axios";

const router = express.Router();


interface MatchData {
  result: string
  pgn: string
  white: object
  black: object
}


router.get('/random/:player',  (req, res) => {

  const username = req.params.player;
  const url = `https://api.chess.com/pub/player/${username}/games/archives`;


  axios.get(url)

    .then(response => {

      const archives = response.data.archives;
      const archive = archives[Math.floor(Math.random()*archives.length)];

      axios.get(archive)
        .then(response => {
          const data = response.data.games;
          const game = data[Math.floor(Math.random()*data.length)];


          const white = game.white;
          const black = game.black;

          delete white["@id"];
          delete black["@id"];

          const pgnSplitArr = game.pgn.split('\n');
          const pgn = pgnSplitArr[pgnSplitArr.length - 2];

          const result = pgn.slice(pgn.length - 3);

          const matchResult: MatchData = {
            result,
            pgn,
            white,
            black,
          }

          res.json(matchResult);
        })
    })

    .catch(error => {
      console.log(error);
      res.json({"msg": "No such player"})
    })

})

export default router;